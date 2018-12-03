// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {Group, Cell, CellBox, ToastPlugin, LoadingPlugin, Selector} from 'vux'
import VueScroller from 'vue-scroller'
// import FastClick from 'fastclick'
// import VueRouter from 'vue-router'
import router from './router/'
import store from './store/'
import http from './api/http'
import App from './App.vue'
import plugin from './plugin/'
import '../static/libs/iconfont/iconfont.css'
import 'animate.css'

// import BaiduMap from 'vue-baidu-map'
// Vue.use(BaiduMap, {
//   // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
//   ak: 'E4805d16520de693a3fe707cdc962045&services=&t=20180823194355'
// })

// Vue.use(VueRouter)
Vue.use(VueScroller)
Vue.use(plugin, {router: router})
// FastClick.attach(document.body)
Vue.config.productionTip = false

// 全局注册vux组件
Vue.component('cell', Cell)
Vue.component('cell-box', CellBox)
Vue.component('group', Group)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(Selector)
// 封装axios
Vue.prototype.$http = http

/* eslint-disable no-new */
const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')

// 配置html plus 环境
document.addEventListener('plusready', function () {
  // 设置一个全局plusready状态
  store.state.isplusReady = true

  // 监听返回按键
  let now = false
  let time = null
  plus.key.addEventListener('backbutton', function () {
    // 如果是首页则执行退出操作
    if (app.$route.path === '/home' || app.$route.path === '/login') {
      clearInterval(time)
      if (now) {
        now = false
        plus.runtime.quit()
      } else {
        now = true
        plus.nativeUI.toast('再按一次退出', { duration: 'short' })
        time = setTimeout(() => {
          now = false
        }, 1000)
      }
      // 如果是内页则执行路由返回操作
    } else {
      router.go(-1)
    }
  })
})
