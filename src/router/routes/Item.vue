<template>
  <div>
    <div v-if="item || isNew">
      <h1>Item</h1>
      <router-link to="/items">Back</router-link>
      <br/>
      <br/>
      {{ JSON.stringify(item) }}
      <br/>
      <br/>
      <form novalidate="true" @submit.prevent="submitForm" v-if="formData">
        <text-input label="Title" placeholder="Enter a title" v-model="formData.title" type="text" :validation="$v.formData.title" @touch="touchInput('title')"></text-input>

        <text-input label="Email" placeholder="Enter an email" v-model="formData.email" type="email" :validation="$v.formData.email" @touch="touchInput('email')"></text-input>

        <checkbox text="Is Active" v-model="formData.is_active"></checkbox>

        <button type="submit" :class="buttonClasses" :disabled="isSubmitting">Save</button>
      </form>
    </div>
    <loader v-else></loader>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'

import { NETWORK_STATUSES } from '@/services/http'

import FormMixin from '@/components/form/Form'
import TextInput from '@/components/form/TextInput'
import Checkbox from '@/components/form/Checkbox'
import Loader from '@/components/Loader'

export default {
  name: 'Item',
  mixins: [FormMixin],
  props: [
    'itemId'
  ],
  validations: {
    formData: {
      title: {
        required
      },
      email: {
        required,
        email
      }
    }
  },
  computed: {
    isNew() {
      return this.itemId === 'create'
    },
    item() {
      return this.getItem(this.itemId)
    },
    isSubmitting: function() {
      return this.getItemsNetworkStatus === NETWORK_STATUSES.SUBMITTING
    },
    ...mapGetters([
      'getItem',
      'getItemsNetworkStatus'
    ])
  },
  beforeUpdate() {
    this.initForm(this.initialState())
  },
  mounted() {
    this.initForm(this.initialState())
  },
  methods: {
    initialState: function() {
      if (this.isNew) {
        return {
          title: null,
          email: null,
          is_active: false
        }
      } else {
        return this.item
      }
    },
    submitForm: function() {
      if (this.preSubmitForm()) {
        if (this.isNew) {
          this.createItem(this.formData)
        } else {
          this.updateItem(this.formData)
        }
      }
    },
    ...mapActions([
      'updateItem',
      'createItem'
    ])
  },
  components: { TextInput, Checkbox, Loader }
}
</script>

<style lang="scss" scoped>
</style>
