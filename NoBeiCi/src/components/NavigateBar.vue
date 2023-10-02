<script setup>
import logoUrl from '../assets/logo/logo.png'
import userProfileUrl from '../assets/other/kawaiiFish.jpg'
import {ref, watch} from "vue";
import {Search} from "@element-plus/icons-vue";

const props = defineProps(['whetherSearchInputVisible'])

const isSearchInputVisible = ref(false)
const searchInputValue = ref("");

watch(
  () => props.whetherSearchInputVisible,
  (newValue, oldValue) => {
    isSearchInputVisible.value = !!newValue;
  }
)

</script>

<template>
  <div class="navigate-bar-outer shadow-xl shadow-gray-300">
    <div class="logo-outer">
      <img id="logoImage" class="logo animate__animated animate__rubberBand animate__infinite" :src="logoUrl">
    </div>
    <div class="navigate-outer flex justify-start">
      <div class="single-navigate-outer">
        主页
      </div>
      <div class="single-navigate-outer">
        页面二
      </div>
      <div class="single-navigate-outer">
        页面三
      </div>
    </div>
    <div class="search-input-outer">
      <div class="animate__animated animate__zoomInDown" v-if="isSearchInputVisible">
        <el-input
          v-model="searchInputValue"
          placeholder="搜索学者、论文、期刊"
          class="search-input"
        />
        <el-button class="search-input-button" :icon="Search" />
      </div>
    </div>
    <div class="user-set-outer">
      <img class="user-profile" :src="userProfileUrl">
    </div>
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
  z-index: 9999;
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
    width: 50%;
    .single-navigate-outer {
      height: 100%;
      width: 10%;
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
    width: 12%;
    display: flex;
    justify-content: center;
    align-items: center;
    .user-profile {
      height: 60%;
      border-radius: 50%;
    }
  }
}

</style>
