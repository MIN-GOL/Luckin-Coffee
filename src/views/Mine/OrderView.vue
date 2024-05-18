<script setup>
import axios from 'axios'
import {ref} from 'vue'
import MineInfo from "@/components/MineInfo.vue";

const orders = ref([])
const active = ref(0);

const base_url = 'http://www.kangliuyong.com:10002'
const token = localStorage.getItem('token');
const key = 'U2FsdGvkx19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='

// 订单查询
const selectOrder = ({name}) => {
  axios.get(`${base_url}/findOrder`, {
    params: {
      status: name,
      appkey: key,
      tokenString: token
    }
  }).then(function (res) {
    orders.value = res.data.result
  })
}

// 确认收获and删除
const click_op = (status) => {
  let title_op = ''
  if (status === 1) {
    title_op = '确定收货'
  } else title_op = '删除订单'
  showConfirmDialog({
    title: title_op,
    message:
        '是否确认要' + title_op,
  })
      .then(() => {
        // on confirm
      })
      .catch(() => {
        // on cancel
      });
}


selectOrder({name: 0})

</script>

<template>
  <mine-info title="我的订单">
    <van-tabs
        v-model:active="active"
        swipeable
        title-active-color="#0c34ba"
        line-height="2px"
        color="#0c34ba"
        @click-tab="selectOrder">
      <van-tab
          v-for="(item, index) in ['全部', '进行中', '已完成']"
          :title="item"
          :name="index">
        <van-empty description="没有订单数据" v-if="orders.length <= 0"/>
        <div class="info"
             v-else
             v-for="(item, index) in orders"
             :key="index">
          <div class="order-info">订单信息</div>
          <div class="order-no">
            <div class="no">
              订单编号: {{ item.oid }}
            </div>
            <div class="order-op">
              <div v-if="item.status === 1"
                   @click="click_op(item.status)">
                确认收货
              </div>
              <div v-if="item.status === 2">
                已完成
                <van-icon name="delete-o" @click="click_op(item.status)"/>
              </div>
            </div>
          </div>
          <div class="order-pro">
            <div class="order-pro-item">
              <div class="shopbag-item-img">
                <van-image
                    width="90"
                    height="90"
                    :src="item.smallImg"/>
              </div>
              <div class="shopbag-item-content">
                <div class="shopbag-name">
                  <div class="zhname_box">
                    <div class="zhname">{{ item.name }}</div>
                    <div class="rule">{{ item.rule }}</div>
                  </div>
                  <div class="enname">
                    {{ item.enname }}
                  </div>
                </div>
                <div class="price-count">
                  <div class="price">￥{{ item.price }}</div>
                  <div class="count">×{{ item.count }}</div>
                </div>
              </div>
            </div>
          </div>
          <van-divider dashed></van-divider>
          <div class="order-total">
            <div class="order-date">{{ item.createdAt }}</div>
            <div class="count-money">
              <div class="order-count">共计{{ item.count }}件商品</div>
              <div class="order-money">订单金额：￥{{ item.count * item.price }}</div>
            </div>
          </div>
          <van-divider></van-divider>
        </div>
      </van-tab>
    </van-tabs>
  </mine-info>

</template>

<style scoped lang="scss">
.info {
  color: #444;
  margin: .3rem;

  .order-info {
    padding-top: 1rem;
    padding-bottom: .7rem;
    font-size: .9rem;
    font-weight: bold;
  }

  .order-no {
    display: flex;

    .order-op {
      float: right;
      position: absolute;
      right: .3rem;
    }
  }

  .order-pro {
    .order-pro-item {
      padding: 1rem 0;
      display: flex;

      .shopbag-item-content {
        padding-left: .5rem;

        .zhname_box {
          display: flex;
          max-height: 1.2rem;

          .zhname {
            padding-right: 1rem;
          }
        }

        .enname {
          font-size: .8rem;
          color: #999;
          margin-top: .3rem;
        }

        .price-count {
          display: flex;
          align-items: center;
          height: 3.5rem;

          .price {
            font-weight: bold;
            color: #ee0a24;
          }

          .count {
            position: absolute;
            right: .3rem;
          }
        }
      }
    }
  }

  .order-total {
    .count-money {
      margin-top: 1rem;
      display: flex;

      .order-money {
        position: absolute;
        right: .3rem;
        font-weight: bold;
        color: #ee0a24;
      }
    }

  }
}


</style>