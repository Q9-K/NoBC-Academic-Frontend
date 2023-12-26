<script setup>
/*
2023-10-02 主页静态页面完成 tl
 */
import logoUrl from "../../assets/logo/logo.png"
import NavigateBar from "../../components/NavigateBar.vue";
import {Search} from '@element-plus/icons-vue'
import {onMounted, ref, watch} from "vue";
import i18n from "../../locales/index.js";
import {debounce} from "vue-debounce";
import PreDialog from "./PriorDialog.vue";
import get from '../../functions/Get.js'
import {ElMessage} from "element-plus";
import ArticleDisplay from "../../components/search/ArticleDisplay.vue";
import { useStateOfPriorDialog } from "../../stores/stateOfPriorDialog.js";
import ScholarDisplay from "../../components/ScholarDisplay.vue";
import {useSearchContentStore} from "../../stores/searchContent.js";
import router from "../../routes/index.js";
import TagCloud from "TagCloud";
import './test.less'
import {
  FileSearchOutlined,
  DeploymentUnitOutlined,
  IdcardOutlined,
  HomeOutlined,
  ReadOutlined
} from "@ant-design/icons-vue";
const isTopSearchInputVisible = ref(false)
const recommendPaper = ref([])
const recommendScholar = ref([])
const searchValue = ref('')

const isInViewPort = (element) => {
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  const {
    top,
    right,
    bottom,
    left,
  } = element.getBoundingClientRect();

  return (
    top >= 0 &&
    left >= 0 &&
    right <= viewWidth &&
    bottom <= viewHeight
  );
}

onMounted(() => {
  setInterval(() => {
    const element = document.querySelector(".search-area-input")
    if (element) {
      const isSearchInputVisible = isInViewPort(element)
      isTopSearchInputVisible.value = !isSearchInputVisible;
    }
  }, 500)
})

const refreshRecommendWork = () => {
  const fetchRecommendWork = async () => {
    try {

      console.log(JSON.parse(localStorage.getItem('userInformation')))

      const apiUrl = '/concept/get_works_by_focused_concept/'

      const response = await get({
        url: apiUrl,
        showLoading: true,
        addToken: true,
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

  fetchRecommendWork()
    .then((response) => {
      console.log(response)
      if (response.code !== 200) {
        ElMessage({
          type: "error",
          message: "Oh No!"
        })
      }
      else {
        recommendPaper.value = response.data
        console.log(response.data)
      }
    })
}

const refreshRecommendScholar = () => {
  const fetchRecommendScholar = async () => {

    console.log(JSON.parse(localStorage.getItem('userInformation')))

    try {
      const apiUrl = '/author/get_recommend_author'

      const response = await get({
        url: apiUrl,
        showLoading: true,
        addToken: true,
        useTestEnv: false,
        // testEnv: 'http://100.103.70.173:8000'
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

  fetchRecommendScholar()
    .then((response) => {
      if (response.code !== 200) {
        ElMessage({
          type: "error",
          message: "Oh No!"
        })
      }
      else {
        recommendScholar.value = response.data
      }
    })
}

watch(
  () => {
    const stateOfPriorDialog = useStateOfPriorDialog()
    if (stateOfPriorDialog.getVisible === false) {
      return true
    }
  },
  (newValue) => {
    if (newValue) {
      refreshRecommendWork()
      refreshRecommendScholar()
    }
  }
)

const handleSearchButtonClick = debounce(() => {
  const searchContent = useSearchContentStore()
  searchContent.setContent(searchValue.value)
  router.push('/search')
}, "300ms")

onMounted(() => {

  // const TagCloud = require('TagCloud');

  const container = '.threeD-tagcloud';
  const texts = [
    '学术成果', 'work', 'institution', 'fields', 'concept', 'Technological Frontier',
    '前沿科技', 'Research Forum', 'Austronesian languages', 'Machine Learning',
    'international', '国际化', 'AI辅助', 'Research with ChatGPT', '和AI一起搞学术',
    '研究领域', '领域趋势', '期刊总览', '机构大观', 'AI解读论文', '领域成网', '学者关系，一网打尽', '一流大学找北航',
    'Journal', 'Work Cited', '一键引用论文', '萨卡班甲鱼全宇宙最可爱！', 'サカサカバンバンバスピスピス'
  ];
  const options = {
    radius: 200
  };

  TagCloud(container, texts, options);
})

</script>

<template>
  <PreDialog />
  <NavigateBar :whether-search-input-visible="isTopSearchInputVisible" />
  <div id="home-page-outer" class="home-page-outer">
    <div class="search-area-outer">
      <div class="search-area-left-outer">
        <div id="container-of-3D-tagcloud" class="threeD-tagcloud"></div>
      </div>
      <div class="search-area-right-outer">
        <div class="search-area-right">
          <div class="search-area-logo-outer">
            <img class="search-area-logo" :src="logoUrl">
          </div>
          <div class="search-area-input-outer">
            <el-input v-model="searchValue" :placeholder="i18n.t('homePage.search')" class="search-area-input"
              maxlength="100" show-word-limit>
              <template #append>
                <el-button :icon="Search" @click="handleSearchButtonClick" />
              </template>
            </el-input>
          </div>
<!--          <div class="search-area-slogan-outer">-->
<!--            <p class="search-area-slogan">-->
<!--              {{ i18n.t('homePage.slogan') }}-->
<!--            </p>-->
<!--          </div>-->
          <div class="statistic-card-outer">
            <el-statistic :value="89520174" class="statistic-card">
              <template #title>
                {{ i18n.t('homePage.scholarCount') }}
              </template>
              <template #suffix>
                <div style="display: flex; height: 25.5px; justify-content: center; align-items: center">
                  <idcard-outlined class="statistic-card-icon" />
                </div>
              </template>
            </el-statistic>
            <el-statistic :value="107246" class="statistic-card">
              <template #title>
                {{ i18n.t('homePage.institutionCount') }}
              </template>
              <template #suffix>
                <div style="display: flex; height: 25.5px; justify-content: center; align-items: center">
                  <home-outlined class="statistic-card-icon" />
                </div>
              </template>
            </el-statistic>
            <el-statistic :value="248643" class="statistic-card">
              <template #title>
                {{ i18n.t('homePage.journalCount') }}
              </template>
              <template #suffix>
                <div style="display: flex; height: 25.5px; justify-content: center; align-items: center">
                  <read-outlined class="statistic-card-icon" />
                </div>
              </template>
            </el-statistic>
            <el-statistic :value="65073" class="statistic-card">
              <template #title>
                {{ i18n.t('homePage.fieldCount') }}
              </template>
              <template #suffix>
                <div style="display: flex; height: 25.5px; justify-content: center; align-items: center">
                  <deployment-unit-outlined class="statistic-card-icon" />
                </div>
              </template>
            </el-statistic>
            <el-statistic :value="240000000" class="statistic-card">
              <template #title>
                {{ i18n.t('homePage.workCount') }}
              </template>
              <template #suffix>
                <div style="display: flex; height: 25.5px; justify-content: center; align-items: center">
                  <file-search-outlined class="statistic-card-icon" />
                </div>
              </template>
            </el-statistic>
          </div>
        </div>
      </div>
    </div>
    <div class="display-area-outer">
      <el-tabs type="border-card" style="width: 100%">
        <el-tab-pane lazy :label="i18n.t('homePage.popularPaper')">
          <div class="tab-pane">
            <div class="refresh-outer">
              <el-icon @click="refreshRecommendWork">
                <Refresh />
              </el-icon>
            </div>
            <div class="display-card-body">
              <el-empty v-if="recommendPaper.length === 0"></el-empty>
              <el-row v-if="recommendPaper.length !== 0" v-for="single in recommendPaper">
                <ArticleDisplay style="width: 100%" :data="single" type="" />
              </el-row>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane lazy :label="i18n.t('homePage.scholar')">
          <div class="tab-pane">
            <div class="refresh-outer">
              <el-icon @click="refreshRecommendScholar">
                <Refresh />
              </el-icon>
            </div>
            <div class="display-card-body">
              <el-empty v-if="recommendScholar.length === 0"></el-empty>
              <ScholarDisplay :scholars="recommendScholar" />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-page-outer {
  width: 100vw;
  min-height: 90vh;
  position: absolute;
  left: 0;
  top: 10vh;
  overflow-y: scroll;

  .search-area-outer {
    width: 100%;
    height: calc(90vh - 39px);
    display: flex;
    flex-wrap: nowrap;

    .search-area-left-outer {
      height: 100%;
      width: 40%;
      display: flex;
      justify-content: center;
      align-items: center;

      .threeD-tagcloud {
        width: fit-content;
        height: fit-content;
      }
    }

    .search-area-right-outer {
      height: 100%;
      width: 60%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;

      .search-area-right {
        height: fit-content;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        position: relative;
        bottom: 9%;

        .search-area-logo-outer {
          width: 100%;
          height: 31.5vh;
          display: flex;
          justify-content: center;
          align-items: center;

          .search-area-logo {
            height: 50%;
            position: relative;
            top: 20%;
          }
        }

        .search-area-input-outer {
          width: 100%;
          height: 22.5vh;
          display: flex;
          justify-content: center;
          align-items: center;

          .search-area-input {
            width: 90%;
            height: 35%;
          }
        }

        .search-area-slogan-outer {
          width: 100%;
          height: 5vh;
          display: flex;
          justify-content: center;
          align-items: center;

          .search-area-slogan {
            color: #b2aeae;
            width: fit-content;
            height: 100%;
            position: relative;
            bottom: 3.5vh;
            font-family: KaiTi, serif;
            font-size: large;
          }
        }

        .statistic-card-outer {
          width: 100%;
          height: 5vh;
          display: flex;
          flex-wrap: nowrap;

          .statistic-card {
            height: 100%;
            width: 20%;

            .statistic-card-icon {
              font-size: 110%;
            }
          }
        }
      }
    }

  }
}

.display-area-outer {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  position: relative;

  .display-card-outer {
    padding-left: 1.5vw;
    padding-right: 1.5vw;
    padding-bottom: 5vh;
    height: 50vh;

    .tab-pane {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;

      .refresh-outer {
        width: 100%;
        height: 10%;
      }

      .display-card-body {
        width: 100%;
        height: 90%;

        .journal-outer {
          width: 30vw;
          height: 100%;
          padding-left: 1%;
          padding-right: 1%;
          display: flex;
          flex-wrap: wrap;

          .journal-profile-outer {
            width: 100%;
            height: 80%;
            display: flex;
            justify-content: center;
            align-items: center;

            .journal-profile {
              height: 90%;
            }
          }

          .journal-title-outer {
            width: 100%;
            height: 20%;
            display: flex;
            justify-content: center;
            align-items: center;

            .journal-title {
              height: 60%;
            }
          }
        }

        .researcher-list {
          width: 100%;
          height: fit-content;
          display: flex;
          flex-wrap: wrap;
          padding-bottom: 2vh;

          .researcher-outer {
            width: 100%;
            height: 10vh;
            display: flex;
            flex-wrap: nowrap;
            margin-top: 1vh;
            margin-bottom: 1vh;

            .researcher-profile-outer {
              height: 100%;
              width: 30%;
              display: flex;
              justify-content: center;
              align-items: center;

              .researcher-profile {
                height: 80%;
                border-radius: 50%;
              }
            }

            .researcher-name-outer {
              height: 100%;
              width: 70%;
              display: flex;
              justify-content: flex-start;
              align-items: center;

              .researcher-name {
                font-family: STFangsong, serif;
              }
            }
          }
        }
      }
    }
  }
}
:deep(.el-card__body) {
  width: 100%;
}

:deep(.tagcloud) {
  width: 100%;
  height: 100%;
}</style>
