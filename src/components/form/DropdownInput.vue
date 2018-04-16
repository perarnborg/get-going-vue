<template>
  <div :class="wrapperClasses">
    <label
      v-if="label"
      :for="id"
    >
      {{ label }}
    </label>

    <select
      :id="id"
      :class="inputClasses"
      @change="updateSelected($event.target.value)"
    >
      <option
        v-for="option in options"
        :value="option.value"
        :key="option.value"
        :selected="value === option.value"
      >
        {{ option.text }}
      </option>
    </select>

    <div
      v-if="validation && validation.$error"
      class="Form-component-wrapper__error"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import InputMixin from './InputMixin'

export default {
  name: 'DropdownInput',
  mixins: [InputMixin],
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
