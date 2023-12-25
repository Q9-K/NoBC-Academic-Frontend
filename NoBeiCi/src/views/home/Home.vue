<script setup>
/*
2023-10-02 主页静态页面完成 tl
 */
import logoUrl from "../../assets/logo/logo.png"
import NavigateBar from "../../components/NavigateBar.vue";
import { Search } from '@element-plus/icons-vue'
import {onMounted, ref, watch} from "vue";
import { WordCloud } from "@antv/g2plot";
import researchProfileUrl from '../../assets/other/kawaiiFish.jpg'
import i18n from "../../locales/index.js";
import {debounce} from "vue-debounce";
import pinyin from "pinyin";
import PreDialog from "./PriorDialog.vue";
import get from '../../functions/Get.js'
import {ElMessage} from "element-plus";
import ThesisDisplay from "../../components/ThesisDisplay.vue";
import ArticleDisplay from "../../components/search/ArticleDisplay.vue";
import {useStateOfPriorDialog} from "../../stores/stateOfPriorDialog.js";
import ScholarDisplay from "../../components/ScholarDisplay.vue";
import { ReloadOutlined } from "@ant-design/icons-vue";
import {useSearchContentStore} from "../../stores/searchContent.js";
import router from "../../routes/index.js";

const journalProfileUrl = 'https://onlinelibrary.wiley.com/cms/asset/e1c09603-8433-4440-86aa-f87e82e9a12b/aehe.2017.43.issue-6.cover.gif'

const searchValue = ref("");
const isTopSearchInputVisible = ref(false)
const recommendPaper = ref([])
const recommendScholar = ref([])

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
    const isSearchInputVisible = isInViewPort(document.querySelector(".search-area-input"))
    isTopSearchInputVisible.value = !isSearchInputVisible;
  }, 500)
})

const refreshRecommendWork = () => {
  const fetchRecommendWork = async () => {
    try {
      const apiUrl = 'http://100.92.185.118:8000' + '/concept/get_works_by_focused_concept/'

      const response = await get({
        url: apiUrl,
        showLoading: true,
        addToken: true
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
    try {
      const apiUrl = 'http://100.103.70.173:8000' + '/author/get_recommend_author'

      const response = await get({
        url: apiUrl,
        showLoading: true,
        addToken: true,
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

const handleRefreshWork = () => {
  refreshRecommendWork()
}

const handleRefreshScholar = () => {
  refreshRecommendScholar()
}

</script>

<template>
  <PreDialog />
  <NavigateBar :whether-search-input-visible="isTopSearchInputVisible" />
  <div class="home-page-outer">
    <div class="search-area-outer">
      <div class="search-area-logo-outer">
        <img class="search-area-logo" :src="logoUrl">
      </div>
      <div class="search-area-input-outer">
        <el-input
          v-model="searchValue"
          :placeholder="i18n.t('homePage.search')"
          class="search-area-input"
          maxlength="100"
          show-word-limit
        >
          <template #append>
            <el-button :icon="Search" @click="handleSearchButtonClick" />
          </template>
        </el-input>
      </div>
      <div class="search-area-slogan-outer">
        <p class="search-area-slogan">
          {{ i18n.t('homePage.slogan') }}
        </p>
      </div>
    </div>
    <div style="width: 100%; height: 5vh"></div>
    <div class="display-area-outer">
      <el-tabs
        type="border-card"
        style="width: 100%"
      >
        <el-tab-pane lazy :label="i18n.t('homePage.popularPaper')">
          <div class="tab-pane">
            <div class="refresh-outer">
              <el-icon @click="refreshRecommendWork"><Refresh /></el-icon>
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
              <el-icon @click="refreshRecommendScholar"><Refresh /></el-icon>
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
  <div style="width: 100%; height: 20vh" ></div>
</template>

<style scoped lang="scss">
.home-page-outer {
  width: 100vw;
  min-height: 90vh;
  position: absolute;
  left: 0;
  top: 10vh;
  overflow-y: auto;
  .search-area-outer {
    width: 100%;
    height: 60vh;
    display: flex;
    flex-wrap: wrap;
    .search-area-logo-outer {
      width: 100%;
      height: 55%;
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
      height: 35%;
      display: flex;
      justify-content: center;
      align-items: center;
      .search-area-input {
        width: 55%;
        height: 35%;
      }
    }
    .search-area-slogan-outer {
      width: 100%;
      height: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      .search-area-slogan {
        color: #b2aeae;
        font-family: KaiTi,serif;
        font-size: large;
      }
    }
  }
  .display-area-outer {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
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
                  font-family: STFangsong,serif;
                }
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
</style>
