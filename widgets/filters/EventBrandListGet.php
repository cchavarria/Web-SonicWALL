<?php
    header('Content-Type: application/json; charset=utf-8');
    echo file_get_contents('http://software.dell.com/jsonrequest/eventbrandlistget/?' . $_SERVER['QUERY_STRING']);

?>