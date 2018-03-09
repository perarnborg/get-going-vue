import 'core-js/fn/object/assign'
import 'core-js/fn/array/find'
import 'core-js/fn/array/find-index'
import 'core-js/fn/promise'

import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuelidate)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
