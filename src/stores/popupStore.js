import { defineStore } from "pinia";
import { markRaw, ref } from "vue";


export const usePopupStore = defineStore('popup', () => {
    const isOpen = ref(false) // по умолчанию false
    const component = ref(null);
    const objDataProps = ref();

    function closePopup() {
        isOpen.value = false;
    }
    function openPopup(componentName, objData) {
        if (objData) {
            objDataProps.value = objData;
        }
        component.value = componentName;
        isOpen.value = true;
    }
    return {
        closePopup,
        openPopup,
        isOpen,
        component,
        objDataProps,
    }
})