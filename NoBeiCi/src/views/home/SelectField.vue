<script setup>

import {onMounted, ref, watch} from "vue";
import axios from "axios";
import i18n from "../../locales/index.js";
import {handleResponse} from "../../functions/handleResponse.js";
import * as echarts from 'echarts'
import {FINISH, useStateOfPriorDialog} from "../../stores/stateOfPriorDialog.js";
import {debounce} from "vue-debounce";
import request from '../../functions/Request.js'
import {ElMessage} from "element-plus";

const currentSelectedFieldId = ref('')
const currentSelectedFieldName = ref('')
let currentSelectFieldEnName = ''
let currentSelectFiledCnName = ''

const stateOfPriorDialog = useStateOfPriorDialog()

let fields = []
const cnFieldsData = []
const enFieldsData = []
const idFieldMap = new Map()
let rectangleTree
onMounted(() => {
  const getLevel0 = axios.get('https://api.buaa-q9k.xyz' + '/concept/get_level_0/').then((response) => {
  // const getLevel0 = axios.get('http://100.92.185.118:8000' + '/concept/get_level_0/').then((response) => {
    handleResponse(response, false, (data) => {

      for (let {display_name, chinese_display_name, id} of data) {
        const cnField = {
          name: chinese_display_name,
          value: 1,
          children: [],
          id: id
        }
        cnFieldsData.push(cnField)

        const enField = {
          name: display_name,
          value: 1,
          children: [],
          id: id
        }
        enFieldsData.push(enField)

        idFieldMap.set(id, {
          cnField: cnField,
          enField: enField
        })
      }
    })
  })

  let getLevel1
  Promise.all([getLevel0])
    .then(() => {
      for (let {id} of cnFieldsData) {
        let parentId = id
        getLevel1 = axios.get('https://api.buaa-q9k.xyz' + '/concept/get_subdomains/', {
          params: {
            id: id
          }
        })
          .then((response) => {

          console.log("1")

          handleResponse(response, false, (data) => {

            for (let {display_name, chinese_display_name, id} of data) {
              const {cnField, enField} = idFieldMap.get(parentId)

              const cnChildField = {
                name: chinese_display_name,
                value: 1,
                children: [],
                id: id
              }
              cnField.children.push(cnChildField)

              const enChildField = {
                name: display_name,
                value: 1,
                children: [],
                id: id
              }
              enField.children.push(enChildField)

              idFieldMap.set(id, {
                cnField: cnChildField,
                enField: enChildField
              })
            }
          })
        })
          .then(() => {

            rectangleTree = echarts.init(document.getElementById('containerOfRectangleTree'), null, {
              width: '600px',
              height: '275px',
            })

            if (i18n.getLocale() === 'en') {
              fields = enFieldsData
            }
            else {
              fields = cnFieldsData
            }

            const options = {
              title: {
                left: 'leafDepth'
              },
              tooltip: {},
              series: [
                {
                  name: 'option',
                  type: 'treemap',
                  visibleMin: 300,
                  data: fields,
                  leafDepth: 1,
                  levels: [
                    {
                      itemStyle: {
                        borderColor: '#555',
                        borderWidth: 4,
                        gapWidth: 4
                      }
                    },
                    {
                      colorSaturation: [0.3, 0.6],
                      itemStyle: {
                        borderColorSaturation: 0.7,
                        gapWidth: 2,
                        borderWidth: 2
                      }
                    },
                    {
                      colorSaturation: [0.3, 0.5],
                      itemStyle: {
                        borderColorSaturation: 0.6,
                        gapWidth: 1
                      }
                    },
                    {
                      colorSaturation: [0.3, 0.5]
                    }
                  ],
                }
              ],
            }

            rectangleTree.hideLoading()
            rectangleTree.setOption(options)

            rectangleTree.on('click', debounce((params) => {
              console.log(params)
              currentSelectedFieldId.value = params.data.id
            }, "100ms"))
          })
      }
  })
})

watch(
  () => i18n.getLocale(),
  (newValue) => {
    if (newValue === 'en') {
      fields = enFieldsData
      currentSelectedFieldName.value = currentSelectFieldEnName
    }
    else {
      fields = cnFieldsData
      currentSelectedFieldName.value = currentSelectFiledCnName
    }
    rectangleTree.setOption({
      series: {
        data: fields
      }
    })
  }
)

const handleFinishSelect = () => {

  const formData = new FormData()
  formData.append("concept_id", 12)

  stateOfPriorDialog.setStep(2)
  stateOfPriorDialog.setView(FINISH)
}

watch(
  () => currentSelectedFieldId.value,
  (newValue) => {
    const {cnField, enField} = idFieldMap.get(newValue)
    currentSelectFiledCnName = cnField.name
    currentSelectFieldEnName = enField.name
    if (i18n.getLocale() === 'en') {
      currentSelectedFieldName.value = currentSelectFieldEnName
    }
    else {
      currentSelectedFieldName.value = currentSelectFiledCnName
    }
  }
)

const handleSelectField = () => {

  const selectField = (fieldId) => {
    try {
      const apiUrl = '/user/add_focus_concept/'
      const params = {
        concept_id: fieldId
      }

      const response = request({
        url: apiUrl,
        params: params,
        showLoading: true,
        addToken: true,
        errorCallback: null,
        showError: true,
        useTestEnv: false,
        // testEnv: 'http://100.92.185.118:8000'
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

  selectField(currentSelectedFieldId.value)
    .then((response) => {
      if (response.code !== 200) {
        ElMessage({
          type: "error",
          message: "Oh No!"
        })
      }
      else {
        ElMessage({
          type: "success",
          message: "OK!"
        })
      }
    })
}

</script>

<template>
  <div class="select-field-outer">
    <div class="select-field">
      <div class="select-field-title-outer">
        <el-input
          class="select-field-title"
          v-model="currentSelectedFieldName"
          disabled="disabled"
        >
          <template #append>
            <el-button type="primary" @click="handleSelectField">
              {{ i18n.t('priorDialog.selectFieldMode.selectButton') }}
            </el-button>
          </template>
        </el-input>
      </div>
      <div class="select-field-rectangle-tree-outer">
        <div id="containerOfRectangleTree" class="select-field-rectangle-tree"></div>
      </div>
    </div>
    <div class="finish-select-outer">
      <el-button class="skip-select" @click="handleFinishSelect">
        {{ i18n.t('priorDialog.selectFieldMode.skipSelect') }}
      </el-button>
      <el-button type="primary" class="finish-select" @click="handleFinishSelect">
        {{ i18n.t('priorDialog.selectFieldMode.finishSelect') }}
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.select-field-outer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  .select-field {
    height: 90%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .select-field-title-outer {
      width: 100%;
      height: 15%;
      display: flex;
      justify-content: center;
      align-items: start;
      .select-field-title {
        width: 50%;
        height: 80%;
        position: relative;
        bottom: 14px;
      }
    }
    .select-field-rectangle-tree-outer {
      width: 100%;
      height: 85%;
      display: flex;
      justify-content: center;
      align-items: center;
      .select-field-rectangle-tree {
        height: 120%;
        width: 120%;
      }
    }
  }
  .finish-select-outer {
    height: 10%;
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    .skip-select {
      height: 100%;
      position: relative;
      right: 50px;
    }
    .finish-select {
      height: 100%;
      position: relative;
      right: 25px;
    }
  }
}
</style>
