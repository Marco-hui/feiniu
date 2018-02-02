function Ajax(opt){
    var Default={
        type:'get',
        async:true,
        jsonpName:'callback'
    }
    var opt=Object.assign({},Default,opt);
    this.init(opt);
}

Ajax.prototype={
    constructor:Ajax,
    init(opt){
        opt.type=opt.type.toLowerCase();
        var params='';
        for(var attr in opt.data){
            params += attr + "=" + opt.data[attr] + '&' ;
        }
        params=params.slice(0,-1);

        var arr_status=[200,304];

        var type=['get','jsonp'];
        if(type.indexOf(opt.type) >= 0){
            opt.url = (opt.url.indexOf('?') === -1 ? '?' : '&') + params;
            params=null;
        }

        if(opt.type==='jsonp'){
            var callbackName='getDate'+Date.now();
            var script;

            window[callbackName]=function(data){
                var res=data;
                try{
                    res=JSON.parse(res);
                }catch(err){
                    try{
                        res=eval('('+res+')');
                    }catch(error){
                        res=res;
                    }
                }
                opt.success(res);

                script.parentNode.removeChild(script);
            }

            script=document.createElement('script');
            script.src=opt.url+'&'+opt.jsonpName+'='+callbackName;
            document.body.appendChild(script);

            return;
        }

        var xhr=null;
        try{
            xhr = new XMLHttpRequest();
        }catch(error){
            try{
                 // ie低版本浏览有多种异步请求的实现
                 xhr = new ActiveXObject("Msxml2.XMLHTTP");
            }catch(err){
                try{
                    xhr = new new ActiveXObject("Microsoft.XMLHTTP");
                }catch(e){
                    alert('你的浏览器太low，赶紧换电脑');
                }
            }
        }

        
        xhr.onload=function(){
            if(arr_status.indexOf(xhr.status)>=0){
                var res=xhr.responseText;
                try{
                    res=JSON.parse(res);
                }catch(err){
                    try{
                        res=eval('('+res+')');
                    }catch(error){
                        res=res;
                    }
                }
                opt.success(res);
            }
        }
        xhr.open(opt.type,opt.url,opt.async)
        if(opt.type==='post'){
            xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        }
        xhr.send(null);
    }
}

function ajax(opt){
    return new Ajax(opt);
}

ajax.get = function(opt){
    opt.type = 'get';
    return new Ajax(opt);
}
ajax.post = function(opt){
    opt.type = 'post';
    return new Ajax(opt);
}
ajax.jsonp = function(opt){
    opt.type = 'jsonp';
    return new Ajax(opt);
}
