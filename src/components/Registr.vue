<script setup>
  import { supabase } from '@/supabase';
  import { ref } from 'vue';
  
  const email = ref('');
  const password = ref('');
  const message = ref('');

  const registr = async() => {

    const errCode = {
      weak: "weak_password", // слабый пароль
      alreadyExists: 'user_already_exists', // пользователь уже существует
    };
    
    // объект с выводом сообщение об ошибке
    const messageUsers = {
      weakError: 'Пароль слишком слабый, придумайте другой',
      alreadyExistsError: 'Такой пользователь уже существует',
      success: "Пользователь зарегистрирован, на вашу почту отправлено письмо для подтверждения регистрации",
    }

    try {
      const {data, error} = await supabase.auth.signUp({ // отправляем запрос в supabase
        email: email.value,
        password: password.value,
      })

      if (error) { // если ошибка
        switch(error.code) {
          case errCode.weak:
            message.value = messageUsers.weakError;
            throw new Error(messageUsers.weakError)
          case errCode.alreadyExists:
            message.value = messageUsers.alreadyExistsError;
            throw new Error(messageUsers.alreadyExistsError)
        }
      }

      console.log(data);

      if (data.user.role) {
        message.value = messageUsers.success;
      }

    } catch(err) {
      console.log(err.message)
    }
  }

</script>

<template>
  <h1>Регистрация</h1>

  <form action="" @submit.prevent="registr">
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />
    </div>
    <div>
      <label for="password">Пароль:</label>
      <input type="password" id="password" v-model="password" required />
    </div>
    <button type="submit">Зарегистрироваться</button>
  </form>

  <div>{{ message }}</div>

</template>

