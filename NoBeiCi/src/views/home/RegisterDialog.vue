<script setup>
import i18n from "../../locales/index.js";
import {ref} from "vue";
import {REGISTER, SELECT_FIELD, useStateOfPriorDialog} from "../../stores/stateOfPriorDialog.js";
import axios from "axios";
import qs from "qs";
import {handleResponse} from "../../functions/handleResponse.js";
import {ElMessage} from "element-plus";

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

  const formData = new FormData()
  formData.append("email", email.value);
  formData.append("name", userName.value);
  formData.append("password", password.value);
  formData.append("password_repeat", makeSurePassword.value)

  console.log(formData)

  axios.post('http://100.117.229.168:8000' + '/user/register/', formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
    .then((response) => {
      handleResponse(response, true, (data) => {
        receiveCaptcha = data
      })
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

  const formData = new FormData()
  formData.append("get_code", inputCaptcha.value)
  formData.append("correct_code", receiveCaptcha)
  formData.append("email", email.value)

  axios.post('http://100.117.229.168:8000' + '/user/active_user/', formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
    .then((response) => {
      handleResponse(response, false, (data) => {

        localStorage.setItem('userInformation', JSON.stringify({
          username: userName.value,
          email: email.value,
          token: data,
        }))

        stateOfPriorDialog.setView(SELECT_FIELD)
        stateOfPriorDialog.setStep(1)
      })
    })
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
        <el-button @click="handleRegister" style="position: relative; left: 260px" type="primary">
          {{ i18n.t('priorDialog.registerMode.registerButton') }}
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
