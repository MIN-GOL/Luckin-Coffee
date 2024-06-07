import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useChannelStore } from "@/stores/index.js";
import router from "@/router/index.js";

export const useUserStore = defineStore(
    'user',
    () => {
        const channelStore = useChannelStore()

        const showPassword = ref(false);
        const show = ref(false)
        const isLogin = ref(true)
        const token = channelStore.token

        const formModel = ref({
            // 登录和忘记密码共用
            phone: '',
            password: '',

            // 注册
            nickname: '',
            regphone: '',
            regpassword: '',

            // 忘记密码
            email: '',
            sms: ''
        })

        // 注册弹窗
        const showPopup = () => {
            show.value = true;
        };

        // 忘记密码 (失败密码清空)
        const forget = () => {
            isLogin.value = !isLogin.value
            formModel.value.password = ''
        }

        // 显示/隐藏密码
        const togglePassword = () => {
            showPassword.value = !showPassword.value;
        };

        const checkToken = () => {
            if (!token) {
                showToast('请先登录')
                setTimeout(() => {
                    router.push('/login')
                }, 2000)
            }
        }

        return {
            showPassword,
            show,
            isLogin,
            formModel,
            showPopup,
            forget,
            togglePassword,
            checkToken

        }
    },
    {
        persist: true
    }
)
