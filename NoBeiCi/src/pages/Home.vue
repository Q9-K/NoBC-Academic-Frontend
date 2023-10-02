<script setup>
import logoUrl from "../assets/logo/logo.png"
import NavigateBar from "../components/NavigateBar.vue";
import { Search } from '@element-plus/icons-vue'
import {onMounted, ref, watch} from "vue";
import { WordCloud } from "@antv/g2plot";
import journalProfileUrl from '../assets/other/MOTO.jpg'
import researchProfileUrl from '../assets/other/kawaiiFish.jpg'

const searchValue = ref("");
const isTopSearchInputVisible = ref(false)

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
  }, 1000)
})



onMounted(() => {
  const data = [{
    title: "人工智能",
    weight: 49,
  },{
    title: "软件工程",
    weight: 33,
  },{
    title: "NLP",
    weight: 23,
  },{
    title: "CV",
    weight: 33,
  },{
    title: "架构",
    weight: 37,
  },{
    title: "GPU",
    weight: 8,
  },{
    title: "傻逼",
    weight: 50,
  }];

  const wordCloud = new WordCloud(document.getElementById('hotspotWordCloud'), {
    data,
    wordStyle:{
      fontSize:[20,60]
    },
    wordField: 'title',
    weightField: 'weight',
    forceFits: true,
    limitInPlot: false
  });

  wordCloud.render();
})


</script>

<template>
  <NavigateBar :whether-search-input-visible="isTopSearchInputVisible" />
  <div class="home-page-outer">
    <div class="search-area-outer">
      <div class="search-area-logo-outer">
        <img class="search-area-logo" :src="logoUrl">
      </div>
      <div class="search-area-input-outer">
        <el-input
          v-model="searchValue"
          placeholder="搜索学者、论文、期刊"
          class="search-area-input"
        >
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
      </div>
      <div class="search-area-slogan-outer">
        <p class="search-area-slogan">
          使用NoBC，学术生涯再无背刺！
        </p>
      </div>
    </div>
    <div style="width: 100%; height: 10vh"></div>
    <div class="display-area-outer">
      <div class="display-card-outer" style="width: 40%">
        <el-card class="display-card">
          <div class="display-card-title">
            研究热点
          </div>
          <div class="display-card-body">
            <div id="hotspotWordCloud" style="width: 100%; height: 100%"></div>
          </div>
        </el-card>
      </div>
      <div class="display-card-outer" style="width: 60%">
        <el-card class="display-card">
          <div class="display-card-title">
            期刊会议
          </div>
          <div class="display-card-body">
            <el-carousel :autoplay="false" type="card" height="35vh">
              <el-carousel-item v-for="item in 10" :key="item">
                <div class="journal-outer">
                  <div class="journal-profile-outer">
                    <img class="journal-profile" :src="journalProfileUrl" />
                  </div>
                  <div class="journal-title-outer">
                    <p class="journal-title">
                      自动化学报
                    </p>
                  </div>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-card>
      </div>
      <div class="display-card-outer" style="width: 60%; height: fit-content">
        <el-card class="display-card" style="height: fit-content">
          <div class="display-card-title">
            热门文章
          </div>
          <div class="display-card-body">
            <div style="width: 100%; height: 2vh"></div>
            <el-collapse>
              <el-collapse-item title="基于水电工程的北航收费饮水机破解方法研究">
                <div>
                  破解收费饮水机
                </div>
              </el-collapse-item>
              <el-collapse-item title="再议北航收费饮水机——是道德的沦丧还是人性的扭曲">
                <div>
                  可恶的收费饮水机
                </div>
              </el-collapse-item>
              <el-collapse-item title="大运村视角下的北航收费饮水机">
                <div>
                  有水喝你就偷着乐吧
                </div>
              </el-collapse-item>
              <el-collapse-item title="大运村的前途和未来：“村独”运动研究">
                <div>
                  自由大运村
                </div>
              </el-collapse-item>
              <el-collapse-item title="大运村——北航关系研究：特殊的村与校关系">
                <div>
                  大运村本就独立的
                </div>
              </el-collapse-item>
              <el-collapse-item title="大运城是奥地利、五号楼是维也纳——德语区与北航对比研究">
                <div>
                  德语区可以分为东德西德奥地利、北航也可以分为东航西航大运村。
                  五号楼就是大运村的维也纳
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-card>
      </div>
      <div class="display-card-outer" style="width: 40%; height: fit-content">
        <el-card class="display-card" style="height: fit-content;">
          <div class="display-card-title">
            权威学者
          </div>
          <div class="display-card-body" style="height: fit-content">
            <div class="researcher-list">
              <div class="researcher-outer">
                <div class="researcher-profile-outer">
                  <img class="researcher-profile" :src="researchProfileUrl">
                </div>
                <div class="researcher-name-outer">
                  <p class="researcher-name">
                    大运村第一村民
                  </p>
                </div>
              </div>
              <div class="researcher-outer">
                <div class="researcher-profile-outer">
                  <img class="researcher-profile" :src="researchProfileUrl">
                </div>
                <div class="researcher-name-outer">
                  <p class="researcher-name">
                    大运村村士
                  </p>
                </div>
              </div>
              <div class="researcher-outer">
                <div class="researcher-profile-outer">
                  <img class="researcher-profile" :src="researchProfileUrl">
                </div>
                <div class="researcher-name-outer">
                  <p class="researcher-name">
                    大运村村士
                  </p>
                </div>
              </div>
              <div class="researcher-outer">
                <div class="researcher-profile-outer">
                  <img class="researcher-profile" :src="researchProfileUrl">
                </div>
                <div class="researcher-name-outer">
                  <p class="researcher-name">
                    大运村村士
                  </p>
                </div>
              </div>
              <div class="researcher-outer">
                <div class="researcher-profile-outer">
                  <img class="researcher-profile" :src="researchProfileUrl">
                </div>
                <div class="researcher-name-outer">
                  <p class="researcher-name">
                    大运村村士
                  </p>
                </div>
              </div>
              <div class="researcher-outer">
                <div class="researcher-profile-outer">
                  <img class="researcher-profile" :src="researchProfileUrl">
                </div>
                <div class="researcher-name-outer">
                  <p class="researcher-name">
                    大运村村士
                  </p>
                </div>
              </div>
              <div class="researcher-outer">
                <div class="researcher-profile-outer">
                  <img class="researcher-profile" :src="researchProfileUrl">
                </div>
                <div class="researcher-name-outer">
                  <p class="researcher-name">
                    大运村村士
                  </p>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
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
      .display-card {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        .display-card-title {
          width: 100%;
          height: 10%;
          display: flex;
          justify-content: center;
          align-items: center;
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
