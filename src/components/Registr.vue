<script setup>
  import { supabase } from '@/supabase';
  import InputCustom from './UI/InputCustom.vue';

  import { ref } from 'vue';

  const email = ref('');
  const password = ref('');
  const message = ref('');
  const messageEmail = ref('');
  const messagePassword = ref('');
  const emailError = ref(false)
  const passwordError = ref(false)

  const registr = async() => {

    const errCode = {
      weak: "weak_password", // слабый пароль
      alreadyExists: 'user_already_exists', // пользователь уже существует
    };

    // объект с выводом сообщение об ошибке
    const messageUsers = {
      default: 'Поле не может быть пустым',
      weakError: 'Пароль слишком слабый, придумайте другой',
      alreadyExistsError: 'Такой пользователь уже существует',
      success: "Пользователь зарегистрирован, теперь вы можете пользоваться системой",
    }

    // проверка на пустые поля
    if (!email.value) {
      messageEmail.value = messageUsers.default
      emailError.value = true;
    } else {
      emailError.value = false;
    }

    if (!password.value) {
      messagePassword.value = messageUsers.default
      passwordError.value = true;
    } else {
      passwordError.value = false;
    }

    if (email.value && password.value) { // если поля не пустые, то отправляем запрос
      try {
      const {data, error} = await supabase.auth.signUp({ // отправляем запрос в supabase
        email: email.value,
        password: password.value,
      })

      if (error) { // если ошибка
        switch(error.code) {
          case errCode.weak:
            messagePassword.value = messageUsers.weakError;
            throw new Error(messageUsers.weakError)
          case errCode.alreadyExists:
            password.value = true;
            messageEmail.value = messageUsers.alreadyExistsError;
            throw new Error(messageUsers.alreadyExistsError)
        }
      }

      console.log(data);

      if (data.user.role) {
        message.value = messageUsers.success;
      }

      } catch(err) {
        console.log(err.message)
        emailError.value = true;
        passwordError.value = true;
      }
    }

  }

</script>

<template>
  <h1>Регистрация</h1>
  <form action="" @submit.prevent="registr">
    <!-- <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />
    </div> -->
    <!-- <div>
      <label for="password">Пароль:</label>
      <input type="password" id="password" v-model="password" required />
    </div> -->
    <InputCustom v-model="email" placeholder-text="E-mail" :isError='emailError' :text-error="messageEmail" type-input="e-mail" is-required/>
    <InputCustom v-model="password" placeholder-text="Пароль" :is-error='passwordError' :text-error="messagePassword" type-input="password" is-required/>

    <button type="submit">Зарегистрироваться</button>
  </form>

  <!-- <div>{{ message }}</div> -->

</template>

