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

        // 根据id,显示相应图片
        var $main_l_goods=$('#main .main_l_goods');
        var $smallList=$('#main .main_l_smallList');
        var imgurl_s="../img/g"+currentId+"_1_s.jpg";
        // var imgurl_m="../img/g"+currentId+"_1_m.jpg"; // 高清图
        // var imgurl_m=currentGoods.imgurl; // 标准图
        var imgurl_m="../img/g"+currentId+"_1_x.jpg"; // 超清图
        var imgurl_x="../img/g"+currentId+"_1_x.jpg";
        // try{
        //     $main_l_goods.find('img').attr({src:imgurl_m,'data-big':imgurl_x});
        // }catch(err){
        //     $main_l_goods.find('img').attr({src:imgurl_x,'data-big':imgurl_x});
        // }
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
    })
})