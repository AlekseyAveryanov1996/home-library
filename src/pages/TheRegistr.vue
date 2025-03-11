<script setup>
  import { supabase } from '@/supabase';
  import { CheckBadgeIcon } from '@heroicons/vue/24/solid';

  import InputCustom from '@/components/UI/InputCustom.vue';
  import Toast from '@/components/UI/Toast.vue';
  import router from '@/router';

  import { ref } from 'vue';


  const email = ref('');
  const password = ref('');
  const message = ref('');
  const messageEmail = ref('');
  const messagePassword = ref('');
  const emailError = ref(false)
  const passwordError = ref(false)
  const isVisibleToast = ref(false);

  const goToDashBoard = () => {
    setTimeout(() => {
      router.replace('/dashboard/')
    }, 3000);
  }

  const toastVisible = () => {
    isVisibleToast.value = true;
    setTimeout(() => {
      isVisibleToast.value = false;
    }, 2000);
  }

  const registr = async() => {

    const errCode = {
      weak: "weak_password", // слабый пароль
      alreadyExists: 'user_already_exists', // пользователь уже существует
      validationFailed: 'validation_failed', // пользователь уже существует
    };

    // объект с выводом сообщение об ошибке
    const messageUsers = {
      default: 'Поле не может быть пустым',
      weakError: 'Пароль слишком слабый, придумайте другой',
      alreadyExistsError: 'Такой пользователь уже существует',
      validationFailedError: 'Некоректный E-mail',
      success: "Пользователь зарегистрирован",
    }

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
            case errCode.weak:
              passwordError.value = true;
              messagePassword.value = messageUsers.weakError;
              throw new Error(messageUsers.weakError)
            case errCode.alreadyExists:
              emailError.value = true;
              messageEmail.value = messageUsers.alreadyExistsError;
              throw new Error(messageUsers.alreadyExistsError)
            case errCode.validationFailed:
              emailError.value = true;
              messageEmail.value = messageUsers.validationFailedError;
              throw new Error(messageUsers.validationFailedError)
          }
        }

      // если регистрация успешна
      if (data.user.role) {
        message.value = messageUsers.success; // показываем сообщение об успешной регистрации
        toastVisible(); // показываем сообщение об успешной регистрации
        goToDashBoard(); // перенаправляем на главную страницу рабочей области
      }

      } catch(err) {
        console.log(err.message)
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
  <h1>Регистрация</h1>
  <form action="" @submit.prevent="registr">
    <InputCustom v-model="email" placeholder-text="E-mail" :isError='emailError' :text-error="messageEmail" type-input="e-mail" is-required/>
    <InputCustom v-model="password" placeholder-text="Пароль" :is-error='passwordError' :text-error="messagePassword" type-input="password" is-required/>
    <button type="submit">Зарегистрироваться</button>
  </form>

  <div>{{ message }}</div>

  <Toast :toastText='message' :isVisible='isVisibleToast'>
    <CheckBadgeIcon class='fill-lime-500'/>
  </Toast>

  <div>Есть аккаунт? </div> <RouterLink to="/logIn/">Войти в систему</RouterLink>


</template>

