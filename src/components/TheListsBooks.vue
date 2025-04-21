<script setup>
  import { computed, onMounted, ref } from 'vue';
  import Book from './Book.vue';
  import { useBooksStore } from '@/stores/booksStore';

  const booksStore = useBooksStore();
  const books = computed(() => booksStore.books) // сохраняем книги в переменную

  onMounted(async() => {
    await booksStore.loadBooks(); // загружаем книги
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
        :in-collection='book.in_collection'
        :reading='book.reading'
        :read_it='book.read_it'
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
      +min(wide)
        grid-template-columns: repeat(4, minmax(0px, 1fr))

</style>
