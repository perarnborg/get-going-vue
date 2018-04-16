<template>
  <div :class="wrapperClasses">
    <label
      v-if="label"
      :for="id"
    >
      {{ label }}
      <span f-if="validation.$required">*</span>
    </label>

    <textarea
      v-if="type === 'textarea'"
      :id="id"
      :class="inputClasses"
      :value="value"
      @input="updateValue($event.target.value)"
      @blur="blur"
      :placeholder="placeholder"
      :disabled="disabled">
    </textarea>
    <input v-else
      type="type"
      :class="inputClasses"
      :value="value"
      @input="updateValue($event.target.value)"
      @blur="blur"
      :placeholder="placeholder"
      :disabled="disabled"
    />

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
  name: 'TextInput',
  mixins: [InputMixin],
  props: [
    'type',
    'placeholder'
  ],
  computed: {
    inputClasses: function() {
      return {
        'Text-input': true,
        'Text-input--has-error': this.validation && this.validation.$error,
        'Text-input--textarea': this.type === 'textarea'
      }
    }
  },
  methods: {
    updateValue: function (value) {
      this.$emit('input', value)
    },
    blur: function () {
      this.$emit('touch')
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
