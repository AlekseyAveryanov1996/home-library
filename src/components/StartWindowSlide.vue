<script setup>
  const props = defineProps({
    srcImage: String,
    titleText: String,
  })

</script>

<template>
  <div class="start-window__item">
    <div class="start-window__item-img">
      <img :src='srcImage' :alt='titleText'>
    </div>
    <div class="start-window__item-text">
      {{ titleText }}
    </div>
  </div>
</template>

<style lang='stylus'>
  .start-window
    &__item
      display: flex
      flex-direction: column
      gap: 20px
      &-text
        color: #fff
      &-img
        position relative
        &::before
          content: ''
          position: absolute
          width calc(100% + 40px)
          height: calc(100% + 40px)
          background: red
          border-radius: 50%
          left: -20px
          top: -20px
          z-index -1
          background: linear-gradient(90deg, #131f0f,#206f54,#1d6363);
          // opacity 0
          // visibility: hidden
</style>
