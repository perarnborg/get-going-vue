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
            console.log(self.validation.$params[param])
            message = self.getErrorMessage(param, self.validation.$params[param])
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
    getErrorMessage: function(param, paramData) {
      if (param === 'email') {
        return 'Ogiltig e-postadress'
      } else if (param === 'required') {
        return 'Obligatorisk ' + this.getFieldNameInErrorMessage()
      } else if (param === 'numeric') {
        return 'Inte ett giltigt nummer'
      } else if (param === 'integer') {
        return 'Måste vara ett heltal'
      } else if (param === 'decimal') {
        return 'Inte ett giltigt belopp'
      } else if (param === 'minLength') {
        return 'Måste vara minst ' + paramData.min + ' tecken'
      }
      return null
    }
  }
}
