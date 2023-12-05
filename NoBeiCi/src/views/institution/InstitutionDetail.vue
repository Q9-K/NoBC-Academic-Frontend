<script setup>
import {ref,onMounted} from 'vue'
import {useRouter} from 'vue-router'
import NavigateBar from '../../components/NavigateBar.vue'
import i18n from "../../locales/index.js";
const router = useRouter();
const backToList = () => {
    router.push({
        path: '/institution'
    })
}




</script>

<template>
    <el-scrollbar>
  <div class="header"><NavigateBar></NavigateBar></div>
  <div class="i-container">
    <button @click=backToList()>返回</button>
 
  </div>
</el-scrollbar>
</template>

<style scoped lang="scss">
.header {
    height: 10vh;
}

</style>
