<template>
    <div class="radar-chart-module">
        
        <!-- 上方栏 -->
        <div style="display: flex;">
            
           <!-- 作者统计 -->
           <!-- {{ t("personInfo.authorStatistics")}} -->
            <p class="inherited-styles-for-exported-element">{{ $t("personInfo.authorStatistics")}}</p>
            <div style="margin-left: auto;">
                <el-tooltip placement="bottom"  effect="light">
                <template #content> 1.Citation（引用量）：该学者所有出版物的被引用次数。<br />
                    <br />
                        2.Papers（论文数量）：该学者发表的所有论文的数量。<br />
                        <br />
                    3.H-index（H-指数）：如果一位专家的n篇论文中，每篇至少有 h 次引用，<br />
                        并且其他 (N-h) 篇论文每篇最多有 h 次引用，则该专家的索引为 h。<br />
                        <br />
                    4.Activity（活跃度）：学者的活跃度是根据过去几年发表的论文的数量界定的。<br />
                    <br />
                    5.Diversity（多样性）：一般来说，专家的研究可能包括几个不同的研究领域。
                    <br />多样性的定义是为了定量地反映学者的研究范围。<br />
                    <br />
                    6.Sociability（社交性）：社交性的分数基本上是根据一位专家有多少合著者<br />来定义的。在下一步，
                    我们将进一步考虑地点、组织、国籍信息和研究领域。<br />
                    <br />
                    7.G-index（G-指数）：G-指数是H-指数的衍生指数，主要是弥补h指数<br />不能很好反应高被引论文的缺陷提出的，
                    G-指数定义为:论文按被引次数排序后<br />相对排前的累积被引至少g2次的最大论文序次g，
                    亦即第(g+1)序次论文对应的<br />累积引文数将小于(g+1)2。</template>
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
        <div ref="chart"></div>
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
        { label: 'Papers', value: props.data.Papers },
        { label: 'Citation', value: props.data.Citation },
        { label: 'H-Index', value: props.data['H-Index'] },
        { label: 'G-Index', value: props.data['G-Index'] },
        { label: 'Sociability', value: props.data.Sociability },
        { label: 'Diversity', value: props.data.Diversity },
        { label: 'Activity', value: props.data.Activity },
      ]);
  
      onMounted(() => {
        nextTick(() => {
          console.log("radar：",props.data)
        })
          
          //buildRadarChart();
        
        
      });

      watch(props, (newVal, oldVal) => {
        console.log('data changed',props.data);
        while (scholarData.length) {
          scholarData.shift();
        }
        // 给 scholarData 赋新值
        scholarData.push(
          { label: 'Papers', value: props.data.Papers },
          { label: 'Citation', value: props.data.Citation },
          { label: 'H-Index', value: props.data['H-Index'] },
          { label: 'G-Index', value: props.data['G-Index'] },
          { label: 'Sociability', value: props.data.Sociability },
          { label: 'Diversity', value: props.data.Diversity },
          { label: 'Activity', value: props.data.Activity },
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