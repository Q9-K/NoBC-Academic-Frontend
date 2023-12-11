<template>
    <div class="scholars-list">
      <div v-for="(scholar, index) in scholars" :key="index" class="scholar-item">
        <div class="avatar">
          <img :src="scholar.avatar" alt="avatar" />
        </div>
        <div class="info">
          <div class="name">{{ scholar.name }}</div>
          <div class="papers">论文数：{{ scholar.papers }}</div>
          <div class="intro">{{ scholar.intro }}</div>
          <el-button class="view-papers-btn" size="small" type="primary" @click="viewPapers(scholar)" link>
            查看论文
          </el-button>
        </div>
        <div class="follow-btn">
          <el-button type="primary" size="default" @click="toggleFollow(scholar)">
            {{ scholar.followed ? '已关注' : '关注' }}
          </el-button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'ScholarsList',
    data() {
      return {
        scholars: [
          {
            avatar: 'https://avatarcdn.aminer.cn/upload/avatar/601/480/832/60adf2e09e795e52168e25b6_0.jpg!240',
            name: '学者1',
            papers: 10,
            intro: '这是学者1的简介',
            followed: false,
          },
          {
            avatar: 'https://avatarcdn.aminer.cn/upload/avatar/713/992/1245/561dbb3945ce1e596487659e_1.jpg!240',
            name: '学者2',
            papers: 5,
            intro: '这是学者2的简介',
            followed: true,
          },
          // 添加更多学者...
        ],
      };
    },
    methods: {
      viewPapers(scholar) {
        // 处理查看论文逻辑
        console.log('查看论文', scholar);
      },
      toggleFollow(scholar) {
        // 切换关注状态
        scholar.followed = !scholar.followed;
      },
    },
  };
  </script>
  
  <style scoped>
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
  
  .papers,
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