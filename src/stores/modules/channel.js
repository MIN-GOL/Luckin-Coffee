import { defineStore } from 'pinia'

import { ref } from 'vue'

export const useChannelStore = defineStore(
    'channel',
    () => {
        const base_url = 'http://www.kangliuyong.com:10002'
        const token = localStorage.getItem('token');
        const key = 'U2FsdGvkx19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='

        return {
            base_url,
            token,
            key
        }
    }
)