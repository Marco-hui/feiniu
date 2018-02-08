require(['config'],function(){
    require(['jquery','common'],function($,com){
        // 加载footer内容
        $("#footer").load('../html/footer.html #footer_bottom')

        // tab切换
        function Tab(){
            $tab=$('#main .right .tab');
            $li=$tab.find('li');
            $content=$('#main .right .form');
            $li.eq(0).addClass('active').find('a').css('color','#FDB2D0');
            $li.click(function(){
                $(this).addClass('active').find('a').css('color','#FDB2D0');
                $(this).siblings('li').removeClass('active').find('a').css('color','#5E5E5E');
                var idx=$(this).index();
                $content.eq(idx).show().siblings('.form').hide();
            })
        }
        Tab();

        // 自动登录提示操作
        $('#autoLogin').click(function(){
            if($(this).prop('checked')){
                $("#main .right .autoLogin_hint").show();
            }else{
                $("#main .right .autoLogin_hint").hide();
            }
        })

        // 提交操作
        $('#submit').hover(function(){
            $('#submit').css('opacity',0.7);
        },function(){
            $('#submit').css('opacity',1);
        })
        $('#submit').click(function(){
            // 是否自动登录
            var isAuto=$('#autoLogin').prop('checked');
            var username=$('#username').val();
            var password=$('#pass').val();
            $.get('../api/login.php',{username:username,password:password},function(data){
                if(data==="ok"){
                    $('#main .pass_tip').hide();
                    if(isAuto){ //生成14天cookie
                        var date=new Date();
                        date.setDate(date.getDate()+14);
                        com.Cookie.set('username',username,{expires:date.toUTCString(),path:"/"});
                    }
                    // 生成一个临时cookie，用于临时登录的用户名显示在各个页面上
                    com.Cookie.set('temp_username',username,{path:'/'});
                    location.href="../index.html";
                }else{
                    $('#main .pass_tip').show();
                }
            },'text')
        })
    })
})