import * as api from '@/services/api'

const state = {
  items: null
}

const getters = {
  allItems: state => state.items
}

const actions = {
  getItems ({ commit }) {
    api.getItems()
      .then(items => {
        commit('setItems', items)
      })
  }
}

const mutations = {
  setItems (state, items) {
    state.items = items
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
