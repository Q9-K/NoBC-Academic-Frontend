<template>
    <div class="word-chart">
        <div ref="chart"></div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
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
      const buildWordChart = () => {
        const wordCloud = new WordCloud(chart.value, {
            data: wordData,
            wordField: 'name',
            weightField: 'value',
            colorField: 'name',
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
    
    const wordData = [
        {"value": 9, "name": "深度学习"},
        { "value": 8, "name": "强化学习"},
        {"value": 8, "name": "人工智能"},
        {"value": 8, "name": "机器学习"},
        {"value": 8, "name": "神经网络"},
        {"value": 8, "name": "网络安全"},
        {"value": 8, "name": "算法设计"},
        { "value": 8, "name": "强化学习"},
        {"value": 8, "name": "人工智能"},
        {"value": 8, "name": "机器学习"},
        {"value": 8, "name": "神经网络"},
    ];

    onMounted(() => {
      buildWordChart();
    });

    return {
      wordData,
      chart,
      viewMode,
      buildWordChart
    };
  },
  
};
</script>