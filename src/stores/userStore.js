import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from '@/supabase';

export const useUserStore = defineStore('user', () => {

  const userid = ref(null);
  const emailUser = ref(null);
  const userLoading = ref(false);

  const fetchUser = async () => {

    try {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        userLoading.value = false; // загрузка завершения но пользователь не авторизован
        throw new Error("Ошибка получения пользователя");
      }

      userid.value = data.user.id;
      emailUser.value = data.user.email;
      userLoading.value = true;
    } catch (err) {
      userLoading.value = false;
      console.log(err);
    }
  }

  return {
    userid,
    emailUser,
    userLoading,
    fetchUser,
  }
})
