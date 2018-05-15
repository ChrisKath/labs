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

      <button type="button" class="n-btn" @click="addOn">
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
import { DB, STORAGE } from '~/instance/fire'
import { mapGetters, mapActions } from 'vuex'

const FILETYPE = NAME => {
  return NAME.substr(NAME.indexOf('.'), NAME.length).toLowerCase()
}

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

  created () {
    this.real()
  },

  methods: {
    ...mapActions({
      real: 'manage.end/getArticlesSnapshot'
    }),

    addOn () {
      if (!this.temp) return console.warn('Something went wrong!!')

      const FORM = Object.assign({}, this.form.data())
      const FILE = this.temp
      const NAME = `${Date.now()}${FILETYPE(FILE.name)}`

      /**
       * Upload file to firebase storage.
       */
      let CHILD = STORAGE.child(NAME)
      CHILD.put(FILE, { contentType: FILE.type })
        .then(snapshot => {

          // Gathering image fullpath
          CHILD.getDownloadURL().then(url => {
            FORM.image = url.replace(this.PORT, '')
            FORM.timestamp = Date.now()

            /**
            * Insert new article to Cloud firestore
            */
            DB.collection('articles').add(FORM)
              .then(() => console.log('Document successfully written!'))
              .catch(err => console.log(err))

            this.form.reset()
            document.querySelector('input[type=file]').value = null
          })
        })
        .catch(err => {
          console.error(err)
          // this.$router.push({name: 'auth'})
        })
    },

    handleFiles () {
      let FILE = event.target.files
      this.temp = FILE[0]
    }
  },

  computed: mapGetters({
    articles: 'manage.end/articles'
  })
}
</script>
