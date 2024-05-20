<script setup>
import {ref} from 'vue'
import axios from 'axios'

const username = ref('')
const banners = ref([])
const hot = ref([])
const base_url = 'http://www.kangliuyong.com:10002'
const key = 'U2FsdGvkx19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='
const value = ref()
const token = localStorage.getItem('token');

// 获取轮播图
axios.get(`${base_url}/banner`,{
  params: {
    appkey: key
  }
}).then(function (res) {banners.value = res.data.result})

// 获取最热产品
axios.get(`${base_url}/typeProducts`,{
  params: {
    key: "isHot",
    value: 1,
    appkey: key
  }
}).then(function (res) {hot.value = res.data.result})

// 获取个人信息
axios.get(`${base_url}/findMy`,{
  params: {
    tokenString: token,
    appkey: key
  }
}).then(function (res) {
  res = res.data
  if (res.code === 'A001') {
    username.value = res.result[0].nickName
  }
})

let getTimeState = () => {
  let hours = new Date().getHours();
  let state= ``;
  if (hours >= 0 && hours <= 10) {
    state = `早上好 !`;
  } else if (hours > 10 && hours <= 14) {
    state= `中午好 !`;
  } else if (hours > 14 && hours <= 18) {
    state= `下午好 !`;
  } else if (hours > 18 && hours <= 24) {
    state= `晚上好 !`;
  }
  return state;
}
</script>

<template>
  <van-nav-bar>
    <template #left>
      <div>
        {{getTimeState()}}
      </div>
      <div class="name" v-if="username">
        {{ username }}
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
            v-model="value"
            shape="round"
            placeholder="请输入搜索关键词" />
      </router-link>
    </template>
  </van-nav-bar>

  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(banner, index) in banners" v-bind:key="index">
      <router-link :to="`/detail/${banner.pid}`">
        <img width="100%" v-bind:src="banner.bannerImg" alt="">
      </router-link>
    </van-swipe-item>
  </van-swipe>

  <ul class="products">
    <li style="list-style: none" v-for="(i, index) in hot" v-bind:key="index">
      <router-link class="item" :to="`/detail/${i.pid}`">
      <img :src="i.smallImg" alt="">
      <div class="iname">{{ i.name }}</div>
      <div class="enname">{{ i.enname }}</div>
      <div class="price">￥{{ i.price }}</div>
      </router-link>
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