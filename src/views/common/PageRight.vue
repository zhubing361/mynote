<template>
    <div v-show="show">
        <el-row>
            <el-col>
                <el-card>
                    <template #header>
                        <span>快速发布</span>
                    </template>
                    <div>
                        <el-card>
                            <el-form
                                ref="form"
                                :model="form"
                                label-width="80px"
                            >
                                <el-form-item label="标题">
                                    <el-input v-model="form.title"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <div class="page-btns">
                                        <el-button
                                            type="primary"
                                            @click="submit()"
                                            :disabled="form.title.length <= 0"
                                        >提交</el-button>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </el-card>
                    </div>
                </el-card>
                <div v-show="!tags_show">
                    <el-card>
                        <template #header>
                            <span>走马灯实例</span>
                        </template>
                        <div>
                            <el-carousel
                                :interval="4000"
                                type="card"
                                height="50px"
                            >
                                <el-carousel-item
                                    v-for="item in 6"
                                    :key="item"
                                >
                                    <h3 class="medium">{{ item }}</h3>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </el-card>

                    <el-divider></el-divider>
                </div>

                <!-- <el-card>
                    <template #header>
                        <span>标签云</span>
                    </template>
                    <div>
                        <el-tag
                            v-for="item in items"
                            :key="item.label"
                            :type="item.type"
                            effect="dark"
                            @click="filterByTag"
                        >
                            {{ item.label }}
                        </el-tag>
                    </div>
                </el-card>
                <el-divider></el-divider> -->

                <div v-show="tags_show">
                    <el-card>
                        <template #header>
                            <span>标签云</span>
                        </template>
                        <div>
                            <el-card>
                                <tags-cloud :filterByTag="filterByTag" />
                            </el-card>
                        </div>
                    </el-card>
                    <el-divider></el-divider>
                </div>

                <el-card>
                    <template #header>
                        <span>常用工具</span>
                    </template>
                    <div>
                        <el-card>
                            <el-tag
                                v-for="item in items"
                                :key="item.label"
                                :type="item.type"
                                effect="dark"
                            >
                                {{ item.label }}
                            </el-tag>
                        </el-card>

                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import api from '@/api';
import TagsCloud from '@/components/TagsCloud.vue';
export default {
    name: 'PageRight',
    components: {
        'tags-cloud': TagsCloud,
    },
    data() {
        return {
            show: true,
            items: [
                { type: '', label: '标签一' },
                { type: 'success', label: '标签二' },
                { type: 'info', label: '标签三' },
                { type: 'danger', label: '标签四' },
                { type: 'warning', label: '标签五' },
            ],
            form: {
                note_id: '',
                title: '',
                content: '',
            },
        };
    },
    props: {
        filterByTag: {
            type: Function,
            default: tag => {
                console.log(tag);
            },
        },
        tags_show: {
            type: Boolean,
            default: false,
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
                window.location.reload();
            });
        },
    },
};
</script>

<style scoped>
</style>