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
    })
})