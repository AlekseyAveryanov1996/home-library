<script setup>
import TheDashBoard from '@/components/TheDashBoard.vue';
import TheStartWindow from '@/components/TheStartWindow.vue';
import { onMounted, ref } from 'vue';
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore(); // регистрируем Store

const isVisibleDashBoard = ref(false);
const isLoading = ref(true); // добавляем флаг загрузки

function getTimeHour() {
  return new Date().getHours();
}

function visibleDashBoard(value) {
  isVisibleDashBoard.value = value // показываем DashBoard после вступительного приветствия

  // задаем параметры для определения, в какое время зашел пользователь
  localStorage.setItem('DashBoard', JSON.stringify({
    flagisActive: true,
    timeInput: getTimeHour(),
  }));
}

onMounted( async () => {


  await userStore.fetchUser(); // загружаем данные пользователя

  // получаем данные из LocalStorage последний вход был меньше чем 2 часа назад, то показываем DashBoard
  let lsDashBoard = localStorage.getItem('DashBoard');
  if (lsDashBoard) {
    if (JSON.parse(lsDashBoard).flagisActive && ((getTimeHour() - JSON.parse(lsDashBoard).timeInput)) <= 2 ) {
      isVisibleDashBoard.value = true;
    }
  }

  isLoading.value = false;

})
</script>

<template>

  <TheStartWindow @visible-dash-board='visibleDashBoard' v-if='!isVisibleDashBoard && !isLoading'/>
  <TheDashBoard  v-if='isVisibleDashBoard'/>

</template>
