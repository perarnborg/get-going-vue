<template>
  <div :class="wrapperClasses">
    <div v-if="label">{{ label }}</div>

    <div :class="inputClasses">
      <input
        type="checkbox"
        :id="id"
        class="Checkbox__input"
        :checked="isChecked"
        @change="updateChecked($event.target.checked)"
        :disabled="disabled" />
      <label
        class="Checkbox__text"
        :for="id">
        {{ text }}
      </label>
    </div>

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
  name: 'CheckboxInput',
  mixins: [InputMixin],
  props: {
    text: {
      type: String
    }
  },
  data () {
    return {
      isChecked: this.value
    }
  },
  computed: {
    inputClasses: function() {
      return {
        'Checkbox': true,
        'Checkbox--has-error': this.validation && this.validation.$error
      }
    }
  },
  methods: {
    updateChecked: function (isChecked) {
      this.isChecked = isChecked
      this.$emit('touch')
      this.$emit('input', this.isChecked)
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
