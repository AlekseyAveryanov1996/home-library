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

  return {
    loadBooks,
    clearBooks,
    books,
    isLoaded,
  }
})
