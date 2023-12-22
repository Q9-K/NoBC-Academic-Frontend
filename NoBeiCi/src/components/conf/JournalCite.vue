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
      const buildCiteChart = () => {
        const dualAxes = new DualAxes(chart.value, {
        data: [data, data],
        xField: 'time',
        yField: ['cite', 'count'],
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
        { time: '2019-03', cite: 350, count: 800 },
        { time: '2019-04', cite: 900, count: 600 },
        { time: '2019-05', cite: 300, count: 400 },
        { time: '2019-06', cite: 450, count: 380 },
        { time: '2019-07', cite: 470, count: 220 },
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