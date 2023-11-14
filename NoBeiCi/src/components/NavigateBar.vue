<script setup>
import logoUrl from '../assets/logo/logo.png'
import userProfileUrl from '../assets/other/kawaiiFish.jpg'
import i18nIcon from '../assets/i18n/i18n.svg'
import {onMounted, ref, watch} from "vue";
import {Search} from "@element-plus/icons-vue";
import defaultUserProfile from '../assets/user/defaultUserProfile.png'
import { User, Lock, Message } from "@element-plus/icons-vue";
import English from '../assets/i18n/EN-UK.svg'
import Chinese from '../assets/i18n/ZH-CH.svg'
import i18n from "../locales/index.js";

const props = defineProps(['whetherSearchInputVisible'])
const isLogin = 1
const isRegister = 2

const isSearchInputVisible = ref(true)
const searchInputValue = ref("");
const isLoginRegisterModeOpen = ref(false)
const isLoginOrRegister = ref(isLogin)

watch(
  () => props.whetherSearchInputVisible,
  (newValue, oldValue) => {
    isSearchInputVisible.value = !!newValue;
  }
)

const handleLanguageChange = (newLanguage) => {
  i18n.setLocale(newLanguage);
}

</script>

<template>
  <div class="navigate-bar-outer shadow-xl shadow-gray-300">
    <div class="logo-outer">
      <img class="logo animate__animated animate__rubberBand animate__infinite" :src="logoUrl">
    </div>
    <div class="navigate-outer flex justify-start">
      <div class="single-navigate-outer">
        {{ i18n.t("navigateBar.homePage") }}
      </div>
      <div class="single-navigate-outer">
        <span>页面二</span>
      </div>
      <div class="single-navigate-outer">
        <span>页面三</span>
      </div>
    </div>
    <div class="search-input-outer">
      <div class="animate__animated animate__zoomInDown" v-if="isSearchInputVisible">
        <el-input
          v-model="searchInputValue"
          :placeholder="i18n.t('navigateBar.search')"
          class="search-input"
        />
        <el-button class="search-input-button" :icon="Search" />
      </div>
    </div>
    <div class="user-set-outer">
      <el-popover trigger="click" popper-style="width: fit-content" placement="bottom-end">
        <template #reference>
          <img class="user-profile" :src="defaultUserProfile">
        </template>
        <template #default>
          <div style="width: 15vw; display: flex; flex-wrap: wrap">
            <div style="width: 100%; height: 6vh; display: flex; flex-wrap: nowrap">
              <div style="width: 35%; height: 100%; display: flex; justify-content: center; align-items: center">
                <img style="height: 80%" :src="defaultUserProfile" />
              </div>
              <div style="width: 65%; height: 100%; display: flex; justify-content: flex-start; align-items: center">
                <p style="font-family: STSong,serif; cursor: pointer" @click="() => isLoginRegisterModeOpen = true">
                  {{ i18n.t('navigateBar.login') }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </el-popover>
    </div>
    <div class="i18n-config-outer">
      <el-popover trigger="click" popper-style="width: fit-content" placement="bottom-end">
        <template #reference>
          <img style="height: 45%" :src="i18nIcon" />
        </template>
        <template #default>
          <div style="width: 7vw;  display: flex; flex-wrap: wrap;">
            <div
              style="width: 100%; height: 4.5vh; display: flex; flex-wrap: nowrap; cursor: pointer"
              @click="() => handleLanguageChange('cn')"
            >
              <div style="width: 35%; height: 100%; display: flex; justify-content: center; align-items: center">
                <img style="height: 60%" :src="Chinese">
              </div>
              <div style="width: 65%; height: 100%; display: flex; justify-content: left; align-items: center">
                汉语
              </div>
            </div>
            <div style="width: 100%; height: 1vh"></div>
            <div
              style="width: 100%; height: 4.5vh; display: flex; flex-wrap: nowrap; cursor: pointer"
              @click="() => handleLanguageChange('en')"
            >
              <div style="width: 35%; height: 100%; display: flex; justify-content: center; align-items: center">
                <img style="height: 60%" :src="English">
              </div>
              <div style="width: 65%; height: 100%; display: flex; justify-content: left; align-items: center">
                English
              </div>
            </div>
          </div>
        </template>
      </el-popover>
    </div>
    <div >

    </div>
  </div>
  <div>
    <el-dialog
      v-model="isLoginRegisterModeOpen"
      style="width: 35vw; height: 73vh; border-radius: 20px"
    >
      <div class="login-register-mode-outer">
        <div class="login-register-input-outer content-evenly">
          <div class="login-register-input">
            <el-input :placeholder="i18n.t('loginMode.inputUsername')" :prefix-icon="User" />
          </div>
          <div class="login-register-input">
            <el-input :placeholder="i18n.t('loginMode.inputPassword')" :prefix-icon="Lock" />
          </div>
          <div v-if="isLoginOrRegister === isRegister" class="login-register-input">
            <el-input :placeholder="i18n.t('loginMode.makeSurePassword')" :prefix-icon="Lock" />
          </div>
          <div v-if="isLoginOrRegister === isRegister" class="login-register-input">
            <el-input :placeholder="i18n.t('loginMode.inputEmail')" :prefix-icon="Message" />
          </div>
        </div>
        <div class="login-register-button-outer">
          <div style="width: 100%; height: 25%; display: flex; flex-wrap: nowrap">
            <el-button v-if="isLoginOrRegister === isLogin" style="height: 100%; width: 65%" type="primary">
              {{ i18n.t('loginMode.loginButton') }}
            </el-button>
            <div v-if="isLoginOrRegister === isLogin" style="height: 100%; width: 10%"></div>
            <el-button class="grow" style="height: 100%; width: 25%" type="default" @click="evt => isLoginOrRegister = isRegister">
              {{ i18n.t('loginMode.registerButton') }}
            </el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.navigate-bar-outer {
  width: 97vw;
  height: 10vh;
  position: fixed;
  left: 1.5vw;
  top: 0;
  display: flex;
  flex-wrap: nowrap;
  z-index: 2000;
  background-color: white;
  .logo-outer {
    height: 100%;
    width: 13%;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo {
      height: 60%;
      animation-duration: 3s;
    }
  }
  .navigate-outer {
    height: 100%;
    width: 48%;
    .single-navigate-outer {
      color: #000;
      height: 100%;
      width: 33.3%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
  .search-input-outer {
    height: 100%;
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    .search-input {
      width: 70%;
      height: 60%;
    }
    .search-input-button {
      height: 60%;
      margin-left: 1vw;
      background-color: #f5f7fa;
    }
  }
  .user-set-outer {
    height: 100%;
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    .user-profile {
      height: 60%;
      border-radius: 50%;
    }
  }
  .i18n-config-outer {
    height: 100%;
    width: 4%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.login-register-mode-outer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  .login-register-input-outer {
    width: 100%;
    height: 65%;
    display: flex;
    flex-wrap: wrap;
    .login-register-input {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center
    }
  }
  .login-register-button-outer {
    width: 100%;
    height: 35%;
    display: flex;
    align-items: center;
  }
}

:deep(.el-popper) {
  width: fit-content !important;
}

:deep(.el-dialog__header) {
  background-image: linear-gradient(to right, var(--tw-gradient-stops), var(--tw-gradient-to));
  --tw-gradient-from: #3538a6 var(--tw-gradient-from-position);
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);;
  --tw-gradient-to: #498eef var(--tw-gradient-to-position);
  width: 100% !important;
  height: 10% !important;
}
:deep(.el-dialog__body) {
  width: 100% !important;
  height: 90% !important;
}
</style>
