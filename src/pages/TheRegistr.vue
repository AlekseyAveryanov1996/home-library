<script setup>
  import { supabase } from '@/supabase';
  import { CheckBadgeIcon } from '@heroicons/vue/24/solid';
  import Btn from '@/components/UI/Btn.vue'

  import { MESSAGE_USERS, ERR_CODE } from '@/cosntants';
  import functions from '@/functions';
  import InputCustom from '@/components/UI/InputCustom.vue';
  import Toast from '@/components/UI/Toast.vue';

  import { useToastStore } from '@/stores/toaster';
  import { ref } from 'vue';


  const email = ref('');
  const password = ref('');
  const message = ref('');
  const messageEmail = ref('');
  const messagePassword = ref('');
  const emailError = ref(false)
  const passwordError = ref(false)
  const isVisibleToast = useToastStore();

  const registr = async() => {

    if (email.value && password.value) { // если поля не пустые, то отправляем запрос

      emailError.value = false; // убираем ошибку
      passwordError.value = false; // убираем ошибку

      try {
        const {data, error} = await supabase.auth.signUp({ // отправляем запрос в supabase
          email: email.value,
          password: password.value,
        })

        if (error) { // если ошибка
          switch(error.code) {
            case ERR_CODE.weak:
              passwordError.value = true;
              messagePassword.value = MESSAGE_USERS.weakError;
              throw new Error(MESSAGE_USERS.weakError)
            case ERR_CODE.alreadyExists:
              emailError.value = true;
              messageEmail.value = MESSAGE_USERS.alreadyExistsError;
              throw new Error(MESSAGE_USERS.alreadyExistsError)
            case ERR_CODE.validationFailed:
              emailError.value = true;
              messageEmail.value = MESSAGE_USERS.validationFailedError;
              throw new Error(MESSAGE_USERS.validationFailedError)
          }
        }

      // если регистрация успешна
      if (data.user.role) {
        message.value = MESSAGE_USERS.success; // показываем сообщение об успешной регистрации
        functions.toastVisible(isVisibleToast); // показываем сообщение об успешной регистрации
        functions.goToRoute('/'); // перенаправляем на главную страницу рабочей области
      }

      } catch(err) {

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
    <h1 class="main-form__title">Регистрация</h1>
    <form class="main-form__inputs" action="" @submit.prevent="registr">
      <InputCustom color-text='text-[#0e2b21]' v-model="email" placeholder-text="E-mail" :isError='emailError' :text-error="messageEmail" type-input="e-mail" is-required/>
      <InputCustom color-text='text-[#0e2b21]' v-model="password" placeholder-text="Пароль" :is-error='passwordError' :text-error="messagePassword" type-input="password" is-required/>
      <Btn :type="'submit'">Зарегистрироваться</Btn>
    </form>

    <Toast :toastText='message' :isVisible='isVisibleToast'>
      <CheckBadgeIcon class='fill-lime-500'/>
    </Toast>

    <div class="main-form__bottom">Есть аккаунт? <RouterLink to="/logIn/">Войти в систему</RouterLink> </div>
  </div>



</template>

