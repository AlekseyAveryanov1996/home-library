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
  <div class="main-form">
    <h1 class="main-form__title">Вход в систему</h1>
    <form class="main-form__inputs" action="" @submit.prevent="auth">
      <InputCustom color-text='text-[#0e2b21]' v-model='email' placeholder-text="E-mail" :is-error='emailError' :text-error='messageEmail' type-input="e-mail" is-required/>
      <InputCustom color-text='text-[#0e2b21]' v-model='password' placeholder-text="Пароль" :is-error='passwordError' :text-error='messagePassword' type-input="password" is-required/>
      <Btn :type="'submit'">Войти в систему</Btn>
    </form>

    <Toast :toastText='message' :isVisible='isVisibleToast'>
      <ShieldExclamationIcon v-if="message === ERR_CODE.invalid_credentials" class='fill-red-700'/>
      <CheckBadgeIcon v-else class='fill-lime-500'/>
    </Toast>

    <div class="main-form__bottom">
      Нет аккаунта? <RouterLink to="/registration/">Зарегистрироваться</RouterLink>
    </div>
  </div>
</template>

<style lang="stylus">
  .main-form
    margin: auto;
    padding: 0 20px;
    max-width: 560px;
    width 100%
    display: flex
    flex-direction: column
    align-items: center
    &__title
      color: #fff
      margin-bottom: 20px
    &__inputs
      width 100%
      display: flex
      flex-direction: column
      gap: 16px
      .btn
        margin-left: auto
        margin-right: auto
    &__bottom
      color: #fff
      margin-top: 20px
      font-size: 12px
      line-height: 14px
      display: flex
      gap: 20px
      +min(tabletLarge)
        font-size: 14px
        line-height: 16px
      a
        text-decoration: underline

</style>
