<template>
  <div :class="wrapperClasses">
    <div v-if="label">{{ label }}</div>

    <div :class="inputClasses" :key="option.value" v-for="option in options">
      <input type="radio" :id="id + '_' + option.value" class="Radiobutton__input" :checked="value === option.value" :value="option.value" @change="updateChecked($event.target.value)" />
      <label class="Radiobutton__text" :for="id + '_' + option.value">{{ option.text }}</label>
    </div>

    <div v-if="validation && validation.$error" class="Form-component-wrapper__error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Radiobuttons',
  props: [
    'label',
    'options',
    'value',
    'validation'
  ],
  methods: {
    updateChecked: function (checkedValue) {
      this.checkedValue = checkedValue
      this.$emit('touch')
      this.$emit('input', this.checkedValue)
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
      checkedValue: this.value
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
        'Radiobutton': true,
        'Radiobutton--has-error': this.error
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
