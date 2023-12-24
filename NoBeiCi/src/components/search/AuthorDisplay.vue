<template>
  <div class="author">
    <div ref="container" style="padding: 0; margin: 0;"></div>
  </div>
</template>

<script>
import { Pie } from '@antv/g2plot';

export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    const piePlot = new Pie(this.$refs.container, {
      appendPadding: 10,
      data: this.data,
      angleField: 'doc_count',
      colorField: 'display_name',
      radius: 0.9,
      label: {
        type: 'inner',
        offset: '-50%',
        content: ({ doc_count}) => `${doc_count}`,
        style: {
          fontSize: 14,
          textAlign: 'center',
        },
      },
      legend: {  
        position: 'bottom', 
        type: 'single'
      },  
      interactions: [{ type: 'element-active' }],
    });

    piePlot.render();
    
  },
};
</script>

<style scoped>
.author {
  width: 300px;
  padding: 0;
  margin: 0;
}
</style>
