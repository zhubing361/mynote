<template>
    <div
        id="header_item"
        class="header-with-search"
        v-show="show"
    >
        <div id="header_index">
            <div
                id="header-l"
                v-show="nav_show"
            >
                <router-link
                    to="/"
                    class="logo"
                ><img
                        src="//7n.w3cschool.cn/statics/images/logonew2.png"
                        alt="logo"
                    /></router-link>

                <ul class="header-menu">
                    <li>
                        <a
                            href="//www.w3cschool.cn/tutorial"
                            title="编程入门教程"
                        >编程入门教程</a>
                    </li>
                    <li>
                        <a
                            href="//www.w3cschool.cn/courses/"
                            title="编程课程"
                        >编程课程</a>
                    </li>
                    <li>
                        <a
                            href="//www.w3cschool.cn/codecamp/"
                            title="编程实战"
                        >编程实战</a>
                    </li>
                    <li>
                        <a
                            href="//www.w3cschool.cn/exam/"
                            title="编程题库"
                        >编程题库</a>
                    </li>
                    <li>
                        <a
                            href="//123.w3cschool.cn/webtools"
                            target="_blank"
                            title="w3cschool在线工具集合"
                        >在线工具</a>
                    </li>
                    <li>
                        <a
                            href="//www.w3cschool.cn/vip?fcode=headermenu"
                            title="VIP会员"
                            class="header-menu-vip"
                        >VIP会员<i class="hot-icon"> 4.23</i></a>
                    </li>
                </ul>
            </div>

            <div class="fr h-right">
                <div
                    class="fl mobile"
                    v-show="nav_show"
                >
                    <a
                        class="link"
                        href="//www.w3cschool.cn/download"
                        target="_blank"
                        title="App下载"
                    >
                        <i class="i-icon i-icon-mobile"></i>App下载
                    </a>
                    <div class="dropdown">
                        <div class="dropdown-inner">
                            <div class="text-center dropdown-content">
                                <div class="qrcode">
                                    <img
                                        src="//7n.w3cschool.cn/statics/images/w3c/app-qrcode2.png"
                                        alt="APP二维码"
                                        width="150"
                                        height="150"
                                    />
                                    <p>扫码下载编程狮APP</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="fl sig-box">
                    <div>
                        <a
                            class="link"
                            href="//www.w3cschool.cn/register?refer=/css/list"
                            v-show="user_show"
                        >注册</a><span class="sep">|</span><a
                            class="link"
                            href="//www.w3cschool.cn/login?refer=/css/list"
                            v-show="user_show"
                        >登录</a>
                        <router-link
                            to="/app"
                            v-show="app_show"
                        >h5</router-link>
                    </div>
                </div>
            </div>

            <div
                class="fr searchbox"
                v-show="search_show"
            >
                <form target="_self">
                    <el-input
                        type="text"
                        v-model="keyword"
                        class="box"
                        placeholder="输入关键字搜索..."
                    >
                    </el-input>
                    <button
                        type="button"
                        class="button"
                        @click="getList"
                    ></button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageHeader',
    data() {
        return {
            nav_show: false,
            user_show: false,
            app_show: true,
            show: true,
            keyword: '',
        };
    },
    props: {
        search_show: {
            type: Boolean,
            default: true,
        },
    },
    mounted() {
        this.keyword = this.$parent.keyword;
    },
    methods: {
        getList() {
            if (this.keyword == undefined || this.keyword.length <= 0) {
                this.keyword = this.$route.query.keyword;
            }
            if (this.$route.path != '/search.html') {
                this.$router.push({
                    path: '/search.html',
                    query: { keyword: this.keyword },
                });
            } else {
                this.$parent.keyword = this.keyword;
                this.$parent.getList(1);
            }
        },
    },
};
</script>

<style>
</style>