define(function(){
    return {
        randomColor:function(){
            var r=parseInt(Math.random()*256);
            var g=parseInt(Math.random()*256);
            var b=parseInt(Math.random()*256);

            return "rgb("+r+","+g+","+b+")";
        },
        randomNumber:function(min,max){
            return parseInt(Math.random()*(max-min+1)+min);
        },
        vCode:function(num){
            if(num === undefined){
                num=4;
            }
            var res='';
            var arr="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
            for(var i=0;i<num;i++){
                var idx=parseInt(Math.random()*arr.length);
                res+=arr[idx];
            }
            return res;
        },
        element:{
            get:function(nodes){
                var res=[];
                for(var i=0;i<nodes.length;i++){
                    if(nodes[i].nodeType===1){
                        res.push(nodes[i])
                    }
                }
                return res;
            },
            children:function(ele){
                var nodes=ele.childNodes;
                return element.get(nodes);
            },
            next:function(ele){
                var res=ele.nextSibling;
                if(res.nodeType===1){
                    return res;
                }else{
                    return res.nextSibling;
                }
            },
            prev:function(ele){
                var res=ele.previousSibling;
                if(res.nodeType===1){
                    return res;
                }else{
                    return res.previousSibling;
                }
            }
        },
        getCss:function(ele,attr){
            if(window.getComputedStyle){
                return getComputedStyle(ele)[attr];
            }else if(ele.currentStyle){
                return ele.currentStyle[attr];
            }else{
                return ele.style[attr];
            }
        },
        Event:{
            bind:function(ele,type,handler,isCaptuer){
                // W3C标准的事件监听器
                if(ele.addEventListener){
                    ele.addEventListener(type,handler,isCaptuer)
                }
                // IE8-浏览器
                else if(ele.attachEvent){
                    ele.attachEvent('on'+type,handler)
                }
                // DOM节点绑定方式
                else{
                    ele['on'+type]=handler;
                }
            },
            remove:function(ele,type,handler,isCaptuer){
                if(ele.removeEventListener){
                    ele.removeEventListener(type,handler,isCaptuer)
                }
                else if(ele.detachEvent){
                    ele.detachEvent('on'+type,handler)
                }
                else{
                    ele['on'+type]=null;
                }
            }
        },
        Cookie:{
            get:function(name){
                var res="";
                var cookies=document.cookie;
                if(cookies.length>0){
                    cookies=cookies.split('; ');
                    cookies.forEach(function(item){
                        var temp=item.split('=');
                        if(temp[0]===name){
                            res=temp[1];//JSON.parse在此处
                        }
                    })
                }
                return res;
            },
            set:function(name,value,opt){
                var cookieStr=name + "=" + value;
                if(opt !== undefined){
                    for(var attr in opt){
                        cookieStr += ";" + attr + "=" + opt[attr];
                    }
                }
                document.cookie=cookieStr;
            },
            remove:function(name){
                var date=new Date();
                date.setDate(date.getDate()-10);
                document.cookie= name + "=null;expires="+date.toUTCString();
            }
        },
        animate:function(ele,opt,callback){
            ele.timerLen=0;
            for(var attr in opt){
                ele.timerLen++;
                (function(attr){
                    // var now = new Date();
                    // now=now.getTime()
                    // var timername= "timer" + now;
                    var timername=attr + "timer";
                    var target = opt[attr];
                    clearInterval(ele[timername]);
                    ele[timername]=setInterval(function(){
                        var current=getCss(ele,attr);
                        // 获取单位
                        var unit = current.match(/[a-z]+$/);
                        unit = unit ? unit[0] : "";

                        // 获取值
                        current=parseFloat(current);

                        // 计算速度
                        var speed=(target-current)/10;
                        speed = speed<0 ? Math.floor(speed) : Math.ceil(speed);
                        if(attr === "opacity"){
                            speed = speed < 0 ? -0.02 : 0.02 ;
                        }
                        current += speed;
                        if(current===target || speed===0){
                            clearInterval(ele[timername]);
                            current=target;
                            ele.timerLen--;
                            if(ele.timerLen===0){
                                typeof callback === "function" && callback();
                            }
                        }
                        ele.style[attr]= current + unit ;
                    },30)
                })(attr)
            }
        },
        type:function(data){
            return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
        }
    }
});