<template>
    <div class="personal-info">
      <div class="item">
        <div class="header">
          <!--工作经历  -->
          <span class="title">·{{ i18n.t("personInfo.workExperience") }}</span>
          <el-button v-if="!editing.workExperience"  @click="editItem('workExperience')" circle>
            <el-icon><EditPen /></el-icon>
            </el-button>
            <el-button v-else  @click="cancelEdit('workExperience')" circle>
                <el-icon><Close /></el-icon>
            </el-button>
        </div>
        
        <div class="content" v-if="!editing.workExperience">{{ profile.workExperience }}</div>
        <div class="edit-content" v-else>
          <el-input v-model="editedProfile.workExperience" placeholder="请输入工作经历" :rows="3"
    type="textarea"></el-input>
          <el-button type="primary" color="#626aef" @click="saveItem('workExperience')" 
            style="float: left; margin-top: 1vh;">提交</el-button>
        </div>
      </div>

      <!-- <el-divider /> -->

      <!-- 教育背景 -->
      <div class="item">
        <div class="header">
          <span class="title">·{{ i18n.t("personInfo.educationBackground") }}</span>
          
            <el-button v-if="!editing.educationBackground"  @click="editItem('educationBackground')" circle>
            <el-icon><EditPen /></el-icon>
            </el-button>
            <el-button v-else  @click="cancelEdit('educationBackground')" circle>
                <el-icon><Close /></el-icon>
            </el-button>
            
        </div>
        <div class="content" v-if="!editing.educationBackground">{{ profile.educationBackground }}</div>
        <div class="edit-content" v-else>
          <el-input v-model="editedProfile.educationBackground" placeholder="请输入教育背景" :rows="3"
    type="textarea"></el-input>
          <el-button type="primary" color="#626aef" @click="saveItem('educationBackground')" 
            style="float: left; margin-top: 1vh;">提交</el-button>
        </div>
      </div>


      <!-- <el-divider /> -->

      <!-- 个人简介 -->
      <div class="item" style="margin-bottom: 2vh;">
        <div class="header">
          <span class="title">·{{ i18n.t("personInfo.personProfile") }}</span>
            <el-button v-if="!editing.personalSummary" @click="editItem('personalSummary')" circle>
            <el-icon><EditPen /></el-icon>
            </el-button>
            <el-button v-else  @click="cancelEdit('personalSummary')" circle>
                <el-icon><Close /></el-icon>
            </el-button>

        </div>
        
        <div class="content" v-if="!editing.personalSummary">{{ profile.personalSummary }}</div>
        <div class="edit-content" v-else>
          <el-input v-model="editedProfile.personalSummary" placeholder="请输入个人简介" :rows="3"
    type="textarea"></el-input>
          <el-button type="primary" color="#626aef" @click="saveItem('personalSummary')" 
            style="float: left; margin-top: 1vh;">提交</el-button>
        </div>
      </div>
    </div>
  </template>

<script setup>
import i18n from "../../locales/index.js";

</script>

  
  <script>
  import axios from 'axios';
  import get from "../../functions/Get";
  import request from "../../functions/Request";
  import { ElMessage } from "element-plus";

  export default {
    name: 'PersonalInfo',

    props: {
      scholarId: {
      type: Number,
      required: true
    }
    },

    watch: {
      async scholarId(newValue, oldValue) {
        // 当 scholarId 属性发生变化时执行的逻辑
        console.log('scholarId changed:', newValue);
        // console.log('Old value:', oldValue);
        this.loadingInstance = this.$loading({
          lock: true,
          text: '加载中...',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        // 在这里可以执行相应的操作，例如根据新的 scholarId 加载数据等
        await this.loadprofile();

        this.loadingInstance.close();
      }
    },


    data() {
      return {
        profile: {
          workExperience: '北京航天航空大学校长，软件学院院长',
          educationBackground: '暂无内容',
          personalSummary: '暂无内容'
        },
        editing: {
          workExperience: false,
          educationBackground: false,
          personalSummary: false
        },
        editedProfile: {
          workExperience: '',
          educationBackground: '',
          personalSummary: ''
        }
      };
    },
    methods: {
      editItem(item) {
        this.editing[item] = true;
        // this.editedProfile[item] = this.profile[item];
      },
      async saveItem(item) {
        this.profile[item] = this.editedProfile[item];
        //后端。。。。。
        const result = await request(
        {
            url: '/author/post_scholar_intro_information/',
            params:{
              author_id: this.scholarId,
              workExperience: this.profile.workExperience,
              educationBackground: this.profile.educationBackground,
              personalSummary: this.profile.personalSummary,
            },
            addToken:true,
            useTestEnv:false,
            testEnv: 'http://100.103.70.173:8000',
        }
        );
        if(result){
            ElMessage({
              message:"修改成功",
              type: "success"
            })
          }
        console.log(result)

        this.editing[item] = false;
      },
      cancelEdit(item){
        this.editing[item] = false;
      },

      async loadprofile(){
        const result = await get(
        {
            url: '/author/get_scholar_intro_information',
            params:{
              author_id: this.scholarId
            },
            // addToken: true,
            useTestEnv:false,
            testEnv: 'http://100.103.70.173:8000',
        }
        );
        
        
        console.log(result)
        this.profile = result.data
        if(this.profile.educationBackground == null)
          this.profile.educationBackground = '暂无内容'
        
        if(this.profile.workExperience == null)
          this.profile.workExperience = '暂无内容'

        if(this.profile.personalSummary == null)
          this.profile.personalSummary = '暂无内容'
      },


    },


    mounted(){
      // this.$nextTick(()=>{
      //   console.log("ScholarId:",this.scholarId)
      //   this.loadprofile();
      // })
      if(this.scholarId !== 1)
        this.loadprofile()
      
    }
  }
  </script>
  
  <style scoped>


  .title{
    font-size: 16px;
    color: #4759c5;
    
  }
  .personal-info {
    /* margin-top: 2vh; */
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    /* gap: 20px; */
  }
  
  .item {

    margin: 1vh;
    /* background-color: #f2f2f2; */
    padding: 10px;

    margin-bottom: 0;
    padding-bottom: 0;
    border-radius: 5px;
  }
  
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0px;
  }
  
  .content {
    white-space: pre-line;
    /* background-color: #4759c5; */
    background-color: #e9ecfd;
    text-align: left;
    height: 10vh;
    font-size: 13px;
    padding-left: 1vw;
    padding-top: 1vh;
    
    color: #6d6d6d;
    border-radius: 13px
  }
  
  .edit-content {
    margin-bottom: 10px;
  }
  </style>