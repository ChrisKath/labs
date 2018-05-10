import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const INDEX = () => import('~/components/Index')
const STORE = () => import('~/components/Store')
const AUTH  = () => import('~/components/Auth')

export default new Router({
  scrollBehavior: r => ({
    x: 0,
    y: 0
  }),
  fallback: false,
  routes: [
    { path: '*', component: INDEX },
    {
      path: '/',
      name: 'index',
      component: INDEX
    },
    {
      path: '/f2',
      name: 'store',
      component: STORE
    },
    {
      path: '/f4',
      name: 'auth',
      component: AUTH
    }
  ]
})
