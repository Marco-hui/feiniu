
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