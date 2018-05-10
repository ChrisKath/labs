<template lang="html">
  <div class="n-store">
    <div class="n-intro">
      <h1>Vue.js 2 &amp; Firebase Sample Datastore</h1>
    </div>

    <div class="n-form">
      <input type="text" class="n-input" placeholder="Topic"
        v-model="form.topic"
      />

      <input type="text" class="n-input" placeholder="Author"
        v-model="form.author"
      />

      <input type="text" class="n-input" placeholder="Full URL"
        v-model="form.href"
      />

      <input type="file" class="n-input n-file" accept="image/*"
        @change="handleFiles"
      />

      <button type="button" class="n-btn" @click="addArticle">
        <Icon type="ios-flask-outline"/>
        <span>ADD</span>
      </button>
    </div>

    <div class="n-items">

      <ul class="n-ul">
        <li class="n-li" v-for="(article, key) in articles" :key="key">
          <span :title="article.topic">{{ article.topic }}</span>
          <span>{{ article.author }}</span>
          <span>{{ $moment(article.timestamp).format('LL')}}</span>

          <button class="n-li-btn" @click="removeArticle(article)">
            <Icon type="ios-trash"/>
          </button>
        </li>
      </ul>

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
        topic: null,
        author: null,
        href: null
      }),
      temp: null
    }
  },

  firebase: {
    articles: DB.ref('articles')
  },

  methods: {
    addArticle () {
      if (!this.temp) return console.warn('Something went wrong!!')

      const FORM = Object.assign({}, this.form)
      const F = this.temp
      const N = `${Date.now()}${this.fileType(F.name)}`

      SR.child(N).put(F, { contentType: F.type })
        .then(snapshot => {
          FORM.timestamp = Date.now()
          FORM.image = snapshot.downloadURL.replace(this.PORT, '')

          DB.ref('articles').push(FORM)
          this.form.reset()
          document.querySelector('input[type=file]').value = null
        })
        .catch(err => {
          console.error(err)
          this.$router.push({
            name: 'auth'
          })
        })
    },

    editArticle (article) {
      DB.ref('articles').child(article['.key']).update({
        title: this.form.title,
        author: this.form.author,
        timestamp: Date.now()
      })
      this.form.reset()
    },

    removeArticle (article) {
      let J = article.image
      let N = J.substr(J.indexOf('?'), J.length)

      SR.child(J.replace(N, '')).delete()
        .then(bak => {
          DB.ref('articles').child(article['.key']).remove()
        })
        .catch(err => console.error(err))
    },

    handleFiles () {
      this.temp = event.target.files[0]
    },

    fileType (name) {
      return name.substr(name.indexOf('.'), name.length).toLowerCase()
    }
  }
}
</script>
