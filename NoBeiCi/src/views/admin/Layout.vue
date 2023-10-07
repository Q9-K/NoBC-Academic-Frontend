<script setup>
import {useRouter} from 'vue-router'

const router = useRouter();

const menuClickHandler = (index)=>{
    router.push(`/admin/${index}`)
}

</script>

<template>
  <div class="header">导航栏</div>
  <div class="container">
    <div class="left-tool">
        <el-menu
        active-text-color="#ffd04b"
        background-color="#062a66"
        class="el-menu-vertical-demo"
        default-active="1"
        text-color="#fff"
      >
        <el-menu-item index="1" @click="menuClickHandler('scholarCertify')">
            <span>审核学者认证</span>
        </el-menu-item>

        <el-menu-item index="2" @click="menuClickHandler('achievementCertify')">
          <span>审核学术成果</span>
        </el-menu-item>
        <el-menu-item index="3" @click="menuClickHandler('achievementClaim')">
          <span>处理学术成果认领</span>
        </el-menu-item>
        <el-menu-item index="4" @click="menuClickHandler('achievementComplaint')">
          <span>处理学术成果申诉</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="display">
        <router-view></router-view>
    </div>
  </div>

</template>

<style scoped lang="scss">
.header {
    height: 10vh;
}
.container {
    width: 100%;
    display: flex;
    height: 90vh;
    .left-tool {
      background-color: #062a66;
        height: 90vh;
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
      background-color: #f0f1f4;
        width: 80%;
        overflow-y: scroll;

    }
}
</style>
