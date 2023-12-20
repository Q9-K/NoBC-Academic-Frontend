<template>
    <div class="box">
        <p class="inherited-styles-for-exported-element">近七年论文数</p>
        <div id="container" class="column"></div>
    </div>
    
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import {onUnmounted} from 'vue';
  import { Column } from '@antv/g2plot';
  
  const data = [
    // 这里替换为你的学者近五年论文数数据
    // 格式应该与示例数据保持一致，包括 type 和 sales 字段
    // 例如：
    { type: '2017', papers: 14 },
    { type: '2018', papers: 20 },
    { type: '2019', papers: 35 },
    { type: '2020', papers: 64 },
    { type: '2021', papers: 45 },
    { type: '2022', papers: 39 },
    { type: '2023', papers: 21 },
    // ...
  ];
  
  let columnPlot = null;
  
  onMounted(() => {
    columnPlot = new Column('container', {
      title: {
        visible: true,
        text: '学者近五年论文数',
      },
      forceFit: true,
      data,
      meta: {
        type: {
          alias: '年份',
        },
        papers: {
          alias: '论文数',
        },
      },

      color: '#6e83f7',
      padding: 'auto',
      xField: 'type',
      yField: 'papers',
      
    });
    columnPlot.render();
  });
  
  // 在组件卸载时销毁图表实例，防止内存泄漏
  onUnmounted(() => {
    if (columnPlot) {
      columnPlot.destroy();
    }
  });
  </script>


<style scoped>

.inherited-styles-for-exported-element {
  color: #414040;
  font-family: "PingFang SC", "Microsoft YaHei", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight:600;
  /* line-height: 16px; */
  /* tab-size: 4; */

  text-align: left;
  /* margin-left: 1vw; */
  /* margin-top: 1vh; */
  margin-bottom: 2vh;

  word-break: break-word;

}

.box{
    padding-left: 3vw;
    padding-right: 3vw;
    padding-top: 3vh;
    padding-bottom: 3vh;
}
.column{
    height: 30vh;
}
</style>