<script setup>
import { ref } from 'vue'
import axios from "axios";
import MineInfo from "@/components/MineInfo.vue";
import qs from "qs";
import {showToast} from "vant";

const base_url = 'http://www.kangliuyong.com:10002'
const token = localStorage.getItem('token');
const key = 'U2FsdGvkx19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='

const likeList = ref([])

// 查询所有收藏
axios.get(`${base_url}/findAllLike`, {
  params:{
    appkey: key,
    tokenString: token
  }
}).then(function (res) {
  res = res.data
  if (res.code === 2000 && res.result.length > 0) {
    likeList.value = res.result
  }
})

// 取消收藏
const removeLike = (pid) => {
  const data = {
    appkey: key,
    tokenString: token,
    pid: pid
  }
  const post_method = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data),
    url: `${base_url}/notlike`,
  }
  axios(post_method).then(function (res) {
    res = res.data
    // 成功响应
    if (res.code === 900) {
      showToast('已取消收藏')
    }
  }).catch(function (err){
    showToast(err)
  })
}

</script>

<template>
<mine-info title="我的收藏">
  <van-empty v-if="likeList.length<=0" description="没有收藏数据"/>
  <ul v-else class="products">
    <li style="list-style: none" v-for="(i, index) in likeList" v-bind:key="index">
      <router-link class="item" :to="`/detail/${i.pid}`">
        <img :src="i.smallImg" alt="">
        <div class="iname">{{ i.name }}</div>
        <div class="enname">{{ i.enname }}</div>
      </router-link>
      <div class="price-del">
        <div class="price">￥{{ i.price }}</div>
        <div class="del">
          <van-icon name="delete-o" @click="removeLike(i.pid)"/>
        </div>
      </div>
    </li>
  </ul>
</mine-info>
</template>

<style scoped lang="scss">
.products{
  display: flex;
  flex-wrap: wrap;
  padding: 10px 10px 70px;

  li{
    width: 47%;
    margin: .3rem;
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

.router-link-active {
  text-decoration: none;
  color: #000000;
}

a{
  text-decoration: none;
  color: #000000;
}

.price-del{
  display: flex;
  position: relative;
  align-items: center;

  .del{
    position: absolute;
    right: 0;
  }
}


</style>