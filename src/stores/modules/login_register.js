import { defineStore } from 'pinia'

import { ref } from 'vue'

// 用户模块 token setToken removeToken
export const useUserStore = defineStore(
    'Luckin-Coffee',
    () => {
        const token = ref('')
        const isRegister = ref(false)

        const setToken = (newToken) => {
            token.value = newToken
        }
        const removeToken = () => {
            token.value = ''
        }

        const user = ref({})

        // const getUser = async () => {
        //     const res = await userGetInfoService() // 请求获取数据
        //     user.value = res.data.data
        // }

        const setUer = (obj) => {
            user.value = obj
        }

        const show = ref(false);
        const showPopup = () => {
            show.value = true;
        };

        return {
            token,
            setToken,
            removeToken,
            user,
            // getUser,
            setUer,
            // 弹出事件
            show,
            showPopup,
            isRegister
        }
    },
    {
        persist: true
    }
)
