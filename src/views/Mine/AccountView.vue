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
    <div class="line">
      <div class="title">头像</div>
      <div class="img">
        <van-image
            width="40"
            height="40"
            round
            :src="userInfo.userImg"/>
      </div>
    </div>
    <van-divider />

    <div class="line">
      <div class="title">用户id</div>
    </div>
    <van-divider />

    <div class="line">
      <div class="title">手机号</div>
    </div>
    <van-divider />

    <div class="line">
      <div class="title">昵称</div>
    </div>
    <van-divider />

    <div class="line">
      <div class="title">简介</div>
    </div>
  </mine-info>
</template>

<style scoped lang="scss">
.line{
  display: flex;
  height: 3rem;
  align-items: center;

  .img{
    position: absolute;
    right: 0;
    margin-right: 1rem;
  }
  .title{
    padding-left: .5rem;
  }
}
</style>