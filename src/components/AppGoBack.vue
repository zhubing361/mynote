<template>
    <div>
        <van-nav-bar
            :title="title"
            left-text="返回"
            left-arrow
            @click-left="this.$utils.goBack();"
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
};
</script>

<style>
</style>