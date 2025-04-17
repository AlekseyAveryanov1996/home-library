<script setup>
  import TheNavDashBoard from '@/components/TheNavDashBoard.vue';
  import TheHeader from './TheHeader.vue';
  import { COMPONENTS_DASHBOARD } from '@/cosntants';

  import { computed, ref } from 'vue';

  const isLoading = ref(false);

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
    <div v-if="isLoading" class="loader">loader</div>
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


  .loader
    position: absolute
    top: 0;
    left: 0;
    width 100%
    height: 100%
    z-index 10
    background: rgba(0, 0, 0, 0.5)
    display: flex
    justify-content: center
    align-items: center


</style>
