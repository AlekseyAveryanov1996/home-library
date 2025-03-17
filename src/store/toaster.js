import { defineStore } from "pinia";
import { ref } from "vue";

export const useToastStore = defineStore('toast', () => {
  const isVisibleToast = ref(false);

  return isVisibleToast;
})
