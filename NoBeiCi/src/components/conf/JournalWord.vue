<template>
    <div class="word-chart">
        <div ref="chart"></div>
    </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { WordCloud } from '@antv/g2plot';

export default {
  name: 'WordChart',
  
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },

  setup(props) {
      const wordData = props.data;
      const buildWordChart = () => {
        const wordCloud = new WordCloud(chart.value, {
            data: wordData,
            wordField: 'display_name',
            weightField: 'score',
            colorField: 'display_name',
            wordStyle: {
                fontFamily: 'Verdana',
                fontSize: [32, 48],
                rotation: [0,70],
            },
            random: () => 0.5,
        });
        wordCloud.render();
      };

    const chart = ref(null);
    const viewMode = ref('chart');
    onMounted(() => {
      buildWordChart();
    });

    return {
      chart,
      viewMode,
      buildWordChart
    };
  },
  
};
</script>