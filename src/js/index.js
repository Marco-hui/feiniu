require(['config'],function(){
    require(['jquery','common','same','mcarousel','jqueryui'],function($,com){

        // 加载header内容并处理路径问题
        $('#header').load('../html/head.html',function(){
            Header();
            // 更改首页a标签中herf路径
            $("a[href='login.html']").attr('href','html/login.html');
            $("a[href='register.html']").attr('href','html/register.html');
            $("a[href='goodslist.html']").attr('href','html/goodslist.html');
            $("a[href='car.html']").attr('href','html/car.html');
            // 更改首页图片路径
            $("#header_middle .main_logo img").attr('src','img/feiniu_main_logo.png');
            // 默认显示首页左侧栏导航
            $('#header_bottom .header_bottom_all ul').show();

            // 头部购物车数量显示
            getCarCookie(com);
            isLogin(com);
            // 
        });
        
        // 首页banner轮播图
        $('#banner_lbt').mCarousel({
            imgs:['../img/index_banner1.jpg','../img/index_banner2.jpg','../img/index_banner3.jpg','../img/index_banner4.jpg'],
            width: 800,
            height: 454,
            type:'fade'
        })

        // banner右边栏tab标签切换
        $('#banner .banner_right3').tabs();

        // aside侧栏相关
        function aside(){
            // 滚动到一定距离出现
            window.addEventListener('scroll',function(){
                if(window.scrollY>600){
                    $("#aside").show();
                }else{
                    $("#aside").hide();
                }
            })
            // 右侧栏aside_right
            var $aR=$('#aside .aside_right');
            $aR.css('height',window.innerHeight); //设置高度与浏览器等高

            // 鼠标移入移出
            $aR.on('mouseenter','ul li',function(){
                $(this).find('b').css({background:"#fff",color:"#D7063B"})
                var $span=$(this).find('span');
                $span.show().css('background','#D7063B').stop().animate({left:- $span.outerWidth()});
            }).on('mouseleave','ul li',function(){
                $(this).find('b').css({background:"#D7063B",color:"#fff"})
                var $span=$(this).find('span');
                $span.css('background','#666').stop().animate({left:0},function(){
                    $span.hide();
                });
            })

            // 点击返回顶部
            $aR.find('.toTop').click(function(){
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

            // 右侧边栏显示购物车商品数量
            var car_goods=[];
            var car=com.Cookie.get('car');
            var $qty_car=$('#aside .aside_right .car b');
            if(car == ""){
                $qty_car.text(0);
            }else{
                car_goods=JSON.parse(car);
                var total_qty=0;
                car_goods.forEach(item=>{
                    total_qty += item.qty;
                })
                $qty_car.text(total_qty);
            }
        }
        aside();

        //asideL楼梯
        function AsideL(){
            // 窗口滚动事件
            var $lis=$('#asideL ul').children();
            window.onscroll=function(e){
                var sY=scrollY;
                if(sY>=500 && sY<4800){
                    $('#asideL').show();
                }else{
                    $('#asideL').hide();
                    $("#main .main0").find('.main0_t h3 i').css('background-position','-124px -94px');
                }
                switch(true){
                    case sY>=500 && sY<1000:
                        $lis.eq(0).find('.first').hide();
                        $lis.eq(0).find('.last').css('display','block');
                        $lis.eq(0).siblings('li').find('.first').show();
                        $lis.eq(0).siblings('li').find('.last').hide();
                        $("#main .main0").find('.main0_t h3 i').eq(0).css('background-position','-156px -94px').closest('.main0').siblings('.main0').find('.main0_t h3 i').css('background-position','-124px -94px');
                        break;
                    case sY>=1000 && sY<1600:
                        $lis.eq(1).find('.first').hide();
                        $lis.eq(1).find('.last').css('display','block');
                        $lis.eq(1).siblings('li').find('.first').show();
                        $lis.eq(1).siblings('li').find('.last').hide();
                        $("#main .main0").find('.main0_t h3 i').eq(1).css('background-position','-156px -94px').closest('.main0').siblings('.main0').find('.main0_t h3 i').css('background-position','-124px -94px');
                        break;
                    case sY>=1600 && sY<2600:
                        $lis.eq(2).find('.first').hide();
                        $lis.eq(2).find('.last').css('display','block');
                        $lis.eq(2).siblings('li').find('.first').show();
                        $lis.eq(2).siblings('li').find('.last').hide();
                        $("#main .main0").find('.main0_t h3 i').eq(2).css('background-position','-156px -94px').closest('.main0').siblings('.main0').find('.main0_t h3 i').css('background-position','-124px -94px');
                        break;
                    case sY>=2600 && sY<3300:
                        $lis.eq(3).find('.first').hide();
                        $lis.eq(3).find('.last').css('display','block');
                        $lis.eq(3).siblings('li').find('.first').show();
                        $lis.eq(3).siblings('li').find('.last').hide();
                        $("#main .main0").find('.main0_t h3 i').eq(3).css('background-position','-156px -94px').closest('.main0').siblings('.main0').find('.main0_t h3 i').css('background-position','-124px -94px');
                        break;
                    case sY>=3300 && sY<4200:
                        $lis.eq(4).find('.first').hide();
                        $lis.eq(4).find('.last').css('display','block');
                        $lis.eq(4).siblings('li').find('.first').show();
                        $lis.eq(4).siblings('li').find('.last').hide();
                        $("#main .main0").find('.main0_t h3 i').eq(4).css('background-position','-156px -94px').closest('.main0').siblings('.main0').find('.main0_t h3 i').css('background-position','-124px -94px');
                        break;
                    case sY>=3600 && sY<4800:
                        $lis.eq(5).find('.first').hide();
                        $lis.eq(5).find('.last').css('display','block');
                        $lis.eq(5).siblings('li').find('.first').show();
                        $lis.eq(5).siblings('li').find('.last').hide();
                        $("#main .main0").find('.main0_t h3 i').eq(5).css('background-position','-156px -94px').closest('.main0').siblings('.main0').find('.main0_t h3 i').css('background-position','-124px -94px');
                        break;
                    default:
                        break;
                }
            }
        }
        AsideL();

        // #main .main0_m_r 部分的tab标签切换
        function mainTab(){
            var $main0 = $('#main .main0');
            $main0.each((i,item)=>{
                $(item).find('.main0_t_tab li').eq(0).addClass('active');
                $(item).find('.main0_m_r .content0').eq(0).show();
                $(item).on('mouseenter','.main0_t_tab li',function(){
                    var len=$(this).parent().children().length-1;
                    var idx=$(this).index();
                    $(this).addClass('active').siblings('li').removeClass('active');
                    if(idx === len){ //解决最后一个抖动问题
                        $(this).addClass('lastActive');
                    };
                    $(item).find('.main0_m_r .content0').eq(idx).show().siblings().hide();
                }).on('mouseleave','.main0_t_tab li',function(){
                    var len=$(this).parent().children().length-1;
                    var idx=$(this).index();
                    if(idx === len){
                        $(this).removeClass('lastActive');
                    };
                })
            })
        }
        mainTab();

        // main4_m_r_t1 下的轮播图
        $('#main4_m_r_t1_lbt').mCarousel({
            imgs:['../img/index_4f_r_t1_1_1.jpg','../img/index_4f_r_t1_1_2.jpg','../img/index_4f_r_t1_1_3.jpg','../img/index_4f_r_t1_1_4.jpg'],
            width: 399,
            height: 243,
            type:'horizontal',
            showButton:false,
            duration:3000
        })

        // 获取数据库首页商品数据
        $.get('../api/index_goods.php',function(idxgoods){
            var $idxGoods=$('#main .main0 .main0_m_r .content3');
            for(var i=0;i<$idxGoods.length;i++){
                var $ul=$('<ul class="clfix"></ul>');
                var html=idxgoods.map(function(items,idx){
                    // if(idx>=10*i && idx<10*(i+1))
                        var start,end;
                        switch(i){
                            case 0:
                            case 1:
                                start=10*i;
                                end=10*(i+1); // 1F_tap2、2F_tap2 各有10个商品
                                break;
                            case 2:
                                start=20;
                                end= 20 + 12 ; // 3F_tap2 有12个商品
                                break;
                            case 3:
                                start=32;
                                end= 32 + 8 ; // 4F_tap2 有8个商品
                                break;
                            case 4:
                                start=40;
                                end= 40 + 12 ; // 5F_tap2 有12个商品
                                break;
                            case 5:
                                start=52;
                                end= 52 + 10 ; // 5F_tap2 有10个商品
                                break;
                            default:
                                break;
                        }
                        if(idx>=start && idx<end){
                            return `<li id="${items.id}">
                                <a href="#"><img src="${items.imgurl}"/></a>
                                <a href="#" class="name">${items.name}</a>
                                <b class="price"><i>￥</i><span class="_price">${items.price}</span></b>
                            </li>`
                        }
                    }).join('');
                $ul.html(html);
                $idxGoods.eq(i).append($ul);
            }
        },'json')
    })
})