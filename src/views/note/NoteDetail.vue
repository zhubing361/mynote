<template>
    <div
        class="container"
        v-loading="loading"
    >
        <top-banner />
        <header>
            <page-header :search_show="false" />
        </header>
        <div class="container-wrap">
            <el-row :gutter="60">
                <el-col :span="20">
                    <el-card>
                        <div class="page-header">
                            <h2>
                                <page-nav
                                    path=""
                                    :title="detail.title"
                                />
                            </h2>
                        </div>
                        <div
                            class="archive-time"
                            title="创建于:{{detail.created_at}}"
                        >
                            {{ detail.created_at }} 更新
                        </div>
                        <div class="page-content">
                            <div class="archive-content">
                                <markdown-editor
                                    :md="md"
                                    :previewOnly="true"
                                />
                            </div>
                        </div>
                    </el-card>
                </el-col>
                <el-col :span="4">
                    <page-right />
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
import MarkdownEditor from '@/components/MarkdownEditor.vue';
export default {
    name: 'NoteDetail',
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
        'top-banner': TopBanner,
        'page-header': PageHeader,
        'page-footer': PageFooter,
        'page-nav': PageNav,
        'markdown-editor': MarkdownEditor,
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
                _self.md = res.data.content;
            } else {
                _self.$utils.error(res.message);
            }
        });
    },
    watch: {
        'detail.content': function (val) {
            this.md = val;
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
.archive-time {
    margin-top: 2px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #707070;
}
.archive-content {
    padding: 30px;
}
</style>
