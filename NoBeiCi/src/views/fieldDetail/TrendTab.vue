<script setup>
import {onMounted, ref, toRefs, watch} from "vue";
import {Line} from "@antv/g2plot";
import i18n from "../../locales/index.js";

const props = defineProps([
  'countsByYear'
])

let workTrendLine = null
let citedTrendLine = null

// TODO 这里有一个bug Uncaught (in promise) TypeError: GeometryLabelsCtor is not a constructor  但是它能跑
watch(() => {
  return props.countsByYear
},
  (newValue) => {
  const {citedData, workData} = transformIntoLineData(props.countsByYear)

  if (workTrendLine !== null) {
    workTrendLine.destory()
    workTrendLine = null
  }
  if (citedTrendLine !== null) {
    citedTrendLine.destory()
    citedTrendLine = null
  }

  workTrendLine = new Line(document.getElementById('container-of-work-trend-line'), {
    data: workData,
    padding: [20, 100, 30, 80],
    forceFit: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'name',
    xAxis: {
      type: 'linear',
      tickInterval: 1,
      label: {
        visible: true,
        autoHide: true,
      },
    },
    yAxis: {
      formatter: (v) => `${v.toFixed(4)}`,
    },
    legend: {
      visible: true,
    },
    label: {
      visible: true,
      type: 'line',
    },
    smooth: true,
  })
  workTrendLine.render()

  citedTrendLine = new Line(document.getElementById('container-of-cited-trend-line'), {
    data: citedData,
    padding: [20, 100, 30, 80],
    forceFit: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'name',
    xAxis: {
      type: 'linear',
      tickInterval: 1,
      label: {
        visible: true,
        autoHide: true,
      },
    },
    yAxis: {
      formatter: (v) => `${v.toFixed(4)}`,
    },
    legend: {
      visible: true,
    },
    label: {
      visible: true,
      type: 'line',
    },
    smooth: true,
  })
  citedTrendLine.render()
})

const transformIntoLineData = (countsByYear) => {

  const citedData = []
  const workData = []

  for (let {cited_by_count, year, works_count, oa_works_count} of countsByYear) {
    citedData.push({
      name: 'cited_by_count',
      value: cited_by_count,
      year: year
    })
    workData.push({
      name: 'works_count',
      value: works_count,
      year: year
    })
    workData.push({
      name: 'oa_works_count',
      value: oa_works_count,
      year: year
    })
  }

  return {citedData, workData}
}

</script>

<template>
  <div class="trend-outer">
    <div class="line-of-counts-outer">
      <div class="line-and-title-outer">
        <div class="title-of-trend">
          {{ i18n.t('fieldDetail.trendTab.titleOfWorkLine') }}
        </div>
        <div id="container-of-work-trend-line" class="line-of-counts"></div>
      </div>
      <div class="line-and-title-outer">
        <div class="title-of-trend">
          {{ i18n.t('fieldDetail.trendTab.titleOfCitedLine') }}
        </div>
        <div id="container-of-cited-trend-line" class="line-of-counts"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.trend-outer {
  width: 100%;
  height: fit-content;
  .line-of-counts-outer {
    width: 100%;
    height: 50vh;
    background-color: white;
    border-radius: 25px;
    padding: 3% 5%;
    display: flex;
    flex-wrap: nowrap;
    .line-and-title-outer {
      width: 50%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      .title-of-trend {
        width: 100%;
        height: 10%;
      }
      .line-of-counts {
        width: 100%;
        height: 90%;
      }
    }
  }
}
</style>
