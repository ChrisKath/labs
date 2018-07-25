// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'

/**
 * Initialize Components & plugins.
 */
import '~/assets/style/core.less'

/**
 * Initialize Components & plugins.
 */
import Moment from 'vue-moment'
import Icon from '~/components/helpers/icon'
import Modals from '~/components/helpers/Modals'
import Mockups from '~/components/helpers/Mockups'
import Notice from '~/components/helpers/Notice'
import Loader from '~/components/helpers/Loader'
const components = {
  Icon,
  Modals,
  Mockups,
  Notice,
  Loader
}

/**
 * Installation components.
 */
Object.keys(components).forEach(key => {
  Vue.component(key, components[key])
})

/**
 * Initialize Firebase.
 */
Vue.use(Moment)
Vue.prototype.PORT = 'https://firebasestorage.googleapis.com/v0/b/touch-d0c06.appspot.com/o/'
Vue.prototype.NOTICE = Notice

Vue.config.devtools = process.env.NODE_ENV !== 'production'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
