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
  })

  const model = defineModel();

</script>

<template>
  <div class="input flex flex-col gap-1">
    <div class="input__placeholder text-xs">{{ placeholderText }}</div>
    <input @input="() => console.log(model)" class="rounded-2xl border-1 p-2" :type="typeInput" v-model="model" />
    <div class="input__error text-xs">{{ textError }}</div>
  </div>
</template>