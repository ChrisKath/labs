<template lang="html">
  <main id="app-wrap" aria-core="Core Program">

    <Index />

    <Store v-if="modals.store"/>

    <Auth v-else-if="modals.auth" @signed="signed"/>

    <div class="n-add" @click="signed">
      <Icon type="plus-round"/>
    </div>

  </main>
</template>

<script>
import FIRE   from '~/instance/fire'
import AUTH   from '~/components/Auth'
import INDEX  from '~/components/Index'
import STORE  from '~/components/Store'

export default {
  data () {
    return {
      modals: {
        auth: false,
        store: false
      }
    }
  },

  created () {
    const ROOT = this
    window.addEventListener('keyup', e => {
      /**
       * Add or Remove - Article lists
       */
      if (e.key === 'F2' || e.keyCode === 113) {
        ROOT.signed()
      }

      /**
       * Authentication
       */
      if (e.key === 'F4' || e.keyCode === 115) {
        ROOT.authen()
      }

      /**
       * Logout
       */
      if (e.key === 'F9' || e.keyCode === 120) {
        FIRE.auth().signOut()
          .then(res => ROOT.closed())
          .catch(err => console.error(err))
      }

      /**
       * Push to Homepage
       * Close all modals
       */
      if (
        e.key === 'Home' || e.keyCode === 36 ||
        e.key === 'Escape' || e.keyCode === 27
      ) {
        ROOT.closed()
      }
    }, false)
  },

  methods: {
    authen () {
      this.closed()
      this.modals.auth = true
    },

    signed () {
      if (FIRE.auth().currentUser) {
        this.closed()
        this.modals.store = true
      } else {
        this.authen()
      }
    },

    closed () {
      Object.keys(this.modals).map(key => {
        this.modals[key] = false
      })
    }
  },

  components: {
    Auth: AUTH,
    Index: INDEX,
    Store: STORE
  }
}
</script>
