<?php
    require('connect.php');

    $page=isset($_GET['page']) ? $_GET['page'] : 1;
    $qty=isset($_GET['qty']) ? $_GET['qty'] :12;

    $dPrice=isset($_GET['dPrice']) ? $_GET['dPrice'] : null;
    $uPrice=isset($_GET['uPrice']) ? $_GET['uPrice'] : null;

    $shop=isset($_GET['shop']) ? $_GET['shop'] : false;
    $comment=isset($_GET['comment']) ? $_GET['comment'] : false;

    $desc=isset($_GET['desc']) ? $_GET['desc'] : false;
    $asce=isset($_GET['asce']) ? $_GET['asce'] : false;
    /*
        //从.json中获取数据
        $path="data/goods.json";
        $file=fopen($path,'r');
        $content=json_decode(fread($file,filesize($path)),true);
        fclose($file);
     */

    // 从数据库中获取数据
    $sql="select * from goods where";

    if($dPrice && $uPrice){
        $sql .= " price between '$dPrice' and '$uPrice' and";
    }
    if($shop){
        $sql .= " shop = '飞牛自营' and";
    }

    $sql .= " 1=1 ";

    if($comment){
        $sql = "select * from goods order by comment desc";
    }
    if($desc){
        $sql = "select * from goods order by price desc";
    }else if($asce){
        $sql = "select * from goods order by price";
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