<script setup>

import * as echarts from 'echarts'
import NavigateBar from "../../components/NavigateBar.vue";
import DividerLine from "../../components/DividerLine.vue";
import {onMounted} from "vue";

onMounted(() => {
  const treemapOfBigField = echarts.init(document.getElementById('containerOfTreemap'))
  const data = {
    name: "计算机科学",
    children: [
      {
        name: "人工智能",
        children: [
          {
            name: "计算机视觉",
          },{
            name: "自然语言处理"
          }
        ]
      },{
        name: "软件工程",
        children: [
          {
            name: "面向对象软件工程",
          },{
            name: "智能化软件工程"
          }
        ]
      }
    ]
  }
  const options = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [
      {
        type: 'tree',
        data: [data],
        top: '18%',
        bottom: '14%',
        layout: 'radial',
        symbol: 'emptyCircle',
        symbolSize: 7,
        initialTreeDepth: 1,
        animationDurationUpdate: 750,
        emphasis: {
          focus: 'descendant'
        }
      }
    ]
  }

  treemapOfBigField.hideLoading();
  treemapOfBigField.setOption(options)
})
</script>

<template>
  <NavigateBar ></NavigateBar>>
  <div style="height: 20vh; width: 100vw; background-color: #8d3a3a; position: absolute; left: 0; top: 10vh"></div>
  <div id="popularFieldOuter" class="popular-field-outer">
    <div class="big-field-outer">
      <el-menu
        id="bigFieldMenu"
        default-active="1"
        class="big-field-menu"
      >
        <el-menu-item class="big-field-item">
          <div class="big-field-item-text">
            数学
          </div>
          <DividerLine width="100%" />
        </el-menu-item>
        <el-menu-item class="big-field-item">
          <div class="big-field-item-text">
            医学
          </div>
          <DividerLine width="100%" />
        </el-menu-item>
        <el-menu-item class="big-field-item">
          <div class="big-field-item-text">
            计算机科学
          </div>
          <DividerLine width="100%" />
        </el-menu-item>
        <el-menu-item class="big-field-item">
          <div class="big-field-item-text">
            计算机科学
          </div>
          <DividerLine width="100%" />
        </el-menu-item>
        <el-menu-item class="big-field-item">
          <div class="big-field-item-text">
            计算机科学
          </div>
          <DividerLine width="100%" />
        </el-menu-item>
        <el-menu-item class="big-field-item">
          <div class="big-field-item-text">
            计算机科学
          </div>
          <DividerLine width="100%" />
        </el-menu-item>
        <el-menu-item class="big-field-item">
          <div class="big-field-item-text">
            计算机科学
          </div>
          <DividerLine width="100%" />
        </el-menu-item>
        <el-menu-item class="big-field-item">
          <div class="big-field-item-text">
            计算机科学
          </div>
          <DividerLine width="100%" />
        </el-menu-item>
        <el-menu-item class="big-field-item">
          <div class="big-field-item-text">
            计算机科学
          </div>
          <DividerLine width="100%" />
        </el-menu-item>
        <el-menu-item class="big-field-item">
          <div class="big-field-item-text">
            计算机科学
          </div>
          <DividerLine width="100%" />
        </el-menu-item>
        <el-menu-item class="big-field-item">
          <div class="big-field-item-text">
            计算机科学
          </div>
          <DividerLine width="100%" />
        </el-menu-item>
        <el-menu-item class="big-field-item">
          <div class="big-field-item-text">
            计算机科学
          </div>
          <DividerLine width="100%" />
        </el-menu-item>
        <el-menu-item class="big-field-item">
          <div class="big-field-item-text">
            计算机科学
          </div>
          <DividerLine width="100%" />
        </el-menu-item>
        <el-menu-item class="big-field-item">
          <div class="big-field-item-text">
            计算机科学
          </div>
          <DividerLine width="100%" />
        </el-menu-item>
        <el-menu-item class="big-field-item">
          <div class="big-field-item-text">
            计算机科学
          </div>
          <DividerLine width="100%" />
        </el-menu-item>
        <el-menu-item class="big-field-item">
          <div class="big-field-item-text">
            计算机科学
          </div>
          <DividerLine width="100%" />
        </el-menu-item>
        <el-menu-item class="big-field-item">
          <div class="big-field-item-text">
            计算机科学
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
                  计算机科学
                </div>
              </div>
              <div class="link-to-page-button-outer grow">
                <el-button color="#1e3a8a" class="link-to-page-button">
                  更多
                </el-button>
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
  top: 30vh;
  display: flex;
  flex-wrap: nowrap;
  .big-field-outer {
    width: 20%;
    .big-field-menu {
      width: 100%;
      max-height: 70vh;
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
    height: 70vh;
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
