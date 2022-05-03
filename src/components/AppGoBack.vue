<template>
    <div>
        <van-nav-bar
            :title="title"
            :left-text="leftText"
            :left-arrow="leftArrow"
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
        leftArrow: {
            type: Boolean,
            default: true,
        },
        leftText: {
            type: String,
            default: '返回',
        },
        title: {
            type: String,
            default: '',
        },
    },
};
</script>

<style>
</style>