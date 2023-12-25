<script setup>

import {onMounted, ref} from "vue";
import get from "../../functions/Get.js";
import {ElMessage} from "element-plus";
import ScholarDisplay from "../../components/ScholarDisplay.vue";

const props = defineProps([
  'currentFieldId'
])

const allScholars = ref([])

onMounted(() => {

  const getScholarData = async (fieldId) => {

    try {
      const apiUrl = '/author/get_hot_authors';
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
        showError: true, // 设置为 true 以显示错误消息,
        useTestEnv: false,
        testEnv: 'http://100.103.70.173:8000'
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

  getScholarData("https://openalex.org/" + props.currentFieldId)
    .then((response) => {
      if (response.code !== 200) {
        ElMessage({
          type: "error",
          message: "Oh No!"
        })
      }
      else {
        allScholars.value = response.data
      }
    })
})

</script>

<template>
  <div class="scholars-outer">
    <ScholarDisplay :scholars="allScholars" />
  </div>
</template>

<style scoped lang="scss">
.scholars-outer {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>
