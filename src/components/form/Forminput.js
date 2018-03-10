export default {
  props: [
    'label',
    'value',
    'validation',
    'disabled'
  ],
  data () {
    return {
      id: null
    }
  },
  computed: {
    wrapperClasses: function() {
      return {
        'Form-component-wrapper': true,
        'Form-component-wrapper--has-error': this.validation && this.validation.$error,
        'Form-component-wrapper--required': this.validation && this.validation.$params.required
      }
    },
    errorMessage: function() {
      const self = this
      let message
      if (self.validation && self.validation.$error) {
        Object.keys(self.validation.$params).forEach(function(param) {
          if (!self.validation[param]) {
            message = self.getErrorMessage(param)
          }
        })
      }
      return message
    }
  },
  mounted () {
    this.id = this._uid
  },
  methods: {
    getErrorMessage: function(param, inputType = null) {
      if (param === 'email') {
        return 'Invalid email'
      } else if (param === 'required') {
        return 'Required ' + this.getFieldNameInErrorMessage()
      }
      return null
    }
  }
}
