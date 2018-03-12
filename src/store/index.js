import Vue from 'vue'
import Vuex from 'vuex'
import itemsStore from './modules/items-store'
import messageStore from './modules/message-store'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    itemsStore,
    messageStore
  },
  strict: debug
})
