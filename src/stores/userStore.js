import { defineStore } from "pinia";
import { ref } from "vue";
import { supabase } from '@/supabase';

export const useUserStore = defineStore('user', () => {

  const userid = ref(null);
  const emailUser = ref(null);

  const fetchUser = async () => {

    try {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        throw new Error("Ошибка получения пользователя");
      }

      userid.value = data.user.id;
      emailUser.value = data.user.email;
    } catch (err) {
      console.log(err);
    }
  }

  return {
    userid,
    emailUser,
    fetchUser,
  }
})
