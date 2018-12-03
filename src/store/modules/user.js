import * as utils from '../../utils'
import http from '../../api/http'

const state = {
  token: utils.storage.get('token'),
  userInfo: utils.storage.get('userInfo')
}

const getters = {}

const actions = {
  login (context, form) {
    return new Promise((resolve, reject) => {
      http.post('/m1/login/login', form).then(response => {
        if (response.code === 0) {
          context.commit('setToken', response.data.token)
          context.commit('setUserInfo', response.data.userInfo)
        }
        resolve(response)
      }).catch(error => { reject(error) })
    })
  }
}

const mutations = {
  logout (state) {
    utils.storage.remove('token')
    state.token = null
  },
  setToken: (state, data) => {
    utils.storage.set('token', data)
    state.token = data
  },
  setUserInfo: (state, data) => {
    utils.storage.set('userInfo', data)
    state.userInfo = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
