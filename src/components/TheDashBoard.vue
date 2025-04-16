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
  import TheHeader from './TheHeader.vue';
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

  <div class="dashboard">
    <TheHeader />
    <TheNavDashBoard @toggle-current-component='handleToggleComponent'/>
    <div class="main">
      <!-- показываем нужный компонент -->
      <component :is="currentComponent" />
    </div>
  </div>





</template>

<style lang='stylus'>
  .dashboard
    display: flex
    flex-direction: column
    height: 100dvh
    background: linear-gradient(90deg, rgba(19, 31, 15, 1) 0%, rgba(32, 111, 84, 1) 50%, rgba(29, 99, 99, 1) 100%);
    +min(tablet)
      display: grid
      grid-template-columns: .18fr 1fr
      grid-template-rows: min-content 1fr

  .main
    padding: 20px 16px
    overflow-y: auto
    +min(tablet)
      padding: 40px 20px
    &::-webkit-scrollbar
      width: 10px
    &::-webkit-scrollbar-track
      background: transparent
    &::-webkit-scrollbar-thumb
      background-color #15D494
      border-radius: 20px;


</style>
