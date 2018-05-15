<template lang="html">
  <transition name="n-modal">
    <div class="modal-mask modal-wrapper">

      <div class="modal-container n-auth">

        <div class="n-intro">
          Firebase Sample Authentication
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
            <button type="button" class="n-btn" @click="onSignUp">
              SIGN-UP
            </button>

            <button type="button" class="n-btn" @click="onSignInWith()">
              SIGN-IN
            </button>
          </div>

          <div class="n-or">
            <span>OR</span>
          </div>

          <div class="n-media">
            <button type="button" class="n-btn"
              @click="onSignInWith('facebook')">

              <Icon type="social-facebook" />
              <span>Facebook</span>
            </button>

            <button type="button" class="n-btn"
              @click="onSignInWith('google')">

              <Icon type="social-googleplus" />
              <span>Google</span>
            </button>

            <button type="button" class="n-btn"
              @click="onSignInWith('github')">

              <Icon type="social-github" />
              <span>GitHub</span>
            </button>
          </div>

          <Loader v-if="LOAD"/>
        </form>

      </div>
    </div>
  </transition>
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
      }),
      LOAD: false
    }
  },

  methods: {
    onSignUp () {
      this.LOAD = true
      FIRE.auth().createUserWithEmailAndPassword(
        String(this.form.email),
        String(this.form.password)
      )
        .then(res => {
          setTimeout(h => {
            this.NOTICE.success({
              title: 'Successfully.',
              desc: 'Your account has been created.'
            })
            console.log(res)
            this.LOAD = false
            this.$emit('signed')
          }, 1280)
        })
        .catch(err => console.error(err))
    },

    onSignInWith (type) {
      const AUTH  = FIRE.auth()
      let PROMISE = null
      let provider = null

      this.LOAD = true
      switch (type) {
        /**
         * Authenticate Using Facebook Login with JavaScript
         */
        case 'facebook':
          provider = new BASE.auth.FacebookAuthProvider()
          provider.addScope('public_profile')
          PROMISE = AUTH.signInWithPopup(provider)
          break

        /**
         * Authenticate Using Google Sign-In with JavaScript
         */
        case 'google':
          provider = new BASE.auth.GoogleAuthProvider()
          provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
          PROMISE = AUTH.signInWithPopup(provider)
          break

        /**
         * Authenticate Using GitHub with JavaScript
         */
        case 'github':
          provider = new BASE.auth.GithubAuthProvider()
          provider.addScope('repo')
          PROMISE = AUTH.signInWithPopup(provider)
          break

        /**
         * Authenticate Using their Email address and Password
         */
        default:
          let FORM = Object.assign({}, this.form.data())
          PROMISE = AUTH.signInWithEmailAndPassword(
            String(FORM.email),
            String(FORM.password)
          )
      }

      if (PROMISE !== null) {
        return PROMISE
          .then(response => {
            this.LOAD = false
            this.$emit('signed')
            this.NOTICE.success({
              title: 'Good job!',
              desc: 'You are signed in.'
            })
          })
          .catch(err => this.warning(err))
      } else {
        console.warn('@No Method Found.')
        this.LOAD = false
        return false
      }
    },

    warning (err) {
      this.NOTICE.warning({
        title: err.code,
        desc: err.message,
        duration: 6.4
      })
      console.error(err)
    }
  }
}
</script>
