<template>
    <div class="cite-chart">
        <div ref="chart"></div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { DualAxes } from '@antv/g2plot';

export default {
  name: 'citeChart',
  
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },

  setup(props) {
      const reversedData = props.data.slice().reverse();
      const buildCiteChart = () => {
        const dualAxes = new DualAxes(chart.value, {
        data: [reversedData, reversedData],
        xField: 'year',
        yField: ['cited_by_count', 'works_count'],
        geometryOptions: [
            {
            geometry: 'column',
            },
            {
            geometry: 'line',
            lineStyle: {
                lineWidth: 2,
            },
            },
        ],
        });
        dualAxes.render();
      };

    const chart = ref(null);

    const viewMode = ref('chart');
    
    const data = [
        { time: '2014', cite: 350, count: 800 },
        { time: '2015', cite: 900, count: 600 },
        { time: '2016', cite: 300, count: 400 },
        { time: '2017', cite: 450, count: 380 },
        { time: '2018', cite: 470, count: 520 },
        { time: '2019', cite: 350, count: 800 },
        { time: '2020', cite: 900, count: 600 },
        { time: '2021', cite: 300, count: 400 },
    ];

    onMounted(() => {
      buildCiteChart();
    });

    return {
      data,
      chart,
      viewMode,
      buildCiteChart
    };
  },
  
};
</script>