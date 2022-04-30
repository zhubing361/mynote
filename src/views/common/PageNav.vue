<template>
    <div class="nav">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
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
    },
};
</script>

<style>
</style>