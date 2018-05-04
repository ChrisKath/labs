<template lang="html">
  <div class="ive-signup">

    <form>
      <input type="email"
        v-model="form.email"
        placeholder="Email Address"
      />

      <input type="password"
        v-model="form.passdowd"
        placeholder="Password"
      />

      <button type="button" @click="signUp">SIGN UP</button>
      <button type="button" @click="signIn">SIGN IN</button>
    </form>

  </div>
</template>

<script>
import FIRE from '~/instance/fire'
import Form from '~/instance/form'

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
        .then(msg => {
          console.log(msg)
        })
        .catch(err => console.error(err))
    }
  }
}
</script>

<style lang="less" scoped>
.ive-signup {
  text-align: center;
  margin: 25vh auto;
  max-width: 320px;

  input {
    margin: 10px 0;
    padding: 15px;
    border-radius: 4px;
    border: solid 1px #efefef;
  }

  button {
    width: 100%;
    display: block;
    padding: 10px 20px;
    font-weight: 900;
  }
}
</style>
