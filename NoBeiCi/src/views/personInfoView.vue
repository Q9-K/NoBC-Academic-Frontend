<template>

 
  <div class="common-layout">
    <el-container >

    <!-- 侧边导航栏 -->
      <el-aside width="20vw" class="el-aside">
        
        <el-menu
        default-active="2"
        :default-openeds="[ '1','2']"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        active-text-color="#ffd04b"
      >
        <el-sub-menu index="1">
          <template #title>
            <!-- <el-icon><location /></el-icon> -->
            <p class="menu-top">主页管理</p>
          </template>

            <el-menu-item index="1-1" @click="changeContent(1)">
            
                <el-icon color="#409EFC"><House /></el-icon>
                <p>学术主页</p>
            </el-menu-item>
            <el-menu-item index="1-2" @click="changeContent(2)">
                <el-icon><User /></el-icon>
                <p>个人账户</p>
            </el-menu-item>

         
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <!-- <el-icon><location /></el-icon> -->
            <p class="menu-top">学术管理</p>
          </template>

            <el-menu-item index="2-1" @click="changeContent(3)">
                <el-icon><Bell /></el-icon>
                我的关注
            </el-menu-item>
            <el-menu-item index="2-2" @click="changeContent(4)">
                <el-icon><Star /></el-icon>
                论文收藏
            </el-menu-item>
            <el-menu-item index="2-3" @click="changeContent(5)">
                <el-icon><Clock /></el-icon>
                浏览历史
            </el-menu-item>
        </el-sub-menu>
       
      </el-menu>

      </el-aside>

      <!-- 右侧内容 -->
      <el-main style="max-width: 55vw;">

        <!-- 学术主页 -->
        <transition name="el-fade-in-linear">
            <div v-if="chosenIndex == 1" style="display: flex;">
                
                <div style="width: 70%;">
                    <ScholarProfile/>

                    <div style="margin-top: 2vh;">
                        <el-menu
                        :default-active="activeIndex"
                        class="el-menu-demo"
                        mode="horizontal"
                        @select="handleSelect"
                        
                        active-text-color="#ffd04b"
                    >
                        <el-menu-item index="1" @click="changeInformContent(1)" >基本信息</el-menu-item>
                        <el-menu-item index="2" @click="changeInformContent(2)">论文列表</el-menu-item>
                        </el-menu>

                        <transition name="el-fade-in-linear">
                        <div v-if="informIndex == 1">  
                            <PersonalInfo></PersonalInfo>
                        </div>
                        </transition>

                        <transition name="el-fade-in-linear">
                        <div v-if="informIndex == 2">  
                            nmsl
                        </div>
                        </transition>

                    </div>
                    

                </div>

                <div style="width: 40%; margin-left: 1vw; ">
                    <RadarInfo :data="scholarMetrics"></RadarInfo>

                    <CooperationInfo></CooperationInfo>
                </div>
                

            </div>
        </transition>

        <!-- 个人信息 -->
        <transition name="el-fade-in-linear">
            <div v-if="chosenIndex == 2">

                <el-card shadow="hover" style="width: 100%;">
                <div style="display: flex; align-items: center;">
                  <el-avatar :size="80" :round="true">M</el-avatar>
                  
                </div>
                </el-card>
                
                <div style="display: flex;" >
                    <div class="inform-card" style="width: 45%;">

                    <p class="inherited-styles-for-exported-element" >基本信息</p>

                    <el-form :model="person" label-width="80px">
                    <el-form-item label="名字">
                        <el-input v-model="person.firstName"></el-input>
                    </el-form-item>
                    <el-form-item label="姓氏">
                        <el-input v-model="person.lastName"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称">
                        <el-input v-model="person.nickname"></el-input>
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
                            <span class="bind-form-font"  style="margin-left: 2vh; color: brown;">未绑定</span>
                            <el-button  @click="bindPhone" style="float: right;">绑定</el-button>
                        </div>

                        <div class="bind-form" >
                            <el-icon :size="30" style="margin-left: 3vh;"><Message /></el-icon>
                            <span class="bind-form-font">邮箱</span>
                            <span class="bind-form-font"  style="margin-left: 2vh; color: brown;">未绑定</span>
                            <el-button  @click="bindPhone" style="float: right;">绑定</el-button>
                        </div>

                        <div class="bind-form" >
                            <el-icon :size="30" style="margin-left: 3vh;"><Lock /></el-icon>
                            <span class="bind-form-font">密码</span>
                            <span class="bind-form-font"  style="margin-left: 2vh; color: brown;">未绑定</span>
                            <el-button  @click="bindPhone" style="float: right;">绑定</el-button>
                        </div>

                    </div>

                    
                </div>
                
              

            </div>
        </transition>
        
      </el-main>
    </el-container>
  </div>


</template>

<script>
import ScholarProfile from '../components/personInfoView/ScholarProfile.vue';
import PersonalInfo from '../components/personInfoView/PersonInfo.vue';
import RadarInfo from '../components/personInfoView/RadarInfo.vue';
import CooperationInfo from '../components/personInfoView/CooperationInfo.vue';

export default {
    data() {
		return {
            scholarMetrics: {
                Papers: 100,
                Citation: 200,
                'H-Index': 50,
                'G-Index': 60,
                Sociability: 70,
                Diversity: 80,
                Activity: 90,
            },
			chosenIndex: 1,
            person: {
                firstName: '',
                lastName: '',
                nickname: '',
                gender: '',
                position: '',
                subject: '',
                organization: ''
            },
            informIndex: 1,
		};
	},
    methods: {

    async changeContent(index) {
       this.chosenIndex = -1;
          setTimeout(() => {
          this.chosenIndex = index;
        },300); // 这里设置一个延迟，
       
    console.log(`切换到按钮${index}的内容`);
    // localStorage.setItem('activeIndex:',this.activeIndex)

      },

      saveForm() {
      // 在这里可以将表单数据保存到后端或执行其他操作
      console.log(this.form);
    },

    async changeInformContent(index) {
       this.informIndex = -1;
          setTimeout(() => {
          this.informIndex = index;
        },200); // 这里设置一个延迟，
       
    console.log(`切换到inform${index}的内容`);
    // localStorage.setItem('activeIndex:',this.activeIndex)

      },

      saveForm() {
      // 在这里可以将表单数据保存到后端或执行其他操作
      console.log(this.form);
    },
    },

    components: {
    ScholarProfile,
    PersonalInfo,
    RadarInfo,
    CooperationInfo,
  },
}
</script>



<style scoped>





.el-menu .el-menu-item.is-active, .el-menu .el-submenu.is-active {
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
    margin-top: 10vh;
}
.menu-top{
    line-height: 1.33333333em;
    font-size: 1em;
    font-weight: 700;
    color: #222;
}

.el-aside{
    margin-left: 25vh;
    margin-top: 4vh;
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



