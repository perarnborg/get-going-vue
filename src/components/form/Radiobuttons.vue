<template>
  <div :class="wrapperClasses">
    <div v-if="label">{{ label }}</div>

    <div :class="inputClasses" :key="option.value" v-for="option in options">
      <input
        type="radio"
        :id="id + '_' + option.value"
        class="Radiobutton__input"
        :checked="value === option.value"
        :value="option.value"
        @change="updateChecked($event.target.value)" />
      <label
        class="Radiobutton__text"
        :for="id + '_' + option.value">
        {{ option.text }}
      </label>
    </div>

    <div v-if="validation && validation.$error" class="Form-component-wrapper__error">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import ForminputMixin from './Forminput'

export default {
  name: 'Radiobuttons',
  mixins: [ForminputMixin],
  props: [
    'options'
  ],
  computed: {
    inputClasses: function() {
      return {
        'Radiobutton': true,
        'Radiobutton--has-error': this.error
      }
    }
  },
  methods: {
    updateChecked: function (checkedValue) {
      this.$emit('touch')
      this.$emit('input', checkedValue)
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
    display: inline-block;
  }
</style>
