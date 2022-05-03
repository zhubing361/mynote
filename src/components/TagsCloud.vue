<template>
    <div>
        <div
            id="wordCloud"
            style="height: 600px; width: 400px;"
        ></div>
    </div>
</template>

<script>
import * as echarts from 'echarts/core';
import 'echarts-wordcloud';
import { TitleComponent } from 'echarts/components';
echarts.use([TitleComponent]);
export default {
    data() {
        return {
            echartsData: [
                { value: '50', name: 'saas' },
                { value: '49', name: 'gorm' },
                { value: '48', name: 'gin' },
                { value: '47', name: 'rpc' },
                { value: '46', name: 'postman' },
                { value: '45', name: '高并发' },
                { value: '44', name: 'HTTP' },
                { value: '43', name: '机器学习' },
                { value: '42', name: 'Lua' },
                { value: '41', name: 'Memcached' },
                { value: '40', name: 'linux' },
                { value: '39', name: 'workerman' },
                { value: '38', name: 'swoole' },
                { value: '37', name: 'php-fpm' },
                { value: '36', name: 'Yii2' },
                { value: '35', name: 'docker-compose' },
                { value: '34', name: 'Composer' },
                { value: '33', name: 'Less' },
                { value: '32', name: 'Sass' },
                { value: '31', name: '《PHP系统核心与最佳实践》' },
                { value: '30', name: 'PHP' },
                { value: '29', name: 'MySQL' },
                { value: '28', name: 'Apache' },
                { value: '27', name: 'Redis' },
                { value: '26', name: 'Mongodb' },
                { value: '25', name: 'Python' },
                { value: '24', name: 'vue' },
                { value: '23', name: 'nodejs' },
                { value: '22', name: 'HTML' },
                { value: '21', name: 'CSS3' },
                { value: '20', name: 'golang' },
                { value: '16', name: '消息队列' },
                { value: '15', name: 'RabbitMQ' },
                { value: '14', name: 'Elasticsearch' },
                { value: '13', name: 'gozero' },
                { value: '12', name: '微服务' },
                { value: '11', name: 'Nginx' },
                { value: '10', name: 'Javascript' },
                { value: '9', name: 'Laravel' },
                { value: '8', name: 'ThinkPHP' },
                { value: '7', name: 'Docker' },
                { value: '6', name: 'lamp' },
                { value: '5', name: 'lnmp' },
                { value: '4', name: 'Ubuntu' },
                { value: '3', name: 'CentOS' },
                { value: '2', name: '设计模式' },
                { value: '1', name: '《Modern PHP》' },
            ],
        };
    },
    props: {
        filterByTag: {
            type: Function,
            default: tag => {
                console.log(tag);
            },
        },
    },
    mounted: function () {
        this.initChart();
    },
    methods: {
        initChart() {
            var _self = this;
            var myChart = echarts.init(document.getElementById('wordCloud'));
            const option = {
                title: {
                    text: '',
                    x: 'center',
                },
                backgroundColor: '#fff',
                // tooltip: {
                //   pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
                // },
                series: [
                    {
                        type: 'wordCloud',
                        //用来调整词之间的距离
                        gridSize: 10,
                        //用来调整字的大小范围
                        // Text size range which the value in data will be mapped to.
                        // Default to have minimum 12px and maximum 60px size.
                        sizeRange: [14, 40],
                        // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
                        //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
                        // rotationRange: [-45, 0, 45, 90],
                        // rotationRange: [ 0,90],
                        rotationRange: [0, 0],
                        //随机生成字体颜色
                        // maskImage: maskImage,
                        textStyle: {
                            color: function () {
                                return (
                                    'rgb(' +
                                    Math.round(Math.random() * 255) +
                                    ', ' +
                                    Math.round(Math.random() * 255) +
                                    ', ' +
                                    Math.round(Math.random() * 255) +
                                    ')'
                                );
                            },
                        },
                        //位置相关设置
                        // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
                        // Default to be put in the center and has 75% x 80% size.
                        left: 'center',
                        top: 'center',
                        right: null,
                        bottom: null,
                        width: '100%',
                        height: '100%',
                        //数据
                        data: this.echartsData,
                    },
                ],
            };
            myChart.setOption(option);
            // 点击某个字
            myChart.on('click', function (params) {
                // console.log(
                //     'myChart----click---:',
                //     params,
                //     '------',
                //     params.data
                // );

                _self.filterByTag(params.data.name);
            });
        },
    },
};
</script>

<style>
</style>