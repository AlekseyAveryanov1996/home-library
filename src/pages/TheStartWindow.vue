<script setup>
import TheDashBoard from '@/components/TheDashBoard.vue';
import TheStartWindow from '@/components/TheStartWindow.vue';
import { ref } from 'vue';

const isVisibleDashBoard = ref(false);

</script>



<template>

  <TheStartWindow v-if='!isVisibleDashBoard'/>
  <TheDashBoard  v-if='isVisibleDashBoard'/>

</template>

<style>



</style>
