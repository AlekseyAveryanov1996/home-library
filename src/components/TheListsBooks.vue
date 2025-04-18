<script setup>
  import { supabase } from '@/supabase';
  import { onMounted, ref } from 'vue';
  import Book from './Book.vue';
  import { useUserStore } from '@/stores/userStore';
  import { useLoaderStore } from '@/stores/loaderStore';

  const userStore = useUserStore(); // регистрируем сторе
  const loaderStore = useLoaderStore(); // вызываем store с Loader
  const books = ref([]); // переменная для получения списка книг



  // получаем данные из таблицы
  async function getBooks() {
    //делаем запрос к данным и обрабатываем ответ
    try {

      loaderStore.isVisibleLoader = true; // показываем, что идет загрузка

      const { data, error } = await supabase
      .from('listsBooks')
      .select('*')
      .eq('user_id', userStore.userid) // Фильтр по user_id, получаем id пользователя из STORE

      if (error) {
        throw new Error("Ошибка получения данных");
      }
      books.value = data;

      // если запрос прошел успешно то меняем на false (отключаем Loader)
      loaderStore.isVisibleLoader = false;
    } catch (error) {
      // если ошибка, то показываем загрузку и передаем в родитеский компонент
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
  <div v-else>Список книг пуст</div>
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
