
function Header(){
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
}
// 加载head内容
$('#header').load('../html/head.html',function(){
    // ajax加载生成省份列表
    Header();
});
    
// 加载footer内容
$('#footer').load('../html/footer.html');

// 收货地，三级联动
function place(){
    $.get("../api/data/region.json",function(res){
        var data=res.regions;

        var province=$('#sort_province')[0];
        var city=$('#sort_city')[0];
        var county=$('#sort_county')[0];
        // 生成省列表
        for(var i=0;i<data.length;i++){
            var option_province=document.createElement('option');
            option_province.value=data[i].name;
            option_province.innerText=data[i].name;
            province.appendChild(option_province);
        }

        // 根据选择的省生成相应的城市列表
        province.onclick=function(e){
            for(var i=0;i<data.length;i++){
                if(data[i].name == e.target.value){
                    var data_city=data[i].regions;
                    var option_city=data_city.map(function(item){
                        return `<option value="${item.name}">${item.name}</option>`
                    }).join('');
                    // 根据选择的城市生成相应的县级列表
                    city.onclick=function(evt){
                        for(var j=0;j<data_city.length;j++){
                            if(data_city[j].name == evt.target.value){
                                var data_county=data_city[j].regions;
                                var option_count=data_county.map(function(items){
                                    return `<option value="${items.name}">${items.name}</option>`
                                }).join('');
                            }
                        }
                        county.innerHTML="<option value='请选择'>请选择</option>"+option_count;
                    }
                }
            }
            city.innerHTML="<option value='请选择'>请选择</option>"+option_city;
        }
    },'json')
}

// like部分
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