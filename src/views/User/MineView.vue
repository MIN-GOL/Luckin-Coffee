<script setup>
import { useMineStore } from '@/stores/index.js'

const mineStore = useMineStore()
const { getInfo } = mineStore

getInfo()

</script>

<template>
  <div class="contain">
    <img src="../../assets/bg.png" alt="">
    <div class="body">
      <div class="myInfo">
        <van-image
            style="border: .2rem solid grey"
            round
            width="3rem"
            height="3rem"
            :src=mineStore.userImg
        />
        <div class="info">
          <div class="name">
            {{ mineStore.username }}
          </div>
          <div class="desc">
            {{ mineStore.desc }}
          </div>
        </div>
      </div>
      <van-cell title="个人资料" is-link to="/account" />
      <van-cell title="我的订单" is-link to="/order" />
      <van-cell title="我的收藏" is-link to="/like" />
      <van-cell title="地址管理" is-link to="/myaddress" />
      <van-cell title="安全中心" is-link to="/secure" />
    </div>

  </div>
</template>

<style scoped lang="scss">
.contain {
  background-color: #efefef;
  width: 100vw;
  height: 100vh;

  img {
    width: 100%;
    height: 25%;
  }
  .myInfo{
    display: flex;
    margin-bottom: 2rem;
  }

  .body {
    transform: translateY(-3rem);
    background-color: white;
    width: 95%;
    margin: 0 auto;
    border-radius: .6rem;
    padding: .7rem .7rem;
    box-sizing: border-box;
    font-size: .9rem;

    .info {
      margin-left: .9rem;
      margin-top: .5rem;

      .name {
        color: #0c34ba;
        font-weight: 700
      }

      .desc{
        margin-top: .5rem;
      }
    }
  }
}
</style>