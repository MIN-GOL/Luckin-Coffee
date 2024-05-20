<script setup>
import { ref } from 'vue'
import axios from "axios";
import {showToast, Toast} from "vant";

const onClickLeft = () => history.back();
const cart_list = ref([])
const checked = ref()
const base_url = 'http://www.kangliuyong.com:10002'
const token = localStorage.getItem('token');
const key = 'U2FsdGvkx19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='

// 获取购物车列表
axios.get(`${base_url}/findAllShopcart`, {
  params: {
    appkey: key,
    tokenString: token
  }
}).then(function (res) {
  res = res.data
  if(res.code === 5000){
    cart_list.value = res.result
    console.log(res)
  }
}).catch(function (err){
  showToast(err)
})


const onSubmit = () => {
  showToast('点击了')
}
</script>

<template>
  <div class="contain">
    <van-nav-bar
        title="购物袋"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"/>
    <img src="../../assets/shopbag_bg.png" width="100%" alt="">
    <van-empty v-if="cart_list.length <= 0" description="购物袋没有商品" />
    <div v-else class="shopbag-list">
      <van-swipe-cell
          v-for="(item, index) in cart_list"
          :key="index"
          class="cell">
        <van-card
            :num=item.count
            :price=item.price
            :desc=item.enname
            :title=item.name
            class="goods-card"
            :thumb=item.small_img
        />
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
    </div>
    <div>
      <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="checked">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>


</template>

<style lang="scss" scoped>
.van-nav-bar{
  --van-nav-bar-text-color: #0c34ba;
  --van-nav-bar-icon-color: #0c34ba;
}

.contain{
  background-color: #efefef;
  width: 100vw;
  height: 100vh;
}

.cell{
  margin: .8rem;
  background-color: #fff;
  border-radius: .7rem;

}

.van-submit-bar{
  margin-bottom: 3rem;
}


.delete-button {
  height: 100%;
}

::v-deep(.van-card__price) {
  color: #e4393c;
}

::v-deep(.van-stepper--round .van-stepper__plus ) {
  background: #e4393c;
}

::v-deep(.van-stepper--round .van-stepper__minus) {
  color: #ff001d;
  background-color: #FFF;
  border: .02667rem solid #ff001d;
}
</style>