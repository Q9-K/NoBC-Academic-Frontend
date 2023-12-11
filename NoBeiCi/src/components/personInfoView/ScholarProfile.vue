<template>
    <div class="scholar-profile">
      <div class="left-panel">
        <!-- <img  class="avatar" alt="Avatar"> -->
        <el-avatar shape="circle" :size="100" :fit="cover" :src="this.scholarProfile.avatar" />
      </div>
      <div class="right-panel">
        <div class="info">
            <el-button style="float: right;" @click="this.editing = ! this.editing" circle><el-icon><Edit /></el-icon></el-button>
          <p class="name">{{ this.scholarProfile.name }}</p>
          
          <p class="affiliation">{{ this.scholarProfile.englishAffiliation }}</p>
        </div>
        <div class="buttons" v-if="!editing">
          <el-button type="primary" color="#626aef" @click="goToHomepage" circle>
            <el-icon><House /></el-icon>
            </el-button>
          <el-button type="primary" color="#626aef" @click="sendEmail" circle>
            <el-icon><Message /></el-icon>
        </el-button>
          <el-button type="primary" color="#626aef" @click="goToTwitter" circle>
            <el-icon><Message /></el-icon>
            </el-button>
        </div>
        <div v-else>
        <el-form label-position="right"
        label-width="auto" style="max-height: 40vh; overflow: scroll; ">
          <el-form-item label="姓名">
            <el-input v-model="scholarProfile.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="中文姓名">
            <el-input v-model="scholarProfile.chineseName" placeholder="请输入中文姓名"></el-input>
          </el-form-item>
          <el-form-item label="职称">
            <el-input v-model="scholarProfile.title" placeholder="请输入职称"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="scholarProfile.phone" placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item label="传真">
            <el-input v-model="scholarProfile.fax" placeholder="请输入传真"></el-input>
          </el-form-item>
          <el-form-item label="电子邮件">
            <el-input v-model="scholarProfile.email" placeholder="请输入电子邮件"></el-input>
          </el-form-item>
          <el-form-item label="英文单位">
            <el-input v-model="scholarProfile.englishAffiliation" placeholder="请输入英文单位"></el-input>
          </el-form-item>
          <el-form-item label="中文单位">
            <el-input v-model="scholarProfile.chineseAffiliation" placeholder="请输入中文单位"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="scholarProfile.address" placeholder="请输入地址"></el-input>
          </el-form-item>
          <el-form-item label="个人主页">
            <el-input v-model="scholarProfile.personalWebsite" placeholder="请输入个人主页"></el-input>
          </el-form-item>
          <el-form-item label="官方主页">
            <el-input v-model="scholarProfile.officialWebsite" placeholder="请输入官方主页"></el-input>
          </el-form-item>
          <el-form-item label="Google">
            <el-input v-model="scholarProfile.google" placeholder="请输入Google"></el-input>
          </el-form-item>
          <el-form-item label="Twitter">
            <el-input v-model="scholarProfile.twitter" placeholder="请输入Twitter"></el-input>
          </el-form-item>
          <el-form-item label="Facebook">
            <el-input v-model="scholarProfile.facebook" placeholder="请输入Facebook"></el-input>
          </el-form-item>
          <el-form-item label="YouTube">
            <el-input v-model="scholarProfile.youtube" placeholder="请输入YouTube"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="scholarProfile.gender" placeholder="请输入性别"></el-input>
          </el-form-item>
          <el-form-item label="语言">
            <el-input v-model="scholarProfile.language" placeholder="请输入语言"></el-input>
          </el-form-item>
          
        </el-form>
        <el-row style="margin-top: 1vh;margin-bottom: 1vh;">
            <el-button type="primary" @click="saveProfile">提交</el-button>
            <el-button @click="cancelEditing">取消</el-button>
          </el-row>
      </div>

      </div>
    </div>
  </template>
  
  <script>
  export default {
    // name: 'ScholarProfile',
    // props: {
    //   scholar: {
    //     type: Object,
    //     required: true
    //   }
    // },
    data(){
        return{
            // scholar: {
            //     avatar: 'https://img1.baidu.com/it/u=3096599450,2589974591&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            //     name: 'Doggy (狗头人)',
            //     affiliation: 'Beihang University'
            // },
            editing: false,
            scholarProfile: {
                avatar: 'https://img1.baidu.com/it/u=3096599450,2589974591&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                name: 'Doggy',
                chineseName: '狗头人',
                title: '教授',
                phone: '',
                fax: '',
                email: '',
                englishAffiliation: 'Beihang University',
                chineseAffiliation: '',
                address: '',
                personalWebsite: '',
                officialWebsite: '',
                google: '',
                twitter: '',
                facebook: '',
                youtube: '',
                gender: '',
                language: ''
            },

            links: [
            { id: 1, url: 'https://example.com' },
            { id: 2, url: 'https://example.com/research' },
            { id: 3, url: 'https://example.com/papers' }
            ],
        };
    },

    methods: {
      goToHomepage() {
      const homepageUrl = this.links.find(link => link.id === 1)?.url;
      if (homepageUrl) {
        window.open(homepageUrl, '_blank');
      }
    },
    goToEmail() {
      const emailUrl = this.links.find(link => link.id === 2)?.url;
      if (emailUrl) {
        window.open(emailUrl, '_blank');
      }
    },
    goToTwitter() {
      const twitterUrl = this.links.find(link => link.id === 3)?.url;
      if (twitterUrl) {
        window.open(twitterUrl, '_blank');
      }
    },
      saveProfile() {
      // TODO: 提交修改后的学者信息的逻辑
      // 在这里可以将 this.editedProfile 中的数据发送至后端进行保存
      // 提交成功后，更新 this.scholar，并结束编辑模式
    //   this.scholar = { ...this.editedProfile };
        this.editing = false;
    },
    cancelEditing() {
      this.editing = false;
    }
    }
  }
  </script>
  
  <style scoped>


.demo-form-inline .el-input {
  --el-input-width: 120px;
}
  .scholar-profile {
    display: flex;
    background-color: rgb(255, 255, 255);
    
  }
  .right-panel{
    width: 70%;
  }
  .left-panel {
    margin-right: 20px;
    margin-left: 1vw;
    margin-top: 1vh;
  }
  
  .avatar {
    width: 150px;
    height: 150px;
  }
  
  .info {
    margin-bottom: 10px;
    text-align: left;
    margin-left: 1vw;
   
  }
  
  .name {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 1vh;
    
  }
  
  .affiliation {
    font-size: 14px;
    color: #666;
    margin-top: 1vh;
    margin-bottom: 1vh;
  }
  
  .buttons {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    margin-bottom: 15px;
  }
  </style>