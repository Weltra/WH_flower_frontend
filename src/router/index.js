import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: {
      name: "Home"
    }
  },
  {
    path: "/Home",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/Login",
    name: "Login",
    component: LoginView
  },
  {
    path: '/Search',
    name: 'Search',
    component: resolve => require(['../views/SearchView.vue'], resolve),
  },
  {
    path: "/Map",
    name: "Map",
    component: resolve => require(['../views/MapCardView.vue'], resolve),
  },
  {
    path: "/Feedback",
    name: "Feedback",
    component: resolve => require(['../views/FeedbackView.vue'], resolve),
  },
  {
    path: "/Abstract/:id",
    name: "Abstract",
    component: resolve => require(['../views/AbstractView.vue'], resolve),
  },
  {
    path: "/Route",
    name: "Route",
    component: resolve => require(['../views/MapRouteView.vue'], resolve),
  },
  {
    path: "/User",
    name: "User",
    component: resolve => require(['../views/profile/index.vue'], resolve),
  },
  {
    path: "/MapSearch",
    name: "MapSearch",
    component: resolve => require(['../views/MapSearchView.vue'], resolve),
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  //登录及注册页面可以直接进入,而主页面需要分情况
  if (to.path == '/Login') {
    next();
  }
  else {
    if (from.path == "/Login")//从登录页面可以直接通过登录进入主页面
    {
      next();
    }
    else {
      //从/进入,如果登录状态是true，则直接next进入主页面
      if (sessionStorage['s'] === "true") {
        next();
      }
      else {
        //如果登录状态是false，那么跳转至登录页面,需要登录才能进入主页面
        next('/Login');
      }
    }
  }
})

export default router