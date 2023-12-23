<template>
    <div style="height: 100vh;width: 100%;">
            <NavigateBar></NavigateBar>
            <div class="background">
                <!-- 左侧 -->
                <div class="left-part">
                    <ScholarCardView :scholar="scholar"></ScholarCardView>
                    <PersonalInfo :scholar-id="this.author_id"></PersonalInfo>
                </div>

                <!-- 中间 -->
                <div class="middle-part">
                    <div class="middle-up">
                        <ColumnPlot></ColumnPlot>
                    </div>

                    <div class="middle-down">
                        <p class="inherited-styles-for-exported-element">论文列表</p>
                    </div>
                </div>

                <!-- 右侧 -->
                <div class="right-part">
                    <radar-info :data="scholarMetrics"></radar-info>

                    <el-menu
                        :default-active="activeIndex"
                        class="el-menu-demo"
                        mode="horizontal"
                        @select="handleSelect"
                        
                        active-text-color="#6e83f7"

                        style="height: 4vh;margin-top: 2vh;"
                    >   
                        <!-- 合作学者 -->
                        <el-menu-item index="1" @click="changeCooperationContent(1)" >{{ i18n.t("personInfo.cooperationScholar") }}</el-menu-item>
                        <!-- 合作机构 -->
                        <el-menu-item index="2" @click="changeCooperationContent(2)">{{ i18n.t("personInfo.cooperationAgency") }}</el-menu-item>
                        </el-menu>

                        <transition name="el-fade-in-linear">
                        <div v-if="cooperationIndex == 1">  
                            <CooperationInfo :scholar-id="this.author_id"></CooperationInfo>
                        </div>
                        </transition>

                        <transition name="el-fade-in-linear">
                        <div v-if="cooperationIndex == 2">  
                            <CooperationAgencyVue :scholar-id="this.author_id"></CooperationAgencyVue>
                        </div>
                        </transition>
                    
                </div>
            
            </div>
    </div>
    
</template>
<script setup>
import i18n from "../locales/index.js";
</script>

<script>
import PersonalInfo from '../components/personInfoView/PersonInfo.vue';
import NavigateBar from "../components/NavigateBar.vue";
import RadarInfo from '../components/personInfoView/RadarInfo.vue';
import CooperationInfo from '../components/personInfoView/CooperationScholar.vue';

import ScholarCardView from '../components/authorhomeView/ScholarCardView.vue';
import CooperationAgencyVue from "../components/personInfoView/CooperationAgency.vue";

import ColumnPlot from "../components/authorhomeView/ColumnPlot.vue";
import get from "../functions/Get";



export default {
    data(){
        return{
            author_id: 1,
            cooperationIndex:1,
            
            scholarMetrics: {
                Papers: 100,
                Citation: 200,
                'H-Index': 50,
                'G-Index': 60,
                Sociability: 70,
                Diversity: 80,
                Activity: 90,
            },

            scholar: {
            avatar: 'https://img1.baidu.com/it/u=3096599450,2589974591&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            name: '张三',
            title: '教授',
            englishAffiliation: 'beihang University',
            scholar_id:'111',
            }
        };
    },
    methods:{
        async changeCooperationContent(index) {
       this.cooperationIndex = -1;
          setTimeout(() => {
          this.cooperationIndex = index;
        },200); // 这里设置一个延迟，
       
    console.log(`切换到follow${index}的内容`);
    // localStorage.setItem('activeIndex:',this.activeIndex)

      },

      async loadscholarMetrics(){

        const result = await get(
        {
            url: 'http://100.103.70.173:8000/author/get_scholar_metrics/',
            params:{
                author_id: this.author_id
            },
        }
        );
        console.log("scholarMetrics:",result)
        this.scholarMetrics = result.data;


        },



      async loadScholarInfo(){
        const result = await get(
        {
            url: 'http://100.103.70.173:8000/author/get_author_by_id',
            params:{
                    author_id:this.author_id
            },
            //addToken: true,
        }
        );
        console.log(result.data)
        this.scholar = result.data

    },
    },

    mounted(){
        this.author_id = 'https://openalex.org/'+this.$route.params.id;
        console.log("id:",this.author_id)
        this.scholar.scholar_id = this.author_id

        this.loadScholarInfo()
        this.loadscholarMetrics()

        // bus.$emit('scholar-id-updated', this.author_id);
    },

    components:{
        PersonalInfo,
        NavigateBar,
        RadarInfo,
        CooperationInfo,
        ScholarCardView,
        CooperationAgencyVue,
        ColumnPlot,
    },
}   
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
  margin-left: 3vw;
  /* margin-top: 1vh; */
  margin-bottom: 2vh;

  word-break: break-word;

}
    

.background{
    background-color: #f0f1f4;
    width: 100%;
    /* height: 80vh; */
    /* overflow: scroll; */
    /* overflow-x: hidden; */
  
    margin-top: 14vh;
    display: flex;
}

.left-part{
    width: 25vw;
    margin-left: 2vw;
    margin-right: 2vw;
}
.middle-part{
    width: 47vw;
    /* background-color: #3357c3; */
}

.middle-up{
    background-color: #fbfcff;
    margin-bottom: 3vh;
    /* height: 30vh; */
}

.middle-down{
    background-color: #fbfcff;
}


.right-part{
    width: 20vw;
    margin-left: 2vw;
    margin-right: 2vw;
}
</style>

<style>
html,
body {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100vh;
  /* margin: 0 !important; */
  /* padding: 0 !important; */
  max-width: none;
}   
</style>