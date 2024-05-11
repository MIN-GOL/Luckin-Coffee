<script setup>
import {ref} from 'vue'
import axios from 'axios'
const banners = ref([])
const hot = ref([])

// 获取轮播图
axios.get('http://www.kangliuyong.com:10002/banner',{
  params: {
    appkey: "U2FsdGvkx19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="
  }
}).then(function (res) {banners.value = res.data.result})

// 获取最热产品
axios.get('http://www.kangliuyong.com:10002/typeProducts',{
  params: {
    key: "isHot",
    value: 1,
    appkey: "U2FsdGvkx19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="
  }
}).then(function (res) {hot.value = res.data.result})

</script>

<template>
  <van-nav-bar>
    <template #left>
      <div>
        下午好
      </div>
      <div class="name">
        MINGOL
      </div>
    </template>
    <template #right>
      <van-search
          style="padding: 0"
          v-model="value"
          shape="round"
          placeholder="请输入搜索关键词" />
    </template>
  </van-nav-bar>

  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(banner, index) in banners" v-bind:key="index">
      <img width="100%" v-bind:src="banner.bannerImg" alt="">
    </van-swipe-item>s
  </van-swipe>

  <ul class="products">
    <li style="list-style: none" v-for="(i, index) in hot" v-bind:key="index">
      <img :src="i.smallImg" alt="">
      <div class="iname">{{ i.name }}</div>
      <div class="enname">{{ i.enname }}</div>
      <div class="price">{{ i.price }}</div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
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
    color: red;
    padding: 5px 0 10px 0;
  }
}
.products li:nth-child(2n+1){
  margin-right:2%;
}
</style>