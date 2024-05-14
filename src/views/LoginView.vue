<script setup>
import {ref} from 'vue'
// import { useUserStore } from '@/stores/index.js'
const show = ref(false);
const from = ref()
const isLogin = ref(true)

// 注册
const fromModel = ref({
  username: '',
  password: '',
  repassword: '',
  email: '',
  sms: ''
})


const showPopup = () => {
  show.value = true;
};


</script>

<template>
  <van-nav-bar>
    <template #left>
      <van-image
          width="37"
          height="37"
          src="src/assets/home_active.png"
      />
      <div class="title">Luckin Coffee</div>
    </template>
    <template #right>
      <router-link class="index" to="/home">首页</router-link>
    </template>
  </van-nav-bar>
  <!-- 登录 -->
  <div class="login-box" v-if="isLogin">
    <div style="margin-left: 2rem">
      <div class="welcome-title">欢迎回来！</div>
      <div class="welcome-en">
        Please login to your accounts
      </div>
    </div>
    <van-form @submit="onSubmit" :model="fromModel" ref="from">
      <van-cell-group inset>
        <van-field
            v-model="phone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '手机号必填' }]"
        />
        <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码(6-16位)"
            :rules="[{ required: true, message: '密码必填' }]"
        />
        <div class="forget" @click="isLogin = false">忘记密码？</div>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button class="blue"
                    round block type="primary"
                    native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <div style="margin: 16px">
      <van-button class="register_btn"
                  @click="showPopup"
                  round block type="primary"
                  plain
                  style="margin-top: 2rem">
        注册
      </van-button>
    </div>
    <!-- 弹出注册功能 -->
    <van-popup
        v-model:show="show"
        position="bottom"
        closeable
        :style="{ height: '40%' }">
      <div class="register">
        <div class="reg">
          注册
        </div>
       <div class="register_from">
         <van-form @submit="onSubmit" :model="fromModel" ref="from">
           <van-cell-group inset>
             <van-field
                 v-model="phone"
                 name="手机号"
                 label="手机号"
                 placeholder="手机号"
                 :rules="[{ required: true, message: '手机号必填' }]"
             />
             <van-field
                 v-model="password"
                 type="password"
                 name="密码"
                 label="密码"
                 placeholder="密码(6-16位)"
                 :rules="[{ required: true, message: '密码必填' }]"
             />
             <div class="forget" @click="isLogin = false">忘记密码？</div>
           </van-cell-group>
           <div style="margin: 16px">
             <van-button class="blue"
                         round block type="primary"
                         native-type="submit">
               登录
             </van-button>
           </div>
         </van-form>
       </div>
      </div>
    </van-popup>
  </div>


  <!-- 忘记密码 -->
  <div class="login-box" v-else>
    <div style="margin-left: 2rem">
      <div class="welcome-title">忘记密码!</div>
      <div class="welcome-en">
        forgot password!
      </div>
    </div>
    <van-form @submit="onSubmit" :model="fromModel" ref="from">
      <van-cell-group inset>
        <van-field
            v-model="phone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '手机号必填' }]"
        />
        <van-field
            v-model="password"
            type="password"
            name="新密码"
            label="新密码"
            placeholder="新密码(6-16位)"
            :rules="[{ required: true, message: '密码必填' }]"
        />
        <van-field
            v-model="email"
            type="email"
            name="邮箱"
            label="邮箱"
            placeholder="邮箱"
            :rules="[{ required: true, message: '邮箱必填' }]"
        />
        <van-field
            v-model="sms"
            center
            clearable
            label="邮箱验证码"
            placeholder="邮箱验证码(6位数字)"
            :rules="[{ required: true, message: '邮箱必填' }]"
        >
          <template #button>
            <van-button class="blue" size="small" type="primary">发送验证码</van-button>
          </template>
        </van-field>
        <div class="forget" @click="isLogin = true">已有账号，立即登录</div>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button class="blue"
                    round block type="primary"
                    native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style lang="scss" scoped>
.index {
  color: #0c34ba;
  font-weight: 1000;
  font-size: .9rem;
}

.title {
  margin-left: .8rem;
  font-weight: 700;
  font-size: .9rem;
}

.login-box {
  margin-top: 5.5rem;
  margin-left: .6rem;

  .welcome-title {
    font-size: 1.9rem;
    color: #3e3e3e
  }

  .welcome-en {
    font-size: 1.15rem;
    margin-top: 1.4rem;
    color: #808080;
    margin-bottom: 3rem;
  }
}

.register {
  margin: .6rem 2.0rem;
  font-size: 1.6rem;
  color: #3e3e3e;
}

.blue {
  background-color: #0c34ba;
  border-color: #0c34ba;
}

.register_btn {
  color: #0c34ba;
}

.forget {
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-size: .9rem;
  float: right;
  color: #0c34ba
}

.reg{
  margin-bottom: 2rem;
}
</style>
