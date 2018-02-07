<?php
    require('connect.php');

    $page=isset($_GET['page']) ? $_GET['page'] : 1;
    $qty=isset($_GET['qty']) ? $_GET['qty'] :12;

    /*
        //从.json中获取数据
        $path="data/goods.json";
        $file=fopen($path,'r');
        $content=json_decode(fread($file,filesize($path)),true);
        fclose($file);
     */
    
    // 从数据库中获取数据
    $sql="select * from goods";
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