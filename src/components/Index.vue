<template lang="html">
  <div class="n-index">

    <Mockups v-for="(book, key) in books" :key="key"
      :data="book"/>

  </div>
</template>

<script>
import { REF } from '~/instance/fire'

export default {
  firebase: {
    books: REF('books')
  }
}
</script>
