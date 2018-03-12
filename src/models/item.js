import { required, email, numeric } from 'vuelidate/lib/validators' // TODO: integer and decimal validations on their way to vuelidate

import { getNextId } from '@/services/utils'

export const newItem = function() {
  return {
    title: null,
    email: null,
    is_active: false,
    sub_items: []
  }
}

export const newSubItem = function(item) {
  return {
    id: getNextId(item.sub_items),
    title: null,
    quantity: null,
    price: null
  }
}

export const itemValidations = {
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
