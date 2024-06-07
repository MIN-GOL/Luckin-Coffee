<script setup>
import router from "@/router/index.js";
import {
  useUserStore,
  useChannelStore
} from '@/stores/index.js'

const userStore = useUserStore()
const channelStore = useChannelStore()

import {ref} from 'vue'
import axios from "axios";
import qs from 'qs';

const pattern_phone = ref(/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/)
const pattern_email = ref(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/)


// 登录请求
const onSubmitLogin = (values) => {
  const data = {
    'appkey': 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
    'phone' : `${values.phone}`,
    'password': `${values.password}`
  };
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data),
    url: `${channelStore.base_url}/login`,
  };
  axios(options).then(function (res) {
    res = res.data
    // 登录成功
    if(res.code === 200){
      // 设置token
      showSuccessToast(res.msg+'\n'+'正在跳转');
      localStorage.setItem('token', res.token)
      setTimeout(()=>{
        router.push('/home')
      },2500)

    } else {
      showFailToast(res.msg)
    }
  })
    .catch(function (err) {
      showFailToast(err)
    })
};

// 注册请求
const onSubmitRegister = (values) => {
  const data = {
    'appkey': 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
    'phone': `${values.regphone}`,
    'password': `${values.regpassword}`,
    'nickName': `${values.nickname}`
  };
  const options = {
    method: 'POST',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    data: qs.stringify(data),
    url: `${channelStore.base_url}/register`,
  };
  axios(options).then(function (res) {
    res = res.data
    // 注册成功
    if (res.code === 100) {
      showSuccessToast(res.msg);
      userStore.formModel.phone = values.regphone
      userStore.show = false
    }
    if (res.code === 102) {
      showFailToast(res.msg);
    }
  })
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
  <div class="login-box" v-if="userStore.isLogin">
    <div style="margin-left: 2rem">
      <div class="welcome-title">欢迎回来！</div>
      <div class="welcome-en">
        Please login to your accounts
      </div>
    </div>
    <van-form @submit="onSubmitLogin" :model="userStore.formModel">
      <van-cell-group inset>
        <van-field
            v-model="userStore.formModel.phone"
            name="phone"
            label="手机号"
            placeholder="手机号"
            :rules="[
                { required: true, message: '手机号必填' },
                { pattern: pattern_phone, message: '请输入正确格式' }
            ]"
        />
        <van-field
            v-model="userStore.formModel.password"
            :type="userStore.showPassword ? 'text' : 'password'"
            name="password"
            label="密码"
            placeholder="密码(6-16位)"
            :rules="[
                { required: true, message: '密码必填' },
                { pattern: /^[a-zA-Z][a-zA-Z0-9_]{4,14}$/, message: '密码支持数字字母下划线组合，目必须以\n'+
                  '字母开头，6-16位'}
            ]"
        >
          <template #button>
            <van-icon name="eye-o" @click="userStore.togglePassword" />
          </template>
        </van-field>
        <div class="forget" @click="userStore.forget">忘记密码？</div>
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
                  @click="userStore.showPopup"
                  round block type="primary"
                  plain
                  style="margin-top: 2rem">
        注册
      </van-button>
    </div>
    <!-- 弹出注册功能 -->
    <van-popup
        v-model:show="userStore.show"
        position="bottom"
        closeable
        :style="{ height: '40%' }">
      <div class="register">
        <div class="reg">
          注册
        </div>
       <div class="register_from">
         <van-form @submit="onSubmitRegister" :model="userStore.formModel">
           <van-cell-group inset>
             <van-field
                 v-model="userStore.formModel.regphone"
                 name="regphone"
                 label="手机号"
                 placeholder="手机号"
                 :rules="[
                     { required: true, message: '手机号必填' },
                     { pattern: pattern_phone, message: '请输入正确格式' }
                 ]"
             />
             <van-field
                 v-model="userStore.formModel.regpassword"
                 :type="userStore.showPassword ? 'text' : 'password'"
                 name="regpassword"
                 label="密码"
                 placeholder="密码(6-16位)"
                 :rules="[
                     { required: true, message: '密码必填' },
                     { pattern: /^[a-zA-Z][a-zA-Z0-9_]{4,14}$/, message: '密码支持数字字母下划线组合，目必须以\n'+
                  '字母开头，6-16位'}
                 ]"
             >
               <template #button>
                 <van-icon name="eye-o" @click="userStore.togglePassword" />
               </template>
             </van-field>
             <van-field
                 v-model="userStore.formModel.nickname"
                 name="nickname"
                 label="昵称"
                 placeholder="昵称(1-10位)"
                 :rules="[
                     { required: true, message: '昵称必填' },
                     { pattern: /^\S{1,10}$/, message: '昵称必须是1-10位的字符'}
                 ]"
             />
           </van-cell-group>
           <div style="margin: 16px">
             <van-button class="blue"
                         round block type="primary"
                         native-type="submit">
               注册
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
    <van-form :model="userStore.formModel">
      <van-cell-group inset>
        <van-field
            v-model="userStore.formModel.phone"
            name="手机号"
            label="手机号"
            placeholder="手机号"
            :rules="[
                { required: true, message: '手机号必填' },
                { pattern: pattern_phone, message: '请输入正确格式' }
            ]"
        />
        <van-field
            v-model="userStore.formModel.password"
            :type="userStore.showPassword ? 'text' : 'password'"
            name="新密码"
            label="新密码"
            placeholder="新密码(6-16位)"
            :rules="[
                { required: true, message: '密码必填' },
                { pattern: /^[a-zA-Z][a-zA-Z0-9_]{4,14}$/, message: '密码支持数字字母下划线组合，目必须以\n'+
                  '字母开头，6-16位'}
            ]"
        >
          <template #button>
            <van-icon name="eye-o" @click="togglePassword" />
          </template>
        </van-field>
        <van-field
            v-model="userStore.formModel.email"
            type="email"
            name="邮箱"
            label="邮箱"
            placeholder="邮箱"
            :rules="[
                { required: true, message: '邮箱必填' },
                { pattern: pattern_email, message: '邮箱必须是正确格式'}
            ]"
        />
        <van-field
            v-model="userStore.formModel.sms"
            center
            clearable
            label="邮箱验证码"
            placeholder="邮箱验证码(6位数字)"
            :rules="[
                { required: true, message: '邮箱验证码必填' },
                { pattern: /^\d{6}$/, message: '邮箱验证码为6位数字'}
            ]"
        >
          <template #button>
            <van-button class="blue" size="small" type="primary">发送验证码</van-button>
          </template>
        </van-field>
        <div class="forget" @click="userStore.isLogin = true">已有账号，立即登录</div>
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
  margin: 1rem 2rem;
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
