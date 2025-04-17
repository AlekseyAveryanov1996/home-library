import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoaderStore = defineStore('loader', () => {
  const isVisibleLoader = ref(false);

  return isVisibleLoader;
})
