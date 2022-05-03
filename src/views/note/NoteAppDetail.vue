<template>
    <div class="app-container">
        <app-go-back :title="detail.title" />
        <van-tag
            type="primary"
            color="#ffe1e1"
            text-color="#ad0000"
            v-for="(tag, index) in detail.tags"
            :key="index"
        >{{tag}}</van-tag>
        <div
            ref="md"
            v-html="md"
            id="write"
        >
        </div>
        <app-back-top />
    </div>
</template>

<script>
import '@/assets/css/markdown.css';
import api from '@/api';
import { marked } from 'marked';
import hljs from 'highlight.js'; // 引入 highlight.js
import 'highlight.js/styles/atom-one-light.css'; // 引入高亮样式 这里我用的是atom-one-dark样式
import AppBackTop from '@/components/AppBackTop.vue';
import AppGoBack from '@/components/AppGoBack.vue';
export default {
    name: 'NoteAppDetail',
    data() {
        return {
            detail: {
                id: 0,
                title: '',
                content: '',
            },
            md: '',
            loading: false,
        };
    },
    components: {
        'app-back-top': AppBackTop,
        'app-go-back': AppGoBack,
    },
    created() {
        // 调用marked函数，传入markdown格式的内容，返回一段html
        this.detail.id = this.$route.params.id;
    },
    mounted() {
        var _self = this;
        this.loading = true;
        api.note.getDetail(_self.detail.id).then(res => {
            _self.loading = false;
            if (res.result == 'success') {
                _self.detail = res.data;
                this.parseMd();
            } else {
                this.$toast.error(res.result);
            }
        });
    },
    methods: {
        parseMd() {
            var rendererMD = new marked.Renderer();
            marked.setOptions({
                renderer: rendererMD,
                highlight: function (code) {
                    return hljs.highlightAuto(code).value;
                },
                pedantic: false,
                gfm: true,
                tables: true,
                breaks: false,
                sanitize: false,
                smartLists: true,
                smartypants: false,
                xhtml: false,
                langPrefix: 'hljs language-',
            });
            this.md = marked(this.detail.content);
        },
    },
};
</script>

<style>
.van-tag--primary {
    margin: 0.2rem !important;
    padding: 0.3rem !important;
}
</style>