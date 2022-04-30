<template>
    <div class="container">
        <top-banner />
        <header>
            <page-header />
        </header>
        <div class="container-wrap">
            <el-row :gutter="60">
                <el-col :span="24">
                    <el-card>
                        <div class="page-header">
                            <h2>
                                <page-nav
                                    path=""
                                    :title="form.title"
                                />
                            </h2>
                        </div>
                        <div class="page-content">
                            <el-form
                                ref="form"
                                :model="form"
                                label-width="120px"
                            >
                                <el-form-item
                                    label="标题"
                                    prop="title"
                                >
                                    <el-input v-model="form.title" />
                                </el-form-item>
                                <el-form-item
                                    label="内容"
                                    prop="content"
                                >
                                    <div class="archive-content">
                                        <div>
                                            <el-input
                                                ref="editor"
                                                type="textarea"
                                                v-model="form.content"
                                                autosize
                                                @scroll="updateScroll"
                                                class="md-editor"
                                            />
                                        </div>

                                        <div>
                                            <div
                                                ref="preview"
                                                v-html="md"
                                                class="md-preview"
                                            ></div>
                                        </div>

                                    </div>
                                </el-form-item>
                            </el-form>
                        </div>

                        <el-form-item>
                            <div class="page-btns">
                                <el-button
                                    type="warning"
                                    plain
                                    @click="showFullpageEditor"
                                >全屏
                                </el-button>
                                <el-button
                                    type="primary"
                                    plain
                                    @click="submit()"
                                >提交</el-button>
                            </div>
                        </el-form-item>

                        <fullpage-editor
                            ref="fullpageEditor"
                            :md="form.content"
                            :updateContent="updateContent"
                        />
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <page-footer />
    </div>
</template>

<script>
import api from '@/api';
const { marked } = require('marked');
import hljs from 'highlight.js'; // 引入 highlight.js
import 'highlight.js/styles/vs.css'; // 引入高亮样式 这里我用的是vs样式
import { ElMessage } from 'element-plus';
import TopBanner from '@/views/common/TopBanner.vue';
import PageHeader from '@/views/common/PageHeader.vue';
import PageFooter from '@/views/common/PageFooter.vue';
import PageNav from '@/views/common/PageNav.vue';
import MarkdownFullPageEditor from '@/components/MarkdownFullPageEditor.vue';
export default {
    name: 'NoteUpdate',
    components: {
        'top-banner': TopBanner,
        'page-header': PageHeader,
        'page-footer': PageFooter,
        'page-nav': PageNav,
        'fullpage-editor': MarkdownFullPageEditor,
    },
    data() {
        return {
            form: {
                note_id: '',
                title: '',
                content: '',
            },
            md: '',
            scroll_y: 0, //实时获取当前y轴的高度
        };
    },
    created() {
        // 调用marked函数，传入markdown格式的内容，返回一段html
        this.form.note_id = this.$route.params.id;
    },
    mounted() {
        var _self = this;
        api.note.getDetail(_self.form.note_id).then(res => {
            _self.form = res.data;
            // _self.md = marked(res.data.content);
        });
    },
    watch: {
        'form.content': function (val) {
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
            this.md = marked(val);
        },
        scroll_y: function (val) {
            // console.log(val);
            this.$nextTick(() => {
                this.$refs.editor.scrollTop = val;
                this.$refs.preview.scrollTop = val;
            });
        },
    },
    methods: {
        submit() {
            console.log(this.form);
            api.note.update(this.form.note_id, this.form).then(res => {
                console.log(res);
                ElMessage({
                    message: res.message,
                    type: res.result == 'success' ? 'success' : 'error',
                    duration: 5 * 1000,
                });
            });
        },
        updateScroll(event) {
            this.scroll_y = event.target.scrollTop;
        },
        showFullpageEditor() {
            this.$refs.fullpageEditor.drawer = true;
            this.$refs.fullpageEditor.content = this.form.content;
        },
        updateContent(content) {
            this.form.content = content;
        },
    },
};
</script>

<style scoped>
.archive-content {
    display: flex;
    margin: 0 auto;
}

.page-btns {
    margin: 0 auto;
}

.md-editor {
    border-top: 0;
}

.md-editor-tools {
    border: 1px solid #eee;
    border-right: none;
    text-align: right;
}

.md-preview-tools {
    border: 1px solid #eee;
    border-left: none;
}

.md-preview {
    height: 558px;
    width: 600px;
    min-height: 558px;
    max-height: 558px;
    min-width: 600px;
    max-width: 600px;
    word-wrap: break-word;
    border: 1px solid #eee;
    border-radius: 2px;
    padding: 10px;
    overflow-y: scroll;
    overflow-x: scroll;
}

.md-preview::-webkit-scrollbar {
    display: none;
}

.archive-content textarea {
    height: 581px;
    width: 570px;
    min-height: 581px !important;
    max-height: 581px;
    min-width: 570px;
    max-width: 570px;
    word-wrap: break-word;
    resize: none;
    /* background-color: #23241f;
    color: #f8f8f2; */
}
</style>