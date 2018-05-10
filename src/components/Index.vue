<template lang="html">
  <div class="n-index">

    <Mockups v-for="(article, key) in articles"
      :key="key"
      :data="article"
    />

  </div>
</template>

<script>
import { DB } from '~/instance/fire'

export default {
  firebase: {
    articles: DB.ref('articles')
  }
}
</script>
