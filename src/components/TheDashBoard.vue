<script setup>
  import { supabase } from '@/supabase';

  // const {data: {user} } = await supabase.auth.getUser();

  // console.log(user.email);
  // console.log(user.id);

  // отправляем данные в таблицу

  // const { task, error } = await supabase
  // .from('tasks')
  // .insert([
  //   { task_name: 'Купить молоко2', user_id: user.id }
  // ]);

  // получаем данные из таблицы

  // const { data: tasks, error } = await supabase
  // .from('tasks')
  // .select('*')
  // .eq('user_id', user.id); // Фильтр по user_id

  // if (error) {
  //   console.error('Ошибка:', error);
  // } else {
  //   console.log('Данные:', JSON.stringify(tasks));
  // }

  // import TheListsBooks from '@/components/TheListsBooks.vue';
  // import TheRead from '@/components/TheRead.vue';
  import TheNavDashBoard from '@/components/TheNavDashBoard.vue';
  import { COMPONENTS_DASHBOARD } from '@/cosntants';

  import { computed, ref } from 'vue';


  const dashBoardTabs = ref('TheListsBooks'); // показываем по умолчанию

  const currentComponent = computed(() => COMPONENTS_DASHBOARD[dashBoardTabs.value][dashBoardTabs.value]); // переключаем текущий компонент

  // получаем компонент из дочернего компонента для переключения
  function handleToggleComponent(component) {
    dashBoardTabs.value = component;
  }

</script>

<template>


  <TheNavDashBoard @toggle-current-component='handleToggleComponent'/>

  <!-- показываем нужный компонент -->
  <component :is="currentComponent" />

</template>
