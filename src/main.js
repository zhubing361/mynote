import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/reset.css'
import '@/assets/css/main.css'
import '@/assets/css/iconfont/iconfont.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

import store from './store'

console.log(process.env)
if (process.env.VUE_APP_MOCK == 'true' && process.env.NODE_ENV === 'development') {
    require("@/mock")
}

const app = createApp(App)

// 注册全局方法
import utils from '@/utils/utils.js'
app.config.globalProperties.$utils = utils

app.use(ElementPlus, {
    locale: zhCn,
})
app.use(router)
app.use(store)
app.mount('#app')