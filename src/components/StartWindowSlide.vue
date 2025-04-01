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
