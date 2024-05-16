import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import LayoutView from '../views/Layout.vue'
import HomeView from "@/views/HomeView.vue";
import CartView from "@/views/CartView.vue";
import MenuView from "@/views/MenuView.vue";
import MineView from "@/views/MineView.vue";
import DetailView from "@/components/DetailView.vue";
import SelectView from "@/components/SelectView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:'/login', component: LoginView},
    {path:'/detail/:pid', component: DetailView},
    {path:'/select', component: SelectView},
    {
      // 默认路由 - 首页
      path: '/',
      component: LayoutView,
      redirect:'/home',
      children:[
        {
          // 首页
          path: '/home',
          component: HomeView
        },
        {
          // 菜单
          path: '/menu',
          component: MenuView
        },
        {
          // 购物袋
          path: '/cart',
          component: CartView
        },
        {
          // 我的
          path: '/mine',
          component: MineView
        },
      ]
    }
  ],
})

export default router
