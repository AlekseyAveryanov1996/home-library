<script setup>
  const props = defineProps({
    isVisible: Boolean,
  })
</script>

<template>
  <div :class='isVisible ? "loader" : "loader --hidden"'>
    <div class="loader-main"></div>
  </div>
</template>

<style lang="stylus" scoped>
  .loader
    position: absolute
    top: 0;
    left: 0;
    width 100%
    height: 100%
    z-index 10
    background: rgba(0, 0, 0, 0.5)
    display: flex
    justify-content: center
    align-items: center
    &.--hidden
      display: none


  .loader-main
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    border: 3px solid;
    border-color: #FFF #FFF transparent transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    &::after,
    &::before
      content: '';
      box-sizing: border-box;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      border: 3px solid;
      border-color: transparent transparent #18877b #18877b;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      box-sizing: border-box;
      animation: rotationBack 0.5s linear infinite;
      transform-origin: center center;
    &::before
      width: 32px;
      height: 32px;
      border-color: #FFF #FFF transparent transparent;
      animation: rotation 1.5s linear infinite;

  @keyframes rotation
    0%
      transform: rotate(0deg);
    100%
      transform: rotate(360deg);

  @keyframes rotationBack
    0%
      transform: rotate(0deg);
    100%
      transform: rotate(-360deg);

</style>
