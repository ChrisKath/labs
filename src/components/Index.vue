<template lang="html">
  <div class="n-index">

    <Mockups v-for="(book, key) in books"
      :key="key"
      :data="book"
    />

  </div>
</template>

<script>
import { DB, SR } from '~/instance/fire'

export default {
  created () {
    let img = SR.ref('images/CReWRy4LOS9EOHkDb.jpg').getMetadata()
    console.log(img)
  },

  firebase: {
    books: DB.ref('books')
  }
}
</script>
