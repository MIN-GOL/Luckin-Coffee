<script setup>
defineProps(["title"])
const onClickLeft = () => history.back();
</script>

<template>
  <van-nav-bar
      fixed
      :title="title"
      left-text='返回'
      left-arrow
      @click-left="onClickLeft"
  />
  <div class="contain">
    <div class="bg"></div>
    <div class="card">
      <slot></slot>
    </div>
    <div class="logout">
      <slot name="logout"></slot>
    </div>

  </div>

</template>

<style scoped lang="scss">
.contain{
  background-color: #efefef;
  height: 94.5vh;
  width: 100vw;

  .bg{
    height: 6.28rem;
    background-color: #0c34ba;
  }

  .card{
    transform: translateY(-2rem);
    background-color: white;
    width: 95%;
    margin: 0 auto;
    border-radius: .6rem;
    padding: .5rem .5rem;
    box-sizing: border-box;
    font-size: .9rem;
  }
}
.van-nav-bar {
  --van-nav-bar-text-color: #0c34ba;
  --van-nav-bar-icon-color: #0c34ba;
}

.logout {
  margin: 5rem 1rem 1rem;
}
</style>