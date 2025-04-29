<script setup>


  const props = defineProps({
    toastText: String,
    isVisible: Boolean,
  })
</script>

<template>
  <div class="fixed top-2 right-10 p-[12px] flex gap-1.5 items-center justify-center rounded-sm min-w-[220px] bg-white shadow-sm border border-solid border-gray-50" :class='isVisible ? "animate-wiggle": "translate-y-[-135%]"'>
    <div class="toast__icon shrink-0 flex w-[24px]">
      <slot></slot>
    </div>
    <div class="toast__text text-[0.8rem]">{{ toastText }}</div>
  </div>
</template>

