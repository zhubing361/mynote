<?php
declare(strict_types=1);

namespace Timi\PhpCode;

class BaseRestHandler 
{
    protected static $instance = null;
    protected $request_params = [];
    
    private function __construct()
    {
        $inputs = file_get_contents("php://input"); //仅支持 body传参
        if(!empty($inputs)) {
            $this->request_params = json_decode($inputs, true);
        }
    }

    private function __clone()
    {
        
    }

    public static function getInstance() 
    {
        if(!self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function dispatch() 
    {
        $request_method = strtolower($_SERVER['REQUEST_METHOD']); // head get post put delete options
        $parsed_request_uri = $this->parseUri($_SERVER['REQUEST_URI']);
        try {
            $rest_handler = $this->getRestHandler($parsed_request_uri);
        } catch(\Exception $e) {
            to_404();
        }
       
        switch($request_method) {
            case 'get':
                if(empty($parsed_request_uri['id'])) {
                    return $rest_handler->index($this->request_params);
                } else {
                    return $rest_handler->read($parsed_request_uri['id']);
                }
                break;
            case 'post':
                return $rest_handler->post($this->request_params);
                break;
            case 'put':
                if(empty($parsed_request_uri['id'])) {
                    to_404();
                }
                return $rest_handler->put($parsed_request_uri['id'], $this->request_params);
                break;
            case 'delete':
                if(empty($parsed_request_uri['id'])) {
                    to_404();
                }
                return $rest_handler->delete($parsed_request_uri['id']);
                break;
            case 'options':
                to_204();
                break;
            case 'head':
                to_204();
                break;
            default:
                to_404();
                break;
        }
    }

    protected function parseUri(string $request_uri) {
        $request_uri = parse_url($request_uri);
        $request_uri_arr = array_filter(explode('/', $request_uri['path']));

        $module = $request_uri_arr[1] ?? '';
        $id = $request_uri_arr[2] ?? 0;
        $dispatch_data = [
            'module' => $module,
            'id' => (int)$id,
        ];

        // query 处理
        $query = $request_uri['query'] ?? '';
        if(!empty($query)) {
            parse_str($query, $query_params);
            $this->request_params = array_merge($this->request_params, $query_params);
        }

        return $dispatch_data;
    }

    protected function getRestHandler(array $parsed_request_uri) 
    {
        $handler = __NAMESPACE__."\\".ucfirst($parsed_request_uri['module']) . 'RestHandler';
        if(!class_exists($handler)) {
            throw new \Exception('Module not exists');
        }

        return new $handler();
    }
}