<script setup>
import { ref } from 'vue'
import { areaList } from '@vant/area-data';

const addressList = ref({
  name: '',
  tel: '',
  province: '',
  city: '',
  county: '',
  addressDetail: '',
  areaCode: '',
  postalCode: '',
  isDefault: false
});

const searchResult = ref([]);

const onClickLeft = () => history.back();
const onSave = (addressInfo) => {
  console.log(e)
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
        v-model="addressList"
        :area-list="areaList"
        show-set-default
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
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