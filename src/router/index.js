import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import LayoutView from '../views/Layout.vue'
import HomeView from "@/views/HomeView.vue";
import CartView from "@/views/CartView.vue";
import MenuView from "@/views/MenuView.vue";
import MineView from "@/views/MineView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:'/login', component: LoginView},
    {
      path: '/',
      component: LayoutView,
      children:[
        {
          path: '/home',
          component: HomeView
        },
        {
          path: '/menu',
          component: MenuView
        },
        {
          path: '/cart',
          component: CartView
        },
        {
          path: '/mine',
          component: MineView
        }
      ]
    }
  ]
})

export default router
