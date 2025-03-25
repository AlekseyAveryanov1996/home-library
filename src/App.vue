<script setup>
  // import { onMounted } from 'vue';
  // import functions from './functions';

  // onMounted( async () => {
  //   try {
  //     const userData = await functions.getUser();
  //     if (userData) {
  //       functions.goToRoute('/', 1000)
  //     } else {
  //       throw new Error("Пользователь не авторизован");
  //     }
  //   } catch (error) {
  //     console.log(error.message)
  //     functions.goToRoute('/logIn/', 1)
  //   }
  // })

</script>

<template>
  <RouterView />
</template>
