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
                                        <markdown-editor
                                            :md="md"
                                            :updateContent="updateContent"
                                        />
                                    </div>
                                </el-form-item>
                            </el-form>
                        </div>

                        <el-form-item>
                            <div class="page-btns">
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
import { ElMessage } from 'element-plus';
import TopBanner from '@/views/common/TopBanner.vue';
import PageHeader from '@/views/common/PageHeader.vue';
import PageFooter from '@/views/common/PageFooter.vue';
import PageNav from '@/views/common/PageNav.vue';
import MarkdownFullPageEditor from '@/components/MarkdownFullPageEditor.vue';
import MarkdownEditor from '@/components/MarkdownEditor.vue';
export default {
    name: 'NoteUpdate',
    components: {
        'top-banner': TopBanner,
        'page-header': PageHeader,
        'page-footer': PageFooter,
        'page-nav': PageNav,
        'fullpage-editor': MarkdownFullPageEditor,
        'markdown-editor': MarkdownEditor,
    },
    data() {
        return {
            form: {
                note_id: '',
                title: '',
                content: '',
            },
            md: '',
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
            _self.md = res.data.content;
        });
    },
    watch: {
        'form.content': function (val) {
            this.md = val;
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
                this.$router.push({ path: '/' });
            });
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
</style>