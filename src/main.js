import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'; // 导入 elementUI
import 'element-ui/lib/theme-chalk/index.css'; // 导入 css

Vue.use(ElementUI);
Vue.prototype.$axios = axios
Vue.prototype.qs = qs


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
