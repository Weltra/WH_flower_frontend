<template>
  <div class="container">
    <header>
      <Header :routelist="routelist"></Header>
    </header>
    <div class="infoDetail">
      <div class="search">
        <el-form ref="form" :model="form" label-width="80px" :inline="true" style="padding:20px; ">
          <div class="line">
            <el-form-item label="搜索地点">
              <el-input v-model="form.location" class="inputWidth" placeholder="搜索地点" suffix-icon="xxxx"></el-input>
            </el-form-item>
            <el-form-item label="选择地点">
              <el-select v-model="form.chooseLocation" placeholder="选择地点" class="inputWidth" clearable filterable
                value-key="id" @change="changeLocation" style="width:92">
                <el-option v-for="item in tips" :label="item.name" :value="item" :key="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="line">
            <el-form-item label="起始地点">
              <el-input v-model="form.origin" class="inputWidth" placeholder="起始地点" suffix-icon="xxxx"></el-input>
            </el-form-item>
            <el-form-item label="起始坐标">
              <el-input v-model="form.coordinate" class="inputWidth" placeholder="起始坐标" suffix-icon="xxxx"></el-input>
            </el-form-item>
          </div>
          <div class="line">
            <el-form-item label="目标地点">
              <el-input v-model="form.targetLocation" class="inputWidth" placeholder="目标地点" suffix-icon="xxxx"></el-input>
            </el-form-item>
            <el-form-item label="目标坐标">
              <el-input v-model="form.targetCoordinate" class="inputWidth" placeholder="目标坐标"
                suffix-icon="xxxx"></el-input>
            </el-form-item>
          </div>
          <div class="line">
            <el-button type="primary" @click="searchLocation" class="Btn">搜索地点</el-button>
            <el-button type="primary" @click="searchAround('风景')" class="Btn">搜索周边</el-button>
            <el-button type="primary" @click="pathPlanning" class="Btn">规划路线</el-button>
            <el-button type="primary" @click="clearData" class="Btn">清空</el-button>
          </div>
        </el-form>
      </div>
      <div class="MapTab">
        <el-tabs v-model="activeName" @tab-click="handleClick" class="el-tabs" type="border-card" style="height: 460px;">
          <el-tab-pane :label="tab.label" :name="tab.name" v-for="(tab, tabIndex) in tabList" :key="tabIndex">
            <div class="table-container">
              <table class="listData">
                <tbody>
                  <tr class="list" v-for="item in pois" :key="item.id" @click="choosePoi(item)">
                    <td class="name">{{ item.name }}</td>
                    <td class="distance">{{ (Math.round(item.distance) / 1000).toFixed(2) }}公里</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="mapDetail">
      <div class="Map" id="Map">
        <div class="panel" id="panel"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { axiosMap } from "@/requests/axios.js";
import AMapLoader from '@amap/amap-jsapi-loader';
import mapConfig from "../../mapConfig";
import Header from '@/components/Header.vue';
let AMap = null;
export default {
  components: { Header },
  data() {
    return {
      routelist: [
        { route: '/Home', name: '主页' },
        { route: '/Search', name: '搜索' },
        { route: '/Map', name: '地图' },
        { route: '/Feedback', name: '我的发现' },
        { route: '/Route', name: '路线展示' },
        { route: '/User', name: '个人中心' }
      ],
      activeName: "scenery",
      pois: [], //周边搜索的数据
      markers: [], //存储点标记
      map: null, //生成的地图
      tips: [], //搜索的地址列表
      tabList: [
        { label: "风景", name: "scenery" },
        { label: "餐厅", name: "restaurant" },
        { label: "停车场", name: "park" },
        { label: "酒店", name: "hotel" },
      ],
      form: {
        location: "", //搜索地点
        chooseLocation: null, //搜索地点坐标
        coordinate: "", //起始地点
        origin: "", //起始地点
        targetCoordinate: "", //目标坐标
        targetLocation: "", //目标地点
      },
    };
  },
  created(){
    this.form.location = this.$store.state.location
  },
  mounted() {
    // 创建地图
    this.createMap();

  },
  methods: {
    //选择初始坐标
    changeLocation(val) {
      this.form.origin = val.name; //起始地点
      this.form.coordinate = val.location; //起始坐标
      // 使用通用函数,将整个地图的覆盖物清理掉
      this.map.clearMap();
      let marker = new AMap.Marker({
        title: val.name, //地点名称
        position: val.location.split(","), //地点坐标
        offset: AMap.Pixel(-16, -32),
        icon: "https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/map-marker_mapcard.png",
      });
      //添加点标记
      this.map.add(marker);
      // 设置地图以这个点居中
      this.map.setCenter(val.location.split(","));
      // 将地图的视图设为合适的大小
      this.map.setFitView();
    },
    //选择景点
    choosePoi(item) {
      this.form.targetLocation = item.name; //目标地点
      this.form.targetCoordinate = item.location; //目标坐标
    },
    //创建地图
    createMap() {
      AMapLoader.load({
        key: mapConfig.appId,
        version: "2.0",
        plugins: ['AMap.Walking'
        ],
      }).then(map => {
        AMap = map;
        this.map = new AMap.Map("Map", {
          zoom: 11
        });
      })
    },
    //根据type生成标记或路线
    setMap(type) {
      //根据type显示不同地图
      if (type == "Marker") {
        //遍历 pois 列表, 每个地点都创建一个 marker 放到地图上
        this.setMarkers();
      } else if (type == "panel") {
        //规划步行路线
        this.setWarking();
      }
    },
    //搜索地点
    searchLocation() {
      let data = {
        key: "647b17e5508e7ae00b122df635fa4e25",
        location: "113.40135612,23.0855435", //以此坐标搜索周边
        keywords: this.form.location, //关键字
      };
      axiosMap("v3/assistant/inputtips", "get", data).then((res) => {
        this.tips = res.data.tips; //将请求所得的标记储存起来
      });
    },
    // 周边搜索
    searchAround(types) {
      let data = {
        key: "647b17e5508e7ae00b122df635fa4e25",
        location: this.form.chooseLocation.location, //以此坐标搜索周边
        types, //默认为风景
      };
      axiosMap("v3/place/around", "get", data).then((res) => {
        this.pois = res.data.pois; //将请求所得的标记储存起来
        //生成标记
        this.setMap("Marker");
      });
    },
    setWarking() {
      //步行导航
      var walking = new AMap.Walking({
        map: this.map,
        panel: "panel",
      });
      //根据起终点坐标规划步行路线
      walking.search(
        this.form.coordinate.split(","), //起点和终点坐标为数组
        this.form.targetCoordinate.split(","),
        (status, result) => {
          console.log(status, result);
          // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
          if (status === "complete") {
            // log.success("绘制步行路线完成");
          } else {
            //log.error("步行路线数据查询失败" + result);
          }
        }
      );
    },
    //路线规划
    pathPlanning() {
      let data = {
        key: "647b17e5508e7ae00b122df635fa4e25",
        origin: this.form.coordinate, //出发点
        destination: this.form.targetCoordinate, //目标点
      };
      axiosMap("v3/direction/walking", "get", data).then((res) => {
        // 使用通用函数,将整个地图的覆盖物清理掉
        this.map.clearMap();
        //生成路线
        this.setMap("panel");
      });
    },
    // 生成点标记
    setMarkers() {
      // 遍历 pois 列表, 让每个 poi 生成一个 marker
      this.markers = this.pois.map((poi, i) => {
        var marker = new AMap.Marker({
          title: poi.name, //周边地点名称
          position: poi.location.split(","), //周边地点坐标
          content: `
          <div class="image-container">
            <img src="https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/map-marker.png">
            <div class="number-overlay">${i + 1}</div>
          </div>
          <style scoped>
          .image-container {
            position: relative;
            display: inline-block;
          }


          .number-overlay {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 14px;
            color: white;
            padding: 5px;
            border-radius: 50%;
          }
          </style>`, //标记覆盖物的内容
          extData: poi.id, //将poi的id作为marker的id
          offset: AMap.Pixel(-16, -32),
        });
        // 设置每个点标记鼠标Hover事件
        // 传入当前的 poiId, 进行居中
        marker.on("mouseover", () => {
          return this.showMarker(poi.id);
        });
        return marker;
      });
      // 使用通用函数,将整个地图的覆盖物清理掉
      this.map.clearMap();
      //添加点标记
      this.map.add(this.markers);
      // 将地图的视图设为合适的大小
      this.map.setFitView();
    },
    // 控制坐标点，找到需要居中的标记
    showMarker(poiId) {
      // 外面传入 poiId
      this.markers.forEach((marker) => {
        // 判断标记的额外信息是否等于传进来的poiId
        // console.log(marker.getExtData());
        if (marker.getExtData() == poiId) {
          // 将匹配点置顶(重叠的情况)
          marker.setTop(true);
          //显示一个提示窗
          this.showTips(marker);
          // 设置地图以这个点居中
          this.map.setCenter(marker.getPosition());
        }
      });
    },
    // 居中时显示一个窗口
    showTips(marker) {
      //显示一个提示窗
      let markerTipContent = `
            <div class="card">
                <span class="arrow down"></span>
                <h5 class="card-title">${marker.getTitle()}</h5>
            </div>
            
            <style scoped>
            .card {
                margin:10px;
                position: relative;
                width: 150px;
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
                font-size: 16px;
                font-family: 'Roboto', sans-serif;
                margin-bottom: 3px;
            }

            .link-top {
                width: 100%;
                height: 4px;
                border-top: solid #737c7b 2px;
            }
            </style>
            `;
      const infoWindow = new AMap.InfoWindow({
        isCustom: true,
        content: markerTipContent,
        offset: new AMap.Pixel(16, -20), //偏移量
      });
      infoWindow.open(this.map, marker.getPosition());
    },
    handleClick(tab, event) {
      //选中不同的标签页的时候把tab.label传到searchAround()函数调用接口。
      this.searchAround(tab.label);
    },
    //清空数据
    clearData() {
      this.form = {
        location: "", //搜索地点
        chooseLocation: null, //搜索地点坐标
        coordinate: "", //起始地点
        origin: "", //起始地点
        targetCoordinate: "", //目标坐标
        targetLocation: "", //目标地点
      };
      this.pois = []; //周边搜索的数据
      this.tips = []; //搜索的地址列表
    },
  },
  beforeDestroy(){
    this.$store.commit('updateData', '')
  }
};
</script>

<style scoped>
.container {
  background: white;
  font-family: 'Roboto', sans-serif;
  height: 120vh;
}

#Map {
  width: 100%;
  height: 100%;
}

.infoDetail {
  float: left;
  height: 100vh;
  width: 680px;
}

.search {
  height: 35vh;
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);

}

.MapTab {
  height: 63vh;
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.mapDetail {
  margin-left: 690px;
  height: 100vh;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
}

.panel {
  position: relative;
  left: 20px;
  top: 20px;
  width: 300px;
  z-index: 12;
}


table tbody {
  display: block;
  height: 390px;
  width: 100%;
  overflow-y: scroll;
}

table {
  width: 100%;
}

tr {
  border-top: 1px solid #C1C3D1;
  border-bottom: 1px solid #C1C3D1;
  color: #666B85;
  font-size: 15px;
  font-weight: normal;
  text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
  width: 100%;
}

tr:hover td {
  background: #4E5066;
  color: #FFFFFF;
  border-top: 1px solid #22262e;
}

tr:first-child {
  border-top: none;
}

tr:last-child {
  border-bottom: none;
}

tr:nth-child(odd) td {
  background: #EBEBEB;
}

tr:nth-child(odd):hover td {
  background: #4E5066;
}

tr:last-child td:first-child {
  border-bottom-left-radius: 3px;
}

tr:last-child td:last-child {
  border-bottom-right-radius: 3px;
}

td {
  width: 300px;
  background: #FFFFFF;
  padding: 5px;
  text-align: left;
  vertical-align: middle;
  font-weight: 300;
  font-size: 15px;
  text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
  border-right: 1px solid #C1C3D1;
}

td:last-child {
  border-right: 0px;
}
</style>