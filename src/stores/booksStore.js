import { defineStore } from "pinia";
import { supabase } from '@/supabase';
import { useUserStore } from '@/stores/userStore';
import { useLoaderStore } from '@/stores/loaderStore';
import { ref } from "vue";



export const useBooksStore = defineStore('books', () => {
  const books = ref([]); // список книг
  const isLoaded = ref(false); // загружены или не загружены книги

  const loadBooks = async () => {
    if (isLoaded.value) return // если книги уже загружены

    const userStore = useUserStore();
    const loaderStore = useLoaderStore();

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
      isLoaded.value = true;

      // если запрос прошел успешно то меняем на false (отключаем Loader)
      loaderStore.isVisibleLoader = false;
    } catch (error) {
      // если ошибка, то показываем загрузку и передаем в родитеский компонент
      console.log(error)
    }
  };

  const clearBooks = () => {
    books.value = [];
    books.value = false;
  };

  const updateBooks = async ({ idBook, statusReading, statusReadIt, dateStartRead = null, dateEndRead = null }) => {

    try {

      const updateData = {
        reading: statusReading,
        read_it: statusReadIt,
      }

      // добавляем даты прочтения книг
      if (dateStartRead !== null) {
        updateData.date_start_read = new Date(dateStartRead)
        updateData.date_end_read = null; // при начале чтения всегда обнуляем дату окончания чтения
      };
      if (dateEndRead !== null) updateData.date_end_read = new Date(dateEndRead);


      const { data, error } = await supabase
        .from('listsBooks')
        .update(
          updateData,
        )
        .eq('id', idBook)
        .select()

      if (error) throw new Error("Ошибка обновления данных");

      books.value = books.value.map(book => data.find(({ id }) => id === book.id) || book) // обновляем реактивно карточки книг

    } catch (error) {
      console.log(error)
    }

  }

  return {
    loadBooks,
    clearBooks,
    updateBooks,
    books,
    isLoaded,
  }
})
