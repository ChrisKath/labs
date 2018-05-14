<template lang="html">
  <main id="app-wrap" aria-core="Core Program">

    <router-view />

  </main>
</template>

<script>
import FIRE from '~/instance/fire'
const CONFIG = 'channelmode=yes, height=640px, width=460px, top=8px'

export default {
  created () {
    window.addEventListener('keyup', e => {
      let HOST = `${window.location.origin}${
        process.env.NODE_ENV === 'production'
          ? '/temp/#'
          : '/#'
      }`

      /**
       * Add or Remove - Article lists
       */
      if (e.key === 'F2' || e.keyCode === 113) {
        // this.$router.push({ name: 'store' })
        window.open(`${HOST}/f2`, null, CONFIG)
      }

      /**
       * Authentication
       */
      if (e.key === 'F4' || e.keyCode === 115) {
        // this.$router.push({ name: 'auth' })
        window.open(`${HOST}/f4`, null, CONFIG)
      }

      /**
       * Logout
       */
      if (e.key === 'F9' || e.keyCode === 120) {
        FIRE.auth().signOut().then(res => {
          this.$router.push({
            name: 'index'
          })
        })
          .catch(err => console.error(err))
      }

      /**
       * Push to Homepage
       */
      if (e.key === 'Home' || e.keyCode === 36) {
        this.$router.push({
          name: 'index'
        })
      }
    }, false)
  }
}
</script>
