<?php
declare(strict_types=1);

namespace Timi\PhpCode;

class BaseRepository
{
    private $_adaptee;

    public function __construct(RepositoryInterface $adaptee) {
        $this->_adaptee = $adaptee;
    }

    public function __call($method, $args)
    {
        return $this->_adaptee->$method(...$args);
    }
}