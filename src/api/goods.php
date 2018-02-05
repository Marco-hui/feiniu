<?php
    $page=isset($_GET['page']) ? $_GET['page'] : 1;
    $qty=isset($_GET['qty']) ? $_GET['qty'] :12;

    $path="data/goods.json";
    $file=fopen($path,'r');
    $content=json_decode(fread($file,filesize($path)),true);
    fclose($file);
    // var_dump($content);

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

?>