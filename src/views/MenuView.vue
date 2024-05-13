<script setup>

import {ref} from "vue";
import axios from "axios";

// 列表
const list = ref([])
const coffee_list = ref([])
const hot = ref([])


// 变量
const active = ref(0);
const value = ref()

// 控制流
const isHot = ref(true)

// 点击事件
const show = () => {
  showDialog({
    title: '提示',
    message: '您点击了搜索框',
  }).then(() => {
    // on close
  });
}

// 获取标签页
axios.get('http://www.kangliuyong.com:10002/type',{
  params: {
    appkey: "U2FsdGvkx19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="
  }
}).then(function (res) { coffee_list.value = res.data.result})

// 副标签点击
const showCoffee = (type) => {
  console.log("获取当前分类:" + type);
  isHot.value = false
  // 获取产品
  axios.get('http://www.kangliuyong.com:10002/typeProducts',{
    params: {
      key: "type",
      value: type,
      appkey: "U2FsdGvkx19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="
    }
  }).then(function (res) {
    list.value = res.data.result
    ok.value = false
  })
}

// 获取最热
axios.get('http://www.kangliuyong.com:10002/typeProducts',{
  params: {
    key: "isHot",
    value: 1,
    appkey: "U2FsdGvkx19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="
  }
}).then(function (res) {hot.value = res.data.result})


</script>

<template>
  <!--  搜索框 -->
  <van-search
      style="width: 90vw"
      v-model="value"
      shape="round"
      placeholder="请输入搜索关键词"
      @click="show"/>

  <!--  左侧导航栏 -->
  <div class="contain">
    <div class="bar" >
      <van-sidebar v-model="active">
        <van-sidebar-item title="热卖推荐" @click="showHot"/>
        <van-sidebar-item
            v-for="(item, index) in coffee_list"
            v-bind:key="index"
            @click="showCoffee(item.type)"
            :title="`${item.typeDesc}`"/>
      </van-sidebar>
    </div>

    <!--  详情 -->
    <ul class="products">
      <li style="list-style: none" v-for="(i, index) in (isHot? hot : list)" v-bind:key="index">
        <div class="item">
          <img :src="i.smallImg" alt="">
          <div class="iname">{{ i.name }}</div>
          <div class="enname">{{ i.enname }}</div>
          <div class="price">{{ i.price }}</div>
        </div>
      </li>
    </ul>
  </div>

</template>

<style lang="scss" scoped>
.contain{
  display: flex;
}

.products{
  display: flex;
  flex-wrap: wrap;
  margin: 0 10px 10px 10px;
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

.van-sidebar-item--select:before {
  width: .1333rem;
  height: 65%;
  background-color: #0c34ba;
}
</style>