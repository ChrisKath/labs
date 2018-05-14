<template lang="html">
  <div class="n-auth">

    <div class="n-intro">
      <h1>Vue.js 2 &amp; Firebase Sample Authentication</h1>
    </div>

    <form class="n-form">
      <input type="email"
        class="n-input"
        v-model="form.email"
        placeholder="Email Address"
      />

      <input type="password"
        class="n-input"
        v-model="form.passdowd"
        placeholder="Password"
      />

      <div class="n-btn-scope">
        <button type="button" class="n-btn" @click="signUp">
          SIGN-UP
        </button>

        <button type="button" class="n-btn" @click="signIn">
          SIGN-IN
        </button>
      </div>

      <div class="n-or">
        <span>OR</span>
      </div>

      <div class="n-media">
        <button type="button" class="n-btn" @click="facebook">
          <Icon type="social-facebook" />
          <span>Facebook</span>
        </button>

        <button type="button" class="n-btn" @click="google">
          <Icon type="social-googleplus" />
          <span>Google</span>
        </button>

        <button type="button" class="n-btn" @click="github">
          <Icon type="social-github" />
          <span>GitHub</span>
        </button>
      </div>
    </form>

  </div>
</template>

<script>
import Form from '~/instance/form'
import FIRE from '~/instance/fire'
import BASE from 'firebase'

export default {
  data () {
    return {
      form: new Form({
        email: '',
        passdowd: ''
      })
    }
  },

  methods: {
    signUp () {
      FIRE.auth().createUserWithEmailAndPassword(
        String(this.form.email),
        String(this.form.password)
      )
        .then(res => {
          console.log(res)
          this.toStore()
        })
        .catch(err => console.error(err))
    },

    signIn () {
      FIRE.auth().signInWithEmailAndPassword(
        String(this.form.email),
        String(this.form.password)
      )
        .then(res => {
          console.log(res)
          this.toStore()
        })
        .catch(err => console.error(err))
    },

    github () {
      let provider = new BASE.auth.GithubAuthProvider()
      provider.addScope('repo') // Optional
      FIRE.auth().signInWithPopup(provider)
        .then(res => {
          console.log(res)
          this.toStore()
        })
        .catch(err => console.error(err))
    },

    google () {
      let provider = new BASE.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/plus.login') // Optional
      FIRE.auth().signInWithPopup(provider)
        .then(res => {
          console.log(res)
          this.toStore()
        })
        .catch(err => console.error(err))
    },

    facebook () {
      let provider = new BASE.auth.FacebookAuthProvider()
      provider.addScope('public_profile')
      FIRE.auth().signInWithPopup(provider)
        .then(res => {
          console.log(res)
          this.toStore()
        })
        .catch(err => console.error(err))
    },

    toStore () {
      this.$router.push({
        name: 'store'
      })
    }
  }
}
</script>
