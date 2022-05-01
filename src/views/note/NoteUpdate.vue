<template>
    <div class="container">
        <top-banner />
        <header>
            <page-header :search_show="false" />
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
                                    :show_home="false"
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
                                    placeholder="请输入标题"
                                    clearable
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
                                    type="danger"
                                    plain
                                    @click="confirmContent()"
                                >取消</el-button>
                                <el-button
                                    type="primary"
                                    plain
                                    @click="submit('button')"
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
import TopBanner from '@/views/common/TopBanner.vue';
import PageHeader from '@/views/common/PageHeader.vue';
import PageFooter from '@/views/common/PageFooter.vue';
import PageNav from '@/views/common/PageNav.vue';
import MarkdownFullPageEditor from '@/components/MarkdownFullPageEditor.vue';
import MarkdownEditor from '@/components/MarkdownEditor.vue';
import NoteTag from '@/components/note/NoteTag.vue';
export default {
    name: 'NoteUpdate',
    components: {
        'top-banner': TopBanner,
        'page-header': PageHeader,
        'page-footer': PageFooter,
        'page-nav': PageNav,
        'fullpage-editor': MarkdownFullPageEditor,
        'markdown-editor': MarkdownEditor,
        'note-tag': NoteTag,
    },
    data() {
        return {
            form: {
                note_id: '',
                title: '',
                tags: '',
                content: '',
            },
            old_content: '',
            md: '',
            content_saved: false,
        };
    },
    created() {
        // 调用marked函数，传入markdown格式的内容，返回一段html
        this.form.note_id = this.$route.params.id;
    },
    mounted() {
        var _self = this;
        api.note.getDetail(_self.form.note_id).then(res => {
            if (res.result == 'success') {
                _self.form = { ..._self.form, ...res.data };
                _self.md = res.data.content;
                _self.old_content = res.data.content;

                document.addEventListener('keydown', this.saveContent);

                this.timer = setInterval(() => {
                    this.submit('timer');
                }, 1800 * 1 * 1000); // 30分钟自动保存一次
            } else {
                return _self.$utils.error(res.message || '未找到相关记录');
            }
        });
    },
    beforeUnmount() {
        this.confirmContent();

        document.removeEventListener('keydown', this.saveContent);
        clearInterval(this.timer);
    },
    watch: {
        'form.content': function (val) {
            this.md = val;
        },
    },
    methods: {
        submit(type) {
            console.log('type', type);
            if (this.form.title.length <= 0) {
                return this.$utils.error('标题未填写');
            }
            api.note.update(this.form.note_id, this.form).then(res => {
                if (res.result == 'success') {
                    this.$utils.success(res.message);
                } else {
                    this.$utils.error(res.message);
                }
                if (type == 'button') {
                    this.$router.push({ path: '/' });
                }
            });
        },
        saveContent(e) {
            if (e != undefined) {
                var key = window.event.keyCode
                    ? window.event.keyCode
                    : window.event.which;
                if (key === 83 && e.ctrlKey) {
                    this.submit('ctrl+s');
                    e.preventDefault();
                }
            }
        },
        updateContent(content) {
            this.form.content = content;
        },
        confirmContent() {
            if (this.content_saved) {
                return false;
            }
            if (this.old_content != this.form.content) {
                this.$confirm(
                    '检测到未保存的内容，是否在离开页面前保存修改？',
                    '确认信息',
                    {
                        distinguishCancelAndClose: true,
                        confirmButtonText: '保存',
                        cancelButtonText: '放弃修改',
                    }
                )
                    .then(() => {
                        this.content_saved = true;
                        this.submit('unmount');
                        this.$router.push({ path: '/' });
                    })
                    .catch(action => {
                        if (action == 'cancel') {
                            this.content_saved = true;
                            // 放弃保存并离开页面
                            this.$router.push({ path: '/' });
                        } else {
                            // 停留在当前页面
                            this.$message({
                                type: 'info',
                                message: '已取消',
                            });
                        }
                    });
            } else {
                this.$router.push({ path: '/' });
            }
        },
        updateTags(new_tags) {
            console.log(new_tags);
            this.form.tags = new_tags;
            console.log(this.form.tags);
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