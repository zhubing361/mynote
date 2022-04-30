<?php
declare(strict_types=1);

namespace Timi\PhpCode;

use Timi\PhpCode\Repository\Mongo;

class NotesRepository extends BaseRepository
{
    protected $primary_key = 'note_id';

    public function __construct() {
        $adaptee = new Mongo('flask.notes', 'note_id');
        parent::__construct($adaptee);
    }
}