<template>
    <div class="box">
        <p class="inherited-styles-for-exported-element">近七年论文数</p>
        
        <div style="display: flex;">

          <div class="border">
              <div id="container" class="column"  v-if="this.viewMode===1" ></div>

              <div id="container1" class="column" v-if="this.viewMode===2" ></div>

              <div id="container2" class="column" v-if="this.viewMode===3" ></div>

              <div id="container3" class="column" v-if="this.viewMode===4" ></div>
          </div>
          <!-- <el-button-group style="margin-right:1vw;display: flex; flex-direction: column;">
            <el-button 
              type="primary" color="#626aef"
              v-if="viewMode === 1" 
              >柱状图</el-button>
            <el-button 
              v-else 
              @click="this.viewMode=1" >柱状图</el-button>


            <el-button 
              type="primary" color="#626aef"
              v-if="viewMode === 2" 
              @click="this.viewMode = 2">折线图</el-button>
            <el-button 
              v-else 
              @click="this.viewMode = 2">折线图</el-button>
          </el-button-group> -->

          <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              collapse="true"
           

              active-text-color="#6e83f7"
            >
            <el-menu-item index="1" @click="this.switchChart(1)" >
              <svg t="1703259750977" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" 
              p-id="7134" width="17" height="17"><path d="M896 896H96a32 32 0 0 1-32-32V224a32 32 0 0 1 64 0v608h768a32 32 0 1 1 0 64z" p-id="7135" fill="#8a8a8a"></path><path d="M512 752.16a32 32 0 0 1-32-32V350.624a32 32 0 0 1 64 0v369.536a32 32 0 0 1-32 32zM320 752.576a32 32 0 0 1-32-32V512a32 32 0 0 1 64 0v208.576a32 32 0 0 1-32 32zM896 752.672a32 32 0 0 1-32-32V163.488a32 32 0 1 1 64 0v557.184a32 32 0 0 1-32 32zM704 752.736a32 32 0 0 1-32-32V224a32 32 0 1 1 64 0v496.736a32 32 0 0 1-32 32z" p-id="7136" fill="#8a8a8a"></path></svg>
                <template #title>柱状图</template>
              </el-menu-item>

              <el-menu-item index="2" @click="this.switchChart(2)" >
                <svg t="1703259857800" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" 
                p-id="8406" width="17" height="17"><path d="M896 896H96a32 32 0 0 1-32-32V224a32 32 0 0 1 64 0v608h768a32 32 0 1 1 0 64z" p-id="8407" fill="#8a8a8a"></path><path d="M247.008 640a32 32 0 0 1-20.992-56.192l200.992-174.24a32 32 0 0 1 42.272 0.288l172.128 153.44 229.088-246.304a32 32 0 0 1 46.88 43.616l-250.432 269.216a31.936 31.936 0 0 1-44.704 2.08l-174.56-155.52-179.744 155.84a31.872 31.872 0 0 1-20.928 7.776z" p-id="8408" fill="#8a8a8a"></path></svg>
                <template #title>折线图</template>
              </el-menu-item>

              <el-menu-item index="3" @click="this.switchChart(3)">
                <svg t="1703259951260" class="icon" viewBox="0 0 1044 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" 
                p-id="11314" width="17" height="17"><path d="M103.434343 108.606061h853.333334v175.838383H103.434343zM103.434343 418.909091h636.121213v175.838384H103.434343zM103.434343 713.69697h449.939394v175.838384H103.434343z" fill="#8a8a8a" p-id="11315"></path></svg>
                <template #title>条形图</template>
              </el-menu-item>

              <!-- <el-menu-item index="4" @click="this.switchChart(4)">
                <el-icon><setting /></el-icon>
                <template #title>Navigator Four</template>
              </el-menu-item> -->
            </el-menu>

        </div>
        
    </div>
    
  </template>
  


<script>

import { onMounted, watch } from 'vue';
import {onUnmounted} from 'vue';

import { Column } from '@antv/g2plot';
import { Line } from '@antv/g2plot';
import { Bar } from '@antv/g2plot';
import { Rose } from '@antv/g2plot';

import { nextTick } from 'vue';

import { ref } from 'vue';
import get from '../../functions/Get';



export default {
  
  props: {
      scholarId: {
        type: String,
        required: true
      },
    },
  
  
  
  
  setup(props) {

    


  const viewMode = ref(1); // 添加 viewMode 变量
  
  let data = [
    // 这里替换为你的学者近五年论文数数据
    // 格式应该与示例数据保持一致，包括 type 和 sales 字段
    // 例如：
    { type: '2017', papers: 14 },
    { type: '2018', papers: 20 },
    { type: '2019', papers: 35 },
    { type: '2020', papers: 64 },
    { type: '2021', papers: 45 },
    { type: '2022', papers: 39 },
    { type: '2023', papers: 21 },
    // ...
  ];

  watch(props, (newVal, oldVal) => {
      loadData().then(()=>{
      buildColumn();
    })
    });
  
  let columnPlot = null;

  const switchChart = (index) => {

        let tmp  = viewMode.value;
        viewMode.value = index;
        console.log("viewMode:",viewMode)

        if(tmp != 2 && index ==2){
            nextTick(() => {
            buildLine();
          });
        }
          
        if(tmp !=1 && index ==1){
          nextTick(() => {
            buildColumn();
          });
        }

        if(tmp !=3 && index ==3){
          nextTick(() => {
            buildBar()
          });
        }

        if(tmp !=4 && index ==4){
          nextTick(() => {
            buildRose()
          });
        }


      
    };  

  const buildColumn = () =>{
    columnPlot = new Column('container', {
      title: {
        visible: true,
        text: '学者近五年论文数',
      },
      forceFit: true,
      data,
      meta: {
        type: {
          alias: '年份',
        },
        papers: {
          alias: '论文数',
        },
      },

      color: '#6e83f7',
      padding: 'auto',
      xField: 'type',
      yField: 'papers',
      
    });
    columnPlot.render();
  }

  const buildLine = ()=>{
        const linePlot = new Line('container1', {
        title: {
          visible: true,
          text: '带数据点的折线图',
        },
        description: {
          visible: true,
          text: '将折线图上的每一个数据点显示出来，作为辅助阅读。',
        },
        forceFit: true,
        padding: 'auto',
        data,
        xField: 'type',
        yField: 'papers',
        color: '#6e83f7',
        point: {
          visible: true,
        },
        label: {
          visible: true,
          type: 'point',
        },
      });

      linePlot.render();
  }
  
  const buildBar = () =>{
    const barPlot = new Bar(document.getElementById('container2'), {
        title: {
          visible: true,
          text: '基础条形图',
        },
        forceFit: true,
        data,
        xField: 'papers',
        yField: 'type',
        color: '#6e83f7',
        label: {
          visible: true,
          // formatter: (v) => Math.round(v / 10000) + '万',
        },
      });

      barPlot.render();
  }

  const buildRose = () =>{
    const rosePlot = new Rose(document.getElementById('container3'), {
    forceFit: true,
    title: {
    visible: true,
    text: '多色玫瑰图',
  },
  // description: {
  //   visible: true,
  //   text:
  //     '指定颜色映射字段(colorField)，饼图切片将根据该字段数据显示为不同的颜色。指定颜色需要将color配置为一个数组。\n当把饼图label的类型设置为inner时，标签会显示在切片内部。设置offset控制标签的偏移值。',
  // },
  radius: 0.8,
  data,
  radiusField: 'papers',
  categoryField: 'type',
  colorField: 'type',
  label: {
    visible: true,
    type: 'outer',
    content: (text) => text.value,
  },
});
rosePlot.render();
  }

  const loadData = async () =>{
    const result = await get(
        {
            url: 'http://100.103.70.173:8000/author/get_counts_by_year',
            params:{
                    author_id:props.scholarId,
            },
            //addToken: true,
        }
        );
        console.log("column data:",result.data)
        data = result.data
  }

  onMounted(() => {
    
    // loadData().then(()=>{
    //   buildColumn();
    // })
    
    //buildLine();
    
  });
  
  // 在组件卸载时销毁图表实例，防止内存泄漏
  onUnmounted(() => {
    if (columnPlot) {
      columnPlot.destroy();
    }
  });

  return{
    viewMode,
    switchChart,
    buildColumn,
    buildLine,
    buildBar,
    buildRose,
    loadData,
    data
  }
  },


  
}
</script>



<style scoped>

 /* .el-menu .el-menu-item.is-active, .el-menu .el-submenu.is-active {
    background-color: #6e83f7 !important;
} */

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.inherited-styles-for-exported-element {
  color: #414040;
  font-family: "PingFang SC", "Microsoft YaHei", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight:600;

  /* font-size: large;  */
    font-family: HiraginoSansGB-W6,HiraginoSansGB;
    background-color: transparent;
    font-weight: 700;
  /* line-height: 16px; */
  /* tab-size: 4; */

  text-align: left;
  /* margin-left: 1vw; */
  /* margin-top: 1vh; */
  margin-bottom: 1.5vh;

  word-break: break-word;

}

.box{
    padding-left: 2.3vw;
    padding-right: 3vw;
    padding-top: 3vh;
    padding-bottom: 3vh;
}

.border{
    border: 5px solid #acb8fc;
    border-radius: 3%;
    padding: 10px;
    width: 35vw;

    margin-right: 3vw;

}
.column{
    height: 30vh;
  
    border: #414040;
    border-radius: 15%;
}
</style>