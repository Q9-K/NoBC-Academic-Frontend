<script setup>

import * as echarts from 'echarts'
import NavigateBar from "../../components/NavigateBar.vue";
import DividerLine from "../../components/DividerLine.vue";
import {onMounted, ref, watch} from "vue";
import axios from "axios";
import i18n from "../../locales/index.js";
import {handleResponse} from "../../functions/handleResponse.js";
import {useUpperSearchBarStore} from "../../stores/upperSearchBar.js";
import SearchBar from "../../components/SearchBar.vue";
import {checkIsChinese} from "../../functions/checkIsChinese.js";
import router from "../../routes/index.js";
import get from '../../functions/Get.js'
import {ElMessage} from "element-plus";

const level0Fields = ref([])
const selectedLevel0Id = ref('https://openalex.org/C71924100')
const selectedLevel0CnName = ref('医学')
const selectedLevel0EnName = ref('Medicine')
const selectedFieldName = ref('')
const selectedFieldDescription = ref('')

let cnTreemapData = []
let enTreemapData = []
const idNodeMap = new Map()
let treemapOfBigField = null
let selectedFieldCnName = ''
let selectedFieldEnName = ''
let selectedFieldCnDescription = ''
let selectedFieldEnDescription = ''
let selectedFieldId = ''
const updateLevel0Treemap = () => {
  const getSubFields = async (parentFieldId) => {
    try {
      const apiUrl = 'http://100.92.185.118:8000' + '/concept/get_subdomains/'
      const params = {
        id: parentFieldId
      }

      const response = await get({
        url: apiUrl,
        params: params,
        showLoading: true, // 如果要显示加载指示器，请设置为 true
        errorCallback: (errorData) => {
          // 如果需要，请处理错误回调
          console.error('发生错误：', errorData);
        },
        showError: true // 设置为 true 以显示错误消息
      })

      // 处理响应数据
      if (response) {
        // 在此处处理响应数据
        return response
      }
      else {
        // 处理空响应（发生错误）
        console.error('接收到空响应。');
      }
    }
    catch (error) {
      // 处理请求期间的任何意外错误
      console.error('请求失败：', error);
    }

  }

  getSubFields(selectedLevel0Id.value)
    .then((response) => {
      if (response.code !== 200) {
        ElMessage({
          type: "error",
          message: 'Oh No!'
        })
      }
      else {
        enTreemapData.length = 0
        cnTreemapData.length = 0
        idNodeMap.clear()

        enTreemapData.push({
          id: selectedLevel0Id.value,
          name: selectedLevel0EnName.value,
          children: []
        })
        cnTreemapData.push({
          id: selectedLevel0Id.value,
          name: selectedLevel0CnName.value,
          children: []
        })

        idNodeMap.set(selectedLevel0Id.value, {
          cnNode: cnTreemapData[0],
          enNode: enTreemapData[0]
        })

        for (let {id, display_name, chinese_display_name} of response.data) {

          let enNode = {
            id: id,
            name: display_name,
            children: []
          }
          enTreemapData[0].children.push(enNode)

          let cnNode = {
            id: id,
            name: chinese_display_name,
            children: []
          }
          cnTreemapData[0].children.push(cnNode)

          idNodeMap.set(id, {
            enNode: enNode,
            cnNode: cnNode
          })
        }
      }
    })
    .then(() => {

      let dataOfTreemap
      if (i18n.getLocale() === 'en') {
        dataOfTreemap = enTreemapData
      }
      else {
        dataOfTreemap = cnTreemapData
      }

      if (treemapOfBigField !== null) {
        treemapOfBigField = null
      }

      treemapOfBigField = echarts.init(document.getElementById('containerOfTreemap'))
      treemapOfBigField.setOption({
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',
            data: dataOfTreemap,
            top: '18%',
            bottom: '14%',
            layout: 'radial',
            symbol: 'emptyCircle',
            symbolSize: 7,
            initialTreeDepth: 100,
            animationDurationUpdate: 750,
            emphasis: {
              focus: 'descendant'
            }
          }
        ]
      })
    })
    .then(() => {
      treemapOfBigField.on('click', (value) => {

        console.log(value)

        const clickedFieldId = value.data.id

        if (value.data.children.length === 0) {
          getSubFields(clickedFieldId)
            .then((response) => {

              console.log(response)

              if (response.code !== 200) {
                ElMessage({
                  type: "error",
                  message: "Oh No!"
                })
              }
              else {
                const parent = idNodeMap.get(clickedFieldId)
                parent.cnNode.children.length = 0
                parent.enNode.children.length = 0

                for (let {display_name, chinese_display_name, id} of response.data) {

                  const cnNode = {
                    name: chinese_display_name,
                    id: id,
                    children: []
                  }

                  const enNode = {
                    name: display_name,
                    id: id,
                    children: []
                  }

                  parent.cnNode.children.push(cnNode)
                  parent.enNode.children.push(enNode)

                  idNodeMap.set(id, {
                    cnNode: cnNode,
                    enNode: enNode
                  })
                }
              }
            })
            .then(() => {

              console.log(cnTreemapData)

              if (i18n.getLocale() === 'en') {
                treemapOfBigField.setOption({
                  series: {
                    data: enTreemapData
                  }
                })
              }
              else {
                treemapOfBigField.setOption({
                  series: {
                    data: cnTreemapData
                  }
                })
              }
            })
        }
        else {
          const parent = idNodeMap.get(clickedFieldId)
          parent.cnNode.children.length = 0
          parent.enNode.children.length = 0
        }
      })

      treemapOfBigField.on('contextmenu', (value) => {
        const dblId = value.data.id

        const getFieldInformation = async (fieldId) => {
          try {
            const apiUrl = 'http://100.92.185.118:8000' + '/concept/get_concept_by_id/'
            const params = {
              id: fieldId
            }

            const response = await get({
              url: apiUrl,
              params: params,
              errorCallback: (errorData) => {
                // 如果需要，请处理错误回调
                console.error('发生错误：', errorData);
              },
            })

            // 处理响应数据
            if (response) {
              // 在此处处理响应数据
              return response
            }
            else {
              // 处理空响应（发生错误）
              console.error('接收到空响应。');
            }
          }
          catch (e) {
            console.log(e)
          }

        }

        getFieldInformation(dblId)
          .then((response) => {
            if (response.code !== 200) {
              ElMessage({
                type: 'error',
                message: 'Oh No!'
              })
            }
            else {
              selectedFieldId = dblId
              selectedFieldCnName = response.data[0].chinese_display_name
              selectedFieldEnName = response.data[0].display_name
              selectedFieldCnDescription = response.data[0].chinese_description
              selectedFieldEnDescription = response.data[0].description
            }
          })
          .then(() => {
            if (i18n.getLocale() === 'en') {
              selectedFieldName.value = selectedFieldEnName
              selectedFieldDescription.value = selectedFieldEnDescription
            }
            else {
              selectedFieldName.value = selectedFieldCnName
              selectedFieldDescription.value = selectedFieldCnDescription
            }
          })
      })
    })
}

onMounted(() => {
  updateLevel0Treemap()
})

let level0FieldsCn = []
let level0FieldsEn = []
const idNameLevel0Map = new Map()
onMounted(() => {

  const getAllLevel0Fields = async () => {
    try {
      const apiUrl = 'http://100.92.185.118:8000' + '/concept/get_level_0/'

      const response = await get({
        url: apiUrl,
        showLoading: true, // 如果要显示加载指示器，请设置为 true
        errorCallback: (errorData) => {
          // 如果需要，请处理错误回调
          console.error('发生错误：', errorData);
        },
        showError: true // 设置为 true 以显示错误消息
      })

      // 处理响应数据
      if (response) {
        // 在此处处理响应数据
        return response
      }
      else {
        // 处理空响应（发生错误）
        console.error('接收到空响应。');
      }
    }
    catch (error) {
      // 处理请求期间的任何意外错误
      console.error('请求失败：', error);
    }
  }

  getAllLevel0Fields()
    .then((response) => {
      if (response.code !== 200) {
        ElMessage({
          type: "error",
          message: 'Oh No!'
        })
      }
      else {
        for (let {id, display_name, chinese_display_name} of response.data) {
          level0FieldsCn.push({
            id: id,
            name: chinese_display_name
          })
          level0FieldsEn.push({
            id: id,
            name: display_name
          })

          idNameLevel0Map.set(id, {
            enName: display_name,
            cnName: chinese_display_name
          })
        }

        if (i18n.getLocale() === 'en') {
          level0Fields.value = level0FieldsEn
        }
        else {
          level0Fields.value = level0FieldsCn
        }
      }
    })
})

watch(
  () => i18n.getLocale(),
  (newValue) => {
    if (newValue === 'en') {
      level0Fields.value = level0FieldsEn
      treemapOfBigField.setOption({
        series: {
          data: enTreemapData
        }
      })
      selectedFieldName.value = selectedFieldEnName
      selectedFieldDescription.value = selectedFieldEnDescription
    }
    else {
      level0Fields.value = level0FieldsCn
      treemapOfBigField.setOption({
        series: {
          data: cnTreemapData
        }
      })
      selectedFieldName.value = selectedFieldCnName
      selectedFieldDescription.value = selectedFieldCnDescription
    }
  }
)

const handleSearchField = (value) => {

  let codeOfLanguage = 0
  if (checkIsChinese(value)) {
    codeOfLanguage = 1
  }

  return axios.get('http://100.92.185.118:8000' + '/concept/search_concept/', {
    params: {
      keyword: value,
      language: codeOfLanguage
    }
  }).then((response) => {
    handleResponse(response, false, (data) => {
      const upperSearchBar = useUpperSearchBarStore()
      if (codeOfLanguage === 0) {
        for (let {id, display_name} of data) {
          upperSearchBar.addIntoOptions(id, display_name)
        }
      }
      else if (codeOfLanguage === 1) {
        for (let {id, chinese_display_name} of data) {
          upperSearchBar.addIntoOptions(id, chinese_display_name)
        }
      }
    })
  })
}

const handleSelectField = (value) => {
  let fullId = ''
  fullId += value
  const depart = fullId.split('/')
  let id = depart.at(depart.length - 1)
  router.push('/fieldDetail/' + id)
}

const handleSelectLevel0 = (field) => {

  console.log(field)
  console.log(idNameLevel0Map)

  selectedLevel0Id.value = field.id
  selectedLevel0CnName.value = idNameLevel0Map.get(field.id).cnName
  selectedLevel0EnName.value = idNameLevel0Map.get(field.id).enName



  updateLevel0Treemap()
}

const handleToMore = () => {
  const depart = selectedFieldId.split('/')
  let id = depart.at(depart.length - 1)
  router.push('/fieldDetail/' + id)
}

watch(
  () => selectedLevel0Id.value,
  () => {
    console.log("can u see me")
    updateLevel0Treemap()
  }
)
</script>

<template>
  <NavigateBar ></NavigateBar>
  <SearchBar
    style="position: absolute; top: 10vh;"
    :info="'hhh'"
    :search-function="handleSearchField"
    :select-function="handleSelectField"
  ></SearchBar>
  <div id="popularFieldOuter" class="popular-field-outer">
    <div class="big-field-outer">
      <el-menu
        id="bigFieldMenu"
        default-active="1"
        class="big-field-menu"
      >
        <el-menu-item v-for="field in level0Fields" :index="field.id" :key="field.id" class="big-field-item">
          <div @click="() => handleSelectLevel0(field)" class="big-field-item-text">
            {{ field.name }}
          </div>
          <DividerLine width="100%" />
        </el-menu-item>
      </el-menu>
    </div>
    <div class="simple-information-of-big-field-outer">
      <div id="containerOfTreemap" class="treemap-of-big-field"></div>
      <div class="simple-information-card-outer">
        <el-card class="simple-information-card">
          <template #header>
            <div class="simple-information-card-header">
              <div class="information-title-outer">
                <div class="information-title">
                  {{ selectedFieldName }}
                </div>
              </div>
              <div class="link-to-page-button-outer grow">
                <el-button @click="handleToMore" color="#1e3a8a" class="link-to-page-button">
                  {{ i18n.t('field.moreDetail') }}
                </el-button>
              </div>
            </div>
          </template>
          <template #default>
            <div class="simple-information-card-body">
              <div class="information-description">
                {{ selectedFieldDescription }}
              </div>
            </div>
          </template>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 300px;
  width: 600px;
  background-color: #f3efef
}
.popular-field-outer {
  width: 100vw;
  height: fit-content;
  position: absolute;
  left: 0;
  top: 40vh;
  display: flex;
  flex-wrap: nowrap;
  .big-field-outer {
    width: 20%;
    .big-field-menu {
      width: 100%;
      max-height: 60vh;
      overflow: auto;
      background-color: #062a66;
      .big-field-item {
        color: #ffffff;
        display: flex;
        flex-wrap: wrap;
        .big-field-item-text {
          width: 100%;
          text-align: left;
        }
      }
      :hover.big-field-item {
        color: #000000;
        background-color: #7996cb;
      }
    }
  }
  .simple-information-of-big-field-outer {
    width: 80%;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .treemap-of-big-field {
      width: 65%;
      height: 80%;
      padding-left: 20px;
    }
    .simple-information-card-outer {
      width: 35%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .simple-information-card {
        width: 85%;
        height: 80%;
        .simple-information-card-header {
          width: 100%;
          height: 100%;
          display: flex;
          flex-wrap: nowrap;
          .information-title-outer {
            width: fit-content;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .information-title {
              width: 100%;
              font-size: 135%;
              font-family: STFangsong,serif;
              text-align: left;
            }
          }
          .link-to-page-button-outer {
            height: 100%;
            display: flex;
            justify-content: right;
            align-items: center;
            .link-to-page-button {
              height: 50%;
              width: 60%;
            }
          }
        }
        .simple-information-card-body {
          height: fit-content;
          width: 100%;
          .information-description {
            text-align: start;
            font-family: "Fira Code Medium",serif;
            font-size: large;
          }
        }
      }
    }
  }
}

:deep(.el-card__header) {
  height: 20%;
  padding-top: 1%;
  padding-bottom: 1%;
}
</style>
