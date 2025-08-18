<script setup>
  import { usePopupStore } from '@/stores/popupStore';
  const popupStore = usePopupStore();


</script>

<template>
  <div v-if="popupStore.isOpen" class="popup-overlay" @click.self=popupStore.closePopup>
    <div class="popup-content">
      <div @click='popupStore.closePopup' class="popup-content__close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29291 4.29289C4.68343 3.90237 5.3166 3.90237 5.70712 4.29289L12 10.5858L18.2929 4.29289C18.6834 3.90237 19.3166 3.90237 19.7071 4.29289C20.0976 4.68342 20.0976 5.31658 19.7071 5.70711L13.4142 12L19.7071 18.2929C20.0977 18.6834 20.0977 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L12 13.4142L5.70711 19.7071C5.31658 20.0976 4.68342 20.0976 4.29289 19.7071C3.90237 19.3166 3.90237 18.6834 4.29289 18.2929L10.5858 12L4.29291 5.70711C3.90238 5.31658 3.90238 4.68342 4.29291 4.29289Z" fill="black" fill-opacity="0.9"></path>
        </svg>
      </div>
      <div class="popup-content__main">
        lorem
      </div>
    </div>
  </div>
</template>

<style lang="stylus">
  .popup-overlay
    position: fixed
    top: 0
    left: 0
    width 100%
    height: 100%
    z-index 100
    background: rgba(0, 0, 0, .7)
    display: flex
    justify-content: center
    align-items: center

  .popup-content
    position relative
    padding: 20px 16px
    border-radius: 4px
    background: #fff
    width 100%
    max-width: 768px
    max-height: 100%
    overflow-y: auto
    +min(tablet)
      max-height: 560px
      padding: 40px 20px
    &__close
      width 24px
      height: 24px
      cursor pointer
      position: absolute
      top 14px
      right: 8px
      +min(tablet)
        top: 16px
        right: 16px

</style>
