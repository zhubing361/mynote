<template>
    <div
        id="topbanner"
        v-show="show"
    >
        <p>
            <a href="https://www.w3cschool.cn/vip?fcode=web_top_ad"><img
                    src="https://atts.w3cschool.cn/attachments/image/20220411/1649675492459783.png"
                    alt=""
                /></a>
        </p>
        <div class="close-topbox close_top_ad">
            <i class="i-icon i-icon-close i-icon-close-thin"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TopBanner',
    data() {
        return {
            show: false,
        };
    },
};
</script>

<style>
</style>