import api from '@/services/api'

const state = {
  items: null
}

const getters = {
  allItems: state => state.all
}

const actions = {
  getAllItems ({ commit }) {
    api.getItems(items => {
      commit('setItems', items)
    })
  }
}

const mutations = {
  setItems (state, items) {
    state.all = items
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
