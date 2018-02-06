require(['config'],function(){
    require(['jquery','common','same'],function($,com){

        // aside 返回顶部
        function toTop(){
            window.addEventListener('scroll',function(){
                if(scrollY>500){
                    $('#aside').show();
                }else{
                    $('#aside').hide();
                }
            })
            $('#aside span').click(function(){
                var timer=setInterval(function(){
                    var current=window.scrollY;
                    var speed= - current/10;
                    var y=current + speed;
                    if(y<10){
                        y=0;
                        clearInterval(timer);
                    }
                    window.scrollTo(0,y);
                },30)
            })
        }
        toTop();

        // 收货地 三级联动
        $.get("../api/data/region.json",function(res){
            var data=res.regions;

            var province=$('#sort_province')[0];
            var city=$('#sort_city')[0];
            var county=$('#sort_county')[0];
            // 生成省列表
            for(var i=0;i<data.length;i++){
                var option_province=document.createElement('option');
                option_province.value=data[i].name;
                option_province.innerText=data[i].name;
                province.appendChild(option_province);
            }

            // 根据选择的省生成相应的城市列表
            province.onclick=function(e){
                for(var i=0;i<data.length;i++){
                    if(data[i].name == e.target.value){
                        var data_city=data[i].regions;
                        var option_city=data_city.map(function(item){
                            return `<option value="${item.name}">${item.name}</option>`
                        }).join('');
                        // 根据选择的城市生成相应的县级列表
                        city.onclick=function(evt){
                            for(var j=0;j<data_city.length;j++){
                                if(data_city[j].name == evt.target.value){
                                    var data_county=data_city[j].regions;
                                    var option_count=data_county.map(function(items){
                                        return `<option value="${items.name}">${items.name}</option>`
                                    }).join('');
                                }
                            }
                            county.innerHTML="<option value='请选择'>请选择</option>"+option_count;
                        }
                    }
                }
                city.innerHTML="<option value='请选择'>请选择</option>"+option_city;
            }
        },'json')

        // 加载goods.json数据，生成商品列表
        function createGoodslist(){
            // 进入页面默认显示第一页
            var page=1;
            var qty=12;
            
            function callback(res){
                var arr=res.arr;
                var $goods_ul=$('<ul/>');
                $goods_ul.html(arr.map(function(item){
                    return `<li id="${item.id}">
                        <a href="details.html?id=${item.id}"><img src="${item.imgurl}"/></a>
                        <p class="price">￥${item.price}</p>
                        <a href="details.html?id=${item.id}" class="name">${item.name}</a>
                        <p class="add2car"><button>加入购物车</button></p>
                        <p class="comment">已有 <span> ${item.comment} </span> 人评价</p>
                        <p class="shop">${item.shop}</p>
                    </li>`
                }).join(''))
                $('#main .goodslist').html('');
                $('#main .goodslist').append($goods_ul);

                var pageNum=Math.ceil(res.total/res.qty);
                var $page_ul=$('<ul class="clfix"></ul>');
                var html='<li><span> &lt; 上一页 </span></li>';
                for(var i=0;i<pageNum;i++){
                    html += `<li><span>${i+1}</span></li>`;
                }
                html+='<li><span> 下一页 &gt;</span></li>';
                $page_ul.html(html);
                $('#main .main_r .page').html('');
                $('#main .main_r .page').append($page_ul);
                $page_ul.children().eq(res.page).addClass('active');

                // 如果显示的是第一页或最后一页，“上一页”或“下一页”按钮变灰
                if(res.page==1){
                    $page_ul.children().eq(0).css('background','#ccc');
                }else if(res.page==pageNum){
                    $page_ul.children().eq(pageNum+1).css('background','#ccc');
                }

                // main_r sort栏 显示总商品数
                $('#main .main_r .all_num span').text(res.total);
                // main_r sort栏 显示当前页码和总页码
                $('#main .main_r .all .now').text(res.page);
                $('#main .main_r .all .total').text(pageNum);
            }

            $.get("../api/goods.php",{page:page,qty:qty},function(res){
                callback(res);
            },'json')
            
            // 点击main_r sort栏左右按钮更换页面
            $('#main .main_r .all_page').on('click','span',function(e){
                var $page_ul=$('#main .main_r .page ul');
                var current_Page=$page_ul.find('.active').index(); //点击之前的页码
                var len=$page_ul.children().length;
                if(e.target.className==='left'){
                    current_Page--;
                    if(current_Page<=0){
                        current_Page=1;
                    }
                }else if(e.target.className==='right'){
                    current_Page++;
                    if(current_Page>=len-1){
                        current_Page=len-2;
                    }
                }
                $page_ul.children().eq(current_Page).addClass('active').siblings().removeClass('active');
                $.get('../api/goods.php',{page:current_Page,qty:qty},function(res){
                    callback(res);
                },'json');
            })

            // 点击page页码
            $('#main .main_r .page').on('click','li',function(){
                var $page_ul=$(this).parent();
                var current_Page=$page_ul.find('.active').index(); //点击之前的页码
                var click_page=$(this).index(); //点击的页码
                var len=$page_ul.children().length;

                if(click_page==0){ //点击上一页
                    click_page=current_Page-1;
                    if(click_page<=0){
                        click_page=1;
                    }
                }else if(click_page == len-1){ // 点击下一页
                    click_page=current_Page+1;
                    if(click_page>=len-1){
                        click_page=len-2;
                    }
                }
                $page_ul.children().eq(click_page).addClass('active').siblings().removeClass('active');
                $.get('../api/goods.php',{page:click_page,qty:qty},function(res){
                    callback(res);
                },'json');
            })
        }
        createGoodslist();

        // 浏览记录
        function history(){
            // 进入页面读取cookie,拿到商品浏览历史的数据并在页面生成浏览历史
            var arr_history=[];
            var cookies_history=com.Cookie.get('goodslist');
            if(cookies_history != "") arr_history=JSON.parse(cookies_history);
            var $ul=$('<ul/>')
            $ul.html(arr_history.map(item=>{
                return `<li>
                    <div class="photo"><a href="#"><img src="${item.imgurl}" /></a></div>
                    <p><a href="#">${item.name}</a><span>￥${item.price}</span></p>
                </li>`
            }).join(''))
            $ul.appendTo($('#main_history'));

            // 点击商品进入该商品的详情页并生成cookie，保存浏览记录
            $("#main .main_r .goodslist").on('click','a',function(e){
                var $currentLi=$(this).closest('li');
                var currentId=$currentLi.prop('id');
                for(var i=0;i<arr_history.length;i++){
                    if(arr_history[i].id == currentId){
                        arr_history.splice(i,1);
                        break;  // 找到就停止循环
                    }
                }

                var goods={
                    id:currentId,
                    imgurl:$currentLi.find('img').prop('src'),
                    price:$currentLi.find('.price').text().slice(1),
                    name:$currentLi.find('.name').text(),
                    comment:$currentLi.find('.comment span').text(),
                    shop:$currentLi.find('.shop').text()
                }
                arr_history.unshift(goods);

                var json_history=JSON.stringify(arr_history);
                var date=new Date();
                date.setDate(date.getDate()+7);
                com.Cookie.set('goodslist',json_history,{expires:date.toUTCString(),path:'/'});

                // return false; //阻止a标签跳转（浏览器默认行为），测试时添加
            })
        }
        history();

        // likes部分
        function likes(){
            // 设置ul的宽度
            var $bottom_ul=$('#likes .bottom_ul');
            var len=$bottom_ul.children().length;
            var li_W=parseFloat($bottom_ul.children().eq(0).css('width'));
            var ul_W= len * li_W;
            $bottom_ul.css('width',ul_W);

            // 点击更换一批
            var idx=0; // 默认显示第一批
            $('#likes .top .btn_change').click(function(){
                idx++;
                if(idx >= len){
                    idx=0;
                }
                var left = - li_W * idx ;
                $bottom_ul.css('left',left);
            })
        }
        likes();
    })
})