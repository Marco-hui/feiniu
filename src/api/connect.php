<?php
    $servername = 'localhost';
    $username = 'root';
    $password = '';
    $database = 'feiniudb';

    $conn=new mysqli($servername,$username,$password,$database);

    if($conn->connect_error){
        die('连接失败：'.$conn->connect_error);
    }
    $conn->set_charset('utf8');
?>