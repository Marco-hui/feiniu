<?php
    require('connect.php');

    $goods=isset($_GET['goods']) ? $_GET['goods'] : null;

    $sql="select * from comment where goods='$goods'";

    $res=$conn -> query($sql);

    $content=$res -> fetch_all(MYSQLI_ASSOC);
    //释放查询结果集，避免资源浪费
    $res -> close();

    var_dump($content);
?>