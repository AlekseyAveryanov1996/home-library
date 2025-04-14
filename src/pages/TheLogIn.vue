<script setup>
import { supabase } from '@/supabase';
import { ShieldExclamationIcon, CheckBadgeIcon } from '@heroicons/vue/24/solid';

import { MESSAGE_USERS, ERR_CODE } from '@/cosntants';
import functions from '@/functions';
import InputCustom from '@/components/UI/InputCustom.vue';
import Toast from '@/components/UI/Toast.vue';
import Btn from '@/components/UI/Btn.vue'

import { useToastStore } from '@/stores/toaster';
import { ref } from 'vue';


const email = ref('');
const password = ref('');
const message = ref('');
const messageEmail = ref('');
const messagePassword = ref('');
const emailError = ref(false);
const passwordError = ref(false);
const isVisibleToast = useToastStore();

const auth = async () => {

  if (email.value && password.value) {

    emailError.value = false; // убираем ошибку
    passwordError.value = false; // убираем ошибку

    try {
      const {data, error} = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
      })

      if (error) {
        throw new Error(ERR_CODE.invalid_credentials);
      }

      // если успешно
      if (data.session) {
        message.value = MESSAGE_USERS.logged; //показываем сообщение об успешной регистрации
        functions.toastVisible(isVisibleToast);
        functions.goToRoute('/'); // перенаправляем на главную страницу рабочей области
      }

    } catch (err) {
      message.value = ERR_CODE.invalid_credentials;
      functions.toastVisible(isVisibleToast);

    }
  } else {
    emailError.value = false; // убираем ошибку
    passwordError.value = false; // убираем ошибку

    // проверка на пустые поля
    if (!email.value) {
      messageEmail.value = MESSAGE_USERS.default
      emailError.value = true;
    }

    if (!password.value) {
      messagePassword.value = MESSAGE_USERS.default
      passwordError.value = true;
    }
  }
}

</script>

<template>
  <h1>Вход в систему</h1>
  <form action="" @submit.prevent="auth">
    <InputCustom v-model='email' placeholder-text="E-mail" :is-error='emailError' :text-error='messageEmail' type-input="e-mail" is-required/>
    <InputCustom v-model='password' placeholder-text="Пароль" :is-error='passwordError' :text-error='messagePassword' type-input="password" is-required/>
    <Btn :type="'submit'">Войти в систему</Btn>
  </form>

  <Toast :toastText='message' :isVisible='isVisibleToast'>
    <ShieldExclamationIcon v-if="message === ERR_CODE.invalid_credentials" class='fill-red-700'/>
    <CheckBadgeIcon v-else class='fill-lime-500'/>
  </Toast>

  Нет аккаунта? <RouterLink to="/registration/">Зарегистрироваться</RouterLink>
</template>
