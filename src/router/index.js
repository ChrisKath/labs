import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const INDEX = r => import('~/components/Index')
const STORE = r => import('~/components/Store')

export default new Router({
  scrollBehavior: r => ({
    x: 0,
    y: 0
  }),
  fallback: false,
  routes: [
    {
      path: '/',
      name: 'index',
      component: INDEX
    },
    {
      path: '/f2',
      name: 'store',
      component: STORE
    }
  ]
})
