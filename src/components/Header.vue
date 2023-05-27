<template>
  <header id="page-header">
    <div class="site-name">
      <img src="../assets/logo.png" class="logo">
    </div>
    <nav>
      <ul class="menu" role="list" style="list-style-type:none">
        <li v-for="item, index in routelist" :key="index"><router-link
            :to="{ path: item.route }"><a>{{ item.name }}</a></router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      test: [
        { route: '/Home', name: '主页' },
        { route: '/Search', name: '搜索' },
        { route: '/Map', name: '地图' },
        { route: '/Feedback', name: '上传测试' },
        { route: '/Route', name: '路线展示' },
        { route: '/User', name: '个人中心' }
      ]
    }
  },
  props: {
    routelist: {
      type: Array,
      required: true
    },
  },
}
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
</style>