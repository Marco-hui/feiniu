require(['config'],function(){
    require(['jquery','common','same','mcarousel','jqueryui'],function($,com){
        // 加载header内容
        $('#header').load('../html/head.html',function(){
            // 更改首页a标签中herf路径
            $("a[href='login.html']").attr('href','html/login.html');
            $("a[href='register.html']").attr('href','html/register.html');
            $("a[href='goodslist.html']").attr('href','html/goodslist.html');
            // 更改首页图片路径
            $("#header_middle .main_logo img").attr('src','img/feiniu_main_logo.png');
            // 默认显示首页左侧栏导航
            $('#header_bottom .header_bottom_all ul').show();
        });

        // 加载footer内容
        $('#footer').load('../html/footer.html');

        // ajax加载生成省份列表
        $.get('../api/data/region.json',function(res){
            var res=res.regions;
            // 提取拼音首字母
            var firstLetter_arr=[];
            for(var i=0;i<res.length;i++){
                var firstLetter=res[i].pinyin[0];
                if(!firstLetter_arr.includes(firstLetter)){
                    firstLetter_arr.push(firstLetter);
                }
            }
            firstLetter_arr=firstLetter_arr.sort();
            var $ul=$('<ul/>');
            for(var i=0;i<firstLetter_arr.length;i++){
                var $li=$("<li><a>"+firstLetter_arr[i]+"</a></li>");
                $(res).each(function(idx,item){
                    if(item.pinyin[0]==firstLetter_arr[i]){
                        var $span=$('<span/>');
                        $span.text(item.name);
                        $li.append($span);
                    }
                })
                $ul.append($li);
            }
            $('#header_top .last').append($ul);
            // 点击省份显示
            $ul.on('click','span',function(){
                $('#header_top .province').text($(this).text());
            })
        },'json')
        
        // 首页banner轮播图
        $('#banner_lbt').mCarousel({
            imgs:['../img/index_banner1.jpg','../img/index_banner2.jpg'],
            width: 800,
            height: 454,
            type:'fade'
        })

        // banner右边栏tab标签切换
        $('#banner .banner_right3').tabs();
        
    })
})