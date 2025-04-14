<script setup>
  import { onMounted } from 'vue';
  import StartWindowSlide from './StartWindowSlide.vue';
  import Swiper from 'swiper';
  import { animate, createTimeline, stagger } from 'animejs';
  import Btn from '@/components/UI/Btn.vue'

  const emit = defineEmits(['visibleDashBoard'])

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

  function getRandomArbitary(min, max) {
    return Math.random() * (max - min) + min;
  }

  function animCharWelcome(selector) {
    const element = document.querySelector(selector);
    const text = element.textContent;
    element.textContent = '';

    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;;
      span.style.opacity = 0;
      span.style.display = 'inline-block';
      element.appendChild(span);

      animate(span,
      {
        opacity: [0, 1],
        y: [
          { to: '-2.75rem', ease: 'outExpo', duration: 600 },
          { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
        ],
        rotate: {
          from: '-1turn',
          delay: 0
        },
        duration: 1000,
        delay: i * 50, // Задержка между буквами
        easing: 'easeOutExpo',
      });

    })
  }

  function initBombAnim(selector) {
    const element = document.querySelectorAll(selector);
    element.forEach((char, i) => {
      const rand1 = getRandomArbitary(-25, 25).toFixed(2);
      const rand2 = getRandomArbitary(-25, 25).toFixed(2);

      animate(char, {
        y: [
          { to: `${rand1}rem`, ease: 'out', duration: 400 },
        ],
        x: [
          { to: `${rand2}rem`, ease: 'out', duration: 400 },
        ],
        opacity: [1, 0],
        duration: 500,
        delay: i * 50, // Задержка между буквами
        easing: 'ease',
      })

    })
  }

  function startProgramm() {
    emit('visibleDashBoard', true);
  }



  onMounted(() => {
    initSwiperStartWindow();

    // Анимация стартового экрана при помощи библиотеки Anime.js
    const tl = createTimeline()
      .call(animCharWelcome('.start-window__main-text'), 0)
      .call(() => initBombAnim('.start-window__main-text span'), 2500)
      .add('.swiper-slide', {
        y: ['10rem', 0],
        opacity: [0, 1],
        duration: 1500,
        delay: stagger(100)
      }, 3000)
      .add('.start-window__main-btn', {
        y: ['10rem', 0],
        opacity: [0, 1],
        visibility: 'visible',
        duration: 1500,
      }, 4000)

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

      <Btn @click='startProgramm' :class="'start-window__main-btn'">Продолжить</Btn>

    </div>

  </div>
</template>

<style lang='stylus'>
  .start-window
    overflow hidden
    &__anim-lists
      &:hover
        +min(tabletLarge)
          .start-window__item-img
            transform: rotateY(30deg)
    &__main-text
      font-weight: 700
      position absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      z-index 1
      color: #fff
      font-size: 1.75rem
      line-height: 1.75rem
      white-space: nowrap
      font-style: italic
      pointer-events: none
      padding: 100px 30px
      overflow hidden
      +min(mobile)
        font-size: 2.25rem
      +min(tabletLarge)
        font-size: 5rem
        padding: 200px 200px
    &__main-btn
      margin-top: 40px
      opacity 0
      visibility: hidden
      +min(tabletLarge)
        margin-top: 60px
  .swiper-slide
    opacity 0
    .start-window__item
      perspective: 2000px
    &:hover
      +min(tabletLarge)
        .start-window__item-img
          transform: rotateY(0deg) !important
        .start-window__item-img-wrapper
          &::before
            background: linear-gradient(90deg, #131f0f,#206f54,#1d6363);
            opacity 1
            visibility: visible;
        &~.swiper-slide
          .start-window__item-img
            transform: rotateY(-30deg);
</style>
