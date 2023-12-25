<script setup>

import {onMounted, ref, watch} from "vue";
import i18n from "../../locales/index.js";
import {FINISH, LOGIN, REGISTER, SELECT_FIELD, useStateOfPriorDialog} from "../../stores/stateOfPriorDialog.js";
import LoginDialog from "./LoginDialog.vue";
import RegisterDialog from "./RegisterDialog.vue";
import SelectField from "./SelectField.vue";
import FinishPrior from "./FinishPrior.vue";

const hasAccount = ref(true)
const currentLanguage = ref(false)
const stateOfPriorDialog = useStateOfPriorDialog()

onMounted(() => {
  stateOfPriorDialog.setView(LOGIN)
})
const handleLanguageChange = (value) => {
  if (value === false) {
    i18n.setLocale('cn');
  }
  else {
    i18n.setLocale('en')
  }
}

</script>

<template>
  <el-dialog
    width="50%"
    :show-close="false"
    v-model="stateOfPriorDialog.getVisible"
    :close-on-click-modal="true"
    :close-on-press-escape="true"
  >
    <template #header >
      <div class="prior-steps-and-language-outer">
        <div class="prior-steps-outer">
          <div class="prior-steps">
            <el-steps
              align-center="align-center"
              :active="stateOfPriorDialog.getCurrentStep"
              finish-status="success"
              process-status="process"
            >
              <el-step :title="i18n.t('priorDialog.enter')" >
                <template #icon>
                  <Avatar class="step-icon" />
                </template>
              </el-step>
              <el-step :title="i18n.t('priorDialog.selectField')" >
                <template #icon>
                  <Grid class="step-icon" />
                </template>
              </el-step>
              <el-step :title="i18n.t('priorDialog.success')" >
                <template #icon>
                  <SuccessFilled class="step-icon" />
                </template>
              </el-step>
            </el-steps>
          </div>
        </div>
        <div class="prior-language-outer">
          <div class="prior-language">
            <el-switch
              v-model="currentLanguage"
              style="--el-switch-on-color: #68a128; --el-switch-off-color: #2f62d7"
              active-text="English"
              inactive-text="汉语"
              @change="val => handleLanguageChange(val)"
            />
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <div class="prior-dialog-outer">
        <LoginDialog v-if="stateOfPriorDialog.getCurrentView === LOGIN" />
        <RegisterDialog v-if="stateOfPriorDialog.getCurrentView === REGISTER" />
        <SelectField v-if="stateOfPriorDialog.getCurrentView === SELECT_FIELD" />
        <FinishPrior v-if="stateOfPriorDialog.getCurrentView === FINISH" />
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.prior-steps-and-language-outer {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  .prior-steps-outer {
    height: fit-content;
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    .prior-steps {
      height: fit-content;
      width: 65%;
      .step-icon {
        height: 100%;
      }
    }
  }
  .prior-language-outer {
    width: 100%;
    height: 4.5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1.5vh;
    .prior-language {
      height: 100%;
      width: 25%;
    }
  }
}
.prior-dialog-outer {
  width: 100%;
  height: 330px;
  display: flex;
  flex-wrap: wrap;
}
</style>
