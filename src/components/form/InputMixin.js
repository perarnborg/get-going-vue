export default {
  props: {
    label: {
      type: String
    },
    value: {
      type: [Boolean, Number, String]
    },
    validation: {
      type: Object
    },
    requiredErrorMessage: {
      type: String
    },
    disabled: {
      type: Boolean
    }
  },
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
        return this.requiredErrorMessage ? this.requiredErrorMessage : 'Required field'
      } else if (param === 'numeric') {
        return 'Not a valid number'
      } else if (param === 'integer') {
        return 'Should be a whole number'
      } else if (param === 'decimal') {
        return 'Not a valid number'
      }
      return null
    }
  }
}
