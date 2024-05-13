<script setup>
import {ref} from 'vue'
import {useRoute} from "vue-router";
import axios from "axios";

const like = ref(false);
const onClickLeft = () => history.back();
const route = useRoute()
const coffee_pid = ref(route.params.pid)
const coffee_info = ref([])
const icon = {
  active: '../src/assets/collected.png',
  inactive: '../src/assets/collect.png',
};

const clickLike = () => {
  like.value = !like.value
}

console.log(coffee_info)
// 获取标签页
axios.get('http://www.kangliuyong.com:10002/productDetail', {
  params: {
    appkey: "U2FsdGvkx19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
    pid: coffee_pid.value
  }
}).then(function (res) {
  coffee_info.value = res.data.result[0]
})


</script>

<template>
  <div class="contain">
    <!-- 顶部导航 -->
    <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />

    <div class="detail-img">
      <img :src=coffee_info.large_img alt="" width="100%">
    </div>

    <!-- 卡片 -->
    <div class="detail-info">

      <!-- name & enname & price -->
      <div class="detail-pro">
        <div class="names">
          <div class="name">{{ coffee_info.name }}</div>
          <div class="enname">{{ coffee_info.enname }}</div>
        </div>
        <div class="price">{{ "￥" + coffee_info.price }}</div>
      </div>

      <!-- 参数 -->
      <div class="detail-rules">
        <hr>
        参数
      </div>

      <!-- 选择数量 -->
      <div class="select-count-box">
        选择数量
      </div>

      <!-- 商品描述 -->
      <div class="detail-desc">
        商品描述
      </div>

      <div style="word-wrap:break-word;"> {{ coffee_info }}</div>
    </div>

    <!-- 底部导航栏 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="../src/assets/cart.png" to="/cart">购物袋</van-tabbar-item>
      <van-tabbar-item @click="clickLike">
        <span v-if="like">已收藏</span>
        <span v-else>收藏</span>
        <template #icon>
          <img :src="like ? icon.active : icon.inactive" alt=""/>
        </template>
      </van-tabbar-item>
      <div class="container">
        <van-button type="primary" to="/login" size="normal" round>加入购物袋</van-button>
      </div>
    </van-tabbar>
  </div>
</template>

<style lang="scss" scoped>
.contain{
  background-color: #efefef;
}

.van-nav-bar {
  --van-nav-bar-text-color: #0c34ba;
  --van-nav-bar-icon-color: #0c34ba;
}

.van-button {
  background-color: #0c34ba;
  border-color: #0c34ba;
}

.detail-info {
  transform: translateY(-1rem);
  background-color: white;
  width: 95%;
  margin: 0 auto;
  border-radius: 3%;
  padding: .7rem .7rem;
  box-sizing: border-box;

  .detail-pro {
    display: flex;
    align-items: center;
    margin: 0 auto;
    height: 2rem;
    .names{
      .name{
        font-weight: 350;
        font-size: 15px;
      }
      .enname{
        font-weight: 300;
        font-size: 13px;
        color: #999;
      }
    }
    .price {
      color: #ee0a24;
      font-weight: 700;
      position: absolute;
      right: 0;
      padding-right: .7rem;
    }
  }
}


</style>