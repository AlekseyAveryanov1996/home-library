<script setup>
  import { ref } from 'vue';

  const props = defineProps({
    srcImage: String,
    bookName: String,
    autorName: String,
    dateStartRead: String,
    dateEndRead: String,
    numberOfPage: Number,
  })

  const timeReading = ref(null);
  // console.log(timeReading.value);
</script>

<template>
  <div class="book">
    <div class="book__image">
      <img v-if='srcImage' :src='srcImage' alt="Image">
      <img v-else src="@/assets/images/book-fone.jpg" alt="">
    </div>
    <div class="book__name">
      Название: {{ bookName }}
    </div>
    <div class="book__autor-name">
      Автор: {{ autorName }}
    </div>
    <div class="book__date-start">
      Дата начала чтения: {{ dateStartRead }}
    </div>
    <div class="book__date-end">
      Дата окончания чтения: {{ dateEndRead }}
    </div>
    <div class="book__count">
      Количество страниц: {{ numberOfPage }}
    </div>
    <div v-if="timeReading !== null" class="book__time-reading">
      Прочитано за: {{ timeReading }}
    </div>
    <div class="book__tags">
      <div class="book__tag">Прочитано</div>
      <div class="book__tag">Читается</div>
      <div class="book__tag">На полке</div>
    </div>
  </div>
</template>
