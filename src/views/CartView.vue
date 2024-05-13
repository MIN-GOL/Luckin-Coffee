<script setup>
import { ref } from 'vue'
const onClickLeft = () => history.back();
const cart_list = ref([])

</script>

<template>
  <van-nav-bar
      title="购物袋"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"/>

  <img src="../assets/shopbag_bg.png" width="100%" alt="">
  <van-empty v-if="cart_list.length <= 0" description="购物袋没有商品" />

</template>

<style lang="scss" scoped>

</style>