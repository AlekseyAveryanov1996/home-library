<script setup>
  import { onMounted } from 'vue';
  import StartWindowSlide from './StartWindowSlide.vue';
  // swiper parameters
  const swiperParams = {
    breakpoints: {
      360: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      980: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
    on: {
      init() {
        // ...
      },
    },
  };

  onMounted(() => {
    const swiperEl = document.querySelector('swiper-container');
    Object.assign(swiperEl, swiperParams);
    swiperEl.initialize();
  })

</script>

<template>

  <div class="start-window bg-[url(@/assets/images/startWindow.jpg)] bg-no-repeat bg-cover overflow-hidden h-dvh">

    <div class="start-window__wrapper max-w-[1600px] px-[20px] flex flex-col items-center ml-auto mr-auto mt-[120px] xl: mt-[100px]">

      <div class="start-window__anim-lists w-[100%]">

        <swiper-container init="false">
          <swiper-slide>
            <StartWindowSlide src-image='/src/assets/images/book1.jpg' title-text='Ваша личная книжная сокровищница' />
          </swiper-slide>
          <swiper-slide>
            <StartWindowSlide src-image='/src/assets/images/book2.jpg' title-text='Читайте с удовольствием' />
          </swiper-slide>
          <swiper-slide>
            <StartWindowSlide src-image='/src/assets/images/book3.jpg' title-text='Аккуратно и системно' />
          </swiper-slide>
          <swiper-slide>
            <StartWindowSlide src-image='/src/assets/images/book4.jpg' title-text='Доступно на всех устройствах' />
          </swiper-slide>
        </swiper-container>
      </div>

      <div class="start-window__main-text">Добро пожаловать</div>
      <div class="start-window__main-btn">Продолжить</div>
    </div>


  </div>
</template>
