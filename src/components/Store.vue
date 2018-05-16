<template lang="html">
  <transition name="n-modal">
    <div class="modal-mask modal-wrapper">

      <div class="modal-container n-store">

        <div class="n-intro">
          Cloud Firestore &amp; Cloud Storage
        </div>

        <div class="n-form">
          <input type="text"
            class="n-input"
            placeholder="Topic"
            v-model="form.topic"
          />

          <input type="text"
            class="n-input"
            placeholder="Author"
            v-model="form.author"
          />

          <input type="text"
            class="n-input"
            placeholder="Full URL"
            v-model="form.href"
          />

          <input type="file"
            accept="image/*"
            class="n-input n-file"
            @change="handleFiles"
          />

          <button type="button" class="n-btn" @click="add">
            <Icon type="ios-flask-outline"/>
            <span>ADD</span>
          </button>

          <Loader v-if="LOAD"/>
        </div>

        <div class="n-items">

          <ul class="n-ul">
            <li class="n-li" v-for="(article, key) in articles" :key="key">
              <span :title="article.topic">{{ article.topic }}</span>
              <span>{{ article.author }}</span>
              <span>{{ $moment(article.timestamp).format('LL')}}</span>

              <button class="n-li-btn" @click="remove(article)">
                <Icon type="ios-trash"/>
              </button>
            </li>
          </ul>

        </div>
      </div>

    </div>
  </transition>
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
      temp: null,
      LOAD: false
    }
  },

  created () {
    this.real()
  },

  methods: {
    ...mapActions({
      real: 'manage.end/getArticlesSnapshot'
    }),

    add () {
      if (!this.temp) {
        return this.warning({
          code: 'Warning.',
          message: 'Something went wrong!!'
        })
      }

      const FORM = Object.assign({}, this.form.data())
      const FILE = this.temp
      const NAME = `${Date.now()}${FILETYPE(FILE.name)}`

      this.LOAD = true
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
              .then(response => {
                this.LOAD = false
                this.success(response)
              })
              .catch(error => this.warning(error))

            this.form.reset()
            document.querySelector('input[type=file]').value = null
          })
        })
        .catch(error => this.warning(error))
    },

    remove (article) {
      if (!confirm('Are you sure?\nOnce deleted, you will not be able to recover this Article!')) return false

      /**
      * Delete Files on Cloud Storage
      */
      STORAGE.child(article.image.split('?')[0]).delete()
        .then(() => {
          /**
          * Delete Data from Cloud Firestore
          */
          DB.collection('articles').doc(article.id).delete()
            .then(() => {
              this.NOTICE.info({
                title: 'Clear Desu!',
                desc: 'Document successfully deleted!'
              })
            })
            .catch(error => this.warning(error))
        })
        .catch(error => this.warning(error))
    },

    handleFiles () {
      let FILE = event.target.files
      this.temp = FILE[0]
    },

    success (response) {
      this.NOTICE.success({
        title: 'Good job!',
        desc: 'Document successfully written!'
      })
      console.log(response)
    },

    warning (err) {
      this.NOTICE.warning({
        title: err.code,
        desc: err.message,
        duration: 5.5
      })
      console.warn(err)
    }
  },

  computed: mapGetters({
    articles: 'manage.end/articles'
  })
}
</script>
