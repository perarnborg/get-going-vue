import Vue from 'vue'
import Router from 'vue-router'
import Start from './routes/Start'
import FormComponents from './routes/FormComponents'
import Items from './routes/Items'
import Item from './routes/Item'

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
    },
    {
      path: '/items',
      name: 'Items',
      component: Items
    },
    {
      path: '/items/:itemId',
      name: 'Item',
      component: Item,
      props: true
    }
  ]
})
