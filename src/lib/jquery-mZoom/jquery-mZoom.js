/* 
* @Author: Marte
* @Date:   2018-01-30 11:16:30
* @Last Modified by:   Marte
* @Last Modified time: 2018-01-30 16:57:28
*/

;(function($){
    $.fn.mZoom=function(options){
        var defaults={
            width:400,
            height:300,
            position:'right',
            gap:15
        }
        return this.each(function(){
            var opt=$.extend({},defaults,options);
            opt.position=opt.position.toLowerCase();
            var $small=$(this);
            $small.addClass('m-zoom');
            var $smallImg=$small.find('img');
            init();
            function init(){
                var $big=$('<div/>').addClass('m-zoom-big');
                
                $big.css({width:opt.width,height:opt.height});
                var left,top;
                switch(opt.position){
                    case "right":
                        left=$small.offset().left + $small.outerWidth() + opt.gap;
                        top=$small.offset().top;
                        break;
                    case "bottom":
                        left=$small.offset().left;
                        top=$small.offset().top + $small.outerHeight() + opt.gap;
                        break;
                    case "left":
                        left=$small.offset().left - $big.outerWidth() - opt.gap;
                        top=$small.offset().top;
                        break;
                    case "top":
                        left=$small.offset().left;
                        top=$small.offset().top - $big.outerHeight() - opt.gap;
                        break;
                }
                $big.css({
                    left:left,
                    top:top
                })

                var $bigImg=$('<img/>').attr('src',$smallImg.attr('data-big') || $smallImg[0].src);
                $bigImg.appendTo($big);
                $big.appendTo('body');

                var $minzoom=$('<span/>').addClass('minzoom');
                $minzoom.appendTo($small);

                // 鼠标移入小图区域显示大图和放大镜
                var rate;
                $small.on('mouseenter',function(){
                    $bigImg.attr('src',$smallImg.attr('data-big') || $smallImg[0].src);
                    $minzoom.show();
                    $big.show();
                    rate=$bigImg.outerWidth()/$smallImg.outerWidth();
                    $minzoom.css({
                        width:opt.width/rate,
                        height:opt.height/rate
                    })
                }).on('mouseleave',function(){
                    $minzoom.hide();
                    $big.hide();
                }).on('mousemove',function(e){
                    var top=e.pageY - $small.offset().top - $minzoom.outerHeight()/2;
                    var left=e.pageX - $small.offset().left - $minzoom.outerWidth()/2

                    if(left<0){
                        left=0;
                    }else if(left>$small.innerWidth()-$minzoom.outerWidth()){
                        left=$small.innerWidth()-$minzoom.outerWidth();
                    }
                    if(top<0){
                        top=0;
                    }else if(top>$small.innerHeight()-$minzoom.outerHeight()){
                        top=$small.innerHeight()-$minzoom.outerHeight();
                    }

                    $minzoom.css({
                        top:top,
                        left:left
                    })
                    $bigImg.css({
                        top:-top*rate,
                        left:-left*rate
                    })
                })
            }
        })
    }
})(jQuery);