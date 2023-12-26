<script setup>
import logoUrl from '../assets/logo/logo.png'
import {onMounted, ref, watch} from "vue";
import {Search} from "@element-plus/icons-vue";
import defaultUserProfile from '../assets/user/defaultUserProfile.png'
import English from '../assets/i18n/EN-UK.svg'
import Chinese from '../assets/i18n/ZH-CH.svg'
import i18n from "../locales/index.js";
import {
  GlobalOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
  AuditOutlined,
  MailOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons-vue";
import router from "../routes/index.js";
import sunUrl from '../assets/sun.png';
import moonUrl from '../assets/moon.png'
import {
  enable as enableDarkMode,
  disable as disableDarkMode
} from "darkreader";
import {useStateOfPriorDialog} from "../stores/stateOfPriorDialog.js";
import {useSearchContentStore} from "../stores/searchContent.js";
import get from '../functions/Get.js'
import {ElMessage} from "element-plus";

const props = defineProps(['whetherSearchInputVisible'])
const isLogin = 1
const isRegister = 2

let isSearchInputVisible
const searchInputValue = ref("");
const isLoginRegisterModeOpen = ref(false)
const isLoginOrRegister = ref(isLogin)
const isDark = ref(false)
const isManager = ref(false)
const whetherShowMailDrawer = ref(false)
const whetherShowDot = ref(0)
const allMailData = ref([])
const username = ref('')

if (localStorage.getItem('theme') === null) {
  localStorage.setItem('theme', 'light')
}

if (props.whetherSearchInputVisible === undefined) {
  isSearchInputVisible = ref(true)
}
else {
  isSearchInputVisible = ref(false)
}

watch(
  () => props.whetherSearchInputVisible,
  (newValue, oldValue) => {
    isSearchInputVisible.value = !!newValue;
  }
)

watch(
  () => localStorage.getItem('userInformation'),
  (newValue) => {
    if (newValue) {
      username.value = JSON.parse(localStorage.getItem('userInformation')).username
    }
  }
)

onMounted(() => {
  if (localStorage.getItem(('manager'))) {
    isManager.value = true
  }
  else {
    isManager.value = false
  }
})
watch(
  () => localStorage.getItem('manager'),
  (newValue) => {
    if (newValue !== null) {
      isManager.value = true
    }
    else {
      isManager.value = false
    }
  }
)

onMounted(() => {
  if (localStorage.getItem('theme') === 'light') {
    isDark.value = false
    disableDarkMode()
  }
  else {
    isDark.value = true
    enableDarkMode()
  }
})

const handleToUserPage = () => {
  router.push('/personinfo')
}

const handleLogout = () => {
  localStorage.clear()
  const stateOfPriorDialog = useStateOfPriorDialog()
  stateOfPriorDialog.openDialog()
  router.push('/')
}

const handleLanguageChange = (newLanguage) => {
  i18n.setLocale(newLanguage);
}

const handleTurnLight = () => {
  disableDarkMode()
  isDark.value = false
  localStorage.setItem('theme', 'light')
}

const handleTurnDark = () => {
  enableDarkMode()
  isDark.value = true
  localStorage.setItem('theme', 'dark')
}

const handleToManagerCenter = () => {
  router.push('/admin')
}

const handleSearch = () => {
  const searchContent = useSearchContentStore()
  searchContent.setContent(searchInputValue.value)
  router.push('/search')
}

const handleOpenMailDrawer = () => {

  const fetchAllMails = async () => {
    try {
      const apiUrl = '/user/get_messages/'

      const response = await get({
        url: apiUrl,
        showLoading: true, // Show loading indicator
        addToken: true,
        useTestEnv: false,
        // testEnv: 'http://100.117.229.168:8000',
      })

      if (response) {
        return response
      }
      else {
        console.log("空响应")
      }
    }
    catch (e) {
      console.log(e)
    }

  }

  fetchAllMails()
    .then((response) => {
      if (response.code !== 200) {
        ElMessage({
          type: "error",
          message: "Oh No!"
        })
      }
      else {
        allMailData.value = response.data
        whetherShowDot.value = 0
        whetherShowMailDrawer.value = true
      }
    })

}

watch(
  () => {
    const stateOfPriorDialog = useStateOfPriorDialog()
    return stateOfPriorDialog.getVisible
  },
  (newValue) => {
    if (newValue === true) {
      return
    }
    const email = JSON.parse(localStorage.getItem('userInformation')).email
    const idEmail = email.split('@')[0]
    console.log(idEmail)
    const mailWebSocket = new WebSocket('wss://api.buaa-q9k.xyz/ws/' + idEmail + '/message')
    mailWebSocket.onmessage = (event) => {
      whetherShowDot.value = 1
    }
  }
)

</script>

<template>
  <div class="navigate-bar-outer shadow-lg shadow-gray-300">
    <div class="logo-outer">
      <img class="logo animate__animated animate__rubberBand animate__infinite" :src="logoUrl" />
    </div>
    <div class="navigate-outer flex justify-start">
      <div class="flex justify-around" style="height: 100%; width: 75%">
        <div class="single-navigate-outer" @click="router.push('/')">
          {{ i18n.t("navigateBar.homePage") }}
        </div>
        <div class="single-navigate-outer" @click="router.push('/conf')">
          {{ i18n.t("navigateBar.conferences") }}
        </div>
        <div class="single-navigate-outer" @click="router.push('/institution')">
          {{ i18n.t("navigateBar.institution") }}
        </div>
        <div class="single-navigate-outer" @click="router.push('/field')">
          {{ i18n.t("navigateBar.field") }}
        </div>
        <div class="single-navigate-outer" @click="router.push('/scholar')">
          {{ i18n.t("navigateBar.researcher") }}
        </div>
      </div>
    </div>
    <div class="search-input-outer">
      <div style="width: 100%; height: 100%; display: flex; justify-content: center; align-items: center" class="animate__animated animate__zoomInDown" v-if="isSearchInputVisible">
        <el-input
          v-model="searchInputValue"
          :placeholder="i18n.t('navigateBar.search')"
          class="search-input"
        >
          <template #append>
            <el-button @click="handleSearch" :icon="Search" />
          </template>
        </el-input>
      </div>
    </div>
    <div class="user-set-outer">
      <el-popover trigger="click" popper-style="width: fit-content" placement="bottom-end">
        <template #reference>
          <UserOutlined style="font-size: 180%" />
        </template>
        <template #default>
          <div style="width: 10vw; display: flex; flex-wrap: wrap">
            <div style="width: 100%; height: 6vh; display: flex; flex-wrap: nowrap">
              <div style="width: 35%; height: 100%; display: flex; justify-content: center; align-items: center">
                <img style="height: 80%" :src="defaultUserProfile" />
              </div>
              <div style="width: 65%; height: 100%; display: flex; justify-content: flex-start; align-items: center">
                <p style="font-family: STSong,serif; ; cursor: pointer" @click="() => isLoginRegisterModeOpen = true">
                  {{ username }}
                </p>
              </div>
            </div>
            <el-menu
              class="user-menu"
              mode="vertical"
            >
              <el-menu-item class="user-menu-item" @click="handleToUserPage" >
                <div class="user-menu-item-icon">
                  <menu-outlined style="font-size: 145%" />
                </div>
                <div class="user-menu-item-text">
                  {{ i18n.t('navigateBar.toUserPage') }}
                </div>
              </el-menu-item>
              <el-menu-item v-if="isManager" class="user-menu-item" @click="handleToManagerCenter">
                <div class="user-menu-item-icon">
                  <audit-outlined style="font-size: 145%" />
                </div>
                <div class="user-menu-item-text">
                  {{ i18n.t('navigateBar.managerCenter') }}
                </div>
              </el-menu-item>
              <el-menu-item class="user-menu-item" @click="handleLogout">
                <div class="user-menu-item-icon">
                  <logout-outlined style="font-size: 145%" />
                </div>
                <div class="user-menu-item-text">
                  {{ i18n.t('navigateBar.logout') }}
                </div>
              </el-menu-item>
            </el-menu>
          </div>
        </template>
      </el-popover>
    </div>
    <div class="mail-box-outer">
      <a-badge
        :count="whetherShowDot"
        :dot="true"
      >
        <mail-outlined @click="handleOpenMailDrawer" style="font-size: 180%" />
      </a-badge>
    </div>
    <div class="i18n-config-outer">
      <el-popover trigger="click" popper-style="width: fit-content" placement="bottom-end">
        <template #reference>
          <global-outlined style="font-size: 180%" />
        </template>
        <template #default>
          <div style="width: 7vw;  display: flex; flex-wrap: wrap;">
            <div
              class="language-config"
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
              class="language-config"
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
    <div class="light-dark-mode-outer">
      <img @click="handleTurnDark" v-if="!isDark" :src="sunUrl" class="mode-button" alt="light" />
      <img @click="handleTurnLight" v-if="isDark" :src="moonUrl" class="mode-button" alt="dark" />
    </div>
  </div>
  <el-drawer
    v-model="whetherShowMailDrawer"
  >
    <template #header>
      {{ i18n.t('navigateBar.messageBoxTitle') }}
    </template>
    <div v-if="allMailData.length !== 0" class="mail-drawer-outer">
      <el-card v-for="mailData in allMailData" class="single-mail-card">
        <template #header>
          <div class="single-mail-card-header">
            <div v-if="mailData.status === '未读'" class="new-mail-icon-outer">
              <exclamation-circle-outlined style="font-size: 130%" />
            </div>
            <div class="mail-title">
              {{ mailData.title }}
            </div>
          </div>
        </template>
        <template #default>
          <div class="mail-content">
            {{ mailData.content }}
          </div>
        </template>
      </el-card>
    </div>
    <a-empty
      v-if="allMailData.length === 0"
      :description="i18n.t('navigateBar.noMessage')"
    >
    </a-empty>
  </el-drawer>
</template>

<style scoped lang="scss">
.navigate-bar-outer {
  width: 100vw;
  height: 10vh;
  position: fixed;
  left: 0;
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
    width: 44%;
    .single-navigate-outer {
      color: #000;
      height: 100%;
      width: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
  .search-input-outer {
    height: 100%;
    width: 27%;
    display: flex;
    justify-content: center;
    align-items: center;
    .search-input {
      width: 80%;
      height: 50%;
    }
  }
  .user-set-outer {
    height: 100%;
    width: 4%;
    display: flex;
    justify-content: center;
    align-items: center;
    .user-profile {
      height: 60%;
      border-radius: 50%;
    }
  }
  .mail-box-outer {
    height: 100%;
    width: 4%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .i18n-config-outer {
    height: 100%;
    width: 4%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .light-dark-mode-outer {
    height: 100%;
    width: 4%;
    display: flex;
    justify-content: center;
    align-items: center;
    .mode-button {
      height: 37px;
      width: 37px;
    }
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

.language-config {
  width: 100%;
  height: 4.5vh;
  display: flex;
  flex-wrap: nowrap;
}

.language-config:hover {
  cursor: pointer;
  background-color: #e7e7e7;
  border-radius: 10%;
}

.user-menu {
  width: 100%;
  .user-menu-item {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    .user-menu-item-icon {
      position: relative;
      width: 25%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      right: 5%;
    }
    .user-menu-item-text {
      width: 75%;
      height: 100%;
      display: flex;
      padding-left: 6.5%;
      justify-content: start;
      align-items: center;
    }
  }
}

.mail-drawer-outer {
  width: 100%;
  height: fit-content;
  position: relative;
  bottom: 20.6px;
  display: flex;
  flex-wrap: wrap;
  .single-mail-card {
    width: 100%;
    height: fit-content;
    margin-bottom: 4vh;
    .single-mail-card-header {
      display: flex;
      flex-wrap: nowrap;
      justify-content: left;
      .new-mail-icon-outer {
        width: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        .new-mail-icon {
          width: 80%;
        }
      }
      .mail-title {
        width: 90%;
        text-align: left;
        font-size: 135%;
      }
    }
    .mail-content {
      text-align: left;
      font-size: 80%;
    }
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
