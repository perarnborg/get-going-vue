<template>
  <div :class="wrapperClasses">
    <label v-if="label" :for="id">{{ label }}<span f-if="validation.$required">*</span></label>

    <textarea v-if="type === 'textarea'"
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
      :disabled="disabled" />

    <div v-if="validation && validation.$error" class="Form-component-wrapper__error">
      {{ errorMessage }}
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
    'disabled',
    'validation'
  ],
  methods: {
    updateValue: function (value) {
      this.$emit('input', value)
    },
    blur: function () {
      this.$emit('touch')
    },
    getErrorMessage: function(param) {
      if (param === 'email') {
        return 'Invalid email'
      } else if (param === 'required') {
        return 'Obligatoriskt fält'
      }
      return null
    }
  },
  data () {
    return {
      id: null
    }
  },
  mounted () {
    this.id = this._uid
  },
  computed: {
    wrapperClasses: function() {
      return {
        'Form-component-wrapper': true,
        'Form-component-wrapper--required': this.validation && this.validation.$params.required
      }
    },
    inputClasses: function() {
      return {
        'Text-input': true,
        'Text-input--has-error': this.validation && this.validation.$error,
        'Text-input--textarea': this.type === 'textarea'
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
    display: block;
  }
</style>
