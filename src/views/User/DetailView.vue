<script setup>
import {ref} from 'vue'
import {useRoute} from "vue-router";
import axios from "axios";

const like = ref(false);
const onClickLeft = () => history.back();
const count = ref(1);
const route = useRoute()
const coffee_pid = ref(route.params.pid)
const coffee_info = ref([])
const detail = ref([])

const icon = {
  active: '../src/assets/collected.png',
  inactive: '../src/assets/collect.png',
};

const clickLike = () => {
  like.value = !like.value
}


// 获取标签页
axios.get('http://www.kangliuyong.com:10002/productDetail', {
  params: {
    appkey: "U2FsdGvkx19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=",
    pid: coffee_pid.value
  }
}).then(function (res) {
  coffee_info.value = res.data.result[0]
})

// test
const clickCount = () =>{
  console.log(`您当前一共点了${count.value}杯咖啡` )
}

const choose = (item) => {
  console.log(item)
}

clickCount()

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
              @click="choose(item, index)"
              v-for="(item, index) in coffee_info.tem.split('/')"
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
              @click="choose(item)"
              v-for="(item, index) in coffee_info.milk.split('/')"
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
              @click="choose(item)"
              v-for="(item, index) in coffee_info.sugar.split('/')"
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
              :class="[active===true]"
              @click="choose(item,index)"
              v-for="(item, index) in coffee_info.cream.split('/')"
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
              @click="clickCount"
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
    <van-tabbar route>
      <van-tabbar-item icon="../src/assets/cart.png" to="/cart">购物袋</van-tabbar-item>
      <van-tabbar-item @click="clickLike">
        <span v-if="like">已收藏</span>
        <span v-else>收藏</span>
        <template #icon>
          <img :src="like ? icon.active : icon.inactive" alt=""/>
        </template>
      </van-tabbar-item>
      <div class="container">
        <van-button type="primary" to="/login" size="normal" round>加入购物袋</van-button>
      </div>
    </van-tabbar>

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

.van-button {
  background-color: #0c34ba;
  border-color: #0c34ba;
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
      color: #ee0a24;
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
  background: #ee0a24;
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