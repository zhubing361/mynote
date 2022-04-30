# coding:utf8
from pymongo import MongoClient
from pymongo.database import Database, Collection
import pymongo

from datetime import datetime

import time
print(datetime.today().timestamp())

print("now time:", time.time())

print("pymongo version:", pymongo.version)

MONGO_PORT = 40001
client = MongoClient(
    host='127.0.0.1',
    port=MONGO_PORT,
    document_class=dict,
    tz_aware=False,
    connect=True,
    replicaset='dev_repl_set'
)
db = Collection(Database(client, 'flask'), 'notes')
notes = db.find({'note_id': 27}).limit(1)
# notes = client.flask.notes.find({'note_id': 27}).limit(1)
note_list = []
for note in notes:
    note.pop('_id')
    note_list.append(note)
print(note_list)
