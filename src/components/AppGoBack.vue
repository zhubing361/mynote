<template>
    <div>
        <van-nav-bar
            :title="title"
            left-text="返回"
            left-arrow
            @click-left="goBack"
        />
    </div>
</template>

<script>
export default {
    name: 'AppGoBack',
    data() {
        return {};
    },
    props: {
        title: {
            type: String,
            default: '',
        },
    },
    methods: {
        goBack() {
            history.back();
        },
    },
};
</script>

<style>
</style>