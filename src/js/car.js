require(['config'],function(){
    require(['jquery','common','same'],function($,com){
        // 只需最顶部的部分，重新加载header
        $('#header').load('../html/head.html #header_top',function(){isLogin(com)});

        // 收货地，三级联动
        place();

        // 进入页面，读取cookie,获取购物车商品数据
        var car_goods=[];
        var car=com.Cookie.get('car');
        if(car != "") car_goods=JSON.parse(car);

        var $tfoot=$('#main .main_m tfoot');
        var $tbody=$('#main .main_m tbody');
        var $discounts=$tfoot.find('.discounts span');
        // 生成购物车商品列表
        function carList(){
            var qty=0;
            var amount=0;
            var html=car_goods.map(item=>{
                qty += item.qty*1;
                amount += (item.qty * item.price);
                return `<tr id="${item.id}">
                    <td><input type="checkbox" /></td>
                    <td><img src="${item.imgurl}"/></td>
                    <td class="name"><a href="details.html?id=${item.id}">${item.name}</a></td>
                    <td class="price">${item.price}</td>
                    <td><button class="sub selectNum">-</button><input type="text" value="${item.qty}" class="good_qty"/><button class="add selectNum">+</button></td>
                    <td class="subtotal">${(item.price*item.qty).toFixed(2)}</td>
                    <td><button class="btnDel">&times;</button></td>
                </tr>`
            }).join('')
            $('#main .main_m tbody').html(html);

            amount=amount.toFixed(2);
            // 处理页面其他数据
            $('#main .main_t_l .allNum').text(car_goods.length); // 全部商品数
            $tfoot.find('.qty span').text(qty);  // 商品总件数
            $tfoot.find('.amount span').text(amount);  // 总金额
            $tfoot.find('.right .total').text(amount - $discounts.text());
            $tbody.find('button.sub').each((idx,item)=>{
                if($(item).siblings('.good_qty').val() == 1){
                    $(item).css('color','#ccc');
                }
            });
        }
        carList();

        // 更新cookie通用函数
        function reCookie(car_goods){
            var total_qty=0;
            var amount=0;
            car_goods.forEach(item=>{
                total_qty += item.qty;
                amount += item.price * item.qty;
            })
            amount=amount.toFixed(2);
            $tfoot.find('.qty span').text(total_qty);  // 更新总件数
            $tfoot.find('.amount span').text(amount);  // 更新总金额
            $tfoot.find('.right .total').text(amount - $discounts.text());  // 更新应付金额
            var date=new Date();
            date.setDate(date.getDate()+30);
            com.Cookie.set('car',JSON.stringify(car_goods),{expires:date.toUTCString(),path:'/'});
        }

        // 购物车商品操作
        function carOpera(){
            // 全选
            var $checkboxs=$(':input[type=checkbox]');
            $checkboxs.on('click',function(){
                if(this.className === 'all'){
                    $checkboxs.prop('checked',this.checked);
                    if(this.checked){
                        $checkboxs.not($('.all')).closest('tr').css('background','#FFF8E1');
                    }else{
                        $checkboxs.not($('.all')).closest('tr').css('background','#fff');
                    }
                }
            })

            // 单选，高亮一整行
            $tbody.on('click',':input[type=checkbox]',function(){
                if(this.checked){
                    $(this).closest('tr').css('background','#FFF8E1');
                }else{
                    $(this).closest('tr').css('background','#FFF');
                }
                checkAll();
            })

            // 全选按钮状态
            // 判断复选框数量与勾选的数量是否相等
            function checkAll(){
                $checkbox = $tbody.find(':checkbox')
                $checked = $tbody.find(':checked')
                $checkboxs.filter($('.all')).prop('checked',$checkbox.length === $checked.length);
            }

            // 删除单件商品
            $tbody.on('click','.btnDel',function(){
                // 删除DOM节点
                var $currentTr=$(this).closest('tr').remove(); 
                // 删除对应商品cookie
                var delId=$currentTr.prop('id');
                for(var i=0;i<car_goods.length;i++){
                    if(car_goods[i].id === delId){
                        car_goods.splice(i,1);
                        break;
                    }
                }
                reCookie(car_goods);
            })

            // 删除选中的商品
            $tfoot.find('.cleanSelected').click(function(){
                var $checkeds=$tbody.find(':checked');
                $checkeds.closest('tr').each((idx,item)=>{
                    for(var i=0;i<car_goods.length;i++){
                        if($(item).prop('id') == car_goods[i].id){
                            car_goods.splice(i,1);
                            break;
                        }
                    }
                })
                console.log(car_goods);
                reCookie(car_goods);
                $checkeds.closest('tr').remove();
            })

            // 清空购物车
            $tfoot.find('.cleanAll').click(function(){
                // 删除DOM节点
                $tbody.html('');
                // 删除购物车cookie
                com.Cookie.remove('car');
                $tfoot.find('.qty span').text(0);  // 更新总件数
                $tfoot.find('.amount span').text(0);  // 更新总金额
                $tfoot.find('.right .total').text(0);  // 更新应付金额
            })


            // 点击数量 “+” “-” 按钮选择数量,并计算 "小计"、"总金额"、"应付金额"等
            $tbody.on('click','.selectNum',function(){
                var $this=$(this)
                var $currentTr=$this.closest('tr');
                var currentId=$currentTr.prop('id');
                var input=$this.siblings('.good_qty');
                var qty=input.val()*1;
                if($this.hasClass('sub')){
                    qty--;
                    if(qty<=0){
                        qty=1;
                    }
                    qty == 1 ? $this.css('color',"#ccc") : $this.css('color',"#FF9018");
                }else if($this.hasClass('add')){
                    qty++;
                    $this.siblings('.sub').css('color',"#FF9018");
                }

                input.val(qty); // 更新数量
                var subtotal=($currentTr.find('.price').text() * qty).toFixed(2);
                $currentTr.find('.subtotal').text(subtotal);  //更新小计

                // console.log(car_goods,currentId);
                for(var i=0;i<car_goods.length;i++){ // 更新car_goods
                    if(car_goods[i].id == currentId){
                        car_goods[i].qty=qty;
                    }
                }
                reCookie(car_goods); //更新cookie和tfoot的数据
            })

            // 输入框选择数量，失去焦点时计算"小计"、"总金额"、"应付金额"等
            $tbody.on('blur','.good_qty',function(){
                var $this=$(this)
                var $currentTr=$this.closest('tr');
                var currentId=$currentTr.prop('id');

                var qty=$this.val()*1;
                if(qty<=0){
                    qty=1;
                    $this.val(1);
                }
                qty == 1 ? $this.siblings('.sub').css('color',"#ccc") : $this.siblings('.sub').css('color',"#FF9018");

                var subtotal=($currentTr.find('.price').text() * qty).toFixed(2);
                $currentTr.find('.subtotal').text(subtotal);  //更新小计
                for(var i=0;i<car_goods.length;i++){ // 更新car_goods
                    if(car_goods[i].id == currentId){
                        car_goods[i].qty=qty;
                    }
                }

                var total_qty=0;
                var amount=0;
                car_goods.forEach(item=>{
                    total_qty += item.qty;
                    amount += item.price * item.qty;
                })
                amount=amount.toFixed(2);
                $tfoot.find('.qty span').text(total_qty);  // 更新总件数
                $tfoot.find('.amount span').text(amount);  // 更新总金额
                $tfoot.find('.right .total').text(amount - $discounts.text());  // 更新应付金额
                reCookie(car_goods); //更新cookie
            })
            
        }
        carOpera();
    })
})