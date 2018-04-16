<template>
  <div>
    <h1>Form elements</h1>

    <router-link to="/">Back</router-link>

    <br/>
    <br/>
    <h2>A text input component</h2>
    <TextInput
      label="Text"
      placeholder="Skriv en text"
      v-model="text"
      type="text"
      :validation="$v.text"
      @touch="touchInput('text')"
    />
    Du har skrivit: {{ text }}
    <br/>
    <br/>
    <br/>
    <h2>A text area component</h2>
    <TextInput
      label="Text"
      placeholder="Skriv en text"
      v-model="textarea"
      type="textarea"
      :validation="$v.textarea"
      @touch="touchInput('textarea')"
    />
    Du har skrivit: {{ textarea }}
    <br/>
    <br/>
    <br/>
    <h2>A text area component</h2>
    <CheckboxInput
      text="Checkad"
      v-model="isChecked"
      :validation="$v.isChecked"
      @touch="touchInput('isChecked')"
    />
    Checkad: {{ isChecked ? 'ja' : 'nej' }}
    <br/>
    <br/>
    <br/>
    <h2>A radiobutton list component</h2>
    <RadiobuttonsInput
      :options="[{value: '1', text: 'Option 1'},{value: '2', text: 'Option 2'}]"
      v-model="checkedRadio"
      :validation="$v.checkedRadio"
      @touch="touchInput('checkedRadio')"
    />
    Radio: {{ checkedRadio }}
    <br/>
    <br/>
    <br/>
    <h2>A dropdown component</h2>
    <DropdownInput
      :options="[{value: '', text: 'Select an option'},{value: '1', text: 'Option 1'},{value: '2', text: 'Option 2'}]"
      v-model="selectedOption"
      :validation="$v.selectedOption"
      @touch="touchInput('selectedOption')"
    />
    Dropdown: {{ selectedOption }}
    <br/>
    <br/>
    <br/>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

import TextInput from '@/components/form/TextInput'
import CheckboxInput from '@/components/form/CheckboxInput'
import RadiobuttonsInput from '@/components/form/RadiobuttonsInput'
import DropdownInput from '@/components/form/DropdownInput'

export default {
  name: 'FormComponents',
  data () {
    return {
      text: '',
      textarea: '',
      isChecked: false,
      checkedRadio: null,
      selectedOption: null
    }
  },
  validations: {
    text: {
      required
    },
    textarea: {
      required
    },
    isChecked: {
      required
    },
    checkedRadio: {
      required
    },
    selectedOption: {
      required
    }
  },
  methods: {
    touchInput: function(key) {
      this.$v[key].$touch()
    }
  },
  components: { TextInput, CheckboxInput, RadiobuttonsInput, DropdownInput }
}
</script>

<style lang="scss"
  scoped>
</style>
