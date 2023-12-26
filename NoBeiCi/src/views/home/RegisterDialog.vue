<script setup>
import i18n from "../../locales/index.js";
import {ref} from "vue";
import {LOGIN, REGISTER, SELECT_FIELD, useStateOfPriorDialog} from "../../stores/stateOfPriorDialog.js";
import axios from "axios";
import qs from "qs";
import {handleResponse} from "../../functions/handleResponse.js";
import {ElMessage} from "element-plus";
import request from '../../functions/Request.js'

const userName = ref('')
const password = ref('')
const makeSurePassword = ref('')
const email = ref('')
const inputCaptcha = ref('')
const stateOfPriorDialog = useStateOfPriorDialog()

let receiveCaptcha = ''

const handleSendEmail = () => {

  if (userName.value === '') {
    ElMessage({
      message: '用户名为空',
      type: "warning"
    })
    return
  }

  if (password.value === '') {
    ElMessage({
      message: '密码为空',
      type: "warning"
    })
    return
  }

  if (password.value !== makeSurePassword.value) {
    ElMessage({
      message: '两次密码不同',
      type: "warning"
    })
    return
  }

  if (email.value === '') {
    ElMessage({
      message: '邮箱为空',
      type: "warning"
    })
    return
  }

  const sendEmail = async () => {
    try {
      const apiUrl = '/user/register/'
      const params = {
        email: email.value,
        name: userName.value,
        password: password.value,
        password_repeat: makeSurePassword.value
      }

      const response = await request({
        url: apiUrl,
        params: params,
        showLoading: true,
        useTestEnv: false,
        // testEnv: 'http://100.117.229.168:8000'
      })

      if (response) {
        return response
      }
      else {
        console.log("空")
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  sendEmail()
    .then((response) => {
      if (response.code !== 200) {
        ElMessage({
          type: "error",
          message: response.msg
        })
      }
      else {
        receiveCaptcha = response.data
      }
    })
}

const handleRegister = () => {
  if (inputCaptcha.value === '') {
    ElMessage({
      message: "验证码为空",
      type: "warning"
    })
    return
  }

  const register = async () => {
    try {
      const apiUlr = '/user/active_user/'
      const params = {
        get_code: inputCaptcha.value,
        correct_code: receiveCaptcha,
        email: email.value
      }

      const response = await request({
        url: apiUlr,
        params: params,
        showLoading: true,
        useTestEnv: false,
        // testEnv: 'http://100.117.229.168:8000'
      })

      if (response) {
        return response
      }
      else {
        console.log("空")
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  register()
    .then((response) => {
      if (response.code !== 200) {
        ElMessage({
          type: "error",
          message: response.msg
        })
      }
      else {
        const data = response.data

        localStorage.setItem('userInformation', JSON.stringify({
          username: userName.value,
          email: email.value,
          token: data.token,
        }))

        console.log(JSON.parse(localStorage.getItem('userInformation')))

        stateOfPriorDialog.setView(SELECT_FIELD)
        stateOfPriorDialog.setStep(1)
      }
    })
}

const backToLogin = () => {
  stateOfPriorDialog.setView(LOGIN)
}
</script>

<template>
  <div class="register-form-outer">
    <el-form class="register-form" label-position="left" label-width="130px">
      <el-form-item :label="i18n.t('priorDialog.registerMode.inputUsername')">
        <el-input v-model="userName"/>
      </el-form-item>
      <el-form-item :label="i18n.t('priorDialog.registerMode.inputPassword')">
        <el-input :show-password="true" v-model="password" />
      </el-form-item>
      <el-form-item :label="i18n.t('priorDialog.registerMode.inputMakeSurePassword')">
        <el-input :show-password="true" v-model="makeSurePassword" />
      </el-form-item>
      <el-form-item :label="i18n.t('priorDialog.registerMode.inputEmail')">
        <el-input v-model="email">
          <template #append>
            <el-icon class="send-email-button" @click="handleSendEmail"><Promotion /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item :label="i18n.t('priorDialog.registerMode.inputCaptcha')">
        <el-input v-model="inputCaptcha" />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleRegister" style="position: relative" type="primary">
          {{ i18n.t('priorDialog.registerMode.registerButton') }}
        </el-button>
        <el-button @click="backToLogin" style="position: relative">
          {{ i18n.t('priorDialog.registerMode.backToLogin') }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.register-form-outer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .register-form {
    height: 100%;
    width: 75%;
  }
}
.send-email-button:hover {
  cursor: pointer;
}
.send-email-button:active {
  background-color: #ececec;
}
</style>
