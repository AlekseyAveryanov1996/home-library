<script setup>
  import { ref } from 'vue';

  let count = ref('4');
  console.log(count.value)
</script>

<template>
  <div>
    {{ count }}
  </div>
</template>

