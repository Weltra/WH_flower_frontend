<template>
    <div>
        <header>
            <Header :routelist="routelist"></Header>
        </header>
        <div class="map-container">
            <div id="container" :style="`height: 100vh`">
                <div class="weather-card">
                    <Weather></Weather>
                </div>
                <div class="route-card">
                    <h5 style="margin-bottom: 10px;"><i class="el-icon-guide"></i>赏花路线列表</h5>
                    <el-divider></el-divider>
                    <el-table :data="RouteList" style="width: 300px height: 280px;" :cell-style="{ padding: '5px' }"
                        :show-header=false @row-click="clickRoute" :row-style="rowStyle">
                        <el-table-column prop="index" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="name">
                        </el-table-column>
                        <el-table-column prop="flowerType">
                        </el-table-column>
                    </el-table>
                </div>
                <RouteCard :active-line-obj="activeLineObj"></RouteCard>
            </div>
        </div>
    </div>
</template>

<script>

import AMapLoader from '@amap/amap-jsapi-loader';

import { mapState } from 'vuex'
//import mapConfig from "../../mapConfig";
import Weather from '@/components/Weather.vue';
import Header from '@/components/Header.vue';
import RouteCard from '@/components/RouteCard.vue';
import mapConfig from '@/utils/mapConfig'


let AMap = null;

export default {
    components: { Weather, Header, RouteCard },
    data() {
        return {
            map: null,
            selectrow: '',
            routelist: [
                { route: '/Home', name: '主页' },
                { route: '/Search', name: '热门搜索' },
                { route: '/Map', name: '赏花地图' },
                { route: '/MapSearch', name: '周边搜索' },
                { route: '/Feedback', name: '我的发现' },
                { route: '/User', name: '个人中心' }
            ],
            RouteList: [
                {
                    index: 1,
                    name: '梅兰芬芳之旅',
                    recommend: '适合春节家庭出游',
                    flowerType: '梅花、玉兰',
                    months: '2-3月',
                    region: '武昌区、汉阳区、江岸区',
                    distance: '13km',
                    time: '37min',
                    description: '“束素亭亭玉殿春”，玉兰清新典雅；“朔风飘夜香”梅花高洁傲岸，在初春的季节欣赏如诗美景，一定要到长春观、黄鹤楼走走。',
                    paths: [
                        { position: [114.32082, 30.54022], name: '长春观', note: '玉兰花' },
                        { position: [114.302467, 30.544649], name: '黄鹤楼公园', note: '梅花' },
                        { position: [114.275205, 30.555057], name: '龟山公园', note: '梅花' },
                        { position: [114.284332, 30.597736], name: '宝岛公园', note: '玉兰花' },
                    ]
                },
                {
                    index: 2,
                    name: '锦绣莺歌之旅',
                    recommend: '适合家庭春游',
                    flowerType: '樱花、绣球花',
                    months: '3-4月',
                    region: '东西湖区、硚口区、江汉区、江岸区',
                    distance: '22km',
                    time: '60min',
                    description: '进入春天，花儿竞相开放，木绣球是绿色，与浓绿的叶儿正相配；樱花是粉白色的，在樱树下散步，清风吹拂，散落一地花瓣，让人不忍踩下脚步，这样的花团锦簇、葱葱茏茏，我们一块儿去园博园、金银湖湿地公园游赏！',
                    paths: [
                        { position: [114.187354, 30.641473], name: '金银湖国家湿地公园', note: '绣球花' },
                        { position: [114.218672, 30.623063], name: '武汉园博园', note: '樱花' },
                        { position: [114.248206, 30.60254], name: '王家墩公园', note: '樱花、绣球花' },
                        { position: [114.298029, 30.608418], name: '解放公园', note: '郁金香、绣球花' },
                    ]
                },
                {
                    index: 3,
                    name: '金粉佳景之旅',
                    recommend: '适合乘坐公共交通游览',
                    flowerType: '樱花、郁金香',
                    months: '3月',
                    region: '洪山区',
                    distance: '12km',
                    time: '32min',
                    description: '从荷兰远道而来的郁金香色彩种类繁多，大大的花苞，多彩的配色，别有一番风韵。每年在关山荷兰风情园、武汉植物园均有郁金香展览，而珞喻路大黄村公交车站则凭借一株巨大的樱树成为梦幻、电影镜头般的存在，欢迎大家打卡！',
                    paths: [
                        { position: [114.399174, 30.493868], name: '关山荷兰风情园', note: '郁金香' },
                        { position: [114.429141, 30.506011], name: '珞喻路大黄村公交车站', note: '樱花' },
                        { position: [114.423278, 30.544563], name: '武汉植物园', note: '郁金香' },
                        { position: [114.410109, 30.546277], name: '东湖樱园', note: '樱花' },
                    ]
                },
                {
                    index: 4,
                    name: '青春赏花之路',
                    recommend: '年轻人的必游之路',
                    flowerType: '油菜花、樱花',
                    months: '3-4月',
                    region: '洪山区、武昌区',
                    distance: '27km',
                    time: '59min',
                    description: '武汉的大学多是美丽，青春朝气的，每逢花季，武汉大学都会有数千游客赏樱，不似其美名远扬，华中农业大学也有美丽的樱园、油菜田期待大家的驻足！欢迎大家到身边的学校走走看看，或许在追忆青春年华时会有意想不到的惊喜。',
                    paths: [
                        { position: [114.355923, 30.472223], name: '华中农业大学', note: '油菜花、樱花、玉兰花' },
                        { position: [114.321887, 30.470526], name: '武汉创意天地', note: '樱花' },
                        { position: [114.362638, 30.539036], name: '武汉大学樱园', note: '樱花' },
                        { position: [114.447616, 30.519499], name: '马鞍山森林公园', note: '油菜花' },
                    ]
                },
                {
                    index: 5,
                    name: '千花玉团之旅',
                    recommend: '适合初夏游玩',
                    flowerType: '绣球花',
                    months: '4-5月',
                    region: '武昌区、青山区、江岸区',
                    distance: '33km',
                    time: '73min',
                    description: '“高枝带雨压雕栏，一蒂千花白玉团”，绣球花开盛大烂漫，一株就是一“球”，白的像雪，绿得似玉，花团锦簇，在沙湖公园、青山公园、和平公园等都能看到它的身影。',
                    paths: [
                        { position: [114.351107, 30.572224], name: '沙湖公园', note: '绣球花' },
                        { position: [114.407889, 30.638548], name: '青山公园', note: '杜鹃花' },
                        { position: [114.385242, 30.633054], name: '和平公园', note: '绣球花、月季' },
                        { position: [114.338385, 30.66159], name: '堤角公园', note: '绣球花、樱花' },
                    ]
                },
                {
                    index: 6,
                    name: '郁金乐章之旅',
                    recommend: '适合驾车出行',
                    flowerType: '郁金香',
                    months: '3-4月',
                    region: '东西湖区、蔡甸区',
                    distance: '47km',
                    time: '45min',
                    description: '郁金香的话语是优美和雅致，是胜利和美好的象征，同时还代表着纯洁的友情和永恒的祝福。在神话传说里，它的花蕾代表皇冠，叶子代表宝剑，球根代表黄金，是爱情与高贵的象征。郁金香主题公园专线将为大家带来华美郁金之旅。',
                    paths: [
                        { position: [114.085182, 30.704151], name: '郁金香主题公园', note: '郁金香' },
                        { position: [114.074414, 30.488968], name: '武汉花博汇', note: '郁金香、樱花' },
                    ]
                },
                {
                    index: 7,
                    name: '夏日木兰之旅',
                    recommend: '适合五一假期游览',
                    flowerType: '杜鹃花、格桑花',
                    months: '5月',
                    region: '黄陂区',
                    distance: '80km',
                    time: '100min',
                    description: '五月入夏，那就去看看红得热烈震撼的杜鹃花吧！美丽的木兰景区不仅可以自驾游、露营、参加篝火晚会，还有美丽的杜鹃花、绣球花、格桑花、薰衣草正值花期，何不来一场说走就走的旅行？',
                    paths: [
                        { position: [114.213185, 31.12363], name: '木兰云雾山', note: '杜鹃花' },
                        { position: [114.441392, 31.02295], name: '木兰玫瑰园', note: '玫瑰花' },
                        { position: [114.38424, 31.240117], name: '木兰花乡', note: '绣球花、格桑花、薰衣草' },
                    ]
                },
                {
                    index: 8,
                    name: '城市樱花之旅',
                    recommend: '适合驾车游览',
                    flowerType: '樱花',
                    months: '3月',
                    region: '江汉区、东西湖区、江岸区',
                    distance: '29km',
                    time: '68min',
                    description: '早春，樱树，寒冷的空气让叶芽沉睡，花儿却迫不及待地绽放花苞。樱花林是浪漫的，粉白色的层层叠叠的花儿诗意唯美，如云如烟。来到武汉，一定不能错过标志性的樱花！樱花溪公园，王家墩公园，各色公园学校，都有樱花！',
                    paths: [
                        { position: [114.130359, 30.648231], name: '樱花溪公园', note: '樱花' },
                        { position: [114.248206, 30.60254], name: '王家墩公园', note: '樱花' },
                        { position: [114.268524, 30.595699], name: '西北湖绿化广场', note: '樱花' },
                        { position: [114.302594, 30.582635], name: '汉口江滩', note: '樱花' },
                    ]
                },
            ],
            activeLineObj: {
                name: '梅兰芬芳之旅',
                recommend: '适合春节家庭出游',
                flowerType: '梅花、玉兰',
                months: '2-3月',
                region: '武昌区、汉阳区、江岸区',
                distance: '13km',
                time: '37min',
                description: '“束素亭亭玉殿春”，玉兰清新典雅；“朔风飘夜香”梅花高洁傲岸，在初春的季节欣赏如诗美景，一定要到长春观、黄鹤楼走走。',
                paths: [
                    { position: [114.32082, 30.54022], name: '长春观', note: '玉兰花' },
                    { position: [114.30548, 30.544123], name: '黄鹤楼公园', note: '梅花' },
                    { position: [114.275205, 30.555057], name: '龟山公园', note: '梅花' },
                    { position: [114.284332, 30.597736], name: '宝岛公园', note: '玉兰花' },
                ]
            },
            route: null
        }
    },
    computed: {
        ...mapState(['windowInsets'])
    },

    mounted() {
        this.initmap();
    },

    methods: {
        initmap() {
            this.contentHeight = window.innerHeight
            AMapLoader.load({
                key: mapConfig.JSAPIKey, // 开发应用的 ID
                version: "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: [
                    'AMap.ToolBar', // 缩放按钮
                    'AMap.Scale', // 比例尺
                    'AMap.Geolocation', // 定位
                    'AMap.DragRoute'
                ],
            }).then(map => {
                AMap = map
                this.map = new AMap.Map('container', {
                    //center: MY_POSITION,
                    zoom: 11
                })
                // this.map.addControl(new AMap.ToolBar())
                this.map.addControl(new AMap.Scale())
                this.map.addControl(new AMap.ToolBar())
                // 定位
                let geolocation = new AMap.Geolocation({
                    // 是否使用高精度定位，默认：true
                    enableHighAccuracy: true,
                    // 设置定位超时时间，默认：无穷大
                    timeout: 10000,
                    // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                    offset: [20, 80],
                    //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    zoomToAccuracy: true,
                    //  定位按钮的排放位置,  RB表示右下
                    position: 'LB',
                })
                this.map.addControl(geolocation)
                this.loadLine(this.map, this.activeLineObj)
                this.loadLineLabels(this.map, this.activeLineObj)
            }).catch(e => {
                console.log(e);
            })
            // 搜索
        },
        // 载入路线信息
        loadLine(map, line) {
            if (this.route) {
                this.route.destroy()
            }
            let path = line.paths.map(item => item.position)
            this.route = new AMap.DragRoute(map, path, AMap.DrivingPolicy.LEAST_FEE, {
                startMarkerOptions: {
                    offset: new AMap.Pixel(-16, -32),
                    icon: new AMap.Icon({ // 设置起点的图标
                        size: new AMap.Size(32, 32),
                        image: 'https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/startpoint.png',
                        imageSize: new AMap.Size(32, 32),
                    }),
                },
                endMarkerOptions: {
                    offset: new AMap.Pixel(-16, -32),
                    icon: new AMap.Icon({ // 设置终点的图标
                        size: new AMap.Size(32, 32),
                        image: 'https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/endpoint.png',
                        imageSize: new AMap.Size(32, 32),
                    }),
                },
                midMarkerOptions: {
                    offset: new AMap.Pixel(-10, -10),
                    icon: new AMap.Icon({ // 设置途经点的图标
                        size: new AMap.Size(20, 20),
                        image: 'https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/pink_transparent_1.png',
                        imageSize: new AMap.Size(20, 20),
                    }),
                },
            })
            // 路线规划完成后，返回的路线数据：设置距离、行驶时间
            this.route.on('complete', res => {
                let lineData = res.data.routes[0]
                let distance = (lineData.distance / 1000).toFixed(1) // m -> km
                let time = (lineData.time / 60).toFixed() // second -> min
                this.$set(this.activeLineObj, 'distance', distance)
                this.$set(this.activeLineObj, 'time', time)
            })
            // 查询导航路径并开启拖拽导航
            this.route.search()
        },
        clickRoute(row) {
            this.selectrow = row.index;
            this.RouteList.forEach((route) => {
                if (route.index == row.index) {
                    this.map.clearMap()
                    this.activeLineObj = route
                    this.loadLine(this.map, this.activeLineObj)
                    this.loadLineLabels(this.map, this.activeLineObj)
                }
            });
        },
        rowStyle({ row }) {
            if (this.selectrow === row.index) {
                return { 'background-color': '#ec9bad', cursor: 'pointer', 'color': '' };
            }
            return { cursor: 'pointer' };
        },
        loadLineLabels(map, line) {
            line.paths.forEach(item => {
                this.addMarker(map, item)
            })
        },
        addMarker(map, item) {
            let marker = new AMap.Marker({
                position: item.position,
                content: `
               <div class="marker">
                  <div class="maker-title"><h6>${item.name}</h5></div>
                  <div class="maker-p"><p><b>花种：</b>${item.note}</p></div>
               </div>`
            });
            map.add(marker);
        }
    },
}
</script>

<style scoped>
.map-container {
    position: relative;
}

@import "open-props/open-props.min.css" layer(open-props);
@import "open-props/normalize.min.css" layer(open-props);

.route-card {
    position: absolute;
    left: 20px;
    top: 160px;
    background-color: white;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04);
    z-index: 170;
    width: 300px;
    height: 330px;
    margin: 20px auto;
    padding: 10px 0;
    border-radius: 10px;
    text-align: center;
}


/* 路线详细信息 */
html {
    box-sizing: border-box;
}

*,
*:before,
*:after {
    box-sizing: inherit;
}

body {
    margin: 40px;
    background: #f4f4f4;
}

h5 {
    color: rgba(0, 0, 0, 0.7);
    font-size: 18px;
}

h6 {
    color: rgba(0, 0, 0, 0.6);
}

.el-table__row:hover>td {
    background-color: transparent;
}

.el-divider--horizontal {
    margin: 5px 0;
    background: 0 0;
    border-top: 1px solid #e8eaec;
    margin-top: 0px;
}

>>>.marker {
    width: max-content;
    background-color: #FFFFFF;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding:5px;
    
}

>>>.marker h6 {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    margin-bottom: 3px;

}

>>>.marker p {
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
}

>>>.marker:hover {
  transform: translateY(-3px) scale(1.1);
}
</style>
