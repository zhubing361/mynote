# coding:utf8
from elasticsearch import Elasticsearch, helpers, exceptions

# 定义索引字段映射
body = {
    "settings": {
        "refresh_interval": "5s",
        "number_of_shards":   1,  # 主节点
        "number_of_replicas": 0  # 副本
    },

    'mappings': {
        "dynamic": "strict",
        "properties": {
            "note_id": {
                "type": "long"
            },
            "updated_at": {
                "type": "float"
            },
            "created_at": {
                "type": "float"
            },
            "title": {
                "type": "text",
                "search_analyzer": "ik_smart",
                "analyzer": "ik_max_word",
            },
            "content": {
                "type": "text",
                "search_analyzer": "ik_smart",
                "analyzer": "ik_max_word",
            }
        }
    }
}
es = Elasticsearch(
    hosts={'127.0.0.1:9200'},  # 地址
    timeout=600  # 超时时间
)

# 删除索引
try:
    es.indices.delete("flask_new")
except exceptions.NotFoundError as err:
    print(err)

# 创建索引
try:
    res = es.indices.create('flask_new', body=body)
    print(res)
except exceptions.RequestError as err:
    print(err)

# host_src = '127.0.0.1:9200'
# host_des = '127.0.0.1:9200'
# es_src = Elasticsearch(host_src, timeout=600)  # 原索引所在ES集群的host
# es_des = Elasticsearch(host_des, timeout=600)  # 新索引所在ES集群的host

# body = {"query": {"match_all": {}}, 'sort': {
#     'updated_at': {
#         'order': 'desc'
#     }
# }, }  # 遍历原索引

# chunk_size = 50
# res2 = helpers.reindex(client=es_src, source_index='flask', target_index='flask_new',
#                        target_client=es_des, query=body, chunk_size=chunk_size)  # 重建索引
# print(res2)
