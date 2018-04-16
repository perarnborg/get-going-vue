<template>
  <div id="app" class="App">
    <router-view/>

    <AppMessage />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import AppMessage from '@/components/AppMessage'

export default {
  name: 'App',
  mounted () {
    this.getItems()
  },
  methods: {
    ...mapActions([
      'getItems'
    ])
  },
  components: { AppMessage }
}
</script>

<style lang="scss">
body {
 @extend %body;
}

.App {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
  margin: 0 auto;
  max-width: 600px;
  padding: 60px 20px 20px 20px;
}
</style>
