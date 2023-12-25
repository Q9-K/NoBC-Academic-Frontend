<script setup>
import i18n from "../../locales/index.js";
import {ref} from "vue";
import {REGISTER, useStateOfPriorDialog} from "../../stores/stateOfPriorDialog.js";
import request from '../../functions/Request.js'
import {ElMessage} from "element-plus";

const email = ref('')
const password = ref('')
const isManager = ref(false)
const managerName = ref('')

const stateOfPriorDialog = useStateOfPriorDialog()

const handleGotoRegister = () => {
  stateOfPriorDialog.setView(REGISTER)
}

const handleLogin = () => {

  const login = async () => {
    try {
      const apiUrl = '/user/login/'
      const params = {
        email: email.value,
        password: password.value
      }

      const response = request({
        url: apiUrl,
        params: params,
        showLoading: true,
        useTestEnv: false,
        // testEnv: 'http://100.96.145.140:8000'
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

  login()
    .then((response) => {
      if (response.code !== 200) {
        ElMessage({
          type: "warning",
          message: response.msg
        })
      }
      else {
        const data = response.data
        localStorage.setItem('userInformation', JSON.stringify({
          username: data.name,
          email: email.value,
          token: data.token,
        }))

        stateOfPriorDialog.closeDialog()
      }
    })
}

const handleIsManageChange = (value) => {
  isManager.value = value.target.checked
}

const handleManagerLogin = () => {

  const managerLogin = async () => {
    try {
      const apiUrl = '/manager/login/'
      const params = {
        name: managerName.value,
        password: password.value
      }

      const response = await request({
        url: apiUrl,
        params: params,
        useTestEnv: false,
        // testUrl: 'http://100.117.229.168:8000'
      })

      // 处理响应数据
      if (response) {
        // 在此处处理响应数据
        return response
      }
      else {
        // 处理空响应（发生错误）
        console.error('接收到空响应。');
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  managerLogin()
    .then((response) => {
      if (response.code !== 200) {
        ElMessage({
          type: 'error',
          message: 'Oh No!'
        })
      }
      else {
        localStorage.setItem('manager', response.data)
        console.log(localStorage.getItem('manager'))
        ElMessage({
          type: "success",
          message: "Ok!"
        })
        stateOfPriorDialog.closeDialog()
      }
    })

}
</script>

<template>
  <div class="login-dialog-outer">
    <div class="is-manager-outer">
      <a-checkbox @change="handleIsManageChange" v-model="isManager" class="is-manager">{{ i18n.t('priorDialog.loginMode.isManager') }}</a-checkbox>
    </div>
    <div class="register-form-outer">
      <el-form class="register-form" label-position="left" label-width="80px">
        <el-form-item v-if="!isManager" :label="i18n.t('priorDialog.loginMode.inputEmail')">
          <el-input v-model="email"/>
        </el-form-item>
        <el-form-item v-if="isManager" :label="i18n.t('priorDialog.loginMode.managerName')">
          <el-input v-model="managerName"/>
        </el-form-item>
        <div style="width: 100%; height: 30px"></div>
        <el-form-item :label="i18n.t('priorDialog.loginMode.inputPassword')">
          <el-input :show-password="true" v-model="password" />
        </el-form-item>
        <div style="width: 100%; height: 30px"></div>
        <el-form-item>
          <el-button type="primary" @click="() => {
            if (!isManager) {
              handleLogin()
            }
            else {
              handleManagerLogin()
            }
          }">
            {{ i18n.t('priorDialog.loginMode.loginButton') }}
          </el-button>
          <el-button v-if="!isManager" @click="handleGotoRegister">
            {{ i18n.t('priorDialog.loginMode.registerButton') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<style scoped lang="scss">
.login-dialog-outer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  .is-manager-outer {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    .is-manager {
      position: relative;
      bottom: 3.5vh;
    }
  }
  .register-form-outer {
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    .register-form {
      height: 100%;
      width: 55%;
    }
  }
}
</style>
