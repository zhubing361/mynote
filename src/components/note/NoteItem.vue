<template>
    <div
        class="archive-list"
        v-show="items.length > 0"
    >
        <ul>
            <li
                v-for="(note, index) in items"
                :key="note.id"
            >
                <div class="archive-item">
                    <h4>
                        <router-link :to="'/' + note.note_id">{{getItemNumber(index)}}、
                            <div
                                class="title"
                                v-html="note.title"
                            ></div>
                        </router-link>
                    </h4>
                    <span class="datatime">{{ note.updated_at }}</span>
                    <span>
                        <router-link :to="'/' + note.note_id + '/update.html'">修改</router-link>
                    </span>
                </div>
            </li>
        </ul>
    </div>
    <el-pagination
        :hide-on-single-page="true"
        background
        layout="sizes, prev, pager, next, jumper, ->, total"
        :total="pagination.total"
        :page-size="pagination.perPage"
        :current-page="pagination.curentPage"
        @size-change="pageSize"
        @current-change="getList"
        @prev-click="getList"
        @next-click="getList"
    />
</template>

<script>
export default {
    name: 'NoteItem',
    props: {
        getList: {
            type: Function,
            default: null,
        },
        items: {
            type: Array,
            default: () => {
                return [];
            },
        },
        pagination: {
            type: Object,
            default: () => {
                return {
                    total: 0,
                    currentPage: 1,
                    perPage: 10,
                    totalPage: 1,
                };
            },
        },
    },
    methods: {
        getItemNumber(index) {
            return (
                (this.pagination.currentPage - 1) * this.pagination.perPage +
                index +
                1
            );
        },
    },
};
</script>

<style scoped>
.archive-list li {
    height: 30px;
    line-height: 30px;
    padding: 10px 0;
    border-bottom: 1px dashed #ddd;
}
.archive-item {
    display: flex;
    justify-content: space-between;
}
.archive-list li h4 {
    flex: 1;
    display: inline-block;
    font-weight: 500;
    font-size: 14px;
}
.archive-list .title {
    display: inline;
}
.archive-list .datatime {
    padding-right: 5px;
    font-size: 13px;
    color: #666;
}
</style>