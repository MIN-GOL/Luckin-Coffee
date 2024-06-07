import {defineStore} from 'pinia'
import {ref} from 'vue'

import qs from "qs";
import axios from "axios";
import {useChannelStore} from "@/stores/index.js";

export const useDetailStore = defineStore(
    'detail',
    () => {
      const channelStore = useChannelStore()
      const token = channelStore.token
      const base_url = channelStore.base_url
      const key = channelStore.key
      const icon = {
        active: '../src/assets/collected.png',
        inactive: '../src/assets/collect.png',
      };

      const like = ref(false);
      const onClickLeft = () => history.back();
      const count = ref(1);
      const detail = ref({'tem': 0, 'milk': 0, 'sugar':0, 'cream':0})
      const cart_count = ref()

      // 获取页面内容
      const getProductDetail = (pid, info) => {
        axios.get(`${base_url}/productDetail`, {
          params: {
            appkey: key,
            pid: pid
          }
        }).then(function (res) {
          info.value = res.data.result[0]
          // rule预处理
          for (let i in detail.value) {
            if (info.value[i].length <= 0) {
              delete detail.value[i]
            }
          }
        })
      }

      // 获取购物车数量
      const getCount = () => {
        axios.get(`${base_url}/shopcartCount`, {
          params: {
            appkey: key,
            tokenString: token
          }
        }).then(function (res) {
          res = res.data
          if (res.code === 4000) {
            cart_count.value = res.result
          }
        })
      }

      // 获取收藏状态
      const findLike = (pid) => {
        axios.get(`${base_url}/findlike`, {
          params: {
            appkey: key,
            tokenString: token,
            pid: pid
          }
        }).then(function (res) {
          res = res.data.result
          if (res.length <= 0) {
            like.value = false
          } else {
            if (res[0].pid === coffee_pid.value) {
              like.value = true
            }
          }
        })
      }

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

      return {
        count,
        detail,
        cart_count,
        like,
        icon,
        onClickLeft,
        getProductDetail,
        getCount,
        findLike,
        toCart,
        choose,
        clickLike
      }
    })

