<template>
    <div
        class="container"
        v-loading="loading"
    >
        <top-banner />
        <header>
            <page-header
                ref="pageHeader"
                content="搜索列表"
            />
        </header>

        <div class="page-swiper">
            <page-swiper :banners="images" />
        </div>
        <div class="container-wrap">
            <el-row :gutter="60">
                <el-col :span="18">
                    <el-card>
                        <div class="page-header">
                            <!-- <h2>
                                <page-nav
                                    path=""
                                    :title="title"
                                />
                            </h2> -->
                            <el-card>
                                <el-input
                                    type="text"
                                    v-model="keyword"
                                    placeholder="请输入关键词"
                                    clearable
                                    :show-word-limit="true"
                                    maxlength="20"
                                    @change="getList"
                                    @clear="getList"
                                >
                                    <template #append>
                                        <el-button
                                            type="primary"
                                            plain
                                            @click="getList"
                                            :disabled="keyword == undefined ||  keyword.length <= 0"
                                        >搜索</el-button>
                                    </template>
                                </el-input>

                            </el-card>
                        </div>
                        <div class="page-content">
                            <el-card>
                                <note-item
                                    :items="items"
                                    :pagination="pagination"
                                    :getList="getList"
                                    :pageSize="pageSize"
                                />
                            </el-card>
                        </div>

                        <el-empty
                            :image-size="200"
                            v-show="items.length <= 0"
                        ></el-empty>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <page-right
                        :filterByTag="filterByTag"
                        :tags_show="true"
                    />
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
// import PageNav from '@/views/common/PageNav.vue';
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
        // 'page-nav': PageNav,
        'note-item': NoteItem,
    },
    data() {
        return {
            title: '搜索列表',
            items: [],
            pagination: {
                total: 0,
                currentPage: 1,
                perPage: 20,
                totalPage: 1,
            },
            images: [],
            keyword: '',
            loading: false,
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
            page = parseInt(page) || 0;
            var _self = this;
            if (page == undefined || page <= 0) {
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

            this.loading = true;
            api.note
                .getList({
                    page_size: _self.pagination.perPage,
                    page: page,
                    keyword: keyword,
                })
                .then(res => {
                    this.loading = false;
                    if (res.result == 'success') {
                        _self.items = res.data.items;
                        _self.pagination = res.data.pagination;
                    } else {
                        _self.$utils.error();
                    }
                });
        },
        pageSize(page_size) {
            this.pagination.perPage = page_size;
            this.getList(this.pagination.currentPage);
        },
        filterByTag(tag_name) {
            this.keyword = tag_name;
            this.$refs.pageHeader.keyword = tag_name;
            this.getList();
        },
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
