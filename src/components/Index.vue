<template lang="html">
  <div class="n-index">

    <Mockups v-for="(article, key) in articles"
      :key="key"
      :data="article"
    />

  </div>
</template>

<script>
import { DB, MAP } from '~/instance/fire'

export default {
  data () {
    return {
      articles: []
    }
  },

  created () {
    DB.collection('articles').onSnapshot(querySnapshot => {
      let store = []
      querySnapshot.forEach(doc => {
        store.push(MAP(doc))
      })

      this.articles = store
    })
  }
}
</script>
