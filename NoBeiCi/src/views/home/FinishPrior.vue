<script setup>

import finishPicture from '../../assets/user/welcome.png'
import i18n from "../../locales/index.js";
import {useStateOfPriorDialog} from "../../stores/stateOfPriorDialog.js";

const stateOfPriorDialog = useStateOfPriorDialog()

const handleEnter = () => {
  stateOfPriorDialog.closeDialog()
}

</script>

<template>
  <div class="finish-outer">
    <div class="finish-picture-outer">
      <img class="finish-picture animate__animated animate__zoomInDown" :src="finishPicture" alt="welcome">
    </div>
    <div class="enter-button-outer">
      <el-button type="primary" class="enter-button" @click="handleEnter">
        {{ i18n.t('priorDialog.finishMode.finish') }}
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.finish-outer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  .finish-picture-outer {
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    .finish-picture {
      height: 120%;
    }
  }
  .enter-button-outer {
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: right;
    .enter-button {
      position: relative;
      top: 24px;
      right: 20px;
    }
  }
}
</style>
