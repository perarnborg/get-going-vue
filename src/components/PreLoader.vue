<template>
  <div
    v-if="visible"
    class="Loader"
  >
    <div class="Loader__bounce Loader__bounce--1"></div>
    <div class="Loader__bounce Loader__bounce--2"></div>
  </div>
</template>

<script>
export default {
  name: 'PreLoader',
  data: function() {
    return {
      visible: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.visible = true
    }, 500)
  },
  destroyed () {
    this.visible = false
  }
}
</script>

<style lang="scss" scoped>
  .Loader {
    width: 40px;
    height: 40px;
    position: relative;
    margin: $spacing auto;

    &__bounce {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: $action-color;
      opacity: 0.6;
      position: absolute;
      top: 0;
      left: 0;

      animation: sk-bounce 2.0s infinite ease-in-out;

      &--2 {
        animation-delay: -1.0s;
      }
    }
  }

  @keyframes sk-bounce {
    0%, 100% {
      transform: scale(0.0);
    } 50% {
      transform: scale(1.0);
    }
  }
</style>
