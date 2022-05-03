<template>
    <div v-show="show">
        <el-row :gutter="60">
            <el-col :span="24">
                <el-card>
                    <el-page-header
                        @back="goBack"
                        :title="title"
                        :content="content"
                    >
                    </el-page-header>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'PageHeader',
    data() {
        return {
            nav_show: false,
            user_show: false,
            app_show: true,
            show: true,
            keyword: '',
        };
    },
    props: {
        search_show: {
            type: Boolean,
            default: true,
        },
        title: {
            type: String,
            default: '',
        },
        content: {
            type: String,
            default: '',
        },
        goBack: {
            type: Function,
            default: () => {
                history.back();
            },
        },
    },
    mounted() {
        this.keyword = this.$parent.keyword;
    },
    methods: {
        getList() {
            if (this.keyword == undefined || this.keyword.length <= 0) {
                this.keyword = this.$route.query.keyword;
            }
            if (this.$route.path != '/search.html') {
                this.$router.push({
                    path: '/search.html',
                    query: { keyword: this.keyword },
                });
            } else {
                this.$parent.keyword = this.keyword;
                this.$parent.getList(1);
            }
        },
    },
};
</script>

<style>
</style>