<template lang="html">
  <main id="app-wrap" aria-core="Core Program">

    <router-view />

  </main>
</template>

<script>
export default {
  created () {
    window.addEventListener('keyup', e => {
      if (e.key === 'F2' || e.keyCode === 113) {
        this.$router.push({
          name: 'store'
        })
      }

      if (e.key === 'F4' || e.keyCode === 115) {
        this.$router.push({
          name: 'auth'
        })
      }

      if (e.key === 'Home' || e.keyCode === 36) {
        this.$router.push({
          name: 'index'
        })
      }
    }, false)
  }
}
</script>
