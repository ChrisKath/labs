// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import VueFire from 'vuefire'

// load styling (less)
import '~/assets/style/core.less'

// load Components & plugs.
// import Firebase from '~/instance/fire'
// import Icon from '~/components/helpers/icon'
// const components = {
//   Icon
// }

// Install components.
// Object.keys(components).forEach(key => {
//   Vue.component(key, components[key])
// })

// Initialize Firebase
Vue.use(VueFire)

Vue.config.devtools = true
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
