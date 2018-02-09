require(['config'],function(){
    require(['jquery','common','same','zoom','dateFormat'],function($,com){
        // 是否已登录
        setTimeout(function(){isLogin(com)},500);
        
        // 拉取URL地址，获取点击商品的id
        var currentId=location.search.split('=')[1];
        
        // 获取保存浏览记录的cookie，与当前id进行匹配，找到当前商品的信息
        var currentGoods=new Object;
        var arr_goods=com.Cookie.get('goodslist');
        if(arr_goods != ""){
            arr_goods=JSON.parse(arr_goods);
            arr_goods.forEach(item=>{
                if(item.id == currentId){
                    currentGoods=item;
                }
            })
        }

        // 详情页title、导航写入当前商品的name
        $('title').text(currentGoods.name);
        $('#nav .tier3').text(currentGoods.name);
        $('#nav .tier3').prop('href',"details.html?id="+currentId);
        $('#main .main_m_1 h2').text(currentGoods.name);
        $('#main .main_m_2 .sell .price').text("￥"+currentGoods.price);

        // 根据id,显示相应图片
        var $main_l_goods=$('#main .main_l_goods');
        var $smallList=$('#main .main_l_smallList');

        var imgurl_s="../img/g"+currentId+"_1_x.jpg";
        var imgurl_m="../img/g"+currentId+"_1_x.jpg";
        var imgurl_x="../img/g"+currentId+"_1_x.jpg";
        
        $main_l_goods.find('img').attr({src:imgurl_m,'data-big':imgurl_x});
        $smallList.find('.first img').attr({src:imgurl_s,'data-big':imgurl_x});
        // 放大镜效果
        $main_l_goods.mZoom({
            width:450,
            height:450,
            gap:-35.5
        });
        // 点击小图切换
        $smallList.children().eq(0).addClass('active'); //默认高亮第一张
        $smallList.on('click','li',function(){
            var $img=$(this).find('img');
            $(this).addClass('active').siblings().removeClass('active');
            var src=$img.prop('src').slice(0,-5)+"x.jpg";
            $main_l_goods.find('img').attr({src:src,'data-big':$img[0].dataset.big});
        })

        // 收货地，三级联动
        place(); // 代码在same.js里

        // 点击数量 “+” “-” 按钮选择数量,并计算价格
        var $main_qty=$('#main .main_m_2 .qty'); 
        var $sub=$main_qty.find('.sub'); // "-"
        var $add=$main_qty.find('.add'); // "+"
        var $subtotal=$main_qty.find('.subtotal');  // 小计
        var $good_qty=$('#good_qty'); // 输入框
        function selectQty(){
            $subtotal.text(currentGoods.price);
            $sub.css('color',"#ccc"); // 数量为1时，sub按钮不可用

            $main_qty.on('click','button',function(){
                var qty=$good_qty.val();
                if(this.className === "sub"){
                    qty--;
                    if(qty<=0){
                        qty=1;
                    }
                }else if(this.className === "add"){
                    qty++;
                }
                qty == 1 ? $sub.css('color',"#ccc") : $sub.css('color',"#000");
                $good_qty.val(qty);
                $subtotal.text((currentGoods.price*qty).toFixed(2));
            })

            // 输入框失去焦点时计算价格
            $good_qty.blur(function(){
                var qty=$(this).val();
                if(qty == 0){
                    qty=1;
                    $good_qty.val(1);
                }
                qty == 1 ? $sub.css('color',"#ccc") : $sub.css('color',"#000");
                $subtotal.text((currentGoods.price*qty).toFixed(2));
            })
        }
        selectQty();



        // 商品加入购物车相关
        function addToCar(){
            var car_goods=getCarCookie(com);
            var $add2Car=$('#main .add2car');
            var $goodsImg=$('#main .main_l_goods img');
            var $icon_car=$('#header .header_middle_car_r i');
            var $qty_car=$('#header .header_middle_car_r b');
            $add2Car.click(function(){
                // 商品飞入购物车效果
                var $copyImg=$goodsImg.clone();
                $copyImg.css({
                    position:"absolute",
                    width:450,
                    height:450,
                    left:$goodsImg.offset().left,
                    top:$goodsImg.offset().top
                })
                $copyImg.insertAfter($('#main'));
                var target={
                    width:30,
                    height:30,
                    left:$icon_car.offset().left,
                    top:$icon_car.offset().top
                }
                $copyImg.animate(target,700,function(){
                    $copyImg.remove();
                    $qty_car.text($qty_car.text()*1 + $good_qty.val()*1);
                });

                console.log(car_goods);
                // 判断当前商品是否已经存在cookie当中
                for(var i=0;i<car_goods.length;i++){
                    if(car_goods[i].id == currentId){
                        car_goods[i].qty += $good_qty.val()*1;
                        break;
                    }
                }

                if(i == car_goods.length){
                    var goods={
                        id:currentId,
                        imgurl:currentGoods.imgurl,
                        name:currentGoods.name,
                        price:currentGoods.price,
                        qty:$good_qty.val()*1
                    }

                    // 添加到数组
                    car_goods.push(goods);
                }
                var date=new Date();
                date.setDate(date.getDate()+30);
                // 生成购物车cookie
                com.Cookie.set('car',JSON.stringify(car_goods),{expires:date.toUTCString(),path:'/'});
            })
            
        }
        setTimeout(addToCar,500);

        // 相似商品
        likes();

        // section_r部分的tab标签切换效果
        function sectionTab(){
            var $tab_nav=$('#section .section_r .tab_nav');
            var $tab_content=$('#section .section_r .tab_content');
            $tab_nav.children().eq(0).addClass('active')
            $tab_content.children().eq(0).show();
            $tab_nav.on('click','li',function(){
                var idx=$(this).index();
                $(this).addClass('active').siblings().removeClass('active');
                $tab_content.children().eq(idx).show().siblings().hide();
            })

            // tab_nav 吸顶
            var tabLeft=$tab_nav.offset().left;
            window.addEventListener('scroll',function(){
                if(scrollY> 1160){
                    $tab_nav.css('left',tabLeft);
                    $tab_nav.addClass('fixed');
                }else{
                    $tab_nav.removeClass('fixed');
                }
            })
        }
        sectionTab();

        // 评论功能
        function comment(){
            // 获取当前商品的评论列表
            var $commentlist=$('#commentlist tbody');
            // 分页加载评论
            // var qty=20; // 默认一页显示20条评论
            // var page=1; // 默认显示第1页
            $.get('../api/details.php',{goods:currentId},function(data){
                $commentlist.html(data.map(item=>{
                    return `<tr id=comments${item.id}>
                        <td class="star">
                            <i></i><i></i><i></i><i></i><i></i>
                            <span class="time">${item.time}</span>
                        </td>
                        <td>${item.content}</td>
                        <td>
                            <img src="../css/img/head_pic.png"/>
                            <span class="username">${item.customer}</span>
                            <span class="city">${item.city}</span>
                        </td>
                    </tr>`
                }).join(''))
                var $star_td=$('#commentlist .star');
                for(var i=0;i<data.length;i++){ //根据评价的星级高亮相应数量的星星
                    // console.log($star_td.eq(i).children().slice(0,2));
                    var $stars_i=$star_td.eq(i).children();
                    switch(data[i].star){
                        case "1":
                            $stars_i.slice(0,1).addClass('active');break;
                        case "2":
                            $stars_i.slice(0,2).addClass('active');break;
                        case "3":
                            $stars_i.slice(0,3).addClass('active');break;
                        case "4":
                            $stars_i.slice(0,4).addClass('active');break;
                        case "5":
                            $stars_i.slice(0,5).addClass('active');break;
                        default:
                            break;
                    }
                }
            },'json')

            // 用户评论
            // 星级选择
            var $select_star=$('#select_star');
            var $star_lis=$select_star.children();
            $star_lis.eq(0).addClass('active');
            $select_star.on('mouseover','li',function(){
                var idx=$(this).index();
                $star_lis.slice(0,idx+1).addClass('active');
                $star_lis.slice(idx+1).removeClass('active');
            })
            var star_score=0;
            $select_star.on('click','li',function(){
                star_score=$(this).index();
            })
            $select_star.on('mouseout',function(){
                $star_lis.slice(0,star_score+1).addClass('active');
                $star_lis.slice(star_score+1).removeClass('active');
            })
        }
        comment();
    })
})