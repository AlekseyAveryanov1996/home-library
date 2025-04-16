<script setup>

import { COMPONENTS_DASHBOARD } from '@/cosntants'

const emit = defineEmits(['toggleCurrentComponent'])

function toggleComponent(event) {
  const targetCompoenent = event.target.getAttribute('data-component') // получаем текущий компонент
  emit('toggleCurrentComponent', targetCompoenent) // передаем его в emit
}

</script>

<template>
  <aside class="aside-menu">
    <div class="aside-menu__wrapper">
      <div v-for='btn of Object.entries(COMPONENTS_DASHBOARD)'
        @click="(event) => toggleComponent(event)"
        :key='btn[0]'
        :data-component="btn[0]">
        {{ btn[1].text }}
      </div>
    </div>
  </aside>
</template>

<style lang="stylus">

  .aside-menu
    padding: 20px 16px
    border-bottom: 1px solid #325750
    +min(tablet)
      border-bottom: 0
      padding: 20px
      border-right: 1px solid #325750
      grid-row: auto
    &__wrapper
      display: flex
      +min(tablet)
        flex-direction: column
        gap: 20px

</style>
