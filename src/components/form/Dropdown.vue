<template>
  <div :class="wrapperClasses">
    <label v-if="label" :for="id">{{ label }}</label>

    <select :id="id" :class="inputClasses" @change="updateSelected($event.target.value)">
      <option :value="option.value" :key="option.value" v-for="option in options">{{ option.text }}</option>
    </select>

    <div v-if="error" class="Form-component-wrapper__error">
      {{ error }}
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
    'isRequired',
    'isSubmitted'
  ],
  methods: {
    updateSelected: function (selectedValue) {
      let error = null
      this.selectedValue = selectedValue
      if (this.isRequired && !this.selectedValue) {
        error = (this.isRequiredMessage || 'Obligatoriskt val')
      }
      if (error !== this.error) {
        this.error = error
      }
      this.$emit('input', this.selectedValue)
    }
  },
  data () {
    return {
      id: null,
      selectedValue: this.value,
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
        'Dropdown': true,
        'Dropdown--has-error': this.error
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
