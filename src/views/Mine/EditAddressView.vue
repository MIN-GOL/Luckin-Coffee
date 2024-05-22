<script setup>

import axios from "axios";
import { ref } from 'vue'
import {useRoute} from "vue-router";
import { areaList } from '@vant/area-data';
import {showToast} from "vant";


const onClickLeft = () => history.back();
const addressList = ref([])
const route = useRoute()
const aid = route.params.aid

const base_url = 'http://www.kangliuyong.com:10002'
const token = localStorage.getItem('token');
const key = 'U2FsdGvkx19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='

const searchResult = ref([]);

const onSave = () => showToast('save');
const onDelete = () => showToast('delete');
const onChangeDetail = () => showToast('123')

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
  }
})


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
        @delete="onDelete"
        @change-detail="onChangeDetail"
    >
      <template #default>
        <van-field
            :v-model="addressList.postalCode"
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
</style>