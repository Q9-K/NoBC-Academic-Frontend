<script setup>

import ArticleDisplay from "../../components/search/ArticleDisplay.vue";
import {onMounted, ref} from "vue";
import get from '../../functions/Get.js'
import {ElMessage} from "element-plus";

const props = defineProps([
  'currentFieldId'
])

console.log(props.currentFieldId)

const allPaperData = ref([])

onMounted(() => {

  const getPaperData = async (fieldId) => {

    try {
      const apiUrl = 'http://100.99.200.37:8000' + '/work/get_popular_works/';
      const params = {
        concept_id: fieldId
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

  getPaperData(props.currentFieldId)
    .then((response) => {

      if (response.code !== 200) {
        ElMessage({
          type: "error",
          message: "Oh No!"
        })
      }
      else {
        for (let single of response.data.data) {
          allPaperData.value.push({
            other: single
          })
        }
      }
    })
})

</script>

<template>
  <div class="paper-outer">
    <el-row v-for="data in allPaperData">
      <ArticleDisplay style="width: 100vw; margin-top: 4vh" :data="data" type="" />
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.paper-outer {
  width: 100%;
  height: fit-content;
}
</style>
