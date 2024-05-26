<script setup>
import { ref } from 'vue'
import { areaList } from '@vant/area-data';
import {showToast} from "vant";

const addressList = ref([])

const onChangeDetail = (val) => {
  showToast(val)
}

const onClickLeft = () => history.back();
const onSave = () => {
  console.log(addressList.value)
}


</script>

<template>
  <van-nav-bar
      title="新增地址"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <div class="contain">
    <van-address-edit
        :address-info="addressList"
        :area-list="areaList"
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @change-detail="onChangeDetail"
        @save="onSave"
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
</style>