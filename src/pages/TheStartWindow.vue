<script setup>
  const emit = defineEmits(['animFinished']);

  function onAnimationEnd() {
    emit('animFinished', { detail: 'Анимация закончена' });
  }

</script>


<template>
  <div class='box' @animationend='onAnimationEnd'>start Window</div>
</template>

<style>
  .box {
    animation: fadeIn 5s ease-in-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>
