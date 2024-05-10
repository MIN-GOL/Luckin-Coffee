<script setup>

</script>

<template>
  <van-nav-bar>
    <template #left>
      <van-image
          width="37"
          height="37"
          src="src/assets/home_active.png"
      />
      <div class="title">Luckin Coffee</div>
    </template>
    <template #right>
      <div class="index">首页</div>
    </template>
  </van-nav-bar>

</template>

<style lang="scss" scoped>
.index{
  color: #0c34ba;
  font-weight: 1000;
  font-size: .9rem;
}

.title{
  margin-left: .3rem;
  font-weight: 550;
  font-size: .9rem;
}
</style>
