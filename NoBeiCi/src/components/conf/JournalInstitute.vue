<template>
    <div class="country-chart">
        <div class="chart-container">
            <div ref="chart"></div>
        </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { Pie } from '@antv/g2plot';
  
  export default {
    name: 'CountryChart',
    
    props: {
      data: {
        type: Array,
        default: () => [],
      },
    },

    setup(props) {
        const buildCountryChart = () => {
        const piePlot = new Pie(chart.value, {
            appendPadding: 10,
            data: countryData,
            angleField: 'value',
            colorField: 'type',
            radius: 0.8,
            label: {
                type: 'spider',
                labelHeight: 28,
                content: '{name}'
            },
            interactions: [{ type: 'element-active' }],
        });

        piePlot.render();
        };

      const chart = ref(null);

      const viewMode = ref('chart');
      
      const countryData = [
        { type: '清华', value: 27 },
        { type: '北大', value: 25 },
        { type: '人大', value: 18 },
        { type: '南大', value: 15 },
        { type: '中科大', value: 10 },
        { type: '上交', value: 15 },
        { type: '武大', value: 10 },
        { type: '华科', value: 5 },
        { type: '复旦', value: 15 },
        { type: '统计', value: 10 },
        { type: '哈工大', value: 15 },
      ];

      onMounted(() => {
        buildCountryChart();
      });
  
      return {
        countryData,
        chart,
        viewMode,
        buildCountryChart
      };
    },
    
};
</script>