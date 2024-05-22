<script setup>
import axios from "axios";
import { ref } from 'vue'
import router from "@/router/index.js";

const onClickLeft = () => history.back();
const addressList = ref()
const chosenAddressId = ref('1');

const base_url = 'http://www.kangliuyong.com:10002'
const token = localStorage.getItem('token');
const key = 'U2FsdGvkx19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='


axios.get(`${base_url}/findAddress`,{
  params:{
    appkey: key,
    tokenString: token
  }
}).then(function (res) {
  res = res.data
  if (res.code === 20000) {
    addressList.value = res.result
  }
})

console.log(addressList)


const onEdit = (item) => {
  showToast(item.aid)
  router.push(`/address/${item.aid}`)

};

const onAdd = () => showToast('新增地址')
</script>

<template>
  <van-nav-bar
      title="地址管理"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />

  <div class="contains">
    <van-address-list
        v-model="chosenAddressId"
        :list="addressList"
        :switchable=false
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
    />
  </div>
</template>

<style scoped lang="scss">
.van-nav-bar {
  --van-nav-bar-text-color: #0c34ba;
  --van-nav-bar-icon-color: #0c34ba;
}

::v-deep(.van-button--primary) {
  background: #0c34ba;
  border: 0;
}

::v-deep(.van-tag--primary){
  background: #0c34ba;
}

.contains{
  background-color: #efefef;
  width: 100vw;
  height: 100vh;
}
</style>