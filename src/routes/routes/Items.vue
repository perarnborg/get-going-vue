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

      <br/>
      <br/>
      <router-link to="/items/create">Create new item</router-link>

    </div>
    <PreLoader v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import PreLoader from '@/components/PreLoader'

export default {
  name: 'Items',
  computed: {
    ...mapGetters([
      'allItems'
    ])
  },
  components: { PreLoader }
}
</script>

<style lang="scss" scoped>
</style>
