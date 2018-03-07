<template>
  <div>
    <h1>Form elements</h1>
    <h2>A text input component</h2>
    <text-input label="Text" placeholder="Skriv en text" v-model="text" type="text" isRequired="true" />
    Du har skrivit: {{ text }}
    <br/>
    <br/>
    <br/>
    <h2>A text area component</h2>
    <text-input label="Text" placeholder="Skriv en text" v-model="textarea" type="textarea" isRequired="true" />
    Du har skrivit: {{ textarea }}
    <br/>
    <br/>
    <br/>
    <h2>A text area component</h2>
    <checkbox text="Checkad" v-model="isChecked" isRequired="true" />
    Checkad: {{ isChecked ? 'ja' : 'nej' }}
    <br/>
    <br/>
    <br/>
    <h2>A radiobutton list component</h2>
    <radiobuttons :options="[{value: '1', text: 'Option 1'},{value: '2', text: 'Option 2'}]" v-model="checkedRadio" isRequired="true" />
    Radio: {{ checkedRadio }}
    <br/>
    <br/>
    <br/>
    <h2>A dropdown component</h2>
    <dropdown :options="[{value: '', text: 'Select an option'},{value: '1', text: 'Option 1'},{value: '2', text: 'Option 2'}]" v-model="selectedOption" isRequired="true" />
    Dropdown: {{ selectedOption }}
    <br/>
    <br/>
    <br/>
  </div>
</template>

<script>
import TextInput from '@/components/form/TextInput'
import Checkbox from '@/components/form/Checkbox'
import Radiobuttons from '@/components/form/Radiobuttons'
import Dropdown from '@/components/form/Dropdown'

export default {
  name: 'Start',
  data () {
    return {
      text: '',
      textarea: '',
      isChecked: false,
      checkedRadio: null,
      selectedOption: null,
      radioSelected: ''
    }
  },
  components: { TextInput, Checkbox, Radiobuttons, Dropdown }
}
</script>

<style lang="scss" scoped>
</style>
