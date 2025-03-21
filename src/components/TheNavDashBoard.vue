<script setup>

import { COMPONENTS_DASHBOARD } from '@/cosntants'

const emit = defineEmits(['toggleCurrentComponent'])

function toggleComponent(event) {
  const targetCompoenent = event.target.getAttribute('data-component') // получаем текущий компонент
  emit('toggleCurrentComponent', targetCompoenent) // передаем его в emit
}

</script>

<template>
  <div class='flex gap-1'>
    <div v-for='btn of Object.entries(COMPONENTS_DASHBOARD)'
      @click="(event) => toggleComponent(event)"
      :key='btn[0]'
      :data-component="btn[0]">
      {{ btn[1].text }}
    </div>
  </div>
</template>
