<script setup>
  import { supabase } from '@/supabase';

  const {data: {user} } = await supabase.auth.getUser();

  console.log(user.email);
  console.log(user.id);

  // отправляем данные в таблицу

  // const { task, error } = await supabase
  // .from('tasks')
  // .insert([
  //   { task_name: 'Купить молоко2', user_id: user.id }
  // ]);


  // получаем данные из таблицы

  const { data: tasks, error } = await supabase
  .from('tasks')
  .select('*')
  .eq('user_id', user.id); // Фильтр по user_id

  if (error) {
    console.error('Ошибка:', error);
  } else {
    console.log('Данные:', JSON.stringify(tasks));
  }


</script>

<template>

</template>
