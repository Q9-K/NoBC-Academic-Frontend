<script setup>
import i18n from "../../locales/index.js";
import {ref} from "vue";
import {REGISTER, SELECT_FIELD, useStateOfPriorDialog} from "../../stores/stateOfPriorDialog.js";
import axios from "axios";
import {handleResponse} from "../../functions/handleResponse.js";

const email = ref('')
const password = ref('')
const stateOfPriorDialog = useStateOfPriorDialog()

const handleGotoRegister = () => {
  stateOfPriorDialog.setView(REGISTER)
}

const handleLogin = () => {

  const formData = new FormData()
  formData.append("email", email.value)
  formData.append("password", password.value)

  axios.post('http://100.117.229.168:8000' + '/user/login/', formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
    .then((response) => {
      handleResponse(response, true, (data) => {

        localStorage.setItem('userInformation', JSON.stringify({
          username: data.name,
          email: email.value,
          token: data.token,
        }))

        stateOfPriorDialog.closeDialog()
      })
    })
}
</script>

<template>
  <div class="register-form-outer">
    <el-form class="register-form" label-position="left" label-width="80px">
      <el-form-item :label="i18n.t('priorDialog.loginMode.inputEmail')">
        <el-input v-model="email"/>
      </el-form-item>
      <div style="width: 100%; height: 30px"></div>
      <el-form-item :label="i18n.t('priorDialog.loginMode.inputPassword')">
        <el-input :show-password="true" v-model="password" />
      </el-form-item>
      <div style="width: 100%; height: 30px"></div>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">
          {{ i18n.t('priorDialog.loginMode.loginButton') }}
        </el-button>
        <el-button @click="handleGotoRegister">
          {{ i18n.t('priorDialog.loginMode.registerButton') }}
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
    width: 55%;
  }
}
</style>
