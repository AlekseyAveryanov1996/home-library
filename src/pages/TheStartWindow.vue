<script setup>
import TheDashBoard from '@/components/TheDashBoard.vue';
import { ref } from 'vue';

const isVisibleDashBoard = ref(false);

</script>



<template>
  start Window

  <TheDashBoard  v-if='isVisibleDashBoard'/>

</template>

<style>
  .box {
    animation: fadeIn 5s ease-in-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>
