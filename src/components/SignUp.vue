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
import axios from 'axios'

class Errors {
  /**
   * Create a new Errors instance.
   */
  constructor () {
    this.errors = {}
  }

  /**
   * Determine if an errors exists for the given field.
   *
   * @param {string} field
   */
  has (field) {
    return this.errors.hasOwnProperty(field)
  }

  /**
   * Determine if we have any errors.
   */
  any () {
    return Object.keys(this.errors).length > 0
  }

  /**
   * Retrieve the error message for a field.
   *
   * @param {string} field
   */
  get (field) {
    if (this.errors[field]) {
      return this.errors[field][0]
    }
  }

  /**
   * Clear one or all error fields.
   *
   * @param {string|null} field
   */
  clear (field) {
    if (field) {
      delete this.errors[field]

      return null
    }

    this.errors = {}
  }

  /**
   * Recoed the new errors.
   *
   * @param {object} errors
   */
  record (errors) {
    this.errors = errors
  }
}

class Form {
  /**
   * Create a new Form instance.
   *
   * @param {object} data
   */
  constructor (data) {
    this.temp = data

    for (let field in data) {
      this[field] = data[field]
    }

    this.errors = new Errors()
  }

  /**
   * Fetch all relevant data for the form.
   */
  data () {
    let data = Object.assign({}, this)

    delete data.temp
    delete data.errors
  }

  /**
   * Reset the form fields.
   */
  reset () {
    for (let field in this.temp) {
      this[field] = ''
    }
  }

  /**
   * Submit the form.
   *
   * @param {string} requestType
   * @param {string} url
   */
  submit (requestType, url) {
    axios[requestType](url, this.data())
      .then(this.onSuccess.bind(this))
      .catch(this.onFail.bind(this))
  }

  /**
   * Handle a successful form submission.
   *
   * @param {object} response
   */
  onSuccess (response) {
    alert(response.data.message) // temporary

    this.errors.clear()
    this.reset()
  }

  /**
   * Handle a fields form submission.
   *
   * @param {object} error
   */
  onFail (error) {
    this.errors.record(error.response.data)
  }
}

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
      this.$FIRE.auth().createUserWithEmailAndPassword(
        String(this.form.email),
        String(this.form.password)
      ).then(msg => {
        console.log(msg)
        this.form.reset()
      }).catch(err => {
        console.error(err)
      })
    },

    signIn () {
      this.$FIRE.auth().signInWithEmailAndPassword(
        String(this.form.email),
        String(this.form.password)
      ).then(msg => {
        console.log(msg)
      }).catch(err => {
        console.error(err)
      })
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
