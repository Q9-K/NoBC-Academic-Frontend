<script setup>
import i18n from "../../locales/index.js";
import {onMounted, onUnmounted, ref, watch} from "vue";
import * as echarts from 'echarts'
import get from '../../functions/Get.js'
import {ElMessage} from "element-plus";

const props = defineProps([
  'relatedFields',
  'ancestors',
  'currentFieldId',
  'currentFieldCnName',
  'currentFieldEnName'
])

onMounted(() => {
  const ancestorsTree = echarts.init(document.getElementById('container-of-ancestor-tree'))
})

let childrenTree
let childrenTreeCnData
let childrenTreeEnData
const childrenIdNodeMap = new Map()
onMounted(() => {

  childrenTreeCnData = [{
    name: props.currentFieldCnName,
    id: props.currentFieldId,
    children: []
  }]

  childrenTreeEnData = [{
    name: props.currentFieldEnName,
    id: props.currentFieldId,
    children: []
  }]

  childrenIdNodeMap.set(props.currentFieldId, {
    cnNode: childrenTreeCnData[0],
    enNode: childrenTreeEnData[0]
  })

  const fetchChildrenTree = async (fieldId) => {
    try {
      const apiUrl = 'http://100.92.185.118:8000' + '/concept/get_subdomains/'; // 用实际的 API URL 替换这里
      const params = {
        id: fieldId
        // id: 'https://openalex.org/' + 'C2779065236'
      };

      const response = await get({
        url: apiUrl,
        params: params,
        showLoading: true, // 如果要显示加载指示器，请设置为 true
        errorCallback: (errorData) => {
          // 如果需要，请处理错误回调
          console.error('发生错误：', errorData);
        },
        showError: true // 设置为 true 以显示错误消息
      });

      console.log(response)

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

  fetchChildrenTree('https://openalex.org/' + props.currentFieldId)
    .then((response) => {
      if (response.code !== 200) {
        ElMessage({
          type: "error",
          message: "Oh No!"
        })
      }
      else {
        for (let {display_name, chinese_display_name, id} of response.data) {

          const cnNode = {
            name: chinese_display_name,
            id: id,
            children: []
          }
          childrenTreeCnData[0].children.push(cnNode)

          const enNode = {
            name: display_name,
            id: id,
            children: []
          }
          childrenTreeEnData[0].children.push(enNode)

          childrenIdNodeMap.set(id, {
            cnNode: cnNode,
            enNode: enNode
          })
        }
      }
    })
    .then(() => {

      let childrenTreeData
      if (i18n.getLocale() === 'en') {
        childrenTreeData = childrenTreeEnData
      }
      else {
        childrenTreeData = childrenTreeCnData
      }

      childrenTree = echarts.init(document.getElementById('container-of-children-tree'))
      childrenTree.setOption({
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: [
          {
            type: 'tree',
            data: childrenTreeData,
            top: '1%',
            left: '7%',
            bottom: '1%',
            right: '20%',
            symbolSize: 7,
            label: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 9
            },
            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },
            emphasis: {
              focus: 'descendant'
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750,
            initialTreeDepth: 100
          }
        ]
      })

      console.log(childrenTreeData)
    })
    .then(() => {
      childrenTree.on('click', (value) => {
        const clickedFieldId = value.data.id

        if (value.data.children.length === 0) {
          fetchChildrenTree(clickedFieldId)
            .then((response) => {
              if (response.code !== 200) {
                ElMessage({
                  type: "error",
                  message: "Oh No!"
                })
              }
              else {
                const parent = childrenIdNodeMap.get(clickedFieldId)
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

                  childrenIdNodeMap.set(id, {
                    cnNode: cnNode,
                    enNode: enNode
                  })
                }
              }
            })
            .then(() => {

              console.log(childrenTreeCnData)

              if (i18n.getLocale() === 'en') {
                childrenTree.setOption({
                  series: {
                    data: childrenTreeEnData
                  }
                })
              }
              else {
                childrenTree.setOption({
                  series: {
                    data: childrenTreeCnData
                  }
                })
              }
            })
        }
        else {
          const parent = childrenIdNodeMap.get(clickedFieldId)
          parent.cnNode.children.length = 0
          parent.enNode.children.length = 0
        }
      })


    })
})

let ancestorsTree
let ancestorsTreeCnData
let ancestorsTreeEnData
onMounted(() => {

  ancestorsTreeCnData = [{
    name: props.currentFieldCnName,
    id: "https://openalex.org/" + props.currentFieldId,
    children: []
  }]

  ancestorsTreeEnData = [{
    name: props.currentFieldEnName,
    id: "https://openalex.org/" + props.currentFieldId,
    children: []
  }]

  for (let {display_name, chinese_display_name, id} of props.ancestors) {

    const cnNode = {
      name: chinese_display_name,
      id: id,
      children: []
    }
    ancestorsTreeCnData[0].children.push(cnNode)

    const enNode = {
      name: display_name,
      id: id,
      children: []
    }
    ancestorsTreeEnData[0].children.push(enNode)
  }

  let ancestorsTreeData
  if (i18n.getLocale() === 'en') {
    ancestorsTreeData = ancestorsTreeEnData
  }
  else {
    ancestorsTreeData = ancestorsTreeCnData
  }

  ancestorsTree = echarts.init(document.getElementById('container-of-ancestor-tree'))
  ancestorsTree.setOption({
    tooltip: {
    trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [
      {
        type: 'tree',
        data: ancestorsTreeData,
        top: '1%',
        left: '15%',
        bottom: '1%',
        right: '7%',
        symbolSize: 7,
        orient: 'RL',
        label: {
          position: 'right',
          verticalAlign: 'middle',
          align: 'left'
        },
        leaves: {
          label: {
            position: 'left',
            verticalAlign: 'middle',
            align: 'right'
          }
        },
        emphasis: {
          focus: 'descendant'
        },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750
      }
    ]
  })


})

let relatedGraph
let relatedGraphCnData = []
let relatedGraphEnData = []
onMounted(() => {

  const rootNodeScore = props.relatedFields[0].score * 1.2

  let allScore = rootNodeScore
  for (let {score} of props.relatedFields) {
    allScore += score
  }

  relatedGraphCnData.push({
    id: props.currentFieldId,
    name: props.currentFieldCnName,
    value: rootNodeScore,
    symbolSize: rootNodeScore * 5 / allScore
  })

  relatedGraphEnData.push({
    id: props.currentFieldId,
    name: props.currentFieldEnName,
    value: rootNodeScore,
    symbolSize: rootNodeScore * 5 / allScore
  })

  for (let {score, id, display_name, chinese_display_name} of props.relatedFields) {
    relatedGraphCnData.push({
      id: id,
      name: chinese_display_name,
      value: score,
      symbolSize: score * 5 / allScore
    })

    relatedGraphEnData.push({
      id: id,
      name: display_name,
      value: score,
      symbolSize: score * 5 / allScore
    })
  }

  let relatedGraphData
  if (i18n.getLocale() === 'en') {
    relatedGraphData = relatedGraphEnData
  }
  else {
    relatedGraphData = relatedGraphCnData
  }

  const relatedGraphLink = []
  for (let {id} of props.relatedFields) {
    relatedGraphLink.push({
      source: props.currentFieldId,
      target: id
    })
  }

  console.log(relatedGraphEnData)

  relatedGraph = echarts.init(document.getElementById('container-of-related-graph'))
  relatedGraph.setOption({
    tooltip: {},
    series: [
      {
        name: 'Les Miserables',
        type: 'graph',
        layout: 'circular',
        data: relatedGraphData,
        links: relatedGraphLink,
        roam: true,
        label: {
          show: true,
          position: 'right',
          formatter: '{b}'
        },
        labelLayout: {
          hideOverlap: true
        },
        scaleLimit: {
          min: 0.4,
          max: 2
        },
        lineStyle: {
          color: 'source',
          curveness: 0.3
        }
      }
    ]
  })

})

watch(() => {
  return i18n.getLocale()
},
  (newValue) => {
  if (newValue === 'en') {
    childrenTree.setOption({
      series: {
        data: childrenTreeEnData
      }
    })
    ancestorsTree.setOption({
      series: {
        data: ancestorsTreeEnData
      }
    })
    console.log(relatedGraphEnData)
    relatedGraph.setOption({
      series: {
        data: relatedGraphEnData
      }
    })
  }
  else {
    childrenTree.setOption({
      series: {
        data: childrenTreeCnData
      }
    })
    ancestorsTree.setOption({
      series: {
        data: ancestorsTreeCnData
      }
    })
    console.log(relatedGraphCnData)
    relatedGraph.setOption({
      series: {
        data: relatedGraphCnData,
      }
    })
  }
})
</script>

<template>
  <div class="relation-outer">
    <div class="ancestor-and-children-outer">
      <div class="up-tree-outer">
        <div class="title-of-up-tree">
          {{ i18n.t('fieldDetail.relationTab.titleOfAncestorsTree') }}
        </div>
        <div id="container-of-ancestor-tree" class="up-tree"></div>
      </div>
      <div class="up-tree-outer">
        <div class="title-of-up-tree">
          {{ i18n.t('fieldDetail.relationTab.titleOfChildrenTree') }}
        </div>
        <div id="container-of-children-tree" class="up-tree"></div>
      </div>
      <div class="up-tree-outer">
        <div class="title-of-up-tree">
          {{ i18n.t('fieldDetail.relationTab.titleOfRelatedGraph') }}
        </div>
        <div class="up-tree" id="container-of-related-graph"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.relation-outer {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  .ancestor-and-children-outer {
    width: 100%;
    height: 50vh;
    background-color: white;
    border-radius: 25px;
    padding: 3% 5%;
    display: flex;
    flex-wrap: nowrap;
    .up-tree-outer {
      height: 100%;
      width: 33%;
      display: flex;
      flex-wrap: wrap;
      .title-of-up-tree {
        width: 100%;
        height: 10%;
      }
      .up-tree {
        width: 100%;
        height: 90%;
      }
    }
  }
  .related-fields-graph-outer {
    margin-top: 5vh;
    width: 100%;
    height: 58vh;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    padding: 3% 5%;
    margin-bottom: 3vh;
    .related-fields-graph {
      height: 90%;
      width: 50%;
    }
  }
}
</style>
