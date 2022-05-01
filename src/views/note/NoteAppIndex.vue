<template>
    <div>
        <app-go-back :title="title" />
        <van-search
            v-model="keyword"
            :show-action="false"
            placeholder="请输入搜索关键词"
            @search="getList"
        >
            <!-- <template #action>
                <div @click="getList">搜索</div>
            </template> -->
        </van-search>
        <van-pull-refresh
            v-model="refreshing"
            @refresh="refresh"
        >
            <van-list
                v-model:loading="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="getList"
            >
                <van-cell
                    v-for="(item, index) in items"
                    :key="item.note_id"
                    :offset="100"
                    is-link
                    :to="'/app/' + item.note_id"
                >
                    <template #title>
                        <div>
                            <span>{{index+1}}、</span>
                            <span v-html="item.title"></span>
                        </div>
                        <div class="time-field">
                            <span>{{item.updated_at}}</span><span>更新</span>
                        </div>
                    </template>
                    <template #extra>

                    </template>
                </van-cell>
            </van-list>
        </van-pull-refresh>

        <app-back-top />
    </div>
</template>

<script>
import api from '@/api';
import AppBackTop from '@/components/AppBackTop.vue';
import AppGoBack from '@/components/AppGoBack.vue';
export default {
    name: 'NoteAppIndex',
    data() {
        return {
            title: '首页',
            loading: false,
            refreshing: false,
            finished: false,
            items: [],
            pagination: {
                total: 0,
                currentPage: 0,
                perPage: 10,
                totalPage: 1,
            },
            keyword: '',
        };
    },
    components: {
        'app-back-top': AppBackTop,
        'app-go-back': AppGoBack,
    },
    mounted() {
        this.getList();
    },
    watch: {
        keyword: function (val) {
            console.log(val);
            this.search();
        },
    },
    methods: {
        refresh() {
            if (this.refreshing) {
                this.refreshing = false;
            }
            this.items = [];
            this.pagination.currentPage = 0;
            this.getList();
        },
        search() {
            this.items = [];
            this.pagination.currentPage = 0;
            this.finished = false;
            this.getList();
        },
        getList() {
            var _self = this;
            if (_self.finished) {
                return false;
            }
            _self.loading = true;
            api.note
                .getList({
                    page_size: _self.pagination.perPage,
                    page: _self.pagination.currentPage + 1,
                    keyword: _self.keyword,
                })
                .then(res => {
                    _self.loading = false;
                    if (res.result == 'success') {
                        _self.items.push(...res.data.items);
                        _self.pagination = res.data.pagination;
                        if (
                            _self.pagination.currentPage >=
                            _self.pagination.totalPage
                        ) {
                            _self.finished = true;
                        } else {
                            _self.finished = false;
                        }
                    } else {
                        _self.$toast.error(res.result);
                    }
                });
        },
        getItemNumber(index, title) {
            let order_num =
                (this.pagination.currentPage - 1) * this.pagination.perPage +
                index +
                1;
            return order_num + '、' + title;
        },
    },
};
</script>

<style>
.time-field {
    text-align: right;
    font-size: smaller;
    color: #999;
}
</style>