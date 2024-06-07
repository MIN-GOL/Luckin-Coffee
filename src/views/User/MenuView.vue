<script setup>

import {ref} from "vue";
import axios from "axios";

// 列表
const list = ref([])
const coffee_list = ref([])
const hot = ref([])
const base_url = 'http://www.kangliuyong.com:10002'
const key = 'U2FsdGvkx19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='


// 变量
const active = ref(0);
const value = ref()

// 控制流
const isHot = ref(true)

// 获取标签页
axios.get(`${base_url}/type`, {
  params: {
    appkey: key
  }
}).then(function (res) {
  coffee_list.value = res.data.result
})

// 副标签点击
const showCoffee = (type) => {
  console.log("获取当前分类:" + type);
  isHot.value = false
  // 获取产品
  axios.get(`${base_url}/typeProducts`, {
    params: {
      key: "type",
      value: type,
      appkey: key
    }
  }).then(function (res) {
    list.value = res.data.result
  })
}

// 获取最热
axios.get(`${base_url}/typeProducts`, {
  params: {
    key: "isHot",
    value: 1,
    appkey: key
  }
}).then(function (res) {
  hot.value = res.data.result
})

</script>

<template>
  <!--  搜索框 -->
  <router-link to="/select">
    <van-search
        style="width: 90vw"
        v-model="value"
        shape="round"
        placeholder="请输入搜索关键词"/>
  </router-link>

  <!--  左侧导航栏 -->
  <div class="contain">
    <div class="bar">
      <van-sidebar v-model="active">
        <van-sidebar-item title="热卖推荐" @click="isHot = true"/>
        <van-sidebar-item
            v-for="(item, index) in coffee_list"
            v-bind:key="index"
            @click="showCoffee(item.type)"
            :title="`${item.typeDesc}`"/>
      </van-sidebar>
    </div>

    <!--  详情 -->
    <ul class="products" @click="toDetail">
      <li style="list-style: none;position: relative" v-for="(i, index) in (isHot? hot : list)" v-bind:key="index">
          <router-link class="item" :to="`/detail/${i.pid}`">
            <div class="isHot" v-if="i.isHot === 1">热卖</div>
            <img :src="i.smallImg" alt="">
            <div class="iname">{{ i.name }}</div>
            <div class="enname">{{ i.enname }}</div>
            <div class="price">￥{{ i.price }}</div>
          </router-link>
      </li>
    </ul>
  </div>

</template>

<style lang="scss" scoped>
.contain {
  display: flex;
}

.products {
  display: flex;
  flex-wrap: wrap;
  margin: 0 10px 10px 10px;
  padding-bottom: 3rem;

  li {
    width: 49%;
  }

  img {
    width: 100%;
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

  .enname {
    font-size: 12px;
    color: grey;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .price {
    font-size: 14px;
    font-weight: bold;
    color: #e4393c;
    padding: 5px 0 10px 0;
  }
}

.products li:nth-child(2n+1) {
  margin-right: 2%;
}

.van-sidebar-item--select:before {
  width: .1333rem;
  height: 65%;
  background-color: #0c34ba;
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