import request from '@/utils/request'
function getList(params) {
    return request({
        url: '/notes',
        method: 'get',
        params: params
    })
}
function getDetail(id) {
    return request({
        url: '/notes/' + id,
        method: 'get',
    })
}
function create(data) {
    return request({
        url: '/notes',
        method: 'post',
        data: data,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
}
function update(id, data) {
    return request({
        url: '/notes/' + id,
        method: 'put',
        params: {
            id: id
        },
        data: data,
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
}
export {
    getList,
    getDetail,
    create,
    update
}