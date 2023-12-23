<template>
    <div class="scholars-list" v-if="this.hasScholars" >
      <div v-for="(scholar, index) in scholars" :key="index" class="scholar-item" >
        <div class="avatar">
          <img :src="scholar.avatar" alt="avatar" />
        </div>
        <div class="info">
          <div class="name">{{ scholar.name }}</div>
          <div class="papers">
            <el-tag class="ml-2" type="" effect="plain">论文数：{{ scholar.papers }}</el-tag>
            <el-tag class="ml-2" type="" effect="plain" v-if="scholar.H_index">H-index：{{ scholar.H_index }}</el-tag>
          </div>
          <div class="intro">{{ scholar.englishAffiliation }}</div>
          <el-button class="view-papers-btn" size="small" type="primary" @click="viewPapers(scholar)" link>
            查看论文
          </el-button>
        </div>
        <div class="follow-btn">
          
          <el-button type="primary" size="mini" @click="unFollow(scholar)" color="#626aef" v-if="scholar.followed">
            已关注
          </el-button>
          <el-button type="primary" size="mini" @click="follow(scholar)" color="#626aef" v-else plain>
            <el-icon><CirclePlus /></el-icon>关注
          </el-button>
        
        </div>
      </div>
    </div>
    <div style="height: 3vh;text-align: center;" v-else>
        <p class="label1">您还未关注学者</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import get from "../../functions/Get.js";
  import request from "../../functions/Request.js"
  import { ElMessage } from 'element-plus'
  import router from '../../routes';
  
  export default {
    name: 'ScholarsList',
    data() {
      return {
        scholars: [
          {
            avatar: 'https://avatarcdn.aminer.cn/upload/avatar/601/480/832/60adf2e09e795e52168e25b6_0.jpg!240',
            name: '牛魔成本',
            papers: 10,
            H_index:6,
            englishAffiliation:"beihang University",
            followed: false,
            id:'',
          },
          {
            avatar: 'https://avatarcdn.aminer.cn/upload/avatar/713/992/1245/561dbb3945ce1e596487659e_1.jpg!240',
            name: 'Otto',
            papers: 5,
            H_index:7,
            englishAffiliation:"beijing University",
            followed: true,
            id:'',
          },
        
          // 添加更多学者...
        ],
        hasScholars:true,
      };
    },
    methods: {
      viewPapers(scholar) {
        // 处理查看论文逻辑
        // id:https://openalex.org/A5001494888
        const parts = scholar.id.split("/");
        const desiredId = parts[parts.length - 1];
      
        // const pageUrl = 'localhost:5173/authorhome/'+ desiredId
        router.push(`/authorhome/${desiredId}`);
        console.log('查看论文', scholar);
      },
      toggleFollow(scholar) {
        // 切换关注状态
        scholar.followed = !scholar.followed;
      },


      async follow(scholar){

        const result = await request(
        {
            url: 'http://100.117.229.168:8000/user/follow_scholar/',
            params:{
              scholar_id: scholar.id
            },
            addToken: true,
        }
        );
        if(result){
          ElMessage({
            message: '关注成功',
            type: 'success',
          })
        }

        console.log(result)
        scholar.followed = true;

      },

      async unFollow(scholar){

        const result = await request(
        {
            url: 'http://100.117.229.168:8000/user/unfollow_scholar/',
            params:{
              scholar_id: scholar.id
            },
            addToken: true,
        }
        );
        if(result){
          ElMessage({
            message: '取关成功',
            type: 'success',
          })
        }

        console.log(result)
        scholar.followed = false;

        },

      async loadFollowAuthor(){
        const result = await get(
        {
            url: 'http://100.117.229.168:8000/user/get_follows/',
            params:{

            },
            addToken: true,
        }
        );
        console.log(result.data)
        this.scholars = result.data

        if(this.scholars[0]=== null ||this.scholars.length === 0 )
          this.hasScholars = false

    },
    },


    mounted(){
      this.loadFollowAuthor()
    },
  };
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
      /* background-color: #fff; */
      
  }
  .scholars-list {
    display: flex;
    flex-wrap: wrap;
  }
  
  .scholar-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
  }
  
  .avatar {
    width: 5vw;
    height: 5vw;
    overflow: hidden;
    border-radius: 50%;
    /* margin-right: 5px; */
    margin-left: 3vw;
  }
  
  .avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .info {
    text-align: left;
    padding-left: 2vw;
    padding-top: 2vh;
    padding-bottom: 2vh;
    flex: 1;
  }
  
  .name {
    font-weight: bold;
    font-size: 13px;
  }
  
  .papers{
    margin-left: -1vw;
  }

  .intro {
    font-size: 13px;
    margin-top: 5px;
  }
  
  .view-papers-btn {
    /* margin-top: 10px; */
  }
  
  .follow-btn {
    margin-left: 10px;
    margin-right: 4vw;
  }
  </style>