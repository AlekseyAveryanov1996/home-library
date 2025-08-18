import { defineStore } from "pinia";
import { ref } from "vue";


export const usePopupStore = defineStore('popup', () => {
    const isOpen = ref(false) // по умолчанию false

    function closePopup() {
        isOpen.value = false;
    }
    function openPopup(data) {
        isOpen.value = true;
    }
    return {
        closePopup,
        openPopup,
        isOpen,
    }
})