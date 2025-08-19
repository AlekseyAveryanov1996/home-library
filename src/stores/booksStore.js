import { defineStore } from "pinia";
import { supabase } from '@/supabase';
import { useUserStore } from '@/stores/userStore';
import { useLoaderStore } from '@/stores/loaderStore';
import { ref } from "vue";



export const useBooksStore = defineStore('books', () => {
  const books = ref([]); // список книг
  const isLoaded = ref(false); // загружены или не загружены книги
  const dataBook = ref({}); // данные одной книги для редактирования

  const loadBooks = async () => {
    if (isLoaded.value) return // если книги уже загружены

    const userStore = useUserStore();
    const loaderStore = useLoaderStore();

    try {

      loaderStore.isVisibleLoader = true; // показываем, что идет загрузка

      const { data, error } = await supabase
        .from('listsBooks')
        .select('*')
        .order('id', { ascending: true })
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

  const sendDataComponent = async (
    {
      idBook,
      titleBook,
      authorBook,
      countPage,
      dateStartRead,
      dateEndRead,
    }
  ) => {
    try {
      dataBook.value = {}; // очищаем при каждом редактировании и записываем новые данные
      dataBook.value.id = idBook,
      dataBook.value.name_book = titleBook;
      dataBook.value.autor_book = authorBook;
      dataBook.value.number_of_page = countPage;
      dataBook.value.date_start_read = dateStartRead;
      dataBook.value.date_end_read = dateEndRead;

      const { data, error } = await supabase
        .from('listsBooks')
        .update(
          dataBook.value,
        )
        .eq('id', dataBook.value.id)
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
    sendDataComponent,
    books,
    isLoaded,
    dataBook,
  }
})
