<script setup>
const onClickLeft = () => history.back();

</script>

<template>
  <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
</template>

<style scoped>

</style>