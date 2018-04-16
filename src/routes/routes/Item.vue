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
        <TextInput
          label="Title"
          placeholder="Enter a title"
          v-model="formData.title"
          type="text"
          :validation="$v.formData.title"
          @touch="touchInput('title')"
        />

        <TextInput
          label="Email"
          placeholder="Enter an email"
          v-model="formData.email"
          type="email"
          :validation="$v.formData.email"
          @touch="touchInput('email')"
        />

        <CheckboxInput
          text="Is Active"
          v-model="formData.is_active"
        />

        <div
          v-for="(subItem, index) in formData.sub_items"
          :key="subItem.id"
        >
          <hr/>

          <TextInput
            label="Title"
            placeholder="Enter a title"
            v-model="subItem.title"
            :validation="$v.formData.sub_items.$each[index].title"
            @touch="touchInput('sub_items', index, 'title')"
            type="text"
          />

          <TextInput
            label="Quantity"
            placeholder="Enter a quantity"
            v-model="subItem.quantity"
            :validation="$v.formData.sub_items.$each[index].quantity"
            @touch="touchInput('sub_items', index, 'quantity')"
            type="text"
          />

          <TextInput
            label="Title"
            placeholder="Enter a price"
            v-model="subItem.price"
            :validation="$v.formData.sub_items.$each[index].price"
            @touch="touchInput('sub_items', index, 'price')"
            type="text"
          />
        </div>

        <hr/>

        <div v-if="$v.formData.sub_items.$error && !$v.formData.sub_items.required">
          Items need to have at least one sub item
        </div>

        <a href @click.prevent="insertSubItem">Add sub item</a>

        <br/>
        <br/>

        <button
          type="submit"
          :class="buttonClasses"
          :disabled="isSubmitting"
        >
          Save
        </button>

        <div v-if="$v.$error">
          Some of the form fields are invalid.
        </div>
      </form>
    </div>
    <PreLoader v-else />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { NETWORK_STATUSES } from '@/services/http'
import FormMixin from '@/components/form/FormMixin'
import TextInput from '@/components/form/TextInput'
import CheckboxInput from '@/components/form/CheckboxInput'
import PreLoader from '@/components/PreLoader'
import { newItem, newSubItem, itemValidations } from '@/models/item'

export default {
  name: 'Item',
  mixins: [FormMixin],
  props: [
    'itemId'
  ],
  validations: {
    formData: itemValidations
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
        return newItem()
      } else {
        return this.item
      }
    },
    insertSubItem: function() {
      this.formData.sub_items.push(newSubItem(this.formData))
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
  components: { TextInput, CheckboxInput, PreLoader }
}
</script>

<style lang="scss" scoped>
</style>
