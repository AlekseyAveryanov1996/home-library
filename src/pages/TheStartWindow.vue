<script setup>
import TheDashBoard from '@/components/TheDashBoard.vue';
import TheStartWindow from '@/components/TheStartWindow.vue';
import { onMounted, ref } from 'vue';

const isVisibleDashBoard = ref(false);

function visibleDashBoard(value) {
  isVisibleDashBoard.value = value
  localStorage.setItem('DashBoard', true);
}

onMounted(() => {
  let lsDashBoard = localStorage.getItem('DashBoard');
  if (lsDashBoard) isVisibleDashBoard.value = true;
})
</script>

<template>

  <TheStartWindow @visible-dash-board='visibleDashBoard' v-if='!isVisibleDashBoard'/>
  <TheDashBoard  v-if='isVisibleDashBoard'/>

</template>
