
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vant组件
import { NavBar } from 'vant';
import { Image as VanImage } from 'vant';
import { Form, Field, CellGroup } from 'vant';
import { Button } from 'vant';
import { Popup } from 'vant';
import { Tabbar, TabbarItem } from 'vant';

// Vant样式
import 'vant/lib/index.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router).use(NavBar).use(VanImage).use(Form).use(Field).use(CellGroup)
app.use(Button).use(Popup).use(Tabbar).use(TabbarItem)

app.mount('#app')
