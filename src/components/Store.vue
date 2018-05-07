<template lang="html">
  <div class="n-store">
    <div class="n-intro">
      <h1>Vue.js 2 &amp; Firebase Sample Application</h1>
    </div>

    <div class="n-form" @submit.prevent="onSubmit">
      <input type="text" placeholder="Title" v-model="form.title"/>
      <input type="text" placeholder="Author" v-model="form.author"/>
      <input type="file" accept="image/*" @change="handleFiles" />
      <button type="button" @click="addBook">TOUCH</button>
    </div>

    <div class="n-list">
      <div class="n-li" v-for="(book, key) in books" :key="key">
        <span>{{ book.title }}</span>
        <span>{{ book.author }}</span>
        <span class="n-li-del" @click="removeBook(book)">REMOVE</span>
      </div>
    </div>
  </div>
</template>

<script>
import Form from '~/instance/form'
import { DB, SR } from '~/instance/fire'

export default {
  data () {
    return {
      form: new Form({
        title: null,
        author: null
      }),
      temp: null
    }
  },

  methods: {
    addBook () {
      if (!this.temp) return console.warn('Something went wrong!!')

      const FORM = Object.assign({}, this.form)
      const F = this.temp
      const N = `${Date.now()}${this.fileType(F.name)}`

      SR.child(N).put(F, { contentType: F.type })
        .then(snapshot => {
          FORM.timestamp = Date.now()
          FORM.image = snapshot.downloadURL.replace(this.port, '')

          DB.ref('books').push(FORM)
          this.form.reset()
        })
        .catch(err => console.error(err))
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
      let J = book.image
      let N = J.substr(J.indexOf('?'), J.length)

      SR.child(J.replace(N, '')).delete()
        .then(bak => {
          DB.ref('books').child(book['.key']).remove()
        })
        .catch(err => console.error(err))
    },

    handleFiles () {
      this.temp = event.target.files[0]
    },

    fileType (name) {
      return name.substr(name.indexOf('.'), name.length)
    }
  },

  firebase: {
    books: DB.ref('books')
  }
}
</script>

<style lang="less" scoped>
.n-store {
  height: 100vh;
  padding: 15px;
  background-color: darken(#363E4F, 10%);
}
</style>
