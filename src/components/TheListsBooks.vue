<script setup>
  import { supabase } from '@/supabase';
  import { onMounted, ref } from 'vue';
  import Book from './Book.vue';

  const books = ref([]);
  // получаем данные из таблицы
  async function getBooks() {
    try {
      const { data, error } = await supabase
      .from('listsBooks')
      .select('*')

      if (error) {
        throw new Error("Ошибка получения данных");
      }
      books.value = data;
      console.log(books.value)
    } catch (error) {
      console.log(error)
    }
  }

  onMounted(() => {
    getBooks();
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
