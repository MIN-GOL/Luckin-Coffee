import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios   from "axios";
import {useChannelStore} from "@/stores/index.js";



export const useMineStore = defineStore(
    'mine',
    () => {
      const channelStore = useChannelStore()
      const base_url = channelStore.base_url
      const token = channelStore.token
      const key = channelStore.key
      const userImg = ref()
      const username = ref()
      const desc = ref()

      // 获取个人信息
      const getInfo = () => {
        axios.get(`${base_url}/findMy`, {
          params: {
            tokenString: token,
            appkey: key
          }
        }).then(function (res) {
          res = res.data
          if (res.code === 'A001') {
            username.value = res.result[0].nickName
            userImg.value = res.result[0].userImg
            let info = res.result[0].desc
            if (!info) {
              desc.value = '这家伙很懒，什么也没有留下！'
            }else desc.value = info
          }
        })
      }
      return{
        username,
        desc,
        userImg,
        getInfo
      }

    }
)