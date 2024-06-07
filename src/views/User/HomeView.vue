<script setup>
import { useHomeStore } from "@/stores/modules/home.js";
const HomeStore = useHomeStore();
const { getBanner, getHot, getInfo, getTimeState } = HomeStore;

getBanner()
getHot()
getInfo()
getTimeState()

</script>

<template>
  <van-nav-bar fixed>
    <template #left>
      <div>
        {{getTimeState()}}
      </div>
      <div class="name" v-if="HomeStore.username">
        {{ HomeStore.username }}
      </div>
      <div class="name" v-else>
        <router-link to="/login" class="name">
          登录
        </router-link>
      </div>
    </template>
    <template #right>
      <router-link to="/select">
        <van-search
            style="padding: 0"
            v-model="HomeStore.value"
            shape="round"
            placeholder="请输入搜索关键词" />
      </router-link>
    </template>
  </van-nav-bar>

  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(banner, index) in HomeStore.banners" v-bind:key="index">
      <router-link :to="`/detail/${banner.pid}`">
        <img width="100%" v-bind:src="banner.bannerImg" alt="">
      </router-link>
    </van-swipe-item>
  </van-swipe>

  <ul class="products">
    <li style="list-style: none; position: relative" v-for="(i, index) in HomeStore.hot" v-bind:key="index">
      <router-link class="item" :to="`/detail/${i.pid}`">
      <div class="isHot" v-if="i.isHot === 1">热卖</div>
      <img :src="i.smallImg" alt="">
      <div class="iname">{{ i.name }}</div>
      <div class="enname">{{ i.enname }}</div>
      <div class="price">￥{{ i.price }}</div>
      </router-link>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.my-swipe{
  margin-top: 2rem;
}

.name{
  color: #0c34ba;
  font-size: .9rem;
  margin-left: .6rem;
  font-weight: 700
}
.products{
  display: flex;
  flex-wrap: wrap;
  padding: 10px 10px 70px;

  li{
    width: 49%;
  }
  .isHot{
    position: absolute;
    top: 0;
    right: 0;
    background-color: #ff0000;
    color: #ffffff;
    padding: 5px;
    font-size: 12px;
  }
  img{
    width: 100%;
  }
  .enname{
    font-size: 12px;
    color: grey;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
  }
  .price{
    font-size: 14px;
    font-weight: bold;
    color: #e4393c;
    padding: 5px 0 10px 0;
  }
}
.products li:nth-child(2n+1){
  margin-right:2%;
}

.router-link-active {
  text-decoration: none;
  color: #000000;
}

a{
  text-decoration: none;
  color: #000000;
}
</style>