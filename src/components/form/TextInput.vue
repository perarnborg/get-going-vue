<template>
  <div :class="wrapperClasses">
    <label v-if="label" :for="id">{{ label }}</label>

    <textarea v-if="type === 'textarea'" :id="id" :class="inputClasses" :value="value" @input="updateValue($event.target.value)" :placeholder="placeholder" :disabled="isDisabled"></textarea>
    <input v-else type="type" :class="inputClasses" :value="value" @input="updateValue($event.target.value)" :placeholder="placeholder" :disabled="isDisabled" />

    <div v-if="showError" class="Form-component-wrapper__error">
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: [
    'type',
    'label',
    'value',
    'placeholder',
    'isRequired',
    'isDisabled',
    'isSubmitted'
  ],
  methods: {
    updateValue: function (value) {
      let error = null
      if (value !== this.value) {
        this.isTouched = true
      }
      if (this.isRequired && !value) {
        error = (this.isRequiredMessage || 'Obligatoriskt fält')
      }
      if (error !== this.error) {
        this.error = error
      }
      this.$emit('input', value)
    }
  },
  data () {
    return {
      id: null,
      error: null,
      isTouched: false
    }
  },
  mounted () {
    this.id = this._uid
  },
  computed: {
    wrapperClasses: function() {
      return {
        'Form-component-wrapper': true,
        'Form-component-wrapper--is-required': this.isRequired
      }
    },
    inputClasses: function() {
      return {
        'Text-input': true,
        'Text-input--has-error': this.error,
        'Text-input--textarea': this.type === 'textarea'
      }
    },
    showError: function() {
      return this.error && (this.isTouched || this.isSubmitted)
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
