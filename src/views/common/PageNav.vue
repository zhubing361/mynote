<template>
    <div class="nav">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item
                :to="{ path: '/' }"
                v-show="show_home"
            >首页</el-breadcrumb-item>
            <el-breadcrumb-item
                :to="{ path: path }"
                v-if="path != ''"
            >{{ title }}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="path == ''">{{ title }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {
    name: 'PageNav',
    data() {
        return {};
    },
    props: {
        title: {
            type: String,
            default: '',
        },
        path: {
            type: String,
            default: '/',
        },
        show_home: {
            type: Boolean,
            default: true,
        },
    },
};
</script>

<style>
</style>