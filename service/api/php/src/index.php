<?php
use Timi\PhpCode\BaseRestHandler;

require __DIR__.'/../vendor/autoload.php';

header('Access-Control-Allow-Origin:*');

$request_uri = $_SERVER['REQUEST_URI'];
if(strpos('|'.$request_uri, '/notes')) {
    $data = BaseRestHandler::getInstance()->dispatch();
    echo $data;exit;
}
to_404();

