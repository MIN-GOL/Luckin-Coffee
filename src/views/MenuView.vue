<script setup>

import {ref} from "vue";
import axios from "axios";

const hot = ref([])
const active = ref(0);
const value = ref()
const coffee_list = ref([])
const ok = ref(true)

// 获取最热产品
axios.get('http://www.kangliuyong.com:10002/typeProducts',{
  params: {
    key: "isHot",
    value: 1,
    appkey: "U2FsdGvkx19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA="
  }
}).then(function (res) {
  hot.value = res.data.result
  ok.value = false
})

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
const onChange = (index) => console.log(index);

</script>

<template>

  <van-search
      style="width: 90vw"
      v-model="value"
      shape="round"
      placeholder="请输入搜索关键词"
      @click="show"/>

  <div class="contain">
    <div class="bar" >
      <van-sidebar v-model="active" @change="onChange">
        <van-sidebar-item
            v-for="(item, index) in coffee_list"
            v-bind:key="index"
            :title="`${item.typeDesc}`"/>
      </van-sidebar>
    </div>

    <van-loading color="#0c34ba" v-if="ok"/>
    <ul class="products">
      <li style="list-style: none" v-for="(i, index) in hot" v-bind:key="index">
        <img :src="i.smallImg" alt="">
        <div class="iname">{{ i.name }}</div>
        <div class="enname">{{ i.enname }}</div>
        <div class="price">{{ i.price }}</div>
      </li>
    </ul>
  </div>

</template>

<style scoped>
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