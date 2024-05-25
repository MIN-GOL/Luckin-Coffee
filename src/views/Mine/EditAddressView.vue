<script setup>

import axios from "axios";
import { ref } from 'vue'
import {useRoute} from "vue-router";
import { areaList } from '@vant/area-data';
import {showToast} from "vant";
import qs from "qs";



const onClickLeft = () => history.back();
const addressList = ref([])
const addressList_default = ref([])
const searchResult = ref([]);
const route = useRoute()
const aid = route.params.aid

const base_url = 'http://www.kangliuyong.com:10002'
const token = localStorage.getItem('token');
const key = 'U2FsdGvkx19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='


axios.get(`${base_url}/findAddressByAid`,{
  params:{
    aid: aid,
    appkey: key,
    tokenString: token
  }
}).then(function (res) {
  res = res.data
  if (res.code === 40000) {
    addressList.value = res.result[0]
    addressList.value.isDefault = addressList.value.isDefault === 1
    addressList_default.value = addressList.value
  }
})

const editAddress = (e) => {
  e.isDefault = e.isDefault ? 1 : 0
  const data = {
    aid: aid,
    appkey: key,
    tokenString: token,
    ...e
  }
  const post_method = {
    method: 'POST',
    url: `${base_url}/editAddress`,
    data: qs.stringify(data),
    headers: {'content-type': 'application/x-www-form-urlencoded'}
  }
  axios(post_method).then(function (res){
    res = res.data
    if(res.code === 30000){
      showToast('修改成功')
      setTimeout(() => {
        history.back()
      }, 1000)
    }
    if(res.code === 30001){
      showToast('修改失败')
    }
  }).catch(function (err) {
    console.log(err)
  })
}

// 删除地址
const deleteAddress = () => {
  const data = {
    aid: addressList.value.aid,
    appkey: key,
    tokenString: token
  }
  const post_method = {
    method: 'POST',
    url: `${base_url}/deleteAddress`,
    data: qs.stringify(data),
    headers: {'content-type': 'application/x-www-form-urlencoded'}
  }
  axios(post_method).then(function (res){
    res = res.data
    if(res.code === 10000){
      showToast('删除成功')
      setTimeout(() => {
        history.back()
      }, 1000)
    }
  }).catch(function (err) {
    console.log(err)
  })
}

const onSave = (e) => {
  delete e.country
  for (let key in e){
    console.log(e[key], addressList_default.value[key])
    if(e[key] !== addressList_default.value[key]){
      editAddress(e)
      return
    }
  }showToast('尚未修改地址')
}

</script>

<template>
  <van-nav-bar
      title="编辑地址"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <div class="contain" >
    <van-address-edit
        :address-info="addressList"
        :area-list="areaList"
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="deleteAddress"
    >
      <template #default>
        <van-field
            v-model="addressList.postalCode"
            placeholder="邮政编码"
            label="邮政编码"/>
      </template>
    </van-address-edit>
  </div>
</template>

<style scoped lang="scss">
.contain{
  background-color: #efefef;
  width: 100vw;
  height: 100vh;
}

.van-nav-bar {
  --van-nav-bar-text-color: #0c34ba;
  --van-nav-bar-icon-color: #0c34ba;
}

::v-deep(.van-button--primary){
  background: #0c34ba;
  border: 0;
}

::v-deep(.van-switch--on){
  background: #0c34ba;
}
</style>