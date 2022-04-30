import request from '@/utils/request'
function upload(formData) {
    return request({
        url: '/image/upload',
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export {
    upload
}