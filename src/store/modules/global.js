const state = () => ({
  isLoading: false
})

const getters = {}

const actions = {}

const mutations = {
  updateLoadingStatus (state, payload) {
    state.isLoading = payload.isLoading
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
