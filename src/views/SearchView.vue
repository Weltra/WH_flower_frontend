<template>
  <div>

    <body>
      <header class="page-header">
        <div class="site-name">
          <img src="../assets/logo.png" class="logo">
        </div>
        <div class="menu-container">
          <nav>
            <ul class="menu" role="list" style="list-style-type:none">
              <li><router-link to="/Home"><a>主页</a></router-link></li>
              <li><router-link to="/Map"><a>赏花地图</a></router-link></li>
              <li><router-link to="/Feedback"><a>我的发现</a></router-link></li>
              <li><router-link to="/Route"><a>路线展示</a></router-link></li>
              <li><router-link to="/User"><a style="font-size: 18px;"><i class="el-icon-user-solid"></i></a></router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="search-wrapper">
          <div class="search-bar">
            <div class="search-controls">
              <button class="magnifier material-icons" @click="search">
                <span>search</span>
              </button>
              <input type="text" placeholder="搜索赏花点名称或花卉品种" v-model="searchText" style="background-color: white">
              <button class="magnifier material-icons" @click="search">
                <span>search</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <ul>
          <li v-for="item in items" :key="item.id" class="skeleton">
            <div class="skeleton__block">
              <img :src="item.imgURL" alt="" />
            </div>
            <div class="skeleton__block">
              <h3>{{ item.name }}</h3>
              <p><b><i class="el-icon-map-location"></i>位置：</b>{{ item.description }}</p>
            </div>
            <div class="skeleton__block">
              <p><b><i class="el-icon-money"></i>门票价格：</b>{{ item.ticket }}</p>
              <p><b><i class="el-icon-time"></i>开放时间：</b>{{ item.open_time }}</p>
              <p><b><i class="el-icon-picture-outline-round"></i>花卉品种：</b>{{ item.flower_class }}</p>
            </div>
          </li>
        </ul>
      </main>
    </body>
  </div>
</template>

<script>
export default ({
  data() {
    return {
      searchText: '',
      items: [
      ],
      keywords: []
    };
  },
  created() {
    this.$axios.get('http://127.0.0.1:8000/map_points/', {
    }).then((res) => {
      this.items = res.data.Points
    }).catch(err => {
      console.log(err);
      this.$message.error('加载失败，请检查网络！');
    })
  },
  computed: {
  },
  methods: {
    wordsCut(manage) {
      let words = manage.split(",")
      return words
    },
    search() {
      this.keywords = this.searchText.split(' ')
      this.$axios.post('http://127.0.0.1:8000/search_points/', this.keywords).then((res) => {
        this.items = res.data.Points
        this.$message({
          message: '搜索成功！',
          type: 'success'
        });
      }).catch(err => {
        console.log(err);
        this.$message.error('搜索失败，请检查网络！');
      })
    },
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
  }
})
</script>

<style scoped>
@import "open-props/open-props.min.css" layer(open-props);
@import "open-props/normalize.min.css" layer(open-props);

@font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url("../assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2") format('woff2');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}

body {
  font-family: system-ui, sans-serif;
  background: linear-gradient(to bottom,
      hsl(0, 0%, 100%) 0%,
      hsl(219.19, 55.23%, 99.76%) 20%,
      hsl(0, 100%, 95%) 35%,
      hsl(0, 100%, 92%) 50%,
      hsl(0, 100%, 89%) 65%,
      hsl(0, 100%, 86%) 80%,
      hsl(0, 100%, 83%) 100%);
  min-height: 100vh;
}

header {
  position: sticky;
  top: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  background-color: white;
  transition: box-shadow 200ms cubic-bezier(0.33, 1, 0.68, 1);
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

.menu-container {
  width: 350px;
  float: right;
}

.menu {
  display: flex;
  right: 32px;
  gap: 1rem;
  position: relative;
}

.menu a {
  color: inherit;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.6);
}

.search-wrapper {
  position: absolute;
  top: 40px;
  right: 0;
  left: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 700px;
  background: var(--surface-1);
  max-width: calc(80vw);
  animation: shadow both;
  animation-delay: exit 50%;
  background-color: white;
}

.search-bar {
  z-index: 2;
  height: 80px;
  background: var(--surface-1);
  width: var(--size-md);
  background-color: white;
}

.search-controls {
  width: 100%;
  position: relative;
  animation: shrink both ease-in-out;
  animation-delay: exit -100%;
  background-color: white;
}

.search-controls button {
  background: transparent;
  color: var(--text-1);
}

.magnifier {
  position: absolute;
  left: 1rem;
  top: 50%;
  width: 48px;
  height: 48px;
  display: inline-block;
  transform: translateY(-50%);
}

input {
  width: 100%;
  height: 48px;
  border-radius: 24px;
  line-height: 48px;
  border: 3.5px solid var(--text-1);
  padding: 0 calc(48px + 1rem);
  background: var(--surface-2);
}

main {
  width: var(--size-md);
  max-width: 100%;
  margin: 0 auto;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

ul {
  padding-top: var(--size-8);
  display: grid;
  gap: var(--size-4);
}

.skeleton {
  --surface: var(--surface-2);
  --block: var(--surface-3);
  --padding: var(--size-4);
  padding: var(--padding);
  gap: var(--padding);
  width: 100%;
  display: grid;
  grid-template: 1fr 1fr / 25% 1fr;
  background: var(--surface);
  background-color: white;
  max-inline-size: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.skeleton__block h3 {
  font-size: 30px;
}

.skeleton__block {
  background: var(--block);
  background-color: rgba(240, 248, 255, 0.3);
}

.skeleton__block:first-of-type {
  grid-row: 1 / -1;
  aspect-ratio: 1;
}

.skeleton__block:last-of-type {
  margin-top: 0;
}
</style>