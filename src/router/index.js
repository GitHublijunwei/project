import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import store from '../store'
import Router from 'vue-router'
import Layout from '../pages/layout/index.vue'
import Home from '../pages/home/index.vue'
import strategy from '../pages/home/strategy.vue'
import detail from '../pages/home/detail.vue'
import QRcode from '../pages/home/QRcode.vue'
import buyCard from '../pages/home/buyCard.vue'
import waitExplore from '../pages/home/waitExplore.vue'
import ads from '../pages/home/ads'
import customer from '../pages/home/customer'
import wallet from '../pages/home/wallet'
import pay from '../pages/home/pay'
import wonderful from '../pages/home/wonderful'

//  登录
import login from '../pages/auth/login.vue'
import register from '../pages/auth/register.vue'
import forget from '../pages/auth/forget.vue'

// 任务中心
import Task from '../pages/task/index'
import hall from '../pages/task/hall'
import senior from '../pages/task/senior'
//  个人中心
import my from '../pages/my/index.vue'
import team from '../pages/my/team'
import level from '../pages/my/level'
import ordinary from '../pages/my/ordinary'
import information from '../pages/my/information'
import binding from '../pages/my/binding'

Vue.use(Router)
Vue.use(VueClipboard)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: Home,
          name: 'home',
          meta: {navShow: true, title: '首页', isShowNav: true, goBack: true}
        }, {
          path: '/task',
          component: Task,
          name: 'task',
          meta: {navShow: true, title: '任务中心', isShowNav: true, goBack: true}
        }, {
          path: '/hall',
          component: hall,
          name: 'hall',
          meta: {navShow: false, title: '任务大厅', isShowNav: true}
        }, {
          path: '/senior',
          component: senior,
          name: 'senior',
          meta: {navShow: false, title: '高级任务大厅', isShowNav: true}
        }, {
          path: '/strategy',
          component: strategy,
          name: 'strategy',
          meta: {navShow: false, title: '公告', isShowNav: true}
        }, {
          path: '/detail',
          component: detail,
          name: 'detail',
          meta: {navShow: false, title: '公告详情', isShowNav: true}
        }, {
          path: '/QRcode',
          component: QRcode,
          name: 'QRcode',
          meta: {navShow: false, title: '推广二维码', isShowNav: true}
        }, {
          path: '/wonderful',
          component: wonderful,
          name: 'wonderful',
          meta: {navShow: false, title: '点赞赚钱', isShowNav: true}
        }, {
          path: '/buyCard',
          component: buyCard,
          name: 'buyCard',
          meta: {navShow: false, title: '购买会员', isShowNav: true}
        }, {
          path: '/ads',
          component: ads,
          name: 'ads',
          meta: {navShow: false, title: '广告投放', isShowNav: true}
        }, {
          path: '/customer',
          component: customer,
          name: 'customer',
          meta: {navShow: false, title: '客服中心', isShowNav: true}
        }, {
          path: '/wallet',
          component: wallet,
          name: 'wallet',
          meta: {navShow: false, title: '我的钱包', isShowNav: true}
        }, {
          path: '/waitExplore',
          component: waitExplore,
          name: 'waitExplore',
          meta: {navShow: false, title: '即将上线', isShowNav: true}
        }, {
          path: '/my',
          component: my,
          name: 'my',
          meta: {navShow: true, title: '个人中心', isShowNav: false, goBack: true}
        }, {
          path: '/team',
          component: team,
          name: 'team',
          meta: {navShow: false, title: '我的团队', isShowNav: true}
        }, {
          path: '/level',
          component: level,
          name: 'level',
          meta: {navShow: false, title: '一级会员', isShowNav: true}
        }, {
          path: '/ordinary',
          component: ordinary,
          name: 'ordinary',
          meta: {navShow: false, title: '普通会员', isShowNav: true}
        }, {
          path: '/information',
          component: information,
          name: 'information',
          meta: {navShow: false, title: '个人资料', isShowNav: true}
        }, {
          path: '/binding',
          component: binding,
          name: 'binding',
          meta: {navShow: false, title: '绑定银行卡', isShowNav: true}
        }, {
          path: '/pay',
          component: pay,
          name: 'pay',
          meta: {navShow: false, title: '确认支付', isShowNav: true}
        }
      ]
    }, {
      path: '/forget',
      component: forget,
      name: 'forget'
    }, {
      path: '/login',
      component: login,
      name: 'login'
    }, {
      path: '/register',
      component: register,
      name: 'register'
    }],
  scrollBehavior (to, from, savePosition) { // 在点击浏览器的“前进/后退”，或者切换导航的时候触发。
    return {x: 0, y: 0}
  }
})
const whiteList = ['login', 'register', 'forget']

router.beforeEach(function (to, from, next) {
// 登录拦截
  if (whiteList.indexOf(to.name) < 0 && !store.state.user.token) {
    next({
      path: '/login',
      query: {redirect: to.fullPath}
    })
  } else {
    next()
  }
})

export default router
