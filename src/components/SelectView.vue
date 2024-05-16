<script setup>

import {ref} from "vue";
import axios from "axios";

const value = ref('');
const resp = ref([])
const base_url = 'http://www.kangliuyong.com:10002'
const key = 'U2FsdGvkx19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='

const onCancel = () => value.value = '';
const onClickLeft = () => history.back();

// 搜索请求
const onSearch = (val) => {
  axios.get(`${base_url}/search`,{
    params: {
      name: val,
      appkey: key
    }
  }).then(function (res) {
    console.log(res.data.result)
    resp.value = res.data.result}
  )
};

</script>

<template>
  <van-nav-bar
      left-text="返回"
      left-arrow
      @click-left="onClickLeft">
    <template #right>
      <form action="/">
        <van-search
            class="select"
            v-model="value"
            show-action
            shape="round"
            placeholder="请输入商品关键词"
            @search="onSearch"
            @cancel="onCancel">
        </van-search>
      </form>
    </template>
  </van-nav-bar>

  <div v-if="resp.length > 0">
    {{ resp }}
  </div>
</template>

<style scoped lang="scss">
.select{
  padding-left: 0;
}

.van-nav-bar{
  --van-nav-bar-text-color: #0c34ba;
  --van-nav-bar-icon-color: #0c34ba;
}
</style>