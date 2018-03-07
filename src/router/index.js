import Vue from 'vue'
import Router from 'vue-router'
import Start from './routes/Start'
import FormComponents from './routes/FormComponents'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Start
    },
    {
      path: '/form-elements',
      name: 'FormComponents',
      component: FormComponents
    }
  ]
})
