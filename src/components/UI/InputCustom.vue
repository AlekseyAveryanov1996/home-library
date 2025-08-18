<script setup>
  const props = defineProps({
    placeholderText: String,
    textError: String,
    typeInput: {
      type: String,
      required: true,
      default: 'text',
    },
    isRequired: Boolean,
    isError: Boolean,
    colorText: String,
  })

  const model = defineModel();

</script>

<template>
  <div class="input flex flex-col gap-1" :class='colorText'>
    <div class="input__placeholder text-xs">{{ placeholderText }}</div>
    <input class="rounded-2xl border-1 p-2 focus:outline-none" :type="typeInput" v-model="model"/>
    <div class="input__error text-xs text-red-700" :class='isError ? "block " : "hidden"'>{{ textError }}</div>
  </div>
</template>
