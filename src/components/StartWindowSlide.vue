<script setup>
  const props = defineProps({
    srcImage: String,
    titleText: String,
  })

</script>

<template>
  <div class="start-window__item">
    <div class="start-window__item-img-wrapper">
      <div class="start-window__item-img">
        <img :src='srcImage' :alt='titleText'>
      </div>
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
        text-align: center
        font-size: 14px;
        line-height: 16px;
        font-style: italic;
        +min(tabletLarge)
          font-size: 20px;
          line-height: 24px;
      &-img
        border-radius: 20px;
        overflow hidden
        transition: all ease 0.5s
      &-img-wrapper
        position relative
        &::before
          content: ''
          position: absolute
          width calc(100% + 20px)
          height: calc(100% + 20px)
          left: -10px
          top: -10px
          z-index -1
          background: linear-gradient(90deg, #131f0f,#206f54,#1d6363);
          border-radius: 20px;
          opacity 0
          visibility hidden
          transition: all ease 0.5s
          filter: blur(7px);
</style>
