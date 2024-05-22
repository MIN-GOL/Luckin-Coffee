<script setup>

import MineInfo from "@/components/MineInfo.vue";
import axios from "axios";
const base_url = 'http://www.kangliuyong.com:10002'
const token = localStorage.getItem('token');
const key = 'U2FsdGvkx19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='

import {showToast} from "vant";
import router from "@/router/index.js";
import qs from "qs";

const logout = () => {
  showConfirmDialog({
    title: '注销账号',
    message:
        '是否确认注销账号，一旦确认无法恢复！',
  })
      .then(() => {
        // on confirm
        const data = {
          'appkey': key,
          'tokenString': token,
        }
        const post_method = {
          method: 'POST',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data: qs.stringify(data),
          url: `${base_url}/destroyAccount`,
        }
        axios(post_method).then(function (res){
          res = res.data
          if (res.code === 'G001'){
            showToast('注销成功')
            localStorage.removeItem('token')
            setTimeout(()=>{
              router.push('/login')
            },2000)
          }
        })
      })
}

const signOut = () => {
  showConfirmDialog({
    title: '退出登录',
    message:
        '是否确认退出登录？',
  })
      .then(() => {
        // on confirm
        localStorage.removeItem('token');
        showToast('退出成功')
        setTimeout(()=>{
          router.push('/login')
        },2000)
      })
}
</script>

<template>
<mine-info title="安全中心">
  <van-cell-group>
    <van-cell title="修改密码" is-link />
    <van-cell title="注销账号" is-link @click="logout" />
  </van-cell-group>
  <template #logout>
    <van-button
        type="primary"
        @click="signOut"
        block round>退出登录</van-button>
  </template>
</mine-info>


</template>

<style scoped lang="scss">
.van-button--primary {
  background: #0c34ba;
  border: 0;
}

</style>