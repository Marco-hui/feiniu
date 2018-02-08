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

        // 收货地，三级联动
        place(); // 代码在same.js里

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
                    $page_ul.children().eq(0).css('color','#ccc');
                    $('#main .main_r .all_page .left').css('color','#ccc');
                }else if(res.page==pageNum){
                    $page_ul.children().eq(pageNum+1).css('color','#ccc');
                    $('#main .main_r .all_page .right').css('color','#ccc');
                }else{
                    $('#main .main_r .all_page .left').css('color','#000');
                    $('#main .main_r .all_page .right').css('color','#000');
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
                    <p><a href="details.html?id=${item.id}">${item.name}</a><span>￥${item.price}</span></p>
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
        likes();

        // 头部购物车数量显示
        setTimeout(function(){getCarCookie(com)},500); //等头部load完之后才能获取到头部dom节点
    })
})