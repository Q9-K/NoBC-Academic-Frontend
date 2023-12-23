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
            data: props.data,
            angleField: 'doc_count',
            colorField: 'key',
            radius: 0.8,
            label: {
                type: 'spider',
                labelHeight: 28,
                content: '{name}\n{percentage}'
            },
            interactions: [{ type: 'element-active' }],
        });

        piePlot.render();
        };

      const chart = ref(null);

      const viewMode = ref('chart');

      onMounted(() => {
        buildCountryChart();
      });
  
      return {
        chart,
        viewMode,
        buildCountryChart
      };
    },
    
};
</script>