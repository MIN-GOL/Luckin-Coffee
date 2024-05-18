<script setup>
import axios from 'axios'
import {ref} from 'vue'

import MineInfo from "@/components/MineInfo.vue";

const userInfo = ref([])
const base_url = 'http://www.kangliuyong.com:10002'
const token = localStorage.getItem('token');
const key = 'U2FsdGvkx19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='

// 获取个人资料
axios.get(`${base_url}/findAccountInfo`, {
  params: {
    tokenString: token,
    appkey: key
  }
}).then(function (res) {
  // 解析
  userInfo.value = res.data.result[0]
})

</script>

<template>
  <mine-info title="个人资料">

    <van-cell title="头像">
      <template #right-icon>
        <van-image
            width="40"
            height="40"
            round
            :src="userInfo.userImg"/>
      </template>
    </van-cell>

    <van-cell title="用户id" :value="userInfo.userId"/>

    <van-cell title="手机号" :value="userInfo.phone"/>

    <van-cell title="昵称" :value="userInfo.nickName"/>

    <van-cell title="简介" :value="userInfo.desc"/>
  </mine-info>
</template>

<style scoped lang="scss">

</style>