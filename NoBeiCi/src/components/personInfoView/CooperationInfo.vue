<template>
    <div class="collaborators">
      
        <p class="inherited-styles-for-exported-element">合作学者</p>
       

        <!-- 列表 -->
        <div class="scholar-profile" v-for="(collaborator, index) in collaborators" :key="index" :span="8">
      
        
            <div class="left-panel">
        <!-- <img  class="avatar" alt="Avatar"> -->
        <el-avatar shape="circle" :size="45" :fit="cover" :src="collaborator.avatar" 
        :border="true" style="border: 2px solid rgb(20, 177, 20); "/>
        
            </div>
            <div class="right-panel">
                <div class="info">
                <div style="display: flex;">
                    <p class="name">{{ collaborator.name }}</p> 
                    <span class="left-top">合作论文数</span>
                </div>
                <div style="display: flex;">
                <p class="affiliation">{{ collaborator.organization }}</p>
                <span class="left-bottom">{{ collaborator.paperCount }}</span>
                </div>
                </div>
                <el-divider style="margin: 0;" border-style="dashed" />
            </div>

        </div>
        
      
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        collaborators: [
          {
            name: 'Person1',
            organization: 'Beihang',
            avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202005%2F24%2F20200524220637_loonc.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1699242184&t=f41c25580df306bdbac3cc339f5fb621',
            paperCount: 10
          },
          {
            name: 'Person2',
            organization: 'Beihang',
            avatar: 'https://img1.baidu.com/it/u=593704177,727860154&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
            paperCount: 5
          },
          // 添加更多合作学者
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .collaborators {
    margin-top: 2vh;
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