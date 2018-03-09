<template>
  <div :class="wrapperClasses">
    <div v-if="label">{{ label }}</div>

    <div :class="inputClasses">
      <input type="checkbox" :id="id" class="Checkbox__input" :checked="isChecked" @change="updateChecked($event.target.checked)" />
      <label class="Checkbox__text" :for="id">{{ text }}</label>
    </div>

    <div v-if="validation && validation.$error" class="Form-component-wrapper__error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: [
    'label',
    'text',
    'value',
    'validation'
  ],
  methods: {
    updateChecked: function (isChecked) {
      this.isChecked = isChecked
      this.$emit('touch')
      this.$emit('input', this.isChecked)
    },
    getErrorMessage: function(param) {
      if (param === 'required') {
        return 'Obligatorisk kryssruta'
      }
      return null
    }
  },
  data () {
    return {
      id: null,
      isChecked: this.value
    }
  },
  mounted () {
    this.id = this._uid
  },
  computed: {
    wrapperClasses: function() {
      return {
        'Form-component-wrapper': true,
        'Form-component-wrapper--required': this.validation && this.validation.$params.required
      }
    },
    inputClasses: function() {
      return {
        'Checkbox': true,
        'Checkbox--has-error': this.validation && this.validation.$error
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
  }
}
</script>

<style lang="scss" scoped>
  .Form-component-wrapper {
    @extend %form-component-wrapper;
  }

  label {
    display: inline-block;
  }
</style>
