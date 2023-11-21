<template>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>发表相关论文最多的作者</span>
        </div>
      </template>
      <div v-for="o in 4" :key="o" class="text item">作者{{  o }}  <span style="margin-left: 8vw;">文章数量 {{ 100+o }}</span></div>
    </el-card>
  </template>
  
  <style>
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>