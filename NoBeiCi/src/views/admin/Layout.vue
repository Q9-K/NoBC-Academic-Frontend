<script setup>
import {useRouter} from 'vue-router'
import NavigateBar from '../../components/NavigateBar.vue'
import i18n from "../../locales/index.js";
const router = useRouter();

const menuClickHandler = (index)=>{
    router.push(`/admin/${index}`)
}

</script>

<template>
  <div class="header"><NavigateBar></NavigateBar></div>
  <div class="admin-container">
    <div class="left-tool">
        <el-menu
        active-text-color="#ffd04b"
        background-color="#062a66"
        class="el-menu-vertical-demo"
        default-active="1"
        text-color="#fff"
      >
        <el-menu-item index="1" @click="menuClickHandler('scholarCertify')">
            <span>{{i18n.t('admin.reviewScholarCertification')}}</span>
        </el-menu-item>
        <el-menu-item index="2" @click="menuClickHandler('scholarClaim')">
            <span>{{i18n.t('admin.handleScholarGrievances')}}</span>
        </el-menu-item>
      </el-menu>
    </div>

    <div class="display">
      <el-scrollbar>
        <router-view></router-view>
      </el-scrollbar>
    </div>
 
  </div>

</template>

<style scoped lang="scss">
.header {
    height: 10vh;
}
.admin-container {
    width: 97vw;
    display: flex;
    margin-top: 5vh;
    height: 85vh;
    .left-tool {
      background-color: #062a66;
        height: 85vh;
        width: 20%;
        .el-menu-vertical-demo {
            .el-menu-item {
                span{
                    width: 100%;
                    text-align: center;
                }
            }
        }
    }
    .display {
      scrollbar-width: none;
      -ms-overflow-style: none;
      background-color: #f0f1f4;
        padding: 5px;
        width: 80%;
        overflow-y: scroll;
        overflow-x:hidden;
    }
    .display::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
}


</style>
