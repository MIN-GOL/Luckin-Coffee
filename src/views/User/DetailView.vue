<script setup>
import {ref} from 'vue'
import {useRoute} from "vue-router";
import axios from "axios";
import qs from "qs";
import {showToast} from "vant";

const like = ref(false);
const onClickLeft = () => history.back();
const count = ref(1);
const route = useRoute()
const coffee_pid = ref(route.params.pid)
const coffee_info = ref([])
const detail = ref({'tem': 0, 'milk': 0, 'sugar':0, 'cream':0})
const cart_count = ref()
const base_url = 'http://www.kangliuyong.com:10002'
const token = localStorage.getItem('token');
const key = 'U2FsdGvkx19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='

const icon = {
  active: '../src/assets/collected.png',
  inactive: '../src/assets/collect.png',
};


// 获取页面内容
axios.get('http://www.kangliuyong.com:10002/productDetail', {
  params: {
    appkey: "U2FsdGvkx19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
    pid: coffee_pid.value
  }
}).then(function (res) {
  coffee_info.value = res.data.result[0]
  // rule预处理
  for (let i in detail.value){
    if(coffee_info.value[i].length <= 0) {
      delete detail.value[i]
    }
  }
})

// 获取购物车数量
axios.get(`${base_url}/shopcartCount`,{
  params:{
    appkey: key,
    tokenString: token
  }
}).then(function (res){
  res = res.data
  if(res.code === 4000){
    cart_count.value = res.result
  }
})

// 获取收藏状态
axios.get(`${base_url}/findlike`,{
  params:{
    appkey: key,
    tokenString: token,
    pid: coffee_pid.value
  }
}).then(function (res) {
  res = res.data.result
  if (res.length <= 0) {
    like.value = false
  }else {
    if (res[0].pid === coffee_pid.value){
      like.value = true
    }
  }
})


// 加入购物车
const toCart = () => {
  let rule = ''
  for (let i in detail.value){
    const ruleList = coffee_info.value[i].split('/')
    rule += ruleList[detail.value[i]]+'/'
  }
  rule = rule.slice(0, -1)
  const data = {
    'appkey': key,
    'tokenString': token,
    'pid': coffee_info.value.pid,
    'count': count.value,
    'rule': rule
  }
  const post_method = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data),
    url: `${base_url}/addShopcart`,
  }
  axios(post_method).then(function (res) {
    res = res.data
    // 成功响应
    if (res.code === 3000) {
      cart_count.value += count.value
      showToast('加入购物车成功')
    }
    if (res.code === 3001) {
      showToast('加入失败，请重试')
    }
  }).catch(function (err){
    showFailToast(err)
  })
}

// 口味选择
const choose = (index, cate) => {
  if (detail.value !== index) {
    detail.value[cate] = index
  }
}

// 收藏
const clickLike = () => {
  let second = ''
  if (like === true){
    second = 'notlike'
  }else {
    second = 'like'
  }
  console.log(second)
  const data = {
    appkey: key,
    tokenString: token,
    pid: coffee_pid.value
  }
  const post_method = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data),
    url: `${base_url}/${second}`,
  }
  axios(post_method).then(function (res) {
    res = res.data
    // 成功响应
    if (res.code === 900) {
      showToast('已取消收藏')
      like.value = !like.value
    }
    if (res.code === 800) {
      showToast('已收藏')
      like.value = !like.value
    }
  })
}

</script>

<template>
  <div class="contain">
    <!-- 顶部导航 -->
    <van-nav-bar
        title="商品详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />

    <div class="detail-img">
      <img :src=coffee_info.large_img alt="" width="100%">
    </div>

    <!-- 卡片 -->
    <div class="detail-info">
      <!-- name & enname & price -->
      <div class="detail-pro">
        <div class="names">
          <div class="name">{{ coffee_info.name }}</div>
          <div class="enname">{{ coffee_info.enname }}</div>
        </div>
        <div class="price">{{ "￥" + coffee_info.price }}</div>
      </div>

      <!-- 参数 -->
      <div class="detail-rules">
        <hr>
        <!-- 温度 -->
        <div v-if="coffee_info.tem">
          <div>
            {{ coffee_info.tem_desc }}
          </div>
          <button
              @click="choose(index, 'tem')"
              v-for="(item, index) in coffee_info.tem.split('/')"
              :class="detail.tem===index?'active':''"
              :key="index">
            {{ item }}
          </button>
        </div>
        <!-- 奶 -->
        <div v-if="coffee_info.milk">
          <div>
            {{ coffee_info.milk_desc }}
          </div>
          <button
              @click="choose(index, 'milk')"
              v-for="(item, index) in coffee_info.milk.split('/')"
              :class="detail.milk===index?'active':''"
              :key="index">
            {{ item }}
          </button>
        </div>
        <!-- 糖 -->
        <div v-if="coffee_info.sugar">
          <div>
            {{ coffee_info.sugar_desc }}
          </div>
          <button
              @click="choose(index, 'sugar')"
              v-for="(item, index) in coffee_info.sugar.split('/')"
              :class="detail.sugar===index?'active':''"
              :key="index">
            {{ item }}
          </button>
        </div>
        <!-- 奶油 -->
        <div v-if="coffee_info.cream">
          <div>
            {{ coffee_info.cream_desc }}
          </div>
          <button
              @click="choose(index, 'cream')"
              v-for="(item, index) in coffee_info.cream.split('/')"
              :class="detail.cream===index?'active':''"
              :key="index">
            {{ item }}
          </button>
        </div>
      </div>

      <!-- 选择数量 -->
      <hr>
      <div class="select-count-box">
          <div>选择数量</div>
          <van-stepper
              v-model="count"
              theme="round"
              button-size="22"
              class="step"
              disable-input/>
      </div>


      <!-- 商品描述 -->
      <div class="detail-desc" >
        <hr>
        <div class="tag">
          商品描述
        </div>
        <span class="desc"
              v-for="(item, index) in coffee_info.desc && coffee_info.desc.split('\n')"
              :key="index">
          {{ index + 1 + "、" + item }}<br/>
        </span>
      </div>
    </div>

    <!-- 底部导航栏 -->
    <van-action-bar>
      <van-action-bar-icon
          to="/cart"
          :badge=cart_count
          icon="https://img2.imgtp.com/2024/05/20/jDXX0Fy1.png"
          text="购物袋" />
      <van-action-bar-icon
          v-if="like"
          @click="clickLike"
          icon="https://img2.imgtp.com/2024/05/20/v4sW6kPP.png"
          text="已收藏"/>
      <van-action-bar-icon
          v-else
          @click="clickLike"
          icon="https://img2.imgtp.com/2024/05/20/Ku3WtItX.png"
          text="收藏"/>
      <van-action-bar-button class="toCart" text="加入购物袋" @click="toCart"/>
    </van-action-bar>

  </div>
</template>

<style lang="scss" scoped>
.contain{
  background-color: #efefef;
  width: 100vw;
  height: 100vh;
}

.van-nav-bar {
  --van-nav-bar-text-color: #0c34ba;
  --van-nav-bar-icon-color: #0c34ba;
}

.toCart {
  background-color: #0c34ba;
  border-color: #0c34ba;
  color: #FFF;
  font-weight: normal;
}

.detail-info {
  transform: translateY(-1rem);
  background-color: white;
  width: 95%;
  margin: 0 auto;
  border-radius: 3%;
  padding: .7rem .7rem;
  box-sizing: border-box;

  .detail-pro {
    display: flex;
    align-items: center;
    margin: 0 auto;
    height: 2rem;
    .names{
      .name{
        font-weight: 350;
        font-size: 15px;
      }
      .enname{
        font-weight: 300;
        font-size: 13px;
        color: #999;
      }
    }
    .price {
      color: #e4393c;
      font-weight: 700;
      position: absolute;
      right: 0;
      padding-right: .7rem;
    }
  }
}

.detail-rules{
  div{
    display: flex;
    font-size: 14px;
    font-weight: 350;
    margin: .5rem 0;
    div{
      width: 3rem;
    }
  }

  .active{
    background-color: #3762f0;
    color: #fff;
  }

  button{
    border: 0;
    text-align: center;
    width: 4.5rem;
    line-height: .8rem;
    height: 2rem;
    background-color: #e8e8e8;
    margin-right: .5rem;
    border-radius: 1rem;
  }
}



.select-count-box{
  display: flex;
  font-size: 14px;
  margin-top: 2rem;
  font-weight: 300;
  color: #232323;
  .step{
    position: absolute;
    margin-right: 1rem;
    right: 0;
  }
}

::v-deep(.van-stepper--round .van-stepper__plus ) {
  background: #e4393c;
}

.detail-desc{
  margin-top: 2rem;

  .tag{
    color: #232323;
    font-size: 14px;
    margin-bottom: .8rem;
  }
  .desc{
    color: #666;
    font-size: 12px;
  }
}

hr{
  background-color: #e6e6e6;
  height: 0.5px;
  border: none
}
</style>}