<template>
  <div class="header">
    <div class="container-block">
      <div class="header__container">
        <div class="header__info">
          info
        </div>
        <div class="header__sidebar">
          side-bar
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='stylus'>
  .header
    padding: 20px 0
    width 100%
    border-bottom: 1px solid #325750
    +min(tablet)
      grid-column: 1/3
    &__container
      display: flex
      align-items: center
      justify-content: space-between
</style>
