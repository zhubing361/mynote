// pc
import NoteList from '@/views/note/NoteList.vue'
import NoteSearch from '@/views/note/NoteSearch.vue'
import NoteDetail from '@/views/note/NoteDetail.vue'
import NoteCreate from '@/views/note/NoteCreate.vue'
import NoteUpdate from '@/views/note/NoteUpdate.vue'
import PagesAbout from '@/views/pages/PagesAbout.vue'
import IntroductionIndex from '@/views/introduction/IntroductionIndex.vue'
import AdvancedIndex from '@/views/advanced/AdvancedIndex.vue'
import BestPracticesIndex from '@/views/bestPractices/BestPracticesIndex.vue'
import ExamsIndex from '@/views/exams/ExamsIndex.vue'
import ManualIndex from '@/views/manual/ManualIndex.vue'
import WebtoolsIndex from '@/views/webtools/WebtoolsIndex.vue'
import VipIndex from '@/views/vip/VipIndex.vue'
import TodosIndex from '@/views/todos/TodosIndex.vue'
import PagesSitemap from '@/views/pages/PagesSitemap.vue'
import MarkdownEditor from '@/components/MarkdownEditor.vue'
// import ErrorPage404 from '@/views/error-page/ErrorPage404.vue'

// app
import NoteAppIndex from '@/views/note/NoteAppIndex.vue'
import NoteAppDetail from '@/views/note/NoteAppDetail.vue'

// createWebHashHistory createWebHistory
import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
    { name: 'note-list', path: '/', component: NoteList },
    { name: 'note-search', path: '/search.html', component: NoteSearch },
    { name: 'note-detail', path: '/:id', component: NoteDetail },
    { name: 'note-create', path: '/create.html', component: NoteCreate },
    { name: 'note-update', path: '/:id/update.html', component: NoteUpdate },
    { name: 'introduction', path: '/introduction.html', component: IntroductionIndex },
    { name: 'advanced', path: '/advanced.html', component: AdvancedIndex },
    { name: 'bestPractices', path: '/bestPractices.html', component: BestPracticesIndex },
    { name: 'exams', path: '/exams.html', component: ExamsIndex },
    { name: 'manual', path: '/manual.html', component: ManualIndex },
    { name: 'webtools', path: '/webtools.html', component: WebtoolsIndex },
    { name: 'vip', path: '/vip.html', component: VipIndex },
    { name: 'about', path: '/about.html', component: PagesAbout },
    { name: 'todos', path: '/todos.html', component: TodosIndex },
    { name: 'sitemap', path: '/sitemap.html', component: PagesSitemap },
    { name: 'markdown', path: '/markdown.html', component: MarkdownEditor },

    { name: 'app-note-list', path: '/app', component: NoteAppIndex },
    { name: 'app-note-detail', path: '/app/:id', component: NoteAppDetail },
]



const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    // history: createWebHistory(process.env.BASE_URL),
    routes, // `routes: routes` 的缩写
})

// 注册全局前置守卫
router.beforeEach((to, from) => {
    console.log(to)
    console.log(from)
    return true // 返回 false 以取消导航
})

export default router