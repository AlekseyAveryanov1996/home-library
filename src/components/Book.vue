<script setup>
  import { computed, onMounted, ref } from 'vue';
  import { ClockIcon, ArchiveBoxArrowDownIcon, BookOpenIcon, CogIcon, RectangleStackIcon } from '@heroicons/vue/24/solid';
  import { useBooksStore } from '@/stores/booksStore';

  const booksStore = useBooksStore();

  const props = defineProps({
    id: Number,
    srcImage: String,
    bookName: String,
    autorName: String,
    dateStartRead: String,
    dateEndRead: String,
    numberOfPage: Number,
    inCollection: Boolean,
    reading: Boolean, // читаю сейчас
    read_it: Boolean, // Прочитано
  })

  const timeReading = computed(() => getDayDifference(props.dateStartRead, props.dateEndRead));

  const  getDayDifference = (date1, date2) => {
    // Если переданы строки - конвертируем в Date
    if (date1 && date2) {
      const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
      const d2 = typeof date2 === 'string' ? new Date(date2) : date2;

      // Проверка на валидность дат
      if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
        throw new Error('Некорректные даты');
      }

      const timeDiff = Math.abs(d2.getTime() - d1.getTime());
      return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    }
  }

  onMounted(() => {

  })

  // получаем статус книги (читается, или прочитано);
  const statusReading = ref({
    reading: props.reading,
    read_it: props.read_it,
    inColletions: props.inCollection,
  })

  // устанавливаем классы в зависимости от статуса
  const statusBookReading = computed(() => ({
    disabled: statusReading.value.inColletions === false, // если нет в коллекции, то мы не можем читать или закончить чтение
    active: statusReading.value.reading === true,
  }))

  // устанавливаем классы в зависимости от статуса
  const statusBookReadIt = computed(() => ({
    disabled: statusReading.value.inColletions === false || statusReading.value.read_it === null, // если первый раз добавлена в коллекцию
    active: statusReading.value.read_it === true,
  }))

  const readBookStart = async (idBlock, propsdateStartRead) => {
    const idBlockValue = idBlock;
    let dateStartRead = ref(propsdateStartRead);

    dateStartRead.value = getDate();

    try {
      statusReading.value.reading = true;
      statusReading.value.read_it = false;

      booksStore.updateBooks({
        idBook: idBlockValue,
        statusReading: statusReading.value.reading,
        statusReadIt: statusReading.value.read_it,
        dateStartRead: dateStartRead.value,
      })
    } catch (error) {
      console.log(error);
    }
  }

  const readBookEnd = async (idBlock, propsdateEndRead) => {
    const idBlockValue = idBlock;
    const dateEndRead = ref(propsdateEndRead);

    dateEndRead.value = getDate();

    try {
      statusReading.value.reading = false;
      statusReading.value.read_it = true;
      booksStore.updateBooks({
        idBook: idBlockValue,
        statusReading: statusReading.value.reading,
        statusReadIt: statusReading.value.read_it,
        dateEndRead: dateEndRead.value,
      })
    } catch (error) {
      console.log(error);
    }
  }

  const getDate = () => {
    const day = new Date().getDate();
    const month = ('0' + String(new Date().getMonth() + 1)).slice(-2);
    const year = new Date().getFullYear();

    return year + '-' + month + '-' + day;
  }


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
    <div class="book__info-wrapper">
      <div v-if='numberOfPage' class="book__count">
        Количество страниц: {{ numberOfPage }}
      </div>
      <div v-if="timeReading" class="book__time-reading">
        Прочитано за: {{ timeReading }}
      </div>
    </div>
    <div v-if="dateStartRead" class="book__date-wrapper">
      <div class="book__date-label-wrapper">
        <div class="book__date-icon" title='Дата начала чтения'>
          <ClockIcon />
        </div>
        <div class="book__date-text">
          {{ dateStartRead }}
        </div>
      </div>
      <div v-if="dateEndRead" class="book__date-label-wrapper">
        <div class="book__date-icon --red" title='Дата Окончания чтения'>
          <ClockIcon />
        </div>
        <div class="book__date-text">
          {{ dateEndRead }}
        </div>
      </div>
    </div>

    <div class="book__tags">
      <div class="book__tags-btns">
        <div @click='() => readBookEnd(id, props.dateStartRead)' class="book__tag book__tag-btn" :class='statusBookReadIt' title='Завершить чтение'>
          <ArchiveBoxArrowDownIcon />
        </div>
        <div @click='() => readBookStart(id, props.dateEndRead)' class="book__tag book__tag-btn" :class='statusBookReading' title='Читать'>
          <BookOpenIcon />
        </div>
        <div class="book__tag book__tag-btn" title='Редактировать'>
          <CogIcon />
        </div>
      </div>
      <div class="book__tags-status">
        <div :class='inCollection ? "book__tag --green" : "book__tag --red"' :title='inCollection ? "В коллекции" : "Нет в коллекции"'>
          <RectangleStackIcon />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
  .book
    padding: 12px
    border-radius: 6px;
    background: #fff
    box-shadow: rgba(0, 0, 0, 0.74) 0px 5px 15px 0px;
    color: #232222
    display: flex
    flex-direction: column
    +min(tabletLarge)
      padding: 20px;
    &__image
      display: flex
      border-radius: 4px
      overflow hidden
      margin-bottom: 12px
    &__name
      font-size: 16px
      line-height: 22px
      font-weight: 700
      margin-bottom: 12px
      +min(tabletLarge)
        font-size: 20px
        line-height: 24px
    &__autor-name
      font-weight: 500
      font-size: 14px
      line-height: 16px
      margin-bottom: 12px;
      +min(tabletLarge)
        font-size: 18px
        line-height: 20px
    &__info-wrapper
      display: flex
      align-items: center
      flex-wrap: wrap
      gap: 20px
    &__count
      font-size: 12px
      line-height: 16px
    &__time-reading
      font-size: 12px
      line-height: 16px
    &__date-wrapper
      margin-top: 12px
      display: flex
      flex-wrap: wrap
      gap: 12px
      margin-bottom: 20px
    &__date-label-wrapper
      display: flex
      align-items: center
      gap: 8px
      flex-shrink: 0
    &__date-icon
      width 20px
      flex-shrink: 0
      height: 20px
      flex-shrink: 0
      svg
        fill: transparent
        stroke: #1d665f
        width 100%
        height: 100%
      &.--red
        svg
          stroke #e73434
    &__date-text
      white-space: nowrap
    &__tags
      margin-top: auto
      display: flex
      justify-content: space-between
      flex-wrap: wrap
      gap: 20px;
    &__tag
      width 25px
      height: 25px
      display: flex
      &.--green
        svg
          fill: #5a8f8a
      &.--red
        svg
          fill: #e73434
      svg
        width 100%
        height: 100%
        fill: black
      &-btn
        cursor pointer
        &.disabled
          opacity .3
          pointer-events: none
        &.active
          pointer-events: none
          svg
            fill: #5a8f8a
    &__tags-btns
      display: flex
      align-items: center
      gap: 12px;

</style>
