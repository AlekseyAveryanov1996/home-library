<script setup>
import { supabase } from '@/supabase';
import InputCustom from '@/components/UI/InputCustom.vue';
import { ref } from 'vue';

const email = ref('');
const password = ref('');

const auth = async () => {

  console.log('test');

  if (email.value && password.value) {
    try {
      const {data, error} = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value
      })

      if (error) {
        throw new Error("Ошибка");
      }

      console.log(data);

    } catch (err) {
      console.log(err.message)
    }
  }
}

</script>

<template>
  <h1>Вход в систему</h1>
  <form action="" @submit.prevent="auth">
    <InputCustom v-model='email' placeholder-text="E-mail" type-input="e-mail" is-required/>
    <InputCustom v-model='password' placeholder-text="Пароль" type-input="password" is-required/>
    <button type="submit">Войти в систему</button>
  </form>
  Нет аккаунта? <RouterLink to="/">Зарегистрироваться</RouterLink>
</template>
