
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vant样式
import 'vant/lib/index.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
