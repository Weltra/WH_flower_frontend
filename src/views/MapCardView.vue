<template>
    <div>
        <header>
            <Header :routelist="routelist"></Header>
        </header>
        <div class="map-container">
            <div id="container" :style="`height: 100vh`">
                <div class="tool_search">
                    <el-input id="tipInput" v-model="inputSearchVal" placeholder="请输入搜索名称">
                        <el-button slot="append" icon="el-icon-search" @click="searchKeyword"
                            style="width:60px"></el-button>
                    </el-input>
                </div>
                <div class="tool_search_result" v-if="showsearchResult">
                    <ul>
                        <li @click="markerResult(item)" v-for="(item, index) in poiList" :key="index">{{ item.name }}</li>
                    </ul>
                </div>
                <MapCard :selectedPoint="selectedPoint" :showcard="showcard"></MapCard>
            </div>
        </div>
    </div>
</template>

<script>

import AMapLoader from '@amap/amap-jsapi-loader';

//import mapConfig from "../../mapConfig";
import Header from '@/components/Header.vue';
import MapCard from '@/components/MapCard.vue';
import mapConfig from '@/utils/mapConfig'

let AMap = null;
//let self = null;

export default {
    name: "MapCardView",
    components: { Header, MapCard },
    data() {
        return {
            routelist: [
                { route: '/Home', name: '主页' },
                { route: '/Search', name: '搜索' },
                { route: '/MapSearch', name: '周边搜索' },
                { route: '/Feedback', name: '我的发现' },
                { route: '/Route', name: '路线展示' },
                { route: '/User', name: '个人中心' }
            ],
            map: null,
            showcard: false,
            markers: [],
            selectedPoint: {
                position: [],
                name: "",
                open_time: "",
                description: "",
                imgUrl: "",
                ticket: "",
                traffic: "",
                flower_class: ""
            },
            points: [],
            // 地图搜索
            showsearchResult: false,
            autoCompleteComponent: null,
            placeSearchComponent: null,
            markerList: [],
            mapInput: "",
            inputSearchVal: "",
            poiList: [],
            pointname: ''
        };
    },
    created() {
        window.handleDetail = () => {
            this.$router.push({ name: 'MapSearch' });
            this.$store.commit('updateData', this.pointname)
        }
        this.$axios.get('http://127.0.0.1:8000/map_points/', {
        }).then((res) => {
            this.points = res.data.Points
        }).catch(err => {
            console.log(err);
            this.$message.error('地图点载入失败，请检查网络！');
        })
    },
    computed: {},
    mounted() {
        this.initmap();
        this.map.on("move", () => {
            this.updateFloatingCardPosition();
        });
    },
    methods: {
        initmap() {
            this.contentHeight = window.innerHeight;
            //self = this;
            AMapLoader.load({
                key: mapConfig.JSAPIKey,
                version: "2.0",
                plugins: [
                    "AMap.ToolBar",
                    "AMap.Scale",
                    "AMap.Geolocation",
                    "AMap.PlaceSearch",
                    "AMap.AutoComplete"
                ],
            }).then(map => {
                AMap = map;
                this.map = new AMap.Map("container", {
                    //center: MY_POSITION,
                    zoom: 11
                });
                this.map.addControl(new AMap.Scale());
                this.map.addControl(new AMap.ToolBar());
                // 定位
                let geolocation = new AMap.Geolocation({
                    // 是否使用高精度定位，默认：true
                    enableHighAccuracy: true,
                    // 设置定位超时时间，默认：无穷大
                    timeout: 10000,
                    // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
                    buttonOffset: new AMap.Pixel(10, 20),
                    //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    zoomToAccuracy: false,
                    //  定位按钮的排放位置,  RB表示右下
                    buttonPosition: "RB"
                });
                geolocation.getCurrentPosition(this.setMapMakers);
                this.mapSearchInit();
                this.loadAMapMarker();
                this.map.setFitView();
            }).catch(e => {
                console.log(e);
            });
            // 搜索
        },
        // 设置地图中心点：用户坐标
        setMapMakers(status, res) {
            if (status === "complete") {
                let center = [res.position.lng, res.position.lat];
                this.addHomeMarker(this.map, {
                    position: center,
                });
                // 导入其他点
            }
            else {
                console.log(res);
            }
        },
        addHomeMarker(map, item) {
            let marker = new AMap.Marker({
                position: item.position,
                autoRotation: true,
                offset: AMap.Pixel(-15, -30),
                icon: new AMap.Icon({ // 设置起点的图标
                        size: new AMap.Size(30, 30),
                        image: 'https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/Home.png',
                        imageSize: new AMap.Size(30, 30),
                    }),
                map: map
            });
            this.markers.push(marker);
        },
        loadAMapMarker() {
            console.log(this.points)
            this.points.forEach((point) => {
                const marker = new AMap.Marker({
                    position: point.position,
                    autoRotation: true,
                    title: point.name,
                    icon: new AMap.Icon({ // 设置起点的图标
                        size: new AMap.Size(30, 30),
                        image: 'https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/%E8%8A%B1%20(11).png',
                        imageSize: new AMap.Size(30, 30),
                    }),
                    map: this.map
                });
                marker.on("click", this.handleMarkerClick);
                marker.setExtData(point);
                this.markers.push(marker);
            });
        },
        handleMarkerClick(e) {
            this.selectedPoint = e.target.getExtData();
            this.showcard = true;
        },
        markerResult(data) {
            let marker = new AMap.Marker({
                position: [Number(data.location.lng), Number(data.location.lat)],
                autoRotation: true,
                icon: "https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/map-marker_mapcard.png",
                offset: new AMap.Pixel(-16, -32),
            });
            marker.on("click", this.addMarkerTip);
            marker.setMap(this.map);
            marker.setExtData(data);
            this.map.setFitView();
            this.markerList.push(marker);
        },
        addMarkerTip(e) {
            let data = e.target.getExtData();
            this.pointname = data.name
            let markerTipContent = `
            <div class="card">
                <span class="arrow down"></span>
                <h5 class="card-title">${data.name}</h5>      
                <div class="link-top"></div>
                <p><b>地址：</b>${data.address}</p>
                <p><b>联系电话：</b>${data.tel}</p>
                <p onclick="handleDetail()">点击搜索周边</p>

            </div>
            
            <style scoped>
            .card {
                margin:10px;
                position: relative;
                width: 250px;
                background-color: #FFFFFF;
                padding: 10px;
                border-radius: 5px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }

            .card > .arrow {
                height:0;
                width:0;
                border: 12px solid transparent;
                position: absolute;
            }

            .card > .arrow.down {
                border-top: 12px solid #FFFFFF;
                bottom: -23px;
                left: calc(50% - 12px);
            }

            .card-title{
                font-size: 18px;
                font-family: 'Roboto', sans-serif;
                margin-bottom: 3px;
            }

            .card p {
                font-family: 'Open Sans', sans-serif;
                font-size: 13px;
                margin-bottom: 3px;
            }

            .link-top {
                width: 100%;
                height: 4px;
                border-top: solid #737c7b 2px;
            }
            </style>
            `;
            let markerTip = new AMap.InfoWindow({
                position: [Number(data.location.lng), Number(data.location.lat)],
                isCustom: true,
                content: markerTipContent,
                closeWhenClickMap: true,
                offset: new AMap.Pixel(0, -50) // 便宜位置
            });
            markerTip.open(this.map);
        },
        mapSearchInit() {
            var autoOptions = {
                input: "tipInput",
            };
            var autoCompleteComponent = new AMap.AutoComplete(autoOptions);
            this.autoCompleteComponent = autoCompleteComponent;
            // 注册placeSearch组件
            this.placeSearchComponent = new AMap.PlaceSearch();
        },
        searchKeyword() {
            this.map.remove(this.markerList);
            let cur = this;
            this.placeSearchComponent.search(this.inputSearchVal, function (status, result) {
                // 查询成功时，result即对应匹配的POI信息
                console.log(status);
                console.log(result);
                if (status === "complete" && result.info === "OK") {
                    cur.showsearchResult = true;
                    cur.poiList = result.poiList.pois;
                }
                else {
                    cur.showsearchResult = false;
                    cur.poiList = [];
                    cur.$message({
                        message: "没有查到结果",
                        type: "warning",
                    });
                }
            });
        },
    },
    watch: {},
    beforeDestroy() {
        this.map.destroy();
        this.map = null;
    },
}
</script>

<style scoped>
.map-container {
    position: relative;
}

.tool_search {
    width: 250px;
    top: 30px;
    left: 20px;
    height: 32px;
    background: #eee;
    opacity: 0.8;
    border-radius: 4px;
    margin-top: 2px;
    bottom: auto;
    z-index: 12;
    position: absolute;
    text-align: left;
    font-size: 14px;
}

::v-deep .el-input-group__append,
.el-input-group__prepend {
    border: 1px solid rgb(194, 193, 193);
    border-left: none;
    background: rgb(231, 230, 230);
    color: rgb(77, 77, 73);
}

::v-deep .el-input__inner {
    border: 1px solid rgb(194, 193, 193);
}

.tool_search_result {
    width: 250px;
    top: 70px;
    left: 20px;
    height: 300px;
    border: 1px solid rgb(175, 175, 173);
    border-top: none;
    background: #fff;
    opacity: 0.8;
    margin-top: 2px;
    bottom: auto;
    z-index: 12;
    position: absolute;
    text-align: left;
    font-size: 14px;
}

.tool_search_result ul {
    width: 100%;
    height: 100%;
    list-style: none;
    margin: 0;
    padding: 0;
}

.tool_search_result ul li {
    font-size: 12px;
    color: rgb(23, 40, 75);
    text-align: center;
    width: 100%;
    height: 9.75%;
    float: left;
    margin: 0px 0px 1px 0;
    padding: 2.5% 4px 0 4px;
    border-bottom: 1px dashed rgb(170, 170, 172);
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.tool_search_result ul li:last-child {
    border: none;
}
</style>
