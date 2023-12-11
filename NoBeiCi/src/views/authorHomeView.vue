<template>
    <div style="height: 100vh;width: 100%;">
            <NavigateBar></NavigateBar>
            <div class="background">
                <!-- 左侧 -->
                <div class="left-part">
                    <ScholarCardView :scholar="scholar"></ScholarCardView>
                    <PersonalInfo></PersonalInfo>
                </div>

                <!-- 中间 -->
                <div class="middle-part">

                </div>

                <!-- 右侧 -->
                <div class="right-part">
                    <radar-info :data="scholarMetrics"></radar-info>
                    <CooperationInfo></CooperationInfo>
                </div>
            
            </div>
    </div>
    
</template>

<script>
import PersonalInfo from '../components/personInfoView/PersonInfo.vue';
import NavigateBar from "../components/NavigateBar.vue";
import RadarInfo from '../components/personInfoView/RadarInfo.vue';
import CooperationInfo from '../components/personInfoView/CooperationInfo.vue';

import ScholarCardView from '../components/authorhomeView/ScholarCardView.vue';

export default {
    data(){
        return{
            authorId: 1,
            
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
            
            }
        };
    },
    methods:{

    },

    components:{
        PersonalInfo,
        NavigateBar,
        RadarInfo,
        CooperationInfo,
        ScholarCardView
    },
}   
</script>

<style scoped>

    




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
    background-color: #3357c3;
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