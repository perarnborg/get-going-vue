<template>
  <div v-if="item">
    <h1>Item</h1>
    <router-link to="/items">Back</router-link>
    <br/>
    <br/>
    {{ JSON.stringify(item) }}
    <br/>
    <br/>
    <form novalidate="true" @submit.prevent="submitForm" v-if="itemFormData">
      <text-input label="Title" placeholder="Enter a title" v-model="itemFormData.title" type="text" :validation="$v.itemFormData.title"></text-input>

      <text-input label="Email" placeholder="Enter an email" v-model="itemFormData.email" type="email" :validation="$v.itemFormData.email"></text-input>

      <button type="submit">Save</button>
    </form>
  </div>
  <loader v-else></loader>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

import TextInput from '@/components/form/TextInput'
import Checkbox from '@/components/form/Checkbox'
import Radiobuttons from '@/components/form/Radiobuttons'
import Dropdown from '@/components/form/Dropdown'
import Loader from '@/components/Loader'

export default {
  name: 'Item',
  props: [
    'itemId'
  ],
  data: function() {
    return {
      itemFormData: null
    }
  },
  validations: {
    itemFormData: {
      title: {
        required
      },
      email: {
        required,
        email
      }
    }
  },
  beforeUpdate() {
    this.initForm()
  },
  mounted() {
    this.initForm()
  },
  methods: {
    initForm: function() {
      if (!this.itemFormData && this.item) {
        this.itemFormData = {...this.item}
      }
    },
    submitForm: function() {
      console.log(this.$v.itemFormData.$invalid)
    }
  },
  computed: {
    item() {
      return this.$store.getters.getItem(this.itemId)
    }
  },
  components: { TextInput, Checkbox, Radiobuttons, Dropdown, Loader }
}
</script>

<style lang="scss" scoped>
</style>
