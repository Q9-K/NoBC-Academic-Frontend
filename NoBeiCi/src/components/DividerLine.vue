<script setup>
const props = defineProps([
  'width'
])
</script>

<template>
  <div style="height: 2px; display: flex; justify-content: center; align-items: center" :style="{width: props.width}">
    <el-divider border-style="dashed" />
  </div>
</template>

<style scoped lang="scss">

</style>
