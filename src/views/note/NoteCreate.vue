<template>
    <div class="container">
        <top-banner />
        <header>
            <page-header
                :search_show="false"
                :content="title"
            />
        </header>
        <div class="container-wrap">
            <el-row :gutter="60">
                <el-col :span="24">
                    <el-card>
                        <!-- <div class="page-header">
                            <h2>
                                <page-nav
                                    path=""
                                    :title="title"
                                />
                            </h2>
                        </div> -->

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
                                    label="标签"
                                    prop="tags"
                                >
                                    <note-tag
                                        :tags="form.tags"
                                        :updateTags="updateTags"
                                    />
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
                                    @click="submit()"
                                >提交</el-button>
                            </div>
                        </el-form-item>
                    </el-card>
                </el-col>
            </el-row>
        </div>
        <page-footer />
    </div>
</template>

<script>
import api from '@/api';
import TopBanner from '@/views/common/TopBanner.vue';
import PageHeader from '@/views/common/PageHeader.vue';
import PageFooter from '@/views/common/PageFooter.vue';
// import PageNav from '@/views/common/PageNav.vue';
import MarkdownEditor from '@/components/MarkdownEditor.vue';
import NoteTag from '@/components/note/NoteTag.vue';
export default {
    name: 'NoteCreate',
    components: {
        'top-banner': TopBanner,
        'page-header': PageHeader,
        'page-footer': PageFooter,
        // 'page-nav': PageNav,
        'markdown-editor': MarkdownEditor,
        'note-tag': NoteTag,
    },
    data() {
        return {
            title: '发布',
            form: {
                note_id: '',
                title: '',
                tags: '',
                content: '',
            },
            md: '',
        };
    },
    watch: {
        'form.content': function (val) {
            this.md = val;
        },
    },
    methods: {
        submit() {
            this.form.note_id = Date.now();
            console.log(this.form);
            api.note.create(this.form).then(res => {
                console.log(res);
                if (res.result == 'success') {
                    this.$utils.success(res.message);
                } else {
                    this.$utils.error(res.message);
                }
                this.$utils.goBack();
            });
        },
        updateContent(content) {
            this.form.content = content;
        },
    },
};
</script>

<style scoped>
/* .archive-content { */
/* display: flex; */
/* margin: 0 auto; */
/* } */

.page-btns {
    margin: 0 auto;
}
</style>