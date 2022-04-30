<?php
declare(strict_types=1);

namespace Timi\PhpCode;

class NotesRestHandler extends AbstractRest 
{

    protected $notes_rep = null;

    public function __construct()
    {
        if(empty($this->notes_rep)) {
            $this->notes_rep = new NotesRepository();
        }
    }

    public function index(array $params) {
        $where = [];
        if(!empty($params['keyword'])) {
            $where['keyword'] = $params['keyword'];
        }
        $page_size = (int)($params['page_size'] ?? 10);
        $page = (int)($params['page'] ?? 1);
        $data = $this->notes_rep->paginate($where, $page_size, $page);
        return $this->success('success', $data);
    }
    
    public function read(int $id) {
        $where = ['note_id' => $id];
        $data = $this->notes_rep->find($where);
        return $this->success('success', $data);
    }

    public function post(array $params) {
        $data = [
            'note_id' => generate_note_id(),
            'title' => $params['title'] ?? '',
            'content' => $params['content'] ?? '',
            'created_at' => generate_timestamp(),
            'updated_at' => generate_timestamp() // 1651025206.2322
        ];
        $old_data = $this->notes_rep->find(['note_id' => $data['note_id']]);
        if(!empty($old_data)) {
            return $this->fail('重复ID');
        }
        $this->notes_rep->create($data);
        return $this->success('success');
    }

    public function put(int $id, array $params) {
        $data = [
            'title' => $params['title'] ?? '',
            'content' => $params['content'] ?? '',
            'updated_at' => generate_timestamp() // 1651025206.2322
        ];
        $old_data = $this->notes_rep->find(['note_id' => $id]);
        if(empty($old_data)) {
            return $this->fail('数据不存在');
        }
        $data['created_at'] = $old_data['created_at'];
        $data['note_id'] = $id;
        $this->notes_rep->update($id, $data);
        return $this->success('success');
    }

    public function delete(int $id) {
        $this->notes_rep->delete($id);
        return $this->success('success');
    }
    
}