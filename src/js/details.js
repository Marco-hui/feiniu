require(['config'],function(){
    require(['jquery','common','same','zoom'],function($,com){
        // 拉取URL地址，获取点击商品的id
        var currentId=location.search.split('=')[1];
        
        // 获取保存浏览记录的cookie，与当前id进行匹配，找到当前商品的信息
        var currentGoods=new Object;
        var arr_goods=com.Cookie.get('goodslist');
        if(arr_goods != "") arr_goods=JSON.parse(arr_goods);
        arr_goods.forEach(item=>{
            if(item.id == currentId){
                currentGoods=item;
            }
        })

        // 详情页title、导航写入当前商品的name
        $('title').text(currentGoods.name);
        $('#nav .tier3').text(currentGoods.name);
        $('#nav .tier3').prop('href',"details.html?id="+currentId);
        $('#main .main_m_1 h2').text(currentGoods.name);
        $('#main .main_m_2 .sell .price').text("￥"+currentGoods.price);

        // 根据id,显示相应图片
        var $main_l_goods=$('#main .main_l_goods');
        var $smallList=$('#main .main_l_smallList');
        var imgurl_s="../img/g"+currentId+"_1_s.jpg";
        // var imgurl_m="../img/g"+currentId+"_1_m.jpg"; // 高清图
        // var imgurl_m=currentGoods.imgurl; // 标准图
        var imgurl_m="../img/g"+currentId+"_1_x.jpg"; // 超清图
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
        function selectQty(){
            var $main_qty=$('#main .main_m_2 .qty'); 
            var $sub=$main_qty.find('.sub'); // "-"
            var $add=$main_qty.find('.add'); // "+"
            var $good_qty=$('#good_qty'); // 输入框
            var $subtotal=$main_qty.find('.subtotal');  // 小计

            $subtotal.text(currentGoods.price);
            $sub.css('background',"#DEDEDE"); // 数量为1时，sub按钮不可用

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
                qty == 1 ? $sub.css('background',"#DEDEDE") : $sub.css('background',"#fff");
                $good_qty.val(qty);
                $subtotal.text((currentGoods.price*qty).toFixed(2));
            })

            // 输入框失去焦点时计算价格
            $good_qty.blur(function(){
                var qty=$(this).val();
                qty == 1 ? $sub.css('background',"#DEDEDE") : $sub.css('background',"#fff");
                $subtotal.text((currentGoods.price*qty).toFixed(2));
            })

        }
        selectQty();

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
                console.log(scrollY)
                if(scrollY> 1160){
                    $tab_nav.css('left',tabLeft);
                    $tab_nav.addClass('fixed');
                }else{
                    $tab_nav.removeClass('fixed');
                }
            })
        }
        sectionTab();
    })
})