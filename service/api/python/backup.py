# coding:utf8
"""
数据备份
"""
from pymongo import MongoClient
from pymongo.database import Database, Collection
import pymongo
MONGO_PORT = 30001
client = MongoClient(
    host='127.0.0.1',
    port=MONGO_PORT,
    document_class=dict,
    tz_aware=False,
    connect=True
)
db = Collection(Database(client, 'flask'), 'notes')
notes = db.find()

for note in notes:
    file_path = "../../../docs/backup/" + str(note['title']) + ".md"
    with open(file_path, mode='w+', encoding='utf-8') as file_obj:
        content = file_obj.read()
        if(content != note['content']):
            file_obj.write(note['content'])
