<?php
    require('connect.php');

    // get请求从数据库获取数据
    $goods0=isset($_GET['goods']) ? $_GET['goods'] : null;
    $page=isset($_GET['page']) ? $_GET['page'] : 1;
    $qty=isset($_GET['qty']) ? $_GET['qty'] : 10;

    // post请求发送数据到数据库
    $star=isset($_POST['star']) ? $_POST['star'] : null;
    $content=isset($_POST['content']) ? $_POST['content'] : null;
    $customer=isset($_POST['customer']) ? $_POST['customer'] : null;
    $city=isset($_POST['city']) ? $_POST['city'] : null;
    $goods1=isset($_POST['goods']) ? $_POST['goods'] : null;

    if($goods0){
        $sql = "select * from comment where goods='$goods0'";
    }
    if($star && $content && $customer && $city && $goods1){
        $sql = "insert into comment(star,content,customer,city,goods) values('$star','$content','$customer','$city','$goods1')";
    }

    $res=$conn -> query($sql);

    $content=$res -> fetch_all(MYSQLI_ASSOC);
    //释放查询结果集，避免资源浪费
    $res -> close();

    $total=count($content);
    $idx= ($page - 1) * $qty;

    $arr=array_slice($content,$idx,$qty);
    $arr_show=array(
        "page" => $page,
        "qty" => $qty,
        "total" => $total,
        "arr" => $arr
    );

    echo json_encode($arr_show,JSON_UNESCAPED_UNICODE);

    // 关闭数据库，避免资源浪费
    $conn->close();
?>