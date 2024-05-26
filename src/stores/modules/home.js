import {defineStore} from 'pinia'
import {ref} from 'vue'
import axios from "axios";

import {useChannelStore} from "@/stores/index.js";

export const useHomeStore = defineStore(
    'home',
    () => {
        // 联动其他store
        const channelStore = useChannelStore()

        const username = ref('')
        const banners = ref([])
        const hot = ref([])
        const value = ref()
        const token = channelStore.token
        const base_url = channelStore.base_url
        const key = channelStore.key

        // 获取轮播图
        const getBanner = () => {
            axios.get(`${base_url}/banner`, {
                params: {
                    appkey: key
                }
            }).then(function (res) {
                banners.value = res.data.result
            })
        }

        // 获取最热产品
        const getHot = () => {
            axios.get(`${base_url}/typeProducts`, {
                params: {
                    key: "isHot",
                    value: 1,
                    appkey: key
                }
            }).then(function (res) {
                hot.value = res.data.result
            })
        }

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
                }
            })
        }

        // 获取时间状态
        const getTimeState = () => {
            let hours = new Date().getHours();
            let state = ``;
            if (hours >= 0 && hours <= 10) {
                state = `早上好 !`;
            } else if (hours > 10 && hours <= 14) {
                state = `中午好 !`;
            } else if (hours > 14 && hours <= 18) {
                state = `下午好 !`;
            } else if (hours > 18 && hours <= 24) {
                state = `晚上好 !`;
            }
            return state;
        }

        return {
            username,
            banners,
            hot,
            value,
            token,
            base_url,
            key,
            getBanner,
            getHot,
            getInfo,
            getTimeState
        }
    })
