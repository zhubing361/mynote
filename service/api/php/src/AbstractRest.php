<?php
declare(strict_types=1);

namespace Timi\PhpCode;

abstract class AbstractRest extends SimpleRest 
{
    protected $code = 1;
    protected $result = '';
    protected $data = [];

    abstract public function index(array $params);
    
    abstract public function read(int $id);

    abstract public function post(array $data);

    abstract public function put(int $id, array $data);

    abstract public function delete(int $id);

    public function success(string $result = "success", array $data = []) {
        $this->result = $result;
        $this->data = $data;

        return (string)$this;
    }

    public function fail(string $result = "fail") {
        $this->code = 0;
        $this->result = $result;
        return (string)$this;
    }

    public function __toString()
    {
        $this->setHttpHeaders('application/json', 200);
        return $this->encodeJson([
            'code' => $this->code,
            'result' => $this->result,
            'data' => $this->data
        ]);
    }
}