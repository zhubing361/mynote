<?php

if(!function_exists('dd')) {
    function dd($data) {
        var_dump($data);exit;
    }
}

if(!function_exists('to_404')) {
    function to_404() {
        header("HTTP/1.1 404 Not Found");exit;
    }
}

if(!function_exists('to_204')) {
    function to_204() {
        header("HTTP/1.1 204 No Content");exit;
    }
}

if(!function_exists('generate_note_id')) {
    function generate_note_id() {
        return (int)(microtime(true) * 1000);
    }
}

if(!function_exists('generate_timestamp')) {
    function generate_timestamp() {
        return microtime(true);
    }
}