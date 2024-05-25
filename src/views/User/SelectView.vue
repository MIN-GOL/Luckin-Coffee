<script setup>

import {ref} from "vue";
import axios from "axios";
import {showToast} from "vant";

const value = ref('');
const resp = ref([])
const base_url = 'http://www.kangliuyong.com:10002'
const key = 'U2FsdGvkx19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='

const onCancel = () => value.value = '';
const onClickLeft = () => history.back();
const historyList = ref(JSON.parse(localStorage.getItem('historySearch')))


console.log(historyList.value)

// 搜索历史初始化
if (historyList.value == null) {
  localStorage.setItem('historySearch', JSON.stringify([]))
}

// 搜索请求
const onSearch = (val) => {
  axios.get(`${base_url}/search`, {
    params: {
      name: val,
      appkey: key
    }
  }).then(function (res) {
    resp.value = res.data.result

    // 搜索成功
    if (resp.value.length > 0) {
      showToast('搜索成功')
      let flag = 0
      let list = [{title: val}]
      // 判断是否存在相同的搜索记录
      for (const item of historyList.value) {
        // 存在 -> 不作操作
        if (item['title'] === val) {
          flag = 1
        }
      }
      // 不存在 -> 存入本地localStorage
      if (flag === 0) {
        historyList.value.push({title: val})
        localStorage.setItem('historySearch', JSON.stringify(historyList.value))
      }
    } else {
      showToast({
        message: '暂无此产品，请重新搜索',
        position: 'top',
      });
    }
  })
};

// 清除搜索记录
const clearStory = () => {
  historyList.value = ''
  localStorage.setItem('historySearch', JSON.stringify([]))

}

// 删除搜索记录
const delHistory = (title) => {
  let index = historyList.value.findIndex(item => item.title === title)
  historyList.value.splice(index, 1)
  localStorage.setItem('historySearch', JSON.stringify(historyList.value))
}

</script>

<template>
  <div class="contain">
    <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="onClickLeft">
      <template #right>
        <form action="/public">
          <van-search
              style="padding: 0"
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

    <div class="search-history" v-if="historyList.length > 0">
      <div style="display: flex">
        <div v-for="(item, index) in historyList"
             :key="index"
             class="history-item">
          <div class="title" @click="onSearch(item.title)">
            {{ item.title }}
          </div>
          <div class="del" @click="delHistory(item.title)">×</div>
        </div>
      </div>
      <div class="search-btn" @click="clearStory">
        <div>清除所有搜索历史</div>
      </div>
    </div>

    <div class="searched">
      <ul class="products">
        <li class="searchList" v-for="(i, index) in resp" v-bind:key="index">
          <router-link class="item" :to="`/detail/${i.pid}`">
            <img :src="i.smallImg" alt="">
            <div class="iname">{{ i.name }}</div>
            <div class="enname">{{ i.enname }}</div>
            <div class="price">￥{{ i.price }}</div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>




</template>

<style scoped lang="scss">

.contain {
  background-color: #efefef;
  width: 100%;
  height: 100%;
}

.van-nav-bar {
  --van-nav-bar-text-color: #0c34ba;
  --van-nav-bar-icon-color: #0c34ba;
}

.search-history {
  overflow: hidden;
  padding-top: 12px;
  background-color: #FFF;

  .history-item{
    display: flex;
    padding: .2rem;
    background-color: #e8e8e8;
    font-size: .8rem;
    margin: .3rem;
    align-items: center;

    .title{
      margin-right: .3rem;
    }

    .del{
      font-size: 1rem;
    }
  }

  .search-btn{
    margin: 1rem auto 1rem auto;
    height: 1.6rem;
    background-color: #e8e8e8;
    width: 10.5rem;
    text-align: center;
    color: #666;
    border-radius: .8rem;
    font-size: .9em;
  }
}

.searched{
  .name{
    color: #0c34ba;
    font-size: .9rem;
    margin-left: .6rem;
    font-weight: 700
  }
  .products{
    display: flex;
    flex-wrap: wrap;
    padding: 10px 10px 70px;

    li{
      width: 49%;
    }
    img{
      width: 100%;
    }
    .enname{
      font-size: 12px;
      color: grey;
      white-space: nowrap;
      overflow: hidden;
      text-overflow:ellipsis;
    }
    .price{
      font-size: 14px;
      font-weight: bold;
      color: #e4393c;
      padding: 5px 0 10px 0;
    }
  }
}

.router-link-active {
  text-decoration: none;
  color: #000000;
}

a{
  text-decoration: none;
  color: #000000;
}

.searched .products li{
  width: 45%;
  padding: 1rem .5rem;
}
</style>