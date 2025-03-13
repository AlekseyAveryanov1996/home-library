<script setup>
import { supabase } from '@/supabase';
import { ShieldExclamationIcon, CheckBadgeIcon } from '@heroicons/vue/24/solid';

import InputCustom from '@/components/UI/InputCustom.vue';
import Toast from '@/components/UI/Toast.vue';
import router from '@/router';
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const message = ref('');
const messageEmail = ref('');
const messagePassword = ref('');
const emailError = ref(false);
const passwordError = ref(false);
const isVisibleToast = ref(false);

// объект с выводом сообщение об ошибке
const messageUsers = {
  default: 'Поле не может быть пустым',
  logged: "Успешная авторизация"
}

const errCode = {
  invalid_credentials: 'Неправильный логин или пароль',
};

const toastVisible = () => {
  isVisibleToast.value = true;
  setTimeout(() => {
    isVisibleToast.value = false;
  }, 2000);
}

const goToDashBoard = () => {
  setTimeout(() => {
    router.replace('/dashboard/')
  }, 3000);
}


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
        throw new Error(errCode.invalid_credentials);
      }

      // если успешно
      if (data.session) {
        message.value = messageUsers.logged; //показываем сообщение об успешной регистрации
        toastVisible();
        goToDashBoard(); // перенаправляем на главную страницу рабочей области
      }

    } catch (err) {
      message.value = errCode.invalid_credentials;
      toastVisible();

    }
  } else {
    emailError.value = false; // убираем ошибку
    passwordError.value = false; // убираем ошибку

    // проверка на пустые поля
    if (!email.value) {
      messageEmail.value = messageUsers.default
      emailError.value = true;
    }

    if (!password.value) {
      messagePassword.value = messageUsers.default
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
    <button type="submit">Войти в систему</button>
  </form>

  <Toast :toastText='message' :isVisible='isVisibleToast'>
    <ShieldExclamationIcon v-if="message === errCode.invalid_credentials" class='fill-red-700'/>
    <CheckBadgeIcon v-else class='fill-lime-500'/>
  </Toast>

  Нет аккаунта? <RouterLink to="/">Зарегистрироваться</RouterLink>
</template>
