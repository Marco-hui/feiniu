require(['config'],function(){
    require(['jquery','common','same','mcarousel','jqueryui'],function($,com){
        // 加载header内容并处理路径问题
        $('#header').load('../html/head.html',function(){
            // 更改首页a标签中herf路径
            $("a[href='login.html']").attr('href','html/login.html');
            $("a[href='register.html']").attr('href','html/register.html');
            $("a[href='goodslist.html']").attr('href','html/goodslist.html');
            $("a[href='car.html']").attr('href','html/car.html');
            // 更改首页图片路径
            $("#header_middle .main_logo img").attr('src','img/feiniu_main_logo.png');
            // 默认显示首页左侧栏导航
            $('#header_bottom .header_bottom_all ul').show();
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
    })
})