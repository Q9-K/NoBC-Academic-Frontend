<template>
    <div class="collaborators">
      
        <!-- <p class="inherited-styles-for-exported-element">{{ $t("personInfo.associateScholar")}}</p> -->
       

        <!-- 列表 -->
        <div class="scholar-profile" v-for="(collaborator, index) in collaborators" :key="index" :span="8" @click="goToWebsite(collaborator)"  >
      
        
            <div class="left-panel">
        <!-- <img  class="avatar" alt="Avatar"> -->
        <el-avatar shape="circle" :size="45" :fit="cover" :src="collaborator.avatar" 
        :border="true" style="border: 2px solid rgb(20, 177, 20); "/>
        
            </div>
            <div class="right-panel">
                <div class="info">
                <div style="display: flex;">
                    <p class="name">{{ collaborator.EnglishName }}</p> 
                    <span class="left-top">{{ i18n.t("personInfo.cooperationArticle") }}</span>
                </div>
                <div style="display: flex;">
                <p class="affiliation">{{ collaborator.ChineseName }}</p>
                <span class="left-bottom">{{ collaborator.paperCount }}</span>
                </div>
                </div>
                <el-divider style="margin: 0;" border-style="dashed" />
            </div>

        </div>
        
      
    </div>
  </template>

<script setup>
import i18n from "../../locales/index.js";
</script>
  
  <script>

  export default {

    props: {
      scholarId: {
      type: Number,
      required: true
}
    },
    data() {
      return {
        collaborators: [
          {
            EnglishName: 'Agency1',
            ChineseName: '机构一',
            avatar: 'https://lfs.aminer.cn/misc/aicityorg/Wuhan%20University.jpg',
            paperCount: 10,
            agencyId: 1,
          },
          {
            EnglishName: 'Agency2',
            ChineseName: '机构二',
            avatar: 'https://lfs.aminer.cn/misc/aicityorg/Beihang%20University.jpg',
            paperCount: 5,
            agencyId: 2,
          },
          // 添加更多合作学者
        ]
      };
    },

    methods:{
        goToWebsite(collaborator){
            console.log("id:",collaborator.agencyId)
            // const homepageUrl = 'www.wdwwada'+collaborator.agencyId
            // if (homepageUrl) {
            //     window.open(homepageUrl, '_blank');
            // }
        }
    },

    mounted(){
        console.log("ScholarId:",this.scholarId)
    },
  };
  </script>
  
  <style scoped>
  .collaborators {
    /* margin-top: 2vh; */
    background-color: rgb(255, 255, 255);
    padding-top: 0.5vh;
  }

  .inherited-styles-for-exported-element {
  color: #414040;
  font-family: "PingFang SC", "Microsoft YaHei", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 15px;
  font-weight:600;

  text-align: left; 

  margin-left: 1vw;
  margin-bottom: 0;
  /* margin-top: 5vh */
  word-break: break-word;

    }

  
  .scholar-profile {
    display: flex;
    background-color: rgb(255, 255, 255);
    /* height: 8vh; */
  }
  .right-panel{
    width: 70%;
  }
  .left-panel {
    margin-right: 0;
    margin-left: 1vw;
    margin-top: 1.5vh;
    
  }
  
  
  .info {
    margin-bottom: 10px;
    text-align: left;
    margin-left: 1vw;
   
  }
  
  .name {
    margin-top: 1.5vh;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 0vh;
   
    
  }
  .left-top{
    font-size: 13px;
    color: #666;
    margin-top: 1.5vh;
    margin-bottom: 1vh;
    margin-left: auto;
  }

  .left-bottom{
    font-size: 13px;
    color: #5d86bb;
    margin-top: 0vh;
    margin-bottom: 1vh;
    margin-left: auto;
    margin-right: 2.5vh;
  }
  
  .affiliation {
    font-size: 13px;
    color: #666;
    margin-top: 0vh;
    margin-bottom: 0.5vh;
  }

  
  .paper-count {
    text-align: center;
    margin-top: 10px;
  }
  </style>