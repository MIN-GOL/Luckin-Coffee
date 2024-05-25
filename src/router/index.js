import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/Auth/LoginView.vue'
import LayoutView from '../components/Layout.vue'
import HomeView from "@/views/User/HomeView.vue";
import CartView from "@/views/User/CartView.vue";
import MenuView from "@/views/User/MenuView.vue";
import MineView from "@/views/User/MineView.vue";
import DetailView from "@/views/User/DetailView.vue";
import SelectView from "@/views/User/SelectView.vue";
import AccountView from "@/views/Mine/AccountView.vue";
import LikeView from "@/views/Mine/LikeView.vue";
import MyaddressView from "@/views/Mine/MyaddressView.vue";
import OrderView from "@/views/Mine/OrderView.vue";
import SecureView from "@/views/Mine/SecureView.vue";
import EditAddressView from "@/views/Mine/EditAddressView.vue";
import AddAddressView from "@/views/Mine/AddAddressView.vue";

const router = createRouter({
  mode: 'history',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path:'/login', component: LoginView},
    {path:'/detail/:pid', component: DetailView},
    {path:'/select', component: SelectView},
    {path:'/account', component: AccountView},
    {path:'/order', component: OrderView},
    {path:'/like', component: LikeView},
    {path:'/myaddress', component: MyaddressView},
    {path:'/secure', component: SecureView},
    {path:'/address/:aid', component: EditAddressView},
    {path:'/address', component: AddAddressView},
      // 导航栏
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
          path: '/Mine',
          component: MineView
        },
      ]
    }
  ],
})

export default router
