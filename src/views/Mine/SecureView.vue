<script setup>

import MineInfo from "@/components/MineInfo.vue";
import axios from "axios";
import router from "@/router/index.js";
import qs from "qs";
import {ref} from "vue";

const base_url = 'http://www.kangliuyong.com:10002'
const token = localStorage.getItem('token');
const key = 'U2FsdGvkx19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='
const show = ref(false)
const showPassword = ref(false);

const formModel = ref({
  password: '',
  confirm_password: '',
})

const logout = () => {
  showConfirmDialog({
    title: '注销账号',
    message:
        '是否确认注销账号，一旦确认无法恢复！',
  })
      .then(() => {
        // on confirm
        const data = {
          'appkey': key,
          'tokenString': token,
        }
        const post_method = {
          method: 'POST',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data: qs.stringify(data),
          url: `${base_url}/destroyAccount`,
        }
        axios(post_method).then(function (res){
          res = res.data
          if (res.code === 'G001'){
            showToast('注销成功')
            localStorage.removeItem('token')
            setTimeout(()=>{
              router.push('/login')
            },2000)
          }
        })
      })
}

// 修改密码弹窗
const showPopup = () => {
  show.value = true;
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const signOut = () => {
  showConfirmDialog({
    title: '退出登录',
    message:
        '是否确认退出登录？',
  })
      .then(() => {
        // on confirm
        localStorage.removeItem('token');
        showToast('退出成功')
        setTimeout(()=>{
          router.push('/login')
        },2000)
      })
}

// 修改密码
const updatePassword = () => {
  const data = {
    'appkey': key,
    'tokenString': token,
    'oldPassword': formModel.value.password,
    'password': formModel.value.confirm_password,
  }
  const post_method = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data),
    url: `${base_url}/updatePassword`,
  }
  if (formModel.value.password === formModel.value.confirm_password){
    showToast('新旧密码不能一致')
    return
  }
  axios(post_method).then(function (res){
    res = res.data
    if (res.code === 'E001'){
      showToast('修改成功')
      show.value = false
      setTimeout(()=>{
        localStorage.removeItem('token')
        router.push('/login')
      },1000)
    }
    if (res.code === 'E003'){
      showToast(res.msg)
    }
  })

}

</script>

<template>
<mine-info title="安全中心">
  <van-cell-group>
    <van-cell @click="showPopup" title="修改密码" is-link />
    <van-cell title="注销账号" is-link @click="logout" />
  </van-cell-group>
  <template #logout>
    <van-button
        type="primary"
        @click="signOut"
        block round>退出登录</van-button>
  </template>
</mine-info>

  <van-popup
      v-model:show="show"
      position="bottom"
      closeable
      :style="{ height: '40%' }">
    <div class="register">
      <div class="reg">
        修改密码
      </div>
      <div class="register_from">
        <van-form @submit="onSubmitRegister" :model="formModel" ref="from">
          <van-cell-group inset>
            <van-field
                v-model="formModel.password"
                :type="showPassword ? 'text' : 'password'"
                name="regpassword"
                label="旧密码"
                placeholder="输入旧密码"
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
                v-model="formModel.confirm_password"
                :type="showPassword ? 'text' : 'password'"
                name="confirm_password"
                label="新密码"
                placeholder="输入新密码"
                :rules="[
                     { required: true, message: '新密码必填' },
                     { pattern: /^[a-zA-Z][a-zA-Z0-9_]{4,14}$/, message: '密码支持数字字母下划线组合，目必须以\n'+
                  '字母开头，6-16位'},
                 ]"
            >
              <template #button>
                <van-icon name="eye-o" @click="togglePassword" />
              </template>
            </van-field>

          </van-cell-group>
          <div style="margin: 16px">
            <van-button
                class="blue"
                round block type="primary"
                @click="updatePassword"
                native-type="submit">
              确认修改
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </van-popup>

</template>

<style scoped lang="scss">
.van-button--primary {
  background: #0c34ba;
  border: 0;
}

.reg{
  margin-bottom: 2rem;
  margin-left: 1rem;
  margin-top: 2rem;
  font-size: 1.4rem;
}

</style>