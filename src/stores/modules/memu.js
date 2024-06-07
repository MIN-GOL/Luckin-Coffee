import {defineStore} from 'pinia'
import {ref} from 'vue'
import axios from "axios";
import {useChannelStore} from "@/stores/index.js";


export const useMenuStore = defineStore(
    'menu',
    () => {
      const channelStore = useChannelStore()
      const base_url = channelStore.base_url
      const key = channelStore.key

      const list = ref([])
      const coffee_list = ref([])
      const active = ref(0);
      const value = ref()
      const isHot = ref(true)

      // 获取标签页
      const getList = () => {
        axios.get(`${base_url}/type`, {
          params: {
            appkey: key
          }
        }).then(function (res) {
          coffee_list.value = res.data.result
        })
      }

      // 副标签点击
      const showCoffee = (type) => {
        console.log("获取当前分类:" + type);
        isHot.value = false
        // 获取产品
        axios.get(`${base_url}/typeProducts`, {
          params: {
            key: "type",
            value: type,
            appkey: key
          }
        }).then(function (res) {
          list.value = res.data.result
        })
      }

      return {
        list,
        coffee_list,
        active,
        value,
        isHot,
        getList,
        showCoffee
      }
    })
