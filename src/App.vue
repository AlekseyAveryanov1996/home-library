<script setup>
  import { ref } from 'vue';
  import functions from './functions';

  const finishedAnim = ref(false);

  async function onAnimationsFinished(data) {
    finishedAnim.value = true

    if (finishedAnim.value) { // если анимация завершилась, то начинаем получать данные
      try {
        const userData = await functions.getUser();
        if (userData) {
          functions.goToRoute('/dashboard/', 1)
        } else {
          throw new Error("Пользователь не авторизован");
        }
      } catch (error) {
        console.log(error.message)
        functions.goToRoute('/logIn/', 1000)
      }
    }
  }


</script>

<template>
  <div>
    <RouterView @anim-finished='onAnimationsFinished'/>
  </div>
</template>
