<template>
  <transition name="fade">
    <div
      v-if="getMessage"
      :class="classes"
    >
      <div class="Message__inner">
        {{ getMessage.text }}
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppMessage',
  computed: {
    classes: function() {
      return {
        'Message': true,
        'Message--error': this.message && this.message.type === 'error'
      }
    },
    ...mapGetters([
      'getMessage'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .Message {
    transition: opacity 0.2s ease-in-out;
    transition-delay: 0.5s;
    text-align: center;
    position: fixed;
    bottom: $spacing*2;
    left: 0;
    right: 0;

    &.fade-enter,
    &.fade-leave-to {
      opacity: 0;
    }

    &--error {
      color: red;
    }

    &__inner {
      background: white;
      border: 2px solid #666;
      box-shadow: 0 0 10px #666;
      display: inline-block;
      font-size: 14;
      padding: $spacing/2 $spacing*1.5;
    }
  }
</style>
