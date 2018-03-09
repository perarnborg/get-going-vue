const state = {
  message: null
}

const getters = {
  getMessage: (state) => {
    return state.message
  }
}

let timeout

const actions = {
  showInfo ({ dispatch }, text) {
    dispatch('showMessage', {text: text})
  },
  showError ({ dispatch }, text) {
    dispatch('showMessage', {text: text, type: 'error'})
  },
  showMessage ({ commit }, message = {}) {
    clearTimeout(timeout)
    message = {
      text: '',
      type: 'info',
      ...message
    }
    commit('setMessage', message)
    timeout = setTimeout(() => {
      commit('clearMessage')
    }, 3000)
  },
  hideMessage ({ commit }) {
    commit('clearMessage')
  }
}

const mutations = {
  setMessage (state, message) {
    state.message = message
  },
  clearMessage (state) {
    state.message = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
