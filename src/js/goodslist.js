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
            
            $.get("../api/goods.php",{page:page,qty:qty},function(res){
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
                $('#main .goodslist').append($goods_ul);

                var pageNum=Math.ceil(res.total/res.qty);
                var $page_ul=$('<ul/>');
                var html='<li><span> &lt; 上一页 </span></li>';
                for(var i=0;i<pageNum;i++){
                    html += `<li><span>${i+1}</span></li>`;
                }
                html+='<li><span> 下一页 &gt;</span></li>';
                $page_ul.html(html);
                $('#main .main_r .page').append($page_ul);
                $page_ul.children().eq(res.page).addClass('active');
            },'json')
            
            // $('#main .main_r .page ul').on('click','li',function(){
            //     console.log(this);
            // })
        }
        createGoodslist();
    })
})