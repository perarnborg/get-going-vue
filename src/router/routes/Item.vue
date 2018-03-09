<template>
  <div>
    <div v-if="item">
      <h1>Item</h1>
      <router-link to="/items">Back</router-link>
      <br/>
      <br/>
      {{ JSON.stringify(item) }}
      <br/>
      <br/>
      <form novalidate="true" @submit.prevent="submitForm" v-if="itemFormData">
        <text-input label="Title" placeholder="Enter a title" v-model="itemFormData.title" type="text" :validation="$v.itemFormData.title" @touch="touchInput('title')"></text-input>

        <text-input label="Email" placeholder="Enter an email" v-model="itemFormData.email" type="email" :validation="$v.itemFormData.email" @touch="touchInput('email')"></text-input>

        <checkbox text="Checkad" v-model="itemFormData.is_active"></checkbox>

        <button type="submit" :class="buttonClasses" :disabled="isSubmitting">Save</button>
      </form>
    </div>
    <loader v-else></loader>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'

import { NETWORK_STATUSES } from '@/services/api'

import TextInput from '@/components/form/TextInput'
import Checkbox from '@/components/form/Checkbox'
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
    touchInput: function(key) {
      this.$v.itemFormData[key].$touch()
    },
    submitForm: function() {
      if (this.$v.itemFormData.$invalid) {
        this.$v.itemFormData.$touch()
      } else {
        this.$v.itemFormData.$reset()
        this.updateItem(this.itemFormData)
      }
    },
    ...mapActions([
      'updateItem'
    ])
  },
  computed: {
    item() {
      return this.getItem(this.itemId)
    },
    buttonClasses() {
      return {
        'Button': true,
        'Button--loading': this.isSubmitting
      }
    },
    isSubmitting: function() {
      return this.getItemsNetworkStatus === NETWORK_STATUSES.SUBMITTING
    },
    ...mapGetters([
      'getItem',
      'getItemsNetworkStatus'
    ])
  },
  components: { TextInput, Checkbox, Loader }
}
</script>

<style lang="scss" scoped>
</style>
