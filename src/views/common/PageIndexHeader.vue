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
                        :src="logo_image"
                        alt="logo"
                    />
                    <h1 style="display:none;">我的笔记</h1>
                </router-link>

                <ul class="header-menu">
                    <li>
                        <router-link
                            to="/introduction.html"
                            title="编程入门"
                        >编程入门</router-link>
                    </li>
                    <li>
                        <router-link
                            to="/advanced.html"
                            title="编程进阶"
                        >编程进阶</router-link>
                    </li>
                    <li>
                        <router-link
                            to="/bestPractices.html"
                            title="编程实战"
                        >编程实战</router-link>
                    </li>
                    <li>
                        <router-link
                            to="/exams.html"
                            title="编程题库"
                        >编程题库</router-link>
                    </li>
                    <li>
                        <router-link
                            to="/manual.html"
                            title="编程手册"
                        >编程手册</router-link>
                    </li>
                    <li>
                        <router-link
                            to="/webtools.html"
                            title="在线工具"
                        >在线工具</router-link>
                    </li>
                    <li>
                        <router-link
                            to="/vip.html"
                            title="VIP会员"
                            class="header-menu-vip"
                        >VIP会员<i class="hot-icon"> 4.23</i></router-link>
                    </li>
                    <li>
                        <router-link
                            to="/about.html"
                            title="我的笔记"
                        >我的笔记</router-link>
                    </li>
                    <li>
                        <router-link
                            to="/todos.html"
                            title="待办事项"
                        >待办事项</router-link>
                    </li>
                </ul>
            </div>

            <div class="fr h-right">
                <div
                    class="fl mobile"
                    v-show="app_show"
                >
                    <router-link to="/app"><i class="i-icon i-icon-mobile"></i>H5</router-link>
                    <div class="dropdown">
                        <div class="dropdown-inner">
                            <div class="text-center dropdown-content">
                                <div class="qrcode">
                                    <!-- <img
                                        src="//7n.w3cschool.cn/statics/images/w3c/app-qrcode2.png"
                                        alt="APP二维码"
                                        width="150"
                                        height="150"
                                    /> -->
                                    <vue-qrcode :value="app_url" />
                                    <p>扫码手机访问</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="fl sig-box"
                    v-show="user_show"
                >
                    <div>
                        <a
                            class="link"
                            href="//www.w3cschool.cn/register?refer=/css/list"
                        >注册</a><span class="sep">|</span><a
                            class="link"
                            href="//www.w3cschool.cn/login?refer=/css/list"
                        >登录</a>
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
import VueQrcode from 'vue-qrcode';
export default {
    name: 'PageIndexHeader',
    data() {
        return {
            nav_show: true,
            user_show: false,
            app_show: true,
            show: true,
            keyword: '',
            app_url: '',
            logo_image: '',
        };
    },
    components: {
        VueQrcode,
    },
    props: {
        search_show: {
            type: Boolean,
            default: true,
        },
    },
    mounted() {
        this.logo_image = require('@/assets/images/logo.png');
        this.app_url = 'http://' + window.location.host + '#/app';
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