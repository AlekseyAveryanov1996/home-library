<script setup>
  import { register } from 'swiper/element/bundle';
  register();

</script>

<template>

  <div class="start-window bg-[url(@/assets/images/startWindow.jpg)] bg-no-repeat bg-cover overflow-hidden">

    <div class="start-window__wrapper max-w-[1600px] px-[20px] flex flex-col items-center ml-auto mr-auto">

      <div class="start-window__anim-lists w-[100%]">

        <swiper-container>
          <swiper-slide>
            <div class="start-window__item">
              <div class="start-window__item-img">
                <img src="@/assets/images/book1.jpg" alt="">
              </div>
              <div class="start-window__item-text">
                Ваша личная книжная сокровищница
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="start-window__item">
              <div class="start-window__item-img">
                <img src="@/assets/images/book2.jpg" alt="">
              </div>
              <div class="start-window__item-text">
                Читайте с удовольствием
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="start-window__item">
              <div class="start-window__item-img">
                <img src="@/assets/images/book3.jpg" alt="">
              </div>
              <div class="start-window__item-text">
                Аккуратно и системно
              </div>
            </div>
          </swiper-slide>
          <swiper-slide>
            <div class="start-window__item">
              <div class="start-window__item-img">
                <img src="@/assets/images/book4.jpg" alt="">
              </div>
              <div class="start-window__item-text">
                Доступно на всех устройствах
              </div>
            </div>
          </swiper-slide>
        </swiper-container>
      </div>

      <div class="start-window__main-text">Добро пожаловать</div>
      <div class="start-window__main-btn">Продолжить</div>
    </div>


  </div>
</template>
