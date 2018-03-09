<template>
  <div>
    <div v-if="allItems">
      <h1>Items</h1>

      <router-link to="/">Back</router-link>

      <br/>
      <br/>

      <div v-for="item in allItems" :key="item.id">
        <router-link :to="/items/ + item.id">{{ item.title }}</router-link>
      </div>

    </div>
    <loader v-else></loader>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Loader from '@/components/Loader'

export default {
  name: 'Items',
  computed: {
    ...mapGetters([
      'allItems'
    ])
  },
  components: { Loader }
}
</script>

<style lang="scss" scoped>
</style>
