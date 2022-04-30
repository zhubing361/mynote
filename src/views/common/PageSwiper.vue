<template>
    <div v-show="show">
        <el-carousel
            :autoplay="autoplay"
            :height="height"
            :trigger="trigger"
        >
            <el-carousel-item
                v-for="item in banners"
                :key="item"
            >
                <img
                    class="carousel-item-image"
                    :src="item"
                    alt
                />
            </el-carousel-item>
        </el-carousel>
    </div>

</template>

<script>
export default {
    name: 'PageSwiper',
    components: {},
    data() {
        return {
            show: false,
        };
    },
    props: {
        banners: {
            type: Array,
            default: () => [],
        },
        autoplay: {
            type: Boolean,
            default: () => false,
        },
        height: {
            type: String,
            default: () => '',
        },
        trigger: {
            type: String,
            default: () => 'hover',
        },
    },
};
</script>


<style>
.carousel-item-image {
    width: 100%;
}
</style>