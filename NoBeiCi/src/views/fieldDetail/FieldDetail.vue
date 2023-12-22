<script setup>

import NavigateBar from "../../components/NavigateBar.vue";
import {useRoute} from "vue-router";
import {onMounted, ref, watch} from "vue";
import axios from "axios";
import {handleResponse} from "../../functions/handleResponse.js";
import i18n from "../../locales/index.js";
import {Star, StarFilled} from "@element-plus/icons-vue";
import {LineChartOutlined, ApartmentOutlined, FileTextOutlined, TeamOutlined} from "@ant-design/icons-vue";
import TrendTab from "./TrendTab.vue";
import RelationTab from "./RelationTab.vue";

const {params} = useRoute();
console.log(params)
const {fieldId} = params
const fFullId = 'https://openalex.org/' + fieldId
const showSummary = false
const showTwoYears = true

const fImageUrl = ref('https://upload.wikimedia.org/wikipedia/commons/c/cf/Philbar_3.png')
const fDescription = ref('study of the truths and principles of being, knowledge, or conduct')
const fName = ref('Philosophy')
const fCiteSum = ref(0)
const fCountsByYear = ref([])
const fLevel = ref(0)
const fRelatedFields = ref([])
const fSummaryStats = ref({})
const fWorksCount = ref(0)
const fAncestors = ref([])
const hasStared = ref(false)
const indexRange = ref(showSummary)
const showIndexes = ref([])
const activeTab = ref('trend')
const enName = ref('')
const cnName = ref('')

let enDescription = ''
let cnDescription = ''

onMounted(() => {
  axios.get('http://100.92.185.118:8000' + '/concept/get_concept_by_id/', {
    params: {
      id: fFullId
    }
  })
    .then((response) => {
      handleResponse((response), false, (data) => {
        const {
          cited_by_count,
          counts_by_year,
          level,
          image_url,
          description,
          display_name,
          chinese_description,
          related_concepts,
          summary_stats,
          chinese_display_name,
          works_count,
          ancestors
        } = data.at(0)

        fCiteSum.value = cited_by_count
        fCountsByYear.value = counts_by_year
        fLevel.value = level
        fImageUrl.value = image_url
        fRelatedFields.value = related_concepts
        fSummaryStats.value = summary_stats
        fWorksCount.value = works_count
        fAncestors.value = ancestors

        enName.value = display_name
        cnName.value = chinese_display_name
        enDescription = description
        cnDescription = chinese_description

        if (i18n.getLocale() === 'en') {
          fName.value = enName.value
          fDescription.value = enDescription
        }
        else {
          fName.value = cnName.value
          fDescription.value = cnDescription
        }

        showIndexes.value.push({
          labelRouter: 'citedByCount',
          value: fSummaryStats.value.cited_by_count
        })
        showIndexes.value.push({
          labelRouter: 'hIndex',
          value: fSummaryStats.value.h_index
        })
        showIndexes.value.push({
          labelRouter: 'i10Index',
          value: fSummaryStats.value.i10_index
        })
        showIndexes.value.push({
          labelRouter: 'oaPercent',
          value: fSummaryStats.value.oa_percent
        })
        showIndexes.value.push({
          labelRouter: 'worksCount',
          value: fSummaryStats.value.works_count
        })
      })
    })
})

watch(() => {
  return i18n.getLocale()
},
  (newValue) => {
  if (newValue === 'en') {
    fName.value = enName.value
    fDescription.value = enDescription
  }
  else {
    fName.value = cnName.value
    fDescription.value = cnDescription
  }

  setTimeout(() => {
    adjustFontSize()
  }, "100ms")
})

function adjustFontSize() {

  console.log("can u see me")

  const container = document.getElementById('field-title-outer')
  const text = document.getElementById('field-title')

  // 初始字号
  let fontSize = 16;
  text.style.fontSize = fontSize + 'px';

  // 不断尝试增大字号，直到文字超出容器范围
  while (
    text.getBoundingClientRect().width <= container.offsetWidth - 20 &&
    text.getBoundingClientRect().height <= container.offsetHeight
    ) {
    fontSize++;
    text.style.fontSize = fontSize + 'px';
  }

  // 超出范围时，减小字号
  fontSize--;
  text.style.fontSize = fontSize + 'px';
}

const handleStarField = () => {
  hasStared.value = true
}

const handleCancelStarField = () => {
  hasStared.value = false
}



console.log(showIndexes.value)

// onMounted(() => {
//
// })

onMounted(() => {
  adjustFontSize()
})

const handleSwitchIndexRange = (newShow) => {
  showIndexes.value.length = 0
  if (newShow === showSummary) {
    showIndexes.value.push({
      labelRouter: 'citedByCount',
      value: fSummaryStats.value.cited_by_count
    })
    showIndexes.value.push({
      labelRouter: 'hIndex',
      value: fSummaryStats.value.h_index
    })
    showIndexes.value.push({
      labelRouter: 'i10Index',
      value: fSummaryStats.value.i10_index
    })
    showIndexes.value.push({
      labelRouter: 'oaPercent',
      value: fSummaryStats.value.oa_percent
    })
    showIndexes.value.push({
      labelRouter: 'worksCount',
      value: fSummaryStats.value.works_count
    })
  }
  else {
    showIndexes.value.push({
      labelRouter: 'citedByCount',
      value: fSummaryStats.value['2yr_cited_by_count']
    })
    showIndexes.value.push({
      labelRouter: 'hIndex',
      value: fSummaryStats.value['2yr_h_index']
    })
    showIndexes.value.push({
      labelRouter: 'i10Index',
      value: fSummaryStats.value['2yr_i10_index']
    })
    showIndexes.value.push({
      labelRouter: 'impactFactor',
      value: fSummaryStats.value['2yr_mean_citedness']
    })
    showIndexes.value.push({
      labelRouter: 'worksCount',
      value: fSummaryStats.value['2yr_works_count']
    })
  }
}

</script>

<template>
  <NavigateBar />
  <div class="field-detail-outer">
    <div class="field-detail-header">
      <div class="field-picture-outer">
        <el-image class="field-picture" fit="contain" :src="fImageUrl" />
      </div>
      <div class="field-title-and-description-outer">
        <div class="field-title-and-star-outer">
          <div id="field-title-outer" class="field-title-outer">
            <p id="field-title" style="white-space: nowrap">
              {{ fName }}
            </p>
          </div>
          <div class="star-field">
            <el-button
              v-if="hasStared === false"
              type="primary"
              @click="handleStarField"
            >
              {{ i18n.t('fieldDetail.starField') }}
              <template #icon>
                <el-icon size="160%">
                  <StarFilled />
                </el-icon>
              </template>
            </el-button>
            <el-button v-else @click="handleCancelStarField">
              {{ i18n.t('fieldDetail.cancelStarField') }}
              <template #icon>
                <el-icon size="160%" color="#16a34a">
                  <StarFilled />
                </el-icon>
              </template>
            </el-button>
          </div>
        </div>
        <div class="field-description-outer">
          <div class="field-description">
            {{ fDescription }}
          </div>
        </div>
      </div>
      <div class="field-index-outer">
        <div class="field-index-switch-outer">
          <el-switch
            class="field-index-switch"
            v-model="indexRange"
            style="--el-switch-on-color: #68a128; --el-switch-off-color: #2f62d7"
            @change="(value) => handleSwitchIndexRange(value)"
            :inactive-text="i18n.t('fieldDetail.summaryIndex')"
            :active-text="i18n.t('fieldDetail.twoYearsIndex')"
          />
        </div>
        <div class="filed-indexes">
          <div class="field-single-index" v-for="index in showIndexes">
            <div class="field-index-label">
              {{ i18n.t('fieldDetail.' + index.labelRouter) }}
            </div>
            <div class="field-index-value">
              {{ index.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="field-detail-body">
      <el-tabs
        v-model="activeTab"
      >
        <el-tab-pane lazy="lazy" name="trend">
          <template #label>
            <div style="display: flex; flex-wrap: nowrap; width: fit-content; height: 100%">
              <div style="display: flex; justify-content: center; align-items: center">
                <line-chart-outlined style="font-size: 180%" />
              </div>
              <div style="display: flex; justify-content: center; align-items: center; margin-left: 6px">
                <div style="font-size: large">
                  {{ i18n.t('fieldDetail.trend') }}
                </div>
              </div>
            </div>
          </template>
          <template #default>
            <TrendTab :counts-by-year="fCountsByYear" />
          </template>
        </el-tab-pane>
        <el-tab-pane lazy="lazy" name="relation">
          <template #label>
            <div style="display: flex; flex-wrap: nowrap; width: fit-content; height: 100%">
              <div style="display: flex; justify-content: center; align-items: center">
                <apartment-outlined style="font-size: 180%" />
              </div>
              <div style="display: flex; justify-content: center; align-items: center; margin-left: 6px">
                <div style="font-size: large">
                  {{ i18n.t('fieldDetail.relation') }}
                </div>
              </div>
            </div>
          </template>
          <template #default>
            <RelationTab
              :ancestors="fAncestors"
              :related-fields="fRelatedFields"
              :current-field-id="fieldId"
              :current-field-cn-name="cnName"
              :current-field-en-name="enName"
            />
          </template>
        </el-tab-pane>
        <el-tab-pane lazy="lazy" name="paper">
          <template #label>
            <div style="display: flex; flex-wrap: nowrap; width: fit-content; height: 100%">
              <div style="display: flex; justify-content: center; align-items: center">
                <file-text-outlined style="font-size: 180%" />
              </div>
              <div style="display: flex; justify-content: center; align-items: center; margin-left: 6px">
                <div style="font-size: large">
                  {{ i18n.t('fieldDetail.paper') }}
                </div>
              </div>
            </div>
          </template>
        </el-tab-pane>
        <el-tab-pane lazy="lazy" name="scholar">
          <template #label>
            <div style="display: flex; flex-wrap: nowrap; width: fit-content; height: 100%">
              <div style="display: flex; justify-content: center; align-items: center">
                <team-outlined style="font-size: 180%" />
              </div>
              <div style="display: flex; justify-content: center; align-items: center; margin-left: 6px">
                <div style="font-size: large">
                  {{ i18n.t('fieldDetail.scholar') }}
                </div>
              </div>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped lang="scss">
.field-detail-outer {
  position: absolute;
  left: 0;
  top: 10vh;
  width: 100vw;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  .field-detail-header {
    width: 100%;
    height: 30vh;
    display: flex;
    flex-wrap: nowrap;
    z-index: 1000;
    .field-picture-outer {
      height: 100%;
      width: 23%;
      display: flex;
      justify-content: center;
      align-items: center;
      .field-picture {
        height: 85%;
        width: 80%;
      }
    }
    .field-title-and-description-outer {
      height: 100%;
      width: 40%;
      display: flex;
      flex-wrap: wrap;
      .field-title-and-star-outer {
        width: 100%;
        height: 60%;
        display: flex;
        justify-content: start;
        align-items: center;
        padding-left: 2%;
        padding-bottom: 1%;
        .field-title-outer {
          height: fit-content;
          font-family: 'Courier New', Courier, monospace, STFangsong;
          width: 70%;
          display: flex;
          text-align: start;
        }
        .star-field {
          width: 30%;
          height: 100%;
          display: flex;
          margin-left: 5%;
          align-items: end;
          justify-content: end;
          position: relative;
          bottom: 12%;
          right: 3%;
        }
      }
      .field-description-outer {
        width: 100%;
        height: 40%;
        display: flex;
        justify-content: start;
        align-items: start;
        padding-left: 2%;
        .field-description {
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace, STKaiti;
        }
      }
    }
    .field-index-outer {
      height: 100%;
      width: 37%;
      display: flex;
      flex-wrap: wrap;
      .field-index-switch-outer {
        width: 100%;
        height: 30%;
        display: flex;
        justify-content: center;
        align-items: end;
      }
      .filed-indexes {
        width: 100%;
        height: 70%;
        display: flex;
        flex-wrap: wrap;
        .field-single-index {
          width: 100%;
          height: 20%;
          display: flex;
          flex-wrap: nowrap;
          .field-index-label {
            width: 40%;
            height: 100%;
            display: flex;
            text-align: left;
          }
          .field-index-value {
            width: 60%;
            height: 100%;
            display: flex;
            text-align: left;
          }
        }
      }
    }
  }
  .field-detail-body {
    width: 100%;
    height: fit-content;
    padding-left: 3%;
    padding-right: 3%;
  }
}
</style>
