<template>
    <div class="container">
        <top-banner />
        <header>
            <page-header />
        </header>

        <div class="page-swiper">
            <page-swiper :banners="images" />
        </div>
        <div class="container-wrap">
            <el-row :gutter="60">
                <el-col :span="20">
                    <el-card>
                        <div class="page-header">
                            <h2>首页</h2>
                            <div class="page-tools">
                                <ul>
                                    <li>
                                        <router-link to="/create.html">发布</router-link>
                                    </li>
                                </ul>
                            </div>
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
import PageRight from '@/views/common/PageRight.vue';
import PageSwiper from '@/views/common/PageSwiper.vue';
import NoteItem from '@/components/note/NoteItem.vue';
export default {
    name: 'NoteList',
    components: {
        'top-banner': TopBanner,
        'page-header': PageHeader,
        'page-footer': PageFooter,
        'page-right': PageRight,
        'page-swiper': PageSwiper,
        'note-item': NoteItem,
    },
    data() {
        return {
            items: [],
            pagination: {
                total: 0,
                currentPage: 1,
                perPage: 10,
                totalPage: 1,
            },
            images: [],
        };
    },

    created() {
        this.getList(this.$route.params.page);
    },
    mounted() {
        for (var i = 1; i <= 12; i++) {
            this.images.push(require('@/assets/images/test/' + i + '.jpg'));
        }
    },
    methods: {
        getList(page) {
            var _self = this;
            if (page == undefined) {
                if (this.pagination.currentPage) {
                    page = this.pagination.currentPage;
                } else {
                    page = 1;
                }
            }
            this.$route.params.page = page;
            api.note.getList({ page_size: 10, page: page }).then(res => {
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
.page-header {
    position: relative;
}
.page-tools {
    position: absolute;
    left: 60px;
    top: 15px;
}
</style>
