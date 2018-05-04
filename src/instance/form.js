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

export default class Form {
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
