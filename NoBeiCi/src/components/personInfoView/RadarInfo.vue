<template>
    <div class="radar-chart-module">
        
        <!-- 上方栏 -->
        <div style="display: flex;">
            
           <!-- 作者统计 -->
           <!-- {{ t("personInfo.authorStatistics")}} -->
            <p class="inherited-styles-for-exported-element">{{ $t("personInfo.authorStatistics")}}</p>
            <div style="margin-left: auto;">
                <el-tooltip placement="bottom"  effect="light">
                <template #content> Papers（x10）（论文数量）：乘以10之后为该学者发表的所有论文的数量。<br/><br/>
Citation（x10）（引用量）：乘以10之后为该学者所有出版物的被引用次数。<br/><br/>
H-Index（H-指数）：如果一位专家的n篇论文中，每篇至少有h次引用，<br/>并且其他(N-h)篇论文每篇最多有h次引用，则该专家的索引为h。<br/><br/>
i10_index（i10指数）：指的是作者的论文数量达到至少i次被引用的文章数量。<br/><br/>
oa_percent（x10）（开放获取比例）：乘以10之后为该学者发表的开放获取论文占<br/>总论文数量的比例。<br/><br/>
2yr_mean_citedness（2年平均引用率）：该学者所有论文在过去两年内的平均引用次数。<br/><br/>
2yr_h_index（2年H-指数）：该学者过去两年内的H-指数。<br/></template>
                <el-button type="" size="large"  link><el-icon><QuestionFilled /></el-icon></el-button>
            </el-tooltip>
        </div>
        
        <!-- 雷达图 列表 -->
        <el-button-group style="margin-right:1vw">
      <el-button 
        type="primary" color="#626aef"
        v-if="viewMode === 'chart'" 
        >{{ $t("personInfo.radar")}}</el-button>
      <el-button 
        v-else 
        @click="switchToChart()">{{ $t("personInfo.radar")}}</el-button>
      <el-button 
        type="primary" color="#626aef"
        v-if="viewMode === 'list'" 
        @click="this.switchToList()">{{ $t("personInfo.list")}}</el-button>
      <el-button 
        v-else 
        @click="this.switchToList()">{{ $t("personInfo.list")}}</el-button>
    </el-button-group>
            
        </div>
        
      <!-- 图和列表 -->
      <div class="chart-container" v-if="viewMode=='chart'">
        <div ref="chart" style="height: 30vh;width: 90%;"></div>
      </div>
      <el-table :data="this.scholarData" border style="width: 80%; margin-left: 1vw; margin-bottom: 2vh;" v-else>
        <el-table-column prop="label" label="Metrics" ></el-table-column>
        <el-table-column prop="value" label="Value" w></el-table-column>
      </el-table>
    </div>
  </template>


  
  <script>
  import { ref, onMounted,watch,reactive } from 'vue';
  import { Radar } from '@antv/g2plot';
  import {  nextTick } from 'vue';

  import i18n  from '../../locales/index.js'; 
  
  export default {


    name: 'RadarChart',
    
    props: {
      data: {
        type: Array,
        default: () => [],
      },
    },
    setup(props) {
        
        let tmpRadar = null

        const buildRadarChart = () => {
        const radarPlot = new Radar(chart.value, {
            data: scholarData,
            xField: 'label',
            yField: 'value',
            meta: {
            value: {
                min: 0,
                nice: true,
            },
            },
        });
        tmpRadar = radarPlot
        radarPlot.render();

        
        };


        const switchToChart = () => {
        viewMode.value = 'chart';
        nextTick(() => {
            buildRadarChart();
        });
        };  

      const switchToList = () =>{
        
        console.log("list data",scholarData)
        viewMode.value = 'list';
        
        
      }
      const chart = ref(null);

      const viewMode = ref('chart'); // 默认显示雷达图
  
      let scholarData = reactive([
        { label: 'Papers(x10)', value: props.data.Papers/10 },
        { label: 'Citation(x10)', value: props.data.Citation/10 },
        { label: 'H-Index', value: props.data['H-Index'] },
        { label: 'i10_index', value: props.data.i10_index },
        { label: 'oa_percent(x10)', value: props.data.oa_percent/10 },
        { label: '2yr_mean_citedness', value: props.data['2yr_mean_citedness'] },
        { label: '2yr_h_index', value: props.data['2yr_h_index'] },
      ]);

      function normalizeData(data) {
        const values = data.map(item => Math.abs(item.value)); // 取绝对值以处理负数情况
        const max = Math.max(...values);
        return data.map(item => ({
          label: item.label,
          value: item.value / max  // 将原始值除以最大值，进行归一化处理
        }));
      }
  
      onMounted(() => {
        nextTick(() => {
          console.log("radar：",props.data)
        })
        if(props.data['H-index']!= -1)
          buildRadarChart();
        
        
      });

      watch(props, (newVal, oldVal) => {
        if(tmpRadar)
          tmpRadar.destroy()
        console.log('data changed',props.data);
        while (scholarData.length) {
          scholarData.shift();
        }
        // 给 scholarData 赋新值
        scholarData.push(
          { label: 'Papers(x10)', value: props.data.Papers/10 },
        { label: 'Citation(x10)', value: props.data.Citation/10 },
        { label: 'H-Index', value: props.data['H-Index'] },
        { label: 'i10_index', value: props.data.i10_index },
        { label: 'oa_percent(x10)', value: props.data.oa_percent/10 },
        { label: '2yr_mean_citedness', value: props.data['2yr_mean_citedness'] },
        { label: '2yr_h_index', value: props.data['2yr_h_index'] },
        );
        console.log("scholarData",scholarData)
        buildRadarChart();
      });
  
      return {
        scholarData,
        chart,
        viewMode,
        switchToChart,
        buildRadarChart,
        switchToList
      };

      
    },

    

    
  };
  </script>
  
  <style scoped>

    .inherited-styles-for-exported-element {
  color: #414040;
  font-family: "PingFang SC", "Microsoft YaHei", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight:600;
  /* line-height: 16px; */
  /* tab-size: 4; */

  text-align: left;
  margin-left: 1vw;
  margin-top: 1vh;

  word-break: break-word;

}

  .radar-chart-module {
    /* display: inline; */
    justify-content: space-between;
    background-color: rgb(255, 255, 255);
    padding-top: 1vh;
  }
  .chart-container {
    width: 95%;
    margin: 0.5vh;
    /* margin-top: -4vh; */
    /* height: 40vh; */
  }
  </style>