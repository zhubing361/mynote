<template>
    <div class="container">
        <top-banner />
        <header>
            <page-header ref="pageHeader" />
        </header>

        <div class="page-swiper">
            <page-swiper :banners="images" />
        </div>
        <div class="container-wrap">
            <el-row :gutter="60">
                <el-col :span="20">
                    <el-card>
                        <div class="page-header">
                            <h2>
                                <page-nav
                                    path=""
                                    :title="title"
                                />
                            </h2>
                        </div>
                        <div class="page-content">
                            <note-item
                                :items="items"
                                :pagination="pagination"
                                :getList="getList"
                            />
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
import PageSwiper from '@/views/common/PageSwiper.vue';
import PageRight from '@/views/common/PageRight.vue';
import PageNav from '@/views/common/PageNav.vue';
import NoteItem from '@/components/note/NoteItem.vue';
// import { ElMessage } from 'element-plus';
export default {
    name: 'NoteSearch',
    components: {
        'top-banner': TopBanner,
        'page-header': PageHeader,
        'page-footer': PageFooter,
        'page-swiper': PageSwiper,
        'page-right': PageRight,
        'page-nav': PageNav,
        'note-item': NoteItem,
    },
    data() {
        return {
            title: '搜索列表',
            items: [],
            pagination: {
                total: 0,
                currentPage: 1,
                perPage: 10,
                totalPage: 1,
            },
            images: [],
            keyword: '',
        };
    },
    created() {
        this.keyword = this.$route.query.keyword;
    },
    mounted() {
        for (var i = 1; i <= 12; i++) {
            this.images.push(require('@/assets/images/test/' + i + '.jpg'));
        }
        this.getList(this.$route.params.page);
    },
    methods: {
        getList(page) {
            var _self = this;
            if (page == undefined) {
                page = 1;
            } else {
                _self.pagination.currentPage = page;
            }

            var keyword = _self.keyword;
            if (keyword == undefined || keyword.length <= 0) {
                keyword = '';
                _self.$refs.pageHeader.keyword = keyword;
            }
            _self.$route.query.keyword = ''; // 从其他页面跳转过来搜索参数只用一次

            api.note
                .getList({
                    page_size: _self.pagination.perPage,
                    page: page,
                    keyword: keyword,
                })
                .then(res => {
                    _self.items = res.data.items;
                    _self.pagination = res.data.pagination;
                });
        },
        pageSize(page_size) {
            this.pagination.perPage = page_size;
            this.getList(this.pagination.currentPage);
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
