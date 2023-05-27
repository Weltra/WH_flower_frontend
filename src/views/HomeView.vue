<template>
  <div>
    <body>
      <header id="page-header">
        <div class="site-name">
          <img src="../assets/logo.png" class="logo">
        </div>
        <nav>
          <ul class="menu" role="list" style="list-style-type:none">
            <li><router-link to="/Search"><a>搜索</a></router-link></li>
            <li><router-link to="/Map"><a>地图</a></router-link></li>
            <li><router-link to="/MapSearch"><a>周边搜索</a></router-link></li>
            <li><router-link to="/Feedback"><a>我的发现</a></router-link></li>
            <li><router-link to="/Route"><a>路线展示</a></router-link></li>
            <li><router-link to="/User"><a>用户中心</a></router-link></li>
          </ul>
        </nav>
      </header>
      <main>
        <div class="photo-grid">
          <div v-for="(photo, index) in photolist" @click="jumpTo(photo.id)" :key="index"
            :style="{ 'background-image': 'url(' + photo.imageUrl + ')' }" :class="photo.class">
          </div>
        </div>
      </main>
    </body>
  </div>
</template>

<script>
export default ({
  data() {
    return {
      photolist: [
        { id: 1, class: "card card-tall card-wide", name: '东湖磨山樱园', imageUrl: "https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/yinghua/%E4%B8%9C%E6%B9%96%E6%A8%B1%E5%9B%AD1.jpeg" },
        { id: 2, class: "card card-wide", name: '青山公园', imageUrl: "https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/yinghua/%E9%9D%92%E5%B1%B1%E5%85%AC%E5%9B%AD%E6%A8%B1%E8%8A%B12.png" },
        { id: 3, class: "card", name: '长春观', imageUrl: "https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/yulanhua/%E9%95%BF%E6%98%A5%E8%A7%82%E7%8E%89%E5%85%B0%E8%8A%B13.jpg" },
        { id: 4, class: "card card-tall", name: '王家墩公园', imageUrl: "https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/xiuqiuhua/%E7%8E%8B%E5%AE%B6%E5%A2%A9%E5%85%AC%E5%9B%AD%E7%BB%A3%E7%90%83%E8%8A%B11.png" },
        { id: 5, class: "card card-tall", name: '武汉园博园', imageUrl: "https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/MapCard/10%E6%AD%A6%E6%B1%89%E5%9B%AD%E5%8D%9A%E5%9B%AD.png" },
        { id: 6, class: "card card-tall card-wide", name: '武汉植物园', imageUrl: "https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/yujinxiang/%E6%AD%A6%E6%B1%89%E6%A4%8D%E7%89%A9%E5%9B%AD%E9%83%81%E9%87%91%E9%A6%99.jpeg" },
        { id: 7, class: "card card-tall", name: '解放公园', imageUrl: "https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/MapCard/2%E8%A7%A3%E6%94%BE%E5%85%AC%E5%9B%AD.jpg" },
        { id: 8, class: "card", name: '西北湖绿化广场', imageUrl: "https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/yinghua/%E8%A5%BF%E5%8C%97%E6%B9%96%E7%BB%BF%E5%8C%96%E5%B9%BF%E5%9C%BA%E6%A8%B1%E8%8A%B12.jpg" },
        { id: 9, class: "card", name: '珞喻路大黄村公交车站', imageUrl: "https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/yinghua/%E7%8F%9E%E5%96%BB%E4%B8%9C%E8%B7%AF%E5%A4%A7%E9%BB%84%E6%9D%91%E5%85%AC%E4%BA%A4%E8%BD%A6%E7%AB%991.jpg" },
        { id: 10, class: "card card-tall card-wide", name: '武汉大学', imageUrl: "https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/yinghua/%E6%AD%A6%E6%B1%89%E5%A4%A7%E5%AD%A6%E6%A8%B1%E8%8A%B11.jpg" },
        { id: 11, class: "card card-tall", name: '马鞍山森林公园', imageUrl: "https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/youcaihua/%E6%B2%B9%E8%8F%9C%E8%8A%B1-%E5%B0%8F%E7%8B%97.jpg" },
        { id: 12, class: "card card-wide", name: '郁金香主题公园', imageUrl: "https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/MapCard/4%E9%83%81%E9%87%91%E9%A6%99%E4%B8%BB%E9%A2%98%E5%85%AC%E5%9B%AD.jpg" },
        { id: 13, class: "card card-tall", name: '沙湖公园', imageUrl: "https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/xiuqiuhua/%E6%B2%99%E6%B9%96%E5%85%AC%E5%9B%AD%E7%BB%A3%E7%90%83%E8%8A%B11.jpg" },
        { id: 14, class: "card card-tall card-wide", name: '汉口江滩', imageUrl: "https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/yinghua/%E6%B1%89%E5%8F%A3%E6%B1%9F%E6%BB%A9%E6%A8%B1%E8%8A%B12.jpg" },
        { id: 15, class: "card card-tall", name: '东湖梅园', imageUrl: "https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/meihua/%E6%A2%85%E8%8A%B1.jpeg" },
        { id: 16, class: "card card-tall  card-wide", name: '花博会', imageUrl: "https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/MapCard/3%E8%8A%B1%E5%8D%9A%E4%BC%9A.jpg" },
        { id: 17, class: "card", name: '樱花溪公园', imageUrl: "https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/yinghua/%E6%A8%B1%E8%8A%B1%E6%BA%AA%E5%85%AC%E5%9B%AD%E6%A8%B1%E8%8A%B13.jpg" },
        { id: 18, class: "card card-wide", name: '堤角公园', imageUrl: "https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/yinghua/%E5%A0%A4%E8%A7%92%E5%85%AC%E5%9B%AD%E6%A8%B1%E8%8A%B15.jpg" },
      ]
    }
  },
  mounted() {
    const header = document.getElementById("page-header");
    const intercept = document.createElement("div");
    intercept.setAttribute("data-observer-intercept", "");
    header.before(intercept);

    const observer = new IntersectionObserver(([entry]) => {
      header.classList.toggle("active", !entry.isIntersecting);
    });
    observer.observe(intercept);
  },
  methods: {
    jumpTo(id) {
      this.$router.push({ path: "Abstract/" + id });
    }
  }
})
</script>

<style scoped>
@import "open-props/open-props.min.css" layer(open-props);
@import "open-props/normalize.min.css" layer(open-props);

header {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  background-color: white;
  z-index: 1;
}

header.active {
  box-shadow: hsla(0 0% 0% / 0.1) 0 0.5rem 1rem;
  transition-duration: 400ms;
}

.site-name {
  width: 200px;
  float: left;
}

.logo {
  width: 200px;
  position: relative;
  left: 30px;
}

.menu {
  display: flex;
  gap: 1rem;
  margin-top: 48px;
  margin-right: 110px;
}

.menu a {
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.6);
}

main {
  height: 213vh;
  margin-block-start: 5rem;
  margin: 0 auto;
}

.mainbox {
  text-align: center;
}

body {
  font-family: system-ui, sans-serif;
  background: linear-gradient(to bottom,
      hsl(0, 0%, 100%) 0%,
      hsl(219.19, 55.23%, 99.76%) 10%,
      hsl(0, 100%, 95%) 25%,
      hsl(0, 100%, 92%) 45%,
      hsl(0, 100%, 89%) 65%,
      hsl(0, 100%, 86%) 80%,
      hsl(0, 100%, 83%) 100%);
}

* {
  box-sizing: border-box;
}

.photo-grid {
  height: 100%;
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  grid-auto-rows: 220px;
  margin-right: 8px;
  margin-left: 8px;
  margin-top: 8px;
}

.card {
  height: 100%;
  width: 100%;
  border-radius: 4px;
  transition: transform 200ms ease-in-out;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.card:hover {
  box-shadow: rgba(2, 8, 20, 0.1) 0px 0.35em 1.175em,
    rgba(2, 8, 20, 0.08) 0px 0.175em 0.5em;
  transform: translateY(-3px) scale(1.03);
}

@media screen and (min-width: 600px) {
  .card-tall {
    grid-row: span 2 / auto;
  }

  .card-wide {
    grid-column: span 2 / auto;
  }
}
</style>
