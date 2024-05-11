<script setup>
import {ref} from 'vue'
const active = ref(0);

import home_active from "@/assets/home_active.png";
import home from "@/assets/home.png";
import menu_active from "@/assets/menu_active.png";
import menu from "@/assets/menu.png";
import shopbag_active from "@/assets/shopbag_active.png";
import shopbag from "@/assets/shopbag.png";
import my_active from "@/assets/my_active.png";
import my from "@/assets/my.png";

const tabbarArray = [
  {
    name: "首页", //名字
    to:  "/home", //路由
    active: home_active, //点击后
    inactive: home, //点击前
  },
  {
    name: "菜单",
    to:  "/menu",
    active: menu_active,
    inactive: menu,
  },
  {
    name: "购物袋",
    to: "/cart",
    active: shopbag_active,
    inactive: shopbag,
  },
  {
    name: "我的",
    to:  "/mine",
    active: my_active,
    inactive: my,
  },
];

</script>

<template>
  <RouterView/>
  <van-tabbar v-model="active" route>
    <van-tabbar-item :to=item.to v-for="(item, index) in tabbarArray" :key="index">
      <span>{{ item.name }}</span>
      <template #icon="props">
        <img :src="props.active ? item.active : item.inactive" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>


<style scoped>

</style>
