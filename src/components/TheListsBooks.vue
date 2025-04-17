<script setup>
  import { supabase } from '@/supabase';
  import { onMounted, ref } from 'vue';
  import Book from './Book.vue';
  import functions from '@/functions';

  const books = ref([]); // переменная для получения списка книг
  const userID = ref(''); // переменная для фильтрации данных по Пользователя


  // получаем данные из таблицы
  async function getBooks() {
    userID.value = (await functions.getUser()).userid // получаем ID авторизованного Пользователя

    //делаем запрос к данным и обрабатываем ответ
    try {
      const { data, error } = await supabase
      .from('listsBooks')
      .select('*')
      .eq('user_id', userID.value) // Фильтр по user_id

      if (error) {
        throw new Error("Ошибка получения данных");
      }
      books.value = data;
    } catch (error) {
      console.log(error)
    }
  }

  onMounted(() => {
    getBooks(); // вызываем после того, как страница подгрузилась полностью
  })

</script>

<template>
  <div v-if="books.length" class="books">
    <div class="books__lists">
      <Book v-for="book of books"
        :book-name='book.name_book'
        :autor-name='book.autor_book'
        :date-start-read='book.date_start_read'
        :date-end-read='book.date_end_read'
        :number-of-page='book.number_of_page'
        :key='book.id'/>
    </div>
  </div>
  <div v-else>У Вас нет книг</div>
</template>

<style lang="stylus">

  .books
    &__lists
      display: flex
      flex-direction: column
      gap: 20px
      +min(mobile)
        display: grid
        grid-template-columns: repeat(2, minmax(0px, 1fr))
        gap: 24px
      +min(tabletLarge)
        grid-template-columns: repeat(3, minmax(0px, 1fr))

</style>
