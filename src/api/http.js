import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import router from '../router/index'
import qs from 'qs'

// axios.defaults.timeout = 20000
// axios.defaults.baseURL = '/api'
let baseApiUrl = window.location.host
if (baseApiUrl.indexOf('192.168') !== -1 || baseApiUrl.indexOf('localhost') !== -1) {
  baseApiUrl = '/api'
} else {
  baseApiUrl = 'http://www.uyer.top/api'
}
axios.defaults.baseURL = baseApiUrl
// 设置默认请求头
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-type': 'application/x-www-form-urlencoded'
}

// 序列化参数
axios.defaults.transformRequest = (data) => {
  data = qs.stringify(data)
  return data
}

let cancel = {}
let promiseArr = {}
const CancelToken = axios.CancelToken

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // 发起请求时，取消掉当前正在进行的相同请求
    if (promiseArr[config.url]) {
      // promiseArr[config.url]('请勿频繁操作')
      promiseArr[config.url] = cancel
    } else {
      promiseArr[config.url] = cancel
    }
    const token = store.state.user.token
    if (token) {
      config.headers.token = token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    response = response.data
    if (response.code === 403) {
      store.commit('user/logout')
      // 只有在当前路由不是登录页面才跳转
      router.currentRoute.path !== 'login' && router.replace({
        path: 'login',
        query: {redirect: router.currentRoute.fullPath}
      })
    } else {
      return response
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 403:
          // 403 清除token信息并跳转到登录页面
          store.commit('user/logout')

          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.path !== 'login' && router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
          break
        default:
          error.message = `连接错误：${error.response.status}`
      }
    }
    return Promise.reject(error)
  }
)

export default {
  // get请求
  get (url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      }).catch(error => {
        Vue.$vux.toast.show({
          position: 'default',
          time: '3000',
          type: 'warn',
          'is-show-mask': true,
          text: error.message
        })
        reject(error)
      })
    })
  },
  // post请求
  post (url, param) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: param,
        cancelToken: new CancelToken(c => {
          cancel = c
        })
      }).then(res => {
        resolve(res)
      }).catch(error => {
        Vue.$vux.toast.show({
          position: 'default',
          time: '3000',
          type: 'warn',
          'is-show-mask': true,
          text: error.message
        })
        reject(error)
      })
    })
  }
}
