<?php
declare(strict_types=1);

namespace Timi\PhpCode\Repository;
use Timi\PhpCode\RepositoryInterface;
use MongoDB\Client;

class Mongo implements RepositoryInterface 
{
    protected $mongo = null;
    protected $index = '';
    protected $doc_type = '';
    protected $connection = null;
    protected $primay_key = 'id';

    public function __construct(string $table, string $primay_key = 'id')
    {
        list($index, $doc_type) = explode('.', $table);
        $this->index = $index;
        $this->doc_type = $doc_type;
        $this->primay_key = $primay_key;

        if(!$this->mongo) {
            $this->mongo = new Client('mongodb://127.0.0.1:30001');
        }

        $this->connection = $this->mongo->{$this->index}->{$this->doc_type};
    }

    public function paginate(array $params = [], int $page_size = 10, int $page = 1) {
        $where = [];
        if(!empty($params['keyword'])) {
            $where = ['title' => ['$regex' => "(.*){$params['keyword']}(.*)"]];
        }

        $data = $this->connection->find($where, [
            'limit' => $page_size,
            'skip' => ($page - 1) * $page_size,
            'sort' => ['created_at' => -1],
        ])->toArray();

        if(!empty($data)) {
            foreach($data as $key => $value) {
                unset($data[$key]['_id']);
                unset($data[$key]['content']);
            }
        }
        $count = $this->connection->count($where);

        return [
            'items' => $data,
            'pagination' => [
                'total' => $count,
                'currentPage' => $page,
                'perPage' => $page_size,
                'totalPage' => ceil($count/$page_size),
            ],
        ];
    }

    public function find(array $where) {
        // or 查询示例
        // $where_example = [
        //     '$or' => [
        //         ['title'=>'a'],
        //         ['title'=>'b']
        //     ]
        // ];
        $data = $this->connection->findOne($where);
        if($data) {
            unset($data['_id']);
            $data = (array)$data;
        } else {
            $data = [];
        }
        return $data;
    }

    public function create(array $data) {
        return $this->connection->insertOne($data);
    }
    public function update(int $id, array $data) {
        return $this->connection->findOneAndUpdate([$this->primay_key=>$id], ['$set' => $data]);
    }
    public function delete(int $id) {
        return $this->connection->findOneAndDelete([$this->primay_key=>$id]);
    }
}