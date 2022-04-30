# php mongodb

## windows 环境

> https://pecl.php.net/package/mongodb/1.13.0/windows

## 安装扩展包

    composer require mongodb/mongodb

## 使用

eg: 
    public function __construct(string $table)
    {
        list($index, $doc_type) = explode('.', $table);
        $this->index = $index;
        $this->doc_type = $doc_type;

        if(!$this->mongo) {
            $this->mongo = new Client('mongodb://127.0.0.1:30001');
        }

        $this->connection = $this->mongo->{$this->index}->{$this->doc_type};
    }