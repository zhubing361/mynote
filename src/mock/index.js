const Mock = require('mockjs');
const mockFiles = require.context('./modules', false, /\.js$/);
let mocks = [];

mockFiles.keys().forEach(key => {
    mocks.push(...mockFiles(key))
})
mocks.forEach(item => {
    Mock.mock(RegExp(item.url + '.*'), item.type, (options) => {
        console.debug(item.url, ':', options)
        return Mock.mock(item.response)
    })
})