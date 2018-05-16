<template lang="html">
  <Loader v-if="!articles.length"/>
  <div v-else class="n-index">

    <Mockups v-for="(article, key) in articles"
      :key="key"
      :data="article"
    />

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  created () {
    this.real()
  },

  methods: mapActions({
    real: 'manage.end/getArticlesSnapshot'
  }),

  computed: mapGetters({
    articles: 'manage.end/articles'
  })
}
</script>
