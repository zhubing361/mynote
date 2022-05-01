<template>
    <van-button
        type="info"
        plain
        hairline
        round
        @click="backTop"
        icon="arrow-up"
        v-show="show_back_top"
        class="app-back-top"
    />
</template>

<script>
export default {
    name: 'AppBackTop',
    data() {
        return {
            show_back_top: false,
        };
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll, true);
    },
    methods: {
        backTop() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            this.show_back_top = false;
        },
        handleScroll() {
            let scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            if (scrollTop > 100) {
                this.show_back_top = true;
            } else {
                this.show_back_top = false;
            }
        },
    },
};
</script>

<style>
.app-back-top {
    position: fixed !important;
    right: 0.3rem !important;
    bottom: 0.3rem !important;
    z-index: 9999 !important;
    width: 2rem !important;
    height: 2rem !important;
}
</style>