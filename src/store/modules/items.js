import * as api from '@/services/api'

const state = {
  items: null,
  itemsNetworkStatus: api.NETWORK_STATUSES.WAITING
}

const getters = {
  allItems: state => state.items,
  getItem: (state) => {
    return (itemId) => {
      if (state.items) {
        return state.items.find(item => item.id === parseInt(itemId, 10))
      }
      return null
    }
  },
  getItemsNetworkStatus: state => state.itemsNetworkStatus
}

const actions = {
  getItems ({ commit }) {
    commit('setNetworkStatus', api.NETWORK_STATUSES.GETTING)
    api.getItems()
      .then(items => {
        commit('setNetworkStatus', api.NETWORK_STATUSES.SUCCESS)
        commit('setItems', items)
      })
      .catch(() => {
        commit('setNetworkStatus', api.NETWORK_STATUSES.ERROR)
      })
  },
  updateItem ({ dispatch, commit }, item) {
    commit('setNetworkStatus', api.NETWORK_STATUSES.SUBMITTING)
    setTimeout(() => {
      commit('setNetworkStatus', api.NETWORK_STATUSES.SUCCESS)
      commit('setItem', item)
      dispatch('showInfo', 'Item saved')
    }, 1000)
  }
}

const mutations = {
  setItems (state, items) {
    state.items = items
  },
  setItem (state, item) {
    const index = state.items.findIndex(i => i.id === item.id)
    state.items = [
      ...state.items.slice(0, index),
      {...item},
      ...state.items.slice(index + 1)
    ]
  },
  setNetworkStatus (state, status) {
    state.itemsNetworkStatus = status
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
