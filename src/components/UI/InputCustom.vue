<script setup>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

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

const format = (date) => {
  let dateValue = new Date(date);
  const day = dateValue.getDate();
  const month = ('0' + String(dateValue.getMonth() + 1)).slice(-2);
  const year = dateValue.getFullYear();

  return `${year}-${month}-${day}`
}

const handleFormatDate = (date) => {
  const formatDate = format(date);
  model.value = formatDate;
}
</script>

<template>
  <div
      class="input flex flex-col gap-1"
      :class='colorText'
  >
    <div class="input__placeholder text-xs">{{ placeholderText }}</div>
    <VueDatePicker
        v-if="typeInput==='Date'"
        v-model="model"
        :format="format"
        :teleport="true"
        @update:modelValue="handleFormatDate"
    ></VueDatePicker>
    <input
        v-else
        class="rounded-2xl border-1 p-2 focus:outline-none"
        :type="typeInput"
        v-model="model"
    />
    <div
        class="input__error text-xs text-red-700"
        :class='isError ? "block " : "hidden"'
    >{{ textError }}
    </div>
  </div>
</template>
