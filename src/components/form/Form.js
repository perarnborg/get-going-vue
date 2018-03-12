import cloneDeep from 'clone-deep'

export default {
  data: function() {
    return {
      formData: null
    }
  },
  computed: {
    buttonClasses() {
      return {
        'Button': true,
        'Button--loading': this.isSubmitting
      }
    }
  },
  methods: {
    initForm: function(initialState) {
      if (!this.formData && initialState) {
        this.formData = cloneDeep(initialState)
      }
    },
    touchInput: function(key, index = null, attr = null) {
      if (index !== null && attr !== null) {
        this.$v.formData[key].$each[index][attr].$touch()
      } else {
        this.$v.formData[key].$touch()
      }
    },
    preSubmitForm: function() {
      if (this.$v.formData.$invalid) {
        this.$v.formData.$touch()
      } else {
        this.$v.formData.$reset()
      }
      return !this.$v.formData.$invalid
    }
  }
}
