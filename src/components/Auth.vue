<template lang="html">
  <div class="n-auth">

    <div class="n-intro">
      <h1>Vue.js 2 &amp; Firebase Sample Authentication</h1>
    </div>

    <form class="n-form">
      <input type="email"
        v-model="form.email"
        placeholder="Email Address"
      />

      <input type="password"
        v-model="form.passdowd"
        placeholder="Password"
      />

      <div class="n-btn">
        <button type="button" @click="signUp">UP</button>
        <button type="button" @click="signIn">IN</button>
      </div>
    </form>

    <strong>OR</strong>

    <div class="n-media">
      <button type="button" @click="github">GitHub</button>
      <button type="button" @click="google">Google</button>
      <button type="button" @click="facebook">Facebook</button>
    </div>
  </div>
</template>

<script>
import FIRE from '~/instance/fire'
import Form from '~/instance/form'
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
        .then(msg => {
          console.log(msg)
          this.form.reset()
        })
        .catch(err => console.error(err))
    },

    signIn () {
      FIRE.auth().signInWithEmailAndPassword(
        String(this.form.email),
        String(this.form.password)
      )
        .then(res => {
          this.$router.push({
            name: 'store'
          })
        })
        .catch(err => console.error(err))
    },

    github () {
      let provider = new BASE.auth.GithubAuthProvider()
      provider.addScope('repo') // Optional
      FIRE.auth().signInWithPopup(provider)
        .then(res => console.log(res))
        .catch(err => console.error(err))
    },

    google () {
      let provider = new BASE.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/plus.login') // Optional
      FIRE.auth().signInWithPopup(provider)
        .then(res => {
          this.$router.push({
            name: 'store'
          })
        })
        .catch(err => console.error(err))
    },

    facebook () {
      let provider = new BASE.auth.FacebookAuthProvider()
      provider.addScope('public_profile')
      FIRE.auth().signInWithPopup(provider)
        .then(res => console.log(res))
        .catch(err => console.error(err))
    }
  }
}
</script>

<style lang="less" scoped>
.n-auth {
  max-width: 460px;
  margin: 0 auto;
  height: 100vh;
  padding: 15px;
  background-color: darken(#363E4F, 10%);

  .n-btn {
    padding: 1px 2px 0 0;
    display: flex;
    justify-content: space-between;

    button {
      width: 49.8%;
    }
  }

  strong {
    display: block;
    text-align: center;
    padding: 20px 0;
    color: white;
  }

  .n-media {
    button {
      display: block;
      width: 100%;
      max-width: 240px;
      margin: 0 auto 8px;
      padding: 5px 0;

      font-size: 16px;
      font-weight: 900;

      color: white;
      border-radius: 42px;
      border: solid 1px fade(white, 72%);
      background-color: transparent;
      background-color: darken(#363E4F, 2.5%);
    }
  }
}
</style>
