<script setup>
  import { onMounted } from 'vue';
  import StartWindowSlide from './StartWindowSlide.vue';
  import Swiper from 'swiper';

  function initSwiperStartWindow() {
    const swiperStartWindow = new Swiper('.js-start-window-sl', {
        // Optional parameters
        loop: false,
        breakpoints: {
        360: {
          slidesPerView: 2.2,
          spaceBetween: 20,
        },
        980: {
          slidesPerView: 3.2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      },
      on: {
        init() {

        },
      },
    });
  }

  onMounted(() => {
    initSwiperStartWindow();
  })

</script>

<template>

  <div class="start-window bg-[url(@/assets/images/startWindow.jpg)] bg-no-repeat bg-cover overflow-hidden h-dvh">

    <div class="start-window__wrapper max-w-[1600px] px-[20px] flex flex-col items-center ml-auto mr-auto mt-[120px] xl: mt-[100px]">

      <div class="start-window__anim-lists js-start-window-sl w-[100%]">

        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <StartWindowSlide src-image='/src/assets/images/book1.jpg' title-text='Ваша личная книжная сокровищница' />
          </div>
          <div class="swiper-slide">
            <StartWindowSlide src-image='/src/assets/images/book2.jpg' title-text='Читайте с удовольствием' />
          </div>
          <div class="swiper-slide">
            <StartWindowSlide src-image='/src/assets/images/book3.jpg' title-text='Аккуратно и системно' />
          </div>
          <div class="swiper-slide">
            <StartWindowSlide src-image='/src/assets/images/book4.jpg' title-text='Доступно на всех устройствах' />
          </div>
        </div>
      </div>

      <div class="start-window__main-text">Добро пожаловать</div>
      <div class="start-window__main-btn">Продолжить</div>
    </div>


  </div>
</template>

<style lang='stylus'>
  .start-window
    &__anim-lists
      &:hover
        +min(tabletLarge)
          .start-window__item-img
            transform: rotateY(30deg)
  .swiper-slide
    .start-window__item
      perspective: 2000px
    &:hover
      +min(tabletLarge)
        .start-window__item-img
          transform: rotateY(0deg) !important
        .start-window__item-img-wrapper
          &::before
            opacity 1
            visibility: visible;
        &~.swiper-slide
          .start-window__item-img
            transform: rotateY(-30deg);
</style>
