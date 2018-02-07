<?php
    require('connect.php');
    $sql="select id,imgurl,name,price,type from index_goods";
    $res=$conn -> query($sql);
    $content=$res -> fetch_all(MYSQLI_ASSOC);
    $res -> close();
    
    echo json_encode($content,JSON_UNESCAPED_UNICODE);
?>