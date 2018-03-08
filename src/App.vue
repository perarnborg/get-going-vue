<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    // dispatch get items
  }
}
</script>

<style lang="scss">
body {
 @extend %body;
}

#app {
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
