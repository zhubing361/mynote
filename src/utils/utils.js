import { ElMessage } from 'element-plus';

const success = (message, time) => {
    return ElMessage({
        message: message || '未获取到相关记录',
        type: 'success',
        duration: time || 5 * 1000,
    });
}

const error = (message, time) => {
    return ElMessage({
        message: message || '未获取到相关记录',
        type: 'error',
        duration: time || 5 * 1000,
    });
}
export default {
    success,
    error
}