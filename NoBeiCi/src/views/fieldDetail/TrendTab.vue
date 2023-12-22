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

/*
const {citedData, workData} = transformIntoLineData([
  {
    "cited_by_count": 8354992,
    "year": 2023,
    "works_count": 825805,
    "oa_works_count": 206918
  },
  {
    "cited_by_count": 9851612,
    "year": 2022,
    "works_count": 1101221,
    "oa_works_count": 579258
  },
  {
    "cited_by_count": 10464057,
    "year": 2021,
    "works_count": 1303308,
    "oa_works_count": 581135
  },
  {
    "cited_by_count": 9785540,
    "year": 2020,
    "works_count": 1420238,
    "oa_works_count": 517151
  },
  {
    "cited_by_count": 8847329,
    "year": 2019,
    "works_count": 1389747,
    "oa_works_count": 438003
  },
  {
    "cited_by_count": 7543223,
    "year": 2018,
    "works_count": 1384851,
    "oa_works_count": 388123
  },
  {
    "cited_by_count": 6697419,
    "year": 2017,
    "works_count": 1366649,
    "oa_works_count": 318477
  },
  {
    "cited_by_count": 6748966,
    "year": 2016,
    "works_count": 1337690,
    "oa_works_count": 270863
  },
  {
    "cited_by_count": 6918788,
    "year": 2015,
    "works_count": 1292333,
    "oa_works_count": 244716
  },
  {
    "cited_by_count": 6880280,
    "year": 2014,
    "works_count": 1244630,
    "oa_works_count": 199848
  },
  {
    "cited_by_count": 6401534,
    "year": 2013,
    "works_count": 1208562,
    "oa_works_count": 173847
  },
  {
    "cited_by_count": 5796843,
    "year": 2012,
    "works_count": 1135584,
    "oa_works_count": 151102
  }
])

 */
/*
onMounted(() => {

  const {citedData, workData} = transformIntoLineData(countsByYear.value)

  console.log("----------------")
  console.log(countsByYear.value)
  console.log("----------------")

  const workTrendLine = new Line(document.getElementById('container-of-work-trend-line'), {
    title: {
      visible: true,
      text: i18n.t('trendTab.titleOfTrendLine')
    },
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
      visible: false,
    },
    label: {
      visible: true,
      type: 'line',
    },
    animation: {
      appear: {
        animation: 'clipingWithData',
      },
    },
    smooth: true,
  })
  workTrendLine.render()

  const citedTrendLine = new Line(document.getElementById('container-of-cited-trend-line'), {
    title: {
      visible: true,
      text: i18n.t('trendTab.titleOfTrendLine')
    },
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
      visible: false,
    },
    label: {
      visible: true,
      type: 'line',
    },
    animation: {
      appear: {
        animation: 'clipingWithData',
      },
    },
    smooth: true,
  })
  citedTrendLine.render()
})

 */

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
