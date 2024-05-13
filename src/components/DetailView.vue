<script setup>
import { ref } from 'vue'
import {useRoute} from "vue-router";
import axios from "axios";


const onClickLeft = () => history.back();
const route = useRoute()
const coffee_pid = ref(route.params.pid)
const coffee_info = ref([])

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
  <van-nav-bar
      title="商品详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <div class="contain">
    <img :src=coffee_info.large_img alt="" width="100%">
    <div> {{ coffee_info}}</div>
  </div>
</template>

<style lang="scss" scoped>
.van-nav-bar{
  --van-nav-bar-text-color: #0c34ba;
  --van-nav-bar-icon-color: #0c34ba;
}


</style>