import { NETWORK_STATUSES } from '@/services/http'
import * as api from '@/services/api'
import router from '@/router'

const state = {
  items: null,
  itemsNetworkStatus: NETWORK_STATUSES.WAITING
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
    commit('setNetworkStatus', NETWORK_STATUSES.GETTING)
    api.getItems()
      .then(items => {
        commit('setNetworkStatus', NETWORK_STATUSES.SUCCESS)
        commit('setItems', items)
      })
      .catch(() => {
        commit('setNetworkStatus', NETWORK_STATUSES.ERROR)
      })
  },
  updateItem ({ dispatch, commit }, item) {
    commit('setNetworkStatus', NETWORK_STATUSES.SUBMITTING)
    api.updateItem(item)
      .then(item => {
        commit('setNetworkStatus', NETWORK_STATUSES.SUCCESS)
        commit('setItem', item)
        dispatch('showInfo', 'Item saved')
      })
      .catch(() => {
        commit('setNetworkStatus', NETWORK_STATUSES.ERROR)
      })
  },
  createItem ({ dispatch, commit }, item) {
    commit('setNetworkStatus', NETWORK_STATUSES.SUBMITTING)
    api.createItem(item)
      .then(item => {
        commit('setNetworkStatus', NETWORK_STATUSES.SUCCESS)
        commit('insertItem', item)
        router.push('/items')
        dispatch('showInfo', 'Item created')
      })
      .catch(() => {
        commit('setNetworkStatus', NETWORK_STATUSES.ERROR)
      })
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
      item,
      ...state.items.slice(index + 1)
    ]
  },
  insertItem (state, item) {
    state.items = [
      ...state.items,
      item
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
