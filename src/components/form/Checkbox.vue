<template>
  <div :class="wrapperClasses">
    <div v-if="label">{{ label }}</div>

    <div :class="inputClasses">
      <input type="checkbox" :id="id" class="Checkbox__input" :checked="isChecked" @change="updateChecked($event.target.checked)" />
      <label class="Checkbox__text" :for="id">{{ text }}</label>
    </div>

    <div v-if="error" class="Form-component-wrapper__error">
      {{ error }}
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
    'isRequired',
    'isSubmitted'
  ],
  methods: {
    updateChecked: function (isChecked) {
      let error = null
      this.isChecked = isChecked
      if (this.isRequired && !this.isChecked) {
        error = (this.isRequiredMessage || 'Obligatorisk kryssruta')
      }
      if (error !== this.error) {
        this.error = error
      }
      this.$emit('input', this.isChecked)
    }
  },
  data () {
    return {
      id: null,
      isChecked: this.value,
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
        'Checkbox': true,
        'Checkbox--has-error': this.error
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
    display: inline-block;
  }
</style>
