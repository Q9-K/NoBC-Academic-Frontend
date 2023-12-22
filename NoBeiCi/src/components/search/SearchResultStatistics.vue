<!-- <template>
    <div class="statics">
      <div ref="container"></div>
    </div>
  </template>
  
  <script>
    import { Chart } from '@antv/g2';
  
    function renderBarChart(container) {
        const chart = new Chart({container, width: 300, height: 300});
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

<style>
  
</style> -->

<template>
  <div class="statics">
    <div ref="container"></div>
  </div>
</template>

<script>
import { Column } from '@antv/g2plot';

export default {
  mounted() {
    const data = [
      {
      year: '1994',
      value: 60,
      },
      {
        year: '1995',
        value: 49,
      },{
        year: '1996',
        value: 55,
      },
      {
        year: '1997',
        value: 49,
      },
      {
        year: '1998',
        value: 49,
      },{
        year: '1999',
        value: 55,
      },
    ];

    const columnPlot = new Column(this.$refs.container, {
      title: {
        visible: true,
        text: '设置图表暗黑主题',
      },
      description: {
        visible: true,
        text: 'g2plot内置了暗黑主题，可通过theme配置。',
      },
      theme: 'light',
      data,
      xField: 'year',
      yField: 'value',
    });

    columnPlot.render();
  }
};

</script>

<style>
.statics {
  max-width: 300px;
  margin: 0;
}
</style>