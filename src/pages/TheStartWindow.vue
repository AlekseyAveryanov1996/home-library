<script setup>
import TheDashBoard from '@/components/TheDashBoard.vue';
import { ref } from 'vue';

const isVisibleDashBoard = ref(false);

</script>



<template>
  start Window

  <TheDashBoard  v-if='isVisibleDashBoard'/>

</template>
