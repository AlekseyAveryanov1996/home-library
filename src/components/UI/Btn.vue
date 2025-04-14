<script setup>
  const props = defineProps({
    cssClass: {
      type: String,
      required: false,
      default: null
    },
    type: String,
  })
</script>

<template>
  <button v-if="type" :type='type' :class="cssClass" class="btn">
    <slot></slot>
  </button>

  <div v-else :class="cssClass" class="btn">
    <slot></slot>
  </div>
</template>

<style lang='stylus'>
  .btn
    display: flex
    justify-content: center
    align-items: center
    padding: 8px 14px
    width 100%
    max-width: fit-content
    font-weight: 600
    cursor pointer
    border-radius: 4px
    background: #0e2b21;
    color: #fff
    font-size: 20px
    line-height: 24px
    position relative
    z-index 0
    +min(tabletLarge)
      font-size: 24px
      line-height 26px
      padding: 12px 28px
    &::before
      content: ''
      background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
      position: absolute;
      top: -2px;
      left:-2px;
      background-size: 400%;
      z-index -1
      filter: blur(5px);
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      animation: glowing 20s linear infinite;
      opacity: 0;
      transition: opacity .3s ease-in-out;
      border-radius: 4px;
    &::after
      z-index: -1;
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: #0e2b21;
      left: 0;
      top: 0;
      border-radius: 4px;
    &:hover
      &::before
        opacity 1

  @keyframes glowing {
    0% { background-position: 0 0; }
    50% { background-position: 400% 0; }
    100% { background-position: 0 0; }
  }
</style>
