<template lang="html">
  <div class="n-store">
    <div class="n-intro">
      <h1>Vue.js 2 &amp; Firebase Sample Application</h1>
    </div>

    <div class="n-form" @submit.prevent="onSubmit">
      <input type="text" placeholder="Title" v-model="form.title"/>
      <input type="text" placeholder="Author" v-model="form.author"/>
      <button type="button" @click="addBook">TOUCH</button>
    </div>

    <div class="n-list">
      <div class="n-li" v-for="(book, key) in books" :key="key">
        <span>{{ book.title }}</span>
        <span>{{ book.author }}</span>
        <span class="n-li-del" @click="removeBook(book)">REMOVE</span>
        <span class="n-li-del" @click="editBook(book)">EDIT</span>
      </div>
    </div>
  </div>
</template>

<script>
import Form from '~/instance/form'
import { DB } from '~/instance/fire'

export default {
  data () {
    return {
      form: new Form({
        title: null,
        author: null
      })
    }
  },

  methods: {
    addBook () {
      const FORM = Object.assign({}, this.form)
      FORM.timestamp = Date.now()
      DB.ref('books').push(FORM)
      this.form.reset()
    },

    editBook (book) {
      DB.ref('books').child(book['.key']).update({
        title: this.form.title,
        author: this.form.author,
        timestamp: Date.now()
      })
      this.form.reset()
    },

    removeBook (book) {
      DB.ref('books').child(book['.key']).remove()
    }
  },

  firebase: {
    books: DB.ref('books')
  }
}
</script>

<style lang="less" scoped>
.n-store {
  background-color: darken(#363E4F, 10%);
  padding: 10vh 0;
  height: 100vh;
}
</style>
