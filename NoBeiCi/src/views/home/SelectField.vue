<script setup>

import {onMounted, ref} from "vue";
import axios from "axios";
import i18n from "../../locales/index.js";
import {handleResponse} from "../../functions/handleResponse.js";
import * as echarts from 'echarts'
import {FINISH, useStateOfPriorDialog} from "../../stores/stateOfPriorDialog.js";

const stateOfPriorDialog = useStateOfPriorDialog()
const fields = []

onMounted(() => {

  let currentLanguage = 0
  if (i18n.getLocale() === 'cn') {
    currentLanguage = 1
  }

  const getLevel0 = axios.get('http://100.92.185.118:8000' + '/concept/get_level_0/', {
    params: {
      language: currentLanguage
    }
  }).then((response) => {
    handleResponse(response, false, (data) => {
      if (currentLanguage === 1) {
        for (let {chinese_display_name, id} of data) {
          fields.push({
            name: chinese_display_name,
            value: 1,
            children: [],
            id: id
          })
        }
      }
      else {
        for (let {display_name, id} of data) {
          fields.push({
            name: display_name,
            value: 1,
            children: [],
            id: id
          })
        }
      }
    })
  })

  let getLevel1
  Promise.all([getLevel0])
    .then(() => {
      for (let {id, children} of fields) {
        getLevel1 = axios.get('http://100.92.185.118:8000' + '/concept/get_subdomains/', {
          params: {
            language: currentLanguage,
            id: id
          }
        }).then((response) => {

          console.log("1")

          handleResponse(response, false, (data) => {

            if (currentLanguage === 1) {
              for (let {chinese_display_name, id} of data) {
                children.push({
                  name: chinese_display_name,
                  value: 1,
                  children: [],
                  id: id
                })
              }
            }
            else {
              for (let {display_name, id} of data) {
                children.push({
                  name: display_name,
                  value: 1,
                  children: [],
                  id: id
                })
              }
            }
          })
        })
          .then(() => {

            console.log("2")

            const rectangleTree = echarts.init(document.getElementById('containerOfRectangleTree'))

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
          })
      }
  })
})

const handleFinishSelect = () => {

  const formData = new FormData()
  formData.append("concept_id", 12)

  stateOfPriorDialog.setStep(2)
  stateOfPriorDialog.setView(FINISH)
}
</script>

<template>
  <div class="select-field-outer">
    <div class="select-field">
      <div class="select-field-title-outer">
        <el-select/>
      </div>
      <div class="select-field-rectangle-tree-outer">
        <div id="containerOfRectangleTree" class="select-field-rectangle-tree"></div>
      </div>
    </div>
    <div class="finish-select-outer">
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
    flex-wrap: nowrap;
    .select-field-title-outer {
      height: 100%;
      width: 20%;
    }
    .select-field-rectangle-tree-outer {
      height: 100%;
      width: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
      .select-field-rectangle-tree {
        height: 80%;
        width: 80%;
      }
    }
  }
  .finish-select-outer {
    height: 10%;
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    .finish-select {
      height: 100%;
      position: relative;
      right: 25px;
    }
  }
}
</style>
