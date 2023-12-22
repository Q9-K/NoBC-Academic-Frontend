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
        { type: '中国', value: 27 },
        { type: '日本', value: 25 },
        { type: '英国', value: 18 },
        { type: '美国', value: 15 },
        { type: '西班牙', value: 10 },
        { type: '德国', value: 15 },
        { type: '法国', value: 10 },
        { type: '其他', value: 5 },
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