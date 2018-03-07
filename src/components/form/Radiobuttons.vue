<template>
  <div :class="wrapperClasses">
    <div v-if="label">{{ label }}</div>

    <div :class="inputClasses" :key="option.value" v-for="option in options">
      <input type="radio" :id="id + '_' + option.value" class="Radiobutton__input" :checked="value === option.value" :value="option.value" @change="updateChecked($event.target.value)" />
      <label class="Radiobutton__text" :for="id + '_' + option.value">{{ option.text }}</label>
    </div>

    <div v-if="error" class="Form-component-wrapper__error">
      {{ error }}
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
    'isRequired',
    'isSubmitted'
  ],
  methods: {
    updateChecked: function (checkedValue) {
      let error = null
      this.checkedValue = checkedValue
      if (this.isRequired && !this.checkedValue) {
        error = (this.isRequiredMessage || 'Obligatoriskt val')
      }
      if (error !== this.error) {
        this.error = error
      }
      this.$emit('input', this.checkedValue)
    }
  },
  data () {
    return {
      id: null,
      checkedValue: this.value,
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
        'Radiobutton': true,
        'Radiobutton--has-error': this.error
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
