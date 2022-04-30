<?php
declare(strict_types=1);

namespace Timi\PhpCode;

interface RepositoryInterface
{
    public function paginate(array $params = [], int $page_size = 10, int $page = 1);
    public function find(array $where);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
}