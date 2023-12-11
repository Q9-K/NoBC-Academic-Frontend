<template>
    <div class="scholar-card">
      <div class="header">
        <div class="avatar">
          <img :src="scholar.avatar" alt="Avatar">
        </div>
        <div class="info">
          <h2>{{ scholar.name }}</h2>
          <p>{{ scholar.title }}</p>
        </div>
      </div>
      <div class="content">
        <p>{{ scholar.englishAffiliation }}</p>
        <div class="buttons" >
          <el-button type="primary" color="#626aef" @click="goToHomepage" circle>
            <el-icon><House /></el-icon>
            </el-button>
          <el-button type="primary" color="#626aef" @click="goToEmail" circle>
            <el-icon><Message /></el-icon>
        </el-button>
          <el-button type="primary" color="#626aef" @click="goToTwitter" circle>
            <el-icon><Message /></el-icon>
            </el-button>
        </div>
        <div class="actions">
          <el-button type="primary" color="#626aef" v-if="!isfollowed" @click="follow" plain><el-icon><Star /></el-icon>关注</el-button>
          <el-button type="primary" color="#626aef" v-else @click="unfollow" ><el-icon><Star /></el-icon>已关注</el-button>

          <el-button type="primary" color="#626aef" plain><el-icon><Avatar /></el-icon>认领</el-button>
          <el-button type="primary" color="#626aef" plain><el-icon><Share /></el-icon>分享</el-button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ScholarCard',
    props: {
      scholar: {
        type: Object,
        required: true
      }
    },

    data(){

        return{
          links: [
            { id: 1, url: 'https://example.com' },
            { id: 2, url: 'https://example.com/research' },
            { id: 3, url: 'https://example.com/papers' }
            ],
          
            isfollowed: false,
            isclaimed:false,
        };
    },

    methods:{
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


    follow(){
        this.isfollowed = true
    },

    unfollow(){
        this.isfollowed = false
    },

    }
  }
  </script>
  
  <style scoped>
  .scholar-card {
    background-color: #6e83f7;
    color: white;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 2.5vh;
  }
  
  .header {
    /* background-color: #6e83f7; */
    width: 100%;

    display: flex;
    align-items: center;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20px;
  }
  
  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .info h2 {
    font-size: 24px;
    margin-bottom: 4px;
  }
  
  .content {
    margin-top: 20px;
    text-align: left;
    /* background-color: aliceblue; */
  }
  
  .buttons a {
    display: inline-block;
    margin-right: 10px;
    color: white;
    text-decoration: none;
  }
  
  .actions button {
    margin-top: 10px;
  }
  </style>