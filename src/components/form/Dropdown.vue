<template>
  <div :class="wrapperClasses">
    <label v-if="label" :for="id">{{ label }}</label>

    <select :id="id" :class="inputClasses" @change="updateSelected($event.target.value)">
      <option :value="option.value" :key="option.value" v-for="option in options">{{ option.text }}</option>
    </select>

    <div v-if="validation && validation.$error" class="Form-component-wrapper__error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: [
    'label',
    'options',
    'value',
    'validation'
  ],
  methods: {
    updateSelected: function (selectedValue) {
      this.selectedValue = selectedValue
      this.$emit('touch')
      this.$emit('input', this.selectedValue)
    },
    getErrorMessage: function(param) {
      if (param === 'required') {
        return 'Obligatoriskt val'
      }
      return null
    }
  },
  data () {
    return {
      id: null,
      selectedValue: this.value
    }
  },
  mounted () {
    this.id = this._uid
  },
  computed: {
    wrapperClasses: function() {
      return {
        'Form-component-wrapper': true,
        'Form-component-wrapper--is-required': this.validation && this.validation.$params.required
      }
    },
    inputClasses: function() {
      return {
        'Dropdown': true,
        'Dropdown--has-error': this.error
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
    display: block;
  }
</style>
