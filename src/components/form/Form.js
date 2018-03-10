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
        this.formData = {...this.item}
      }
    },
    touchInput: function(key) {
      this.$v.formData[key].$touch()
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
