<template>
    <div>
      <div ref="container"></div>
    </div>
  </template>
  
  <script>
    import { Chart } from '@antv/g2';
  
    function renderBarChart(container) {
        const chart = new Chart({container, width: 390, height: 300});
        // 准备数据
        const data = [
            { year: '2015', Number: 275 },
            { year: '2016', Number: 115 },
            { year: '2017', Number: 120 },
            { year: '2018', Number: 350 },
            { year: '2019', Number: 150 },
        ];

        // 声明可视化
        chart
            .interval() // 创建一个 Interval 标记
            .data(data) // 绑定数据
            .encode('x', 'year') // 编码 x 通道
            .encode('y', 'Number') // 编码 y 通道
            .encode('key', 'year') // 指定 key
            // .animate('update', { duration: 300 }); // 指定更新动画的时间

        // 渲染可视化
        chart.render();

        return chart;
    }
  
    export default {
      name: 'SearchResultStatics',
      props: {},
      mounted() {
        // 保存图表实例
        this.chart = renderBarChart(this.$refs.container);
      },
      methods: {
       
      },
    };
  </script>