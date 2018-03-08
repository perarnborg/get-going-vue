<template>
  <div>
    <h1>Start</h1>
    <router-link to="/form-elements">Form elements</router-link>
    <div v-if="items">
      {{ JSON.stringify(items) }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Start',
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'items'
    ])
  }
}
</script>

<style lang="scss" scoped>
</style>
