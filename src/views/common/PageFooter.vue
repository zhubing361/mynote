<template>
    <div
        id="footer_item"
        v-show="show"
    >
        <div id="footer">
            <div class="footer-box">
                <div class="footer-title">网站相关</div>
                <ul class="footer-items">
                    <li>
                        <router-link to="/about.html">关于我们</router-link>
                    </li>
                </ul>
            </div>
            <div class="footer-box">
                <div class="footer-title">网站相关</div>
                <ul class="footer-items">
                    <li>
                        <router-link to="/about.html">关于我们</router-link>
                    </li>
                </ul>
            </div>
            <div class="footer-box">
                <div class="footer-title">网站相关</div>
                <ul class="footer-items">
                    <li>
                        <router-link to="/about.html">关于我们</router-link>
                    </li>
                </ul>
            </div>
            <div class="footer-box">
                <div class="footer-title">网站相关</div>
                <ul class="footer-items">
                    <li>
                        <router-link to="/about.html">关于我们</router-link>
                    </li>
                </ul>
            </div>

            <div class="footer-box">
                <div class="tcode">
                    <img
                        src="//7n.w3cschool.cn/statics/images/w3c/app-qrcode2.png"
                        alt="加入App二维码"
                        width="100"
                        height="100"
                    />
                </div>
                <p class="tcode-txt">下载App</p>
            </div>

            <div class="footer-box">
                <div class="tcode">
                    <img
                        src="//atts.w3cschool.cn/w3cschool_fwh.png"
                        alt="微信服务号"
                        width="100"
                        height="100"
                    />
                </div>
                <p class="tcode-txt">关注公众号</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>
                Copyright©2021&nbsp;<a
                    href="//www.w3cschool.cn"
                    target="_blank"
                    title="w3cschool"
                >w3cschool</a>编程狮<span>|</span><a
                    href="https://beian.miit.gov.cn/"
                    target="_blank"
                    rel="nofollow"
                    class="footer-record"
                >闽ICP备15016281号-3</a><span>|</span><a
                    href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=35020302033924"
                    target="_blank"
                    rel="nofollow"
                ><i class="beian"></i>闽公网安备35020302033924号</a>
            </p>
            <p>
                违法和不良信息举报电话：173-0602-2364<span>|</span><a href="mailto:jubao@eeedong.com">举报邮箱：jubao@eeedong.com</a>
            </p>
        </div>
    </div>
    <el-backtop
        :right="100"
        :bottom="100"
    />
</template>

<script>
export default {
    name: 'PageFooter',
    data() {
        return {
            show: false,
        };
    },
};
</script>

<style>
</style>