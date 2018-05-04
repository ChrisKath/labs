<template lang="html">
  <main id="app-wrap" aria-core="Core Program">

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

    <Mockups />
  </main>
</template>

<script>
import Form from '~/instance/form'
import { REF } from '~/instance/fire'
import Mockups from '~/components/UIComponents/Mockups'

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
      REF('books').push(this.form)
      this.form.reset()
    },

    editBook (book) {
      REF('books').child(book['.key']).update({
        title: this.form.title,
        author: this.form.author
      })
      this.form.reset()
    },

    removeBook (book) {
      REF('books').child(book['.key']).remove()
    }
  },

  firebase: {
    books: REF('books')
  },

  components: {
    Mockups
  }
}
</script>
