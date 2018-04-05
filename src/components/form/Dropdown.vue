<template>
  <div :class="wrapperClasses">
    <label v-if="label" :for="id">{{ label }}</label>

    <select
      :id="id"
      :class="inputClasses"
      @change="updateSelected($event.target.value)">
      <option :value="option.value" :key="option.value" :selected="value === option.value" v-for="option in options">{{ option.text }}</option>
    </select>

    <div v-if="validation && validation.$error" class="Form-component-wrapper__error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import ForminputMixin from './Forminput'

export default {
  name: 'Dropdown',
  mixins: [ForminputMixin],
  props: [
    'options'
  ],
  computed: {
    inputClasses: function() {
      return {
        'Dropdown': true,
        'Dropdown--has-error': this.error
      }
    }
  },
  methods: {
    updateSelected: function (selectedValue) {
      this.$emit('touch')
      this.$emit('input', selectedValue)
    },
    getFieldNameInErrorMessage: function() {
      return 'option'
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
