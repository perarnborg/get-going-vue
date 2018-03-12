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

        <div v-for="(subItem, index) in formData.sub_items" :key="subItem.id">
          <hr/>

          <text-input label="Title" placeholder="Enter a title" v-model="subItem.title" :validation="$v.formData.sub_items.$each[index].title" @touch="touchInput('sub_items', index, 'title')" type="text"></text-input>

          <text-input label="Quantity" placeholder="Enter a quantity" v-model="subItem.quantity" :validation="$v.formData.sub_items.$each[index].quantity" @touch="touchInput('sub_items', index, 'quantity')" type="text"></text-input>

          <text-input label="Title" placeholder="Enter a price" v-model="subItem.price" :validation="$v.formData.sub_items.$each[index].price" @touch="touchInput('sub_items', index, 'price')" type="text"></text-input>
        </div>

        <hr/>

        <div v-if="$v.formData.sub_items.$error && !$v.formData.sub_items.required">
          Items need to have at least one sub item
        </div>

        <a href @click.prevent="insertSubItem">Add sub item</a>

        <br/>
        <br/>

        <button type="submit" :class="buttonClasses" :disabled="isSubmitting">Save</button>

        <div v-if="$v.$error">
          Some of the form fields are invalid.
        </div>
      </form>
    </div>
    <loader v-else></loader>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, email, numeric } from 'vuelidate/lib/validators' // TODO: integer and decimal validations on their way

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
      },
      sub_items: {
        required,
        $each: {
          title: {
            required
          },
          quantity: {
            required,
            numeric
          },
          price: {
            required,
            numeric
          }
        }
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
          is_active: false,
          sub_items: []
        }
      } else {
        return this.item
      }
    },
    insertSubItem: function() {
      this.formData.sub_items.push({
        id: this.getNextId(this.formData.sub_items),
        title: null,
        quantity: null,
        price: null
      })
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
