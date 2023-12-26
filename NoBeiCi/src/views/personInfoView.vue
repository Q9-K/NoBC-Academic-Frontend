<template>

    <div>
   <NavigateBar></NavigateBar>
  <div class="common-layout">
    <el-container >

    <!-- 侧边导航栏 -->
      <el-aside width="20vw" class="el-aside">
        
        <!-- active-text-color="#6e83f7" -->
        <el-menu
        default-active="2"
        :default-openeds="[ '1','2']"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        active-text-color="#fff"
        id="left"
      >
        <el-sub-menu index="1">
            <!-- 主页管理 -->
          <template #title>
            <!-- <el-icon><location /></el-icon> -->
            <p class="menu-top">{{ i18n.t("personInfo.homePageManage") }}</p>
          </template>

          <!-- 学术主页 -->
            <el-menu-item index="1-1" @click="changeContent(1)">
                <el-icon color="#409EFC"><House /></el-icon>
                <p>{{ i18n.t("personInfo.academicHome") }}</p>
            </el-menu-item>

            <!-- 个人账户 -->
            <el-menu-item index="1-2" @click="changeContent(2)">
                <el-icon><User /></el-icon>
                <p>{{ i18n.t("personInfo.personalAccount") }}</p>
            </el-menu-item>

         
        </el-sub-menu>
        <el-sub-menu index="2">
            <!-- 学术管理 -->
          <template #title>
            <!-- <el-icon><location /></el-icon> -->
            <p class="menu-top">{{ i18n.t("personInfo.academicManage") }}</p>
          </template>

          <!-- 我的关注 -->
            <el-menu-item index="2-1" @click="changeContent(3)">
                <el-icon><Bell /></el-icon>
                {{ i18n.t("personInfo.myInterest") }}
            </el-menu-item>

            <!--论文收藏  -->
            <el-menu-item index="2-2" @click="changeContent(4)">
                <el-icon><Star /></el-icon>
                {{ i18n.t("personInfo.paperCollection") }}
            </el-menu-item>

            <!--浏览历史  -->
            <el-menu-item index="2-3" @click="changeContent(5)">
                <el-icon><Clock /></el-icon>
                {{ i18n.t("personInfo.browsingHistory") }}
            </el-menu-item>
        </el-sub-menu>
       
      </el-menu>

      </el-aside>

      <!-- 右侧内容 -->
      <el-main style="max-width: 55vw;">

        <!-- 学术主页 -->
        <transition name="el-fade-in-linear">
            <div v-if="chosenIndex == 1" >
                
                <!-- up -->
                <div class="upper-message" v-if="is_author_binded">
                        <p>{{ i18n.t("personInfo.intro1") }}<el-link type="primary" @click="goToHomepage()">{{ scholarProfile.name }}</el-link>
                            {{ i18n.t("personInfo.intro2") }}
                            <el-link  style="color:#4d66f6" @click="showUnbindDialog">{{ i18n.t("personInfo.unbind") }}</el-link>

                        </p>
                         <!-- 解绑确认弹窗 -->
                         <!-- title={{ i18n.t("personInfo.unbindConfirm") }} -->
                        <el-dialog
                            
                            v-model="unbindDialogVisible"
                            width="30%"
                            
                            >
                            <template #header>
                                <p style="font-size: 17px;">{{ i18n.t("personInfo.unbindConfirm") }}</p>
                            </template>
                            <p>
                                {{ i18n.t("personInfo.unbindNotice") }}
                            </p>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="cancelUnbind">{{ i18n.t("personInfo.cancel") }}</el-button>
                                <el-button type="danger" @click="confirmUnbind">{{ i18n.t("personInfo.confirm") }}</el-button>
                            </div>
                        </el-dialog>
                        
                </div>

                <!-- below -->
                <div style="display: flex;" v-if="is_author_binded"> 

                    <div style="width: 70%;">
                        <ScholarProfile :scholar-id=author_id />

                        <div style="margin-top: 2vh;">
                            <el-menu
                            :default-active="activeIndex"
                            class="el-menu-demo"
                            mode="horizontal"
                            @select="handleSelect"
                            
                            active-text-color="#6e83f7"
                        >   
                            <!-- 基本信息 -->
                            <el-menu-item index="1" @click="changeInformContent(1)" >{{ i18n.t("personInfo.basicInformation") }}</el-menu-item>
                            <!-- 论文列表 -->
                            <el-menu-item index="2" @click="changeInformContent(2)">{{ i18n.t("personInfo.paperList") }}</el-menu-item>
                            </el-menu>

                            <transition name="el-fade-in-linear">
                            <div v-if="informIndex == 1">  
                                <PersonalInfo :scholar-id="author_id" :key="key"></PersonalInfo>
                            </div>
                            </transition>

                            <transition name="el-fade-in-linear">
                            <div v-if="informIndex == 2">  
                                <el-row v-for="data in articleData" :key="data.id">
                                    <ArticleView :data="data" :key="key"></ArticleView>
                                </el-row>
                            </div>
                            </transition>

                        </div>
                        

                    </div>

                    <div style="width: 40%; margin-left: 1vw; ">
                        
                        <RadarInfo :data="scholarMetrics"></RadarInfo>
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
                                <CooperationInfo :scholar-id="author_id"></CooperationInfo>
                            </div>
                            </transition>

                            <transition name="el-fade-in-linear">
                            <div v-if="cooperationIndex == 2">  
                                <CooperationAgency :scholar-id="author_id"></CooperationAgency>
                            </div>
                            </transition>

                    </div>

                </div>
                
                <!-- 未绑定学者时 -->
                <div style="display: flex; " v-if="!is_author_binded">
                    <div style="width: 100%;min-height: 14vh;background-color: #fff; text-align: left;">
                        <div class="label">
                            <p style="float: left;">{{ i18n.t("personInfo.bindScholarHomePage") }}</p>
                        </div>
                        <div class="label1">
                            <p style="float: left;">{{ i18n.t("personInfo.intro3") }}
                                <el-tooltip placement="bottom"  effect="light">
                                    <!-- {{ i18n.t("personInfo.bindNotice") }} -->
                                    <template #content> 
                                        学者认证过程 <br />
                                        1.进入热门学者页面<br />
                                        2.进行学者的搜索<br />
                                        3.进入对应学者主页<br />
                                        4.点击'认领'按钮,进行学者的绑定<br />
                                        <br />
                                        </template>
                                    <el-button type="" size="large"  link>
                                        <el-icon><QuestionFilled /></el-icon>
                                    </el-button>
                                </el-tooltip>
                            </p>
                            
                        </div>
                        
                        <div style="padding-right: 3vw;">
                            <el-button color="#626aef" style="float:right" @click="goToAuthorSearchpage()"> {{ i18n.t("personInfo.popularScholarPage") }}</el-button>
                        </div>
                        
                    </div>
                
                </div>

                

            </div>
        </transition>

        <!-- 个人信息 -->
        <transition name="el-fade-in-linear">
            <div v-if="chosenIndex == 2">

                <el-card shadow="hover" style="width: 100%;">
                <div style="display: flex; align-items: center;margin-left: 40%;">
                  <el-avatar :size="80" :round="true" :src="this.user_avatar" ></el-avatar>
                  
                </div>
                </el-card>
                
                <div style="display: flex;" >
                    <div class="inform-card" style="width: 45%;">

                    <p class="inherited-styles-for-exported-element" >基本信息</p>

                    <el-form :model="person" label-width="80px">
                    <el-form-item label="名字">
                        <el-input v-model="person.realName"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="姓氏">
                        <el-input v-model="person.lastName"></el-input>
                    </el-form-item> -->
                    <el-form-item label="昵称">
                        <el-input v-model="person.nickName"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio-group v-model="person.gender">
                        <el-radio label="男">男</el-radio>
                        <el-radio label="女">女</el-radio>
                        <el-radio label="保密">保密</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="职位">
                        <el-input v-model="person.position"></el-input>
                    </el-form-item>
                    <el-form-item label="学科">
                        <el-input v-model="person.subject"></el-input>
                    </el-form-item>
                    <el-form-item label="单位">
                        <el-input v-model="person.organization"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveForm">保存</el-button>
                    </el-form-item>
                    </el-form>
                    </div>

                    <div class="inform-card" style="margin-left: 3vw; width: 45%; ">
                        <p class="inherited-styles-for-exported-element" >账号绑定</p>
                        <div class="bind-form" >
                            <el-icon :size="30" style="margin-left: 3vh;"><Cellphone /></el-icon>
                            <span class="bind-form-font">手机</span>
                            <span class="bind-form-font"  style="margin-left: 2vh; color: rgb(42, 165, 42);">已绑定</span>
                            <!-- <el-button  @click="bindPhone" style="float: right;">绑定</el-button> -->
                        </div>

                        <div class="bind-form" >
                            <el-icon :size="30" style="margin-left: 3vh;"><Message /></el-icon>
                            <span class="bind-form-font">邮箱</span>
                            <span class="bind-form-font"  style="margin-left: 2vh; color: rgb(42, 165, 42);">已绑定</span>
                            <!-- <el-button  @click="bindPhone" style="float: right;">绑定</el-button> -->
                        </div>

                        <div class="bind-form" >
                            <el-icon :size="30" style="margin-left: 3vh;"><Lock /></el-icon>
                            <span class="bind-form-font">密码</span>
                            <span class="bind-form-font"  style="margin-left: 2vh; color: rgb(42, 165, 42);">已绑定</span>
                            <!-- <el-button  @click="bindPhone" style="float: right;">绑定</el-button> -->
                        </div>

                    </div>

                    
                </div>
                
              

            </div>
        </transition>
        
        <!-- 我的关注 -->
        <transition name="el-fade-in-linear">
            <div v-if="chosenIndex == 3">

            <FollowTopics :dynamic-tags="person.interested_concepts"></FollowTopics>

            <div class="follow-list">

                <div class="label">
                    <p style="float: left;">我的关注</p>
                </div>
                <div style="margin-top: 2vh;">
                            <el-menu
                            :default-active="activeIndex"
                            class="el-menu-demo"
                            mode="horizontal"
                            @select="handleSelect"
                            
                            active-text-color="#6e83f7"
                        >   
                            <!--  -->
                            <el-menu-item index="1" @click="changeFollowContent(1)" >关注的学者</el-menu-item>
                            <!---->
                            <el-menu-item index="2" @click="changeFollowContent(2)">关注的期刊会议</el-menu-item>

                            <el-menu-item index="3" @click="changeFollowContent(3)">关注的机构</el-menu-item>
                            </el-menu>

                            

                            <transition name="el-fade-in-linear">
                            <div v-if="followIndex == 1">  
                                <FollowScholar></FollowScholar>
                            </div>
                            </transition>

                            <transition name="el-fade-in-linear">
                            <div v-if="followIndex == 2">  
                                开发中
                            </div>
                            </transition>

                            <transition name="el-fade-in-linear">
                            <div v-if="followIndex == 3">  
                                开发中
                            </div>
                            </transition>

                </div>
            </div >

            </div>
        </transition>

        <!-- 论文收藏 -->
        <transition name="el-fade-in-linear">
            <div v-if="chosenIndex == 4">
            
            <PaperCollection></PaperCollection>
            
            </div>
        </transition>

        <!-- 浏览历史 -->
        <transition name="el-fade-in-linear">
            <div v-if="chosenIndex == 5">
            
            <BrowsingHistory></BrowsingHistory>
            
            </div>
        </transition>
        
      </el-main>
    </el-container>
  </div>
    </div>

</template>

<script setup>
import i18n from "../locales/index.js";
</script>

<script>
import axios from "axios";
import ScholarProfile from '../components/personInfoView/ScholarProfile.vue';
import PersonalInfo from '../components/personInfoView/PersonInfo.vue';
import RadarInfo from '../components/personInfoView/RadarInfo.vue';
import CooperationInfo from '../components/personInfoView/CooperationScholar.vue';
import NavigateBar from "../components/NavigateBar.vue";
import FollowTopics from "../components/personInfoView/FollowTopics.vue";
import FollowScholar from '../components/personInfoView/FollowScholar.vue';
import PaperCollection from "../components/personInfoView/PaperCollection.vue";
import BrowsingHistory from "../components/personInfoView/BrowsingHistory.vue";

import CooperationAgency from "../components/personInfoView/CooperationAgency.vue";
import ArticleView from "../components/authorhomeView/ArticleView.vue";

import get from "../functions/Get.js";

import router from "../routes";
import request from "../functions/Request";
import { ElMessage } from 'element-plus';

export default {
    data() {
		return {
            is_author_binded: true,
            author_id:1,
            scholarProfile: {
                avatar: 'https://img1.baidu.com/it/u=3096599450,2589974591&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                name: 'Doggy',
                chineseName: '狗头人',
                title: '教授',
                phone: '',
                fax: '',
                email: '3265092@qq.com',
                englishAffiliation: 'Beihang University',
                chineseAffiliation: '',
                address: '',
                personalWebsite: '',
                officialWebsite: 'https://www.baidu.com',
                google: 'https://www.google.com',
                twitter: '',
                facebook: '',
                youtube: '',
                gender: '',
                language: ''
            },

            scholarMetrics: {
                'H-index':-1,
            },
			chosenIndex: 1,

            email:'', // 主键
            token: null,
            person: {
                realName: 'liu zhao feng',
                nickName: 'morty',
                gender: '男',
                position: '教授',
                subject: '',
                organization: '',
                interested_concepts: [],
            },
            user_avatar:'',

            informIndex: 1,
            followIndex: 1,
            cooperationIndex:1,

            unbindDialogVisible: false, // 控制解绑确认弹窗的显示状态


            articleData:[],
            key:1,
		};
	},
    methods: {

    async loadArticles(){
        const result = await get(
        {
            url: '/author/get_works/',
            params:{
                    author_id:this.author_id,
                    page_num:1,
                    page_size:10,
            },
            addToken: true,
            useTestEnv:false,
            testEnv: 'http://100.103.70.173:8000',
        }
        );
        console.log("get works:",result.data)
        this.key += Date.now()
        this.articleData = result.data.data

    },


    // 显示解绑确认弹窗
    showUnbindDialog() {
      this.unbindDialogVisible = true;
    },

    // 取消解绑
    cancelUnbind() {
      this.unbindDialogVisible = false; // 关闭弹窗
    },
    // 确认解绑
    async confirmUnbind() {
      // 在这里执行解绑逻辑，可以调用后端接口等
      const result = await request(
        {
            url: '/user/relieve_certification/',
            params:{
                
            },
            addToken:true,
            useTestEnv:false,
            testEnv: 'http://100.103.70.173:8000',
        }
        );
        if(result){
            ElMessage({
              message:"解绑成功",
              type: "success"
            })
          }
        console.log(result)



      // 解绑完成后，可以关闭弹窗，并执行其他操作
      this.is_author_binded = false;
      this.unbindDialogVisible = false;
      // 在这里可以添加解绑完成后的逻辑
    },

    goToHomepage() {

    
        const parts = this.author_id.split("/");
        const desiredId = parts[parts.length - 1];
        console.log("goto: ",'/authorhome/'+desiredId)
        router.push(`/authorhome/${desiredId}`);
    },

    goToAuthorSearchpage() {
      // const homepageUrl = this.links.find(link => link.id === 1)?.url;
    //   const pageUrl = ''
    //   console.log("goto:",pageUrl)
    //   if (pageUrl) {
    //     window.open(pageUrl, '_blank');
    //   }
    router.push(`/scholar`);
    },

    async loadscholarMetrics(){

        const result = await get(
        {
            url: '/author/get_scholar_metrics/',
            params:{
                author_id: this.author_id
            },
            useTestEnv:false,
            testEnv: 'http://100.103.70.173:8000',
        }
        );
        console.log(result.data)
        this.scholarMetrics = result.data;
        

    },

    async loadscholarProfile(){

        const result = await get(
        {
            url: '/author/get_author_by_id',
            params:{
                author_id: this.author_id
            },
            useTestEnv:false,
            testEnv: 'http://100.103.70.173:8000',
        }
        );
        console.log(result.data)
        this.scholarProfile = result.data;


        },



    async loadUserInfo(){
        const result = await get(
        {
            url: '/user/get_user_info/',
            params:{

            },
            addToken: true,
            useTestEnv:false,
            testEnv: 'http://100.117.229.168:8000',
        }
        );
        console.log("UserInfo",result.data)
        this.person = result.data;
        this.person.nickName = result.data.name;
        this.person.realName = result.data.real_name;
        this.author_id = result.data.author_id;
        if(! this.author_id){
            this.is_author_binded = false;
        }

    },

    async loadUserAvatar(){
        const result = await get(
        {
            url: '/user/get_user_avatar/',
            params:{
                
            },
            addToken: true,
            useTestEnv:false,
            testEnv: 'http://100.103.70.173:8000',
        }
        );
        console.log("UserAvatar:",result.data)
        this.user_avatar = result.data;
        
    },



    async changeContent(index) {
        if(index===2 ){
            this.loadUserInfo()
            this.loadUserAvatar()
        }
        if(index ===1){

            if(this.author_id){
                this.loadscholarMetrics();
                this.loadscholarProfile()
            }
                
        }


        this.chosenIndex = -1;
          setTimeout(() => {
          this.chosenIndex = index;
        },300); // 这里设置一个延迟，
       
    console.log(`切换到按钮${index}的内容`);
    // localStorage.setItem('activeIndex:',this.activeIndex)

        
      },

      async saveForm() {
      // 在这里可以将表单数据保存到后端或执行其他操作
      console.log(this.person);
      const result = await request(
        {
            url: '/user/change_user_info/',
            params:{
                name: this.person.nickName,
                real_name: this.person.realName,
                position: this.person.position,
                organization: this.person.organization,
                subject: this.person.subject,
                gender: this.person.gender
            },
            addToken: true,
            useTestEnv:false,
            testEnv: 'http://100.103.70.173:8000',
        }
        );
        if(result){
            ElMessage({
                message: "修改信息成功",
                type: "success"
            })
        }
        console.log("save:",result)

    },

    async changeInformContent(index) {

        if(index == 2){
            this.loadArticles();
        }
        if(index ==1){
            this.key+= Date.now()
        }

       this.informIndex = -1;
          setTimeout(() => {
          this.informIndex = index;
        },200); // 这里设置一个延迟，
       
    console.log(`切换到inform${index}的内容`);
    // localStorage.setItem('activeIndex:',this.activeIndex)

      },

    async changeFollowContent(index) {
       this.followIndex = -1;
          setTimeout(() => {
          this.followIndex = index;
        },200); // 这里设置一个延迟，
       
    console.log(`切换到follow${index}的内容`);
    // localStorage.setItem('activeIndex:',this.activeIndex)

      },

      async changeCooperationContent(index) {
       this.cooperationIndex = -1;
          setTimeout(() => {
          this.cooperationIndex = index;
        },200); // 这里设置一个延迟，
       
    console.log(`切换到follow${index}的内容`);
    // localStorage.setItem('activeIndex:',this.activeIndex)

      },


     
    },

    components: {
    ScholarProfile,
    PersonalInfo,
    RadarInfo,
    CooperationInfo,
    NavigateBar,
    FollowTopics,
    FollowScholar,
    PaperCollection,
    BrowsingHistory,
    CooperationAgency,
  },

  mounted(){


    console.log("userInfo:",JSON.parse(localStorage.getItem("userInformation")))

    this.token = JSON.parse(localStorage.getItem("userInformation")).token
    this.email = JSON.parse(localStorage.getItem("userInformation")).email
    console.log("token:",this.token)
    console.log("email:",this.email)

    this.loadUserInfo().then(() => {
        console.log("author_id:",this.author_id)
        if(this.author_id){
            this.loadscholarMetrics();
            this.loadscholarProfile();
            this.loadArticles();
        }
        
    });
    
    
  },
}
</script>




<style scoped>

.label1{
    font-size: 1em;
    line-height: 1.09090909em;
    color: #7c7c7c;
    /* margin-bottom: 5vh; */
    /* font-weight: 700; */
    /* float: left; */

    height:1.4vh;
    width: 100%;

    padding-left: 1.4vw;
    /* padding-top: 2vh; */
    background-color: #fff;
    
}

.upper-message{
    padding-top: 0.5vh;
    padding-left: 2vw;

    width: 100%;
    /* max-height: 7vh; */
    min-height: 5vh;

    margin-bottom: 2vh ;
    background-color: rgb(255, 255, 255);
    text-align: left;

    font-size: 13px;
    
}

.follow-list{
    margin-top: 3vh;
    background-color: #fff;
}
.label{
    font-size: 1.22222222em;
    line-height: 1.09090909em;
    color: #373737;
    /* margin-bottom: 5vh; */
    font-weight: 700;
    /* float: left; */

    height:1.5vh;
    width: 100%;


    padding-left: 1.4vw;
    padding-top: 2vh;


    background-color: #fff;
    
}


#left .el-menu .el-menu-item.is-active, .el-menu .el-submenu.is-active {
    background-color: #6e83f7 !important;
}

.bind-form-font{
    width: 30px; font-size: 15px; font-display: center;
}

.bind-form{
    display: inline-block; 
    margin-left: -30%;
    margin-bottom: 3vh;
    width: 100%;
}

.inherited-styles-for-exported-element {
  color: #414040;
  font-family: "PingFang SC", "Microsoft YaHei", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight:800;
  line-height: 16px;
  tab-size: 4;

  text-align: left;
  margin-left: 3vh;
  margin-bottom: 3vh;

  word-break: break-word;

}

.inform-card{
    background-color:rgb(255, 255, 255);
    margin-top: 3vh;
    padding-top: 3vh;
    padding-bottom: 3vh;
    padding-right: 3vh;
}

.common-layout{
    /* background-color: rgb(223, 223, 226); */
    background-color: #f0f1f4;
    width: 100%;
    /* height: 90vh; */
    margin-top: 11vh;
}
.menu-top{
    line-height: 1.33333333em;
    font-size: 1em;
    font-weight: 700;
    color: #222;
}

.el-aside{
    /* margin-left: 25vh; */
    margin-left: 12%;
    margin-top: 2.8vh;
}
</style>


<style >
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



