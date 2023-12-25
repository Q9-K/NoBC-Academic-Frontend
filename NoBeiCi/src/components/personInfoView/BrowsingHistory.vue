<template>
    <div>
        <div class="favorite-uppart">
                <div class="label">
                    <p style="float: left;">浏览历史</p>
                </div>
                <div class="label1">
                    <p style="float: left;">当前浏览记录共{{paperCount}}条</p>
                </div>
        </div>

        <div class="paper-collection-list">
    <div v-for="(paper, index) in paperCollection" :key="index" class="paper-item">
      
      <div class="upper-part">
          <div class="info">
            <router-link to="/thesisDetail/{{ paper.id }}"><div class="title"><el-image src="https://t9.baidu.com/it/u=3917977667,2615684315&fm=193" style="width: 30px; height: 30px" fit="cover"/>{{ paper.title }}</div></router-link>
            <div class="author">
              <span v-for="(author, authorIndex) in paper.authors" :key="authorIndex">
                <!-- <a :href="author.homepage" @click="goToHomepage(author)"  style="color: #067C08;">{{ author.name }}</a>
                 -->
                 <el-link type="success" @click="goToHomepage(author)" style="color: #067C08;font-size: 12.5px;"  >{{ author.name }}</el-link>
                <span v-if="authorIndex !== paper.authors.length - 1">, </span>
              </span>
            </div>
              </div>
          <div class="actions">
            <div class="shouchang-button">
                <el-button
                type="primary"
                size="mini"
                @click="unCollect(paper)"
                color="#626aef"
                v-if="paper.collected"
              >
                已收藏
              </el-button>

              <el-button
                type="primary"
                size="mini"
                @click="collect(paper)"
                color="#626aef"
                v-else
                plain
              >
                <el-icon><CirclePlus /></el-icon>收藏
              </el-button>

            </div>
            <div class="lower-button">
              <el-button size="mini" color="#d9dde6" @click="viewCitation(paper)" >
              引用
            </el-button>
            </div>

            <el-dialog
                title="论文引用格式"
                v-model="citationDialogVisible"
                width="50%"
                :modal="false"
              >
                <p>{{ paper.citation }}</p>
                <el-button @click="copyCitation(paper)">复制</el-button>
              </el-dialog>

            
          </div>
      </div>
      
      <el-divider border-style="double" />
      <div class="bottom-part">
        <!-- <div class="collection-time" v-if="paper.collected">
        {{ paper.collectionTime }} 收藏
      </div> -->
      </div>
      
    </div>
  </div>

    </div>
    
</template>

<script>
import get from '../../functions/Get';
import router from '../../routes';
import request from '../../functions/Request';
import { ElMessage } from 'element-plus';


export default {
    name: 'PaperCollectionList',
  data() {
    return {
      paperCollection: [
        {
          title: 'Prompt-to-Prompt Image Editing with Cross Attention Control',
          authors: [
            { name: 'Amir Hertz', homepage: 'https://example.com/amirhertz' },
            { name: 'John Doe', homepage: 'https://example.com/johndoe' },
          ],
          collected: false,
          collectionTime: '2023-11-28 20:53',
        },
        {
          title: 'Constitutional AI: Harmlessness from AI Feedback',
          authors: [
            { name: 'Yuntao Bai', homepage: 'https://example.com/yuntaobai' },
            { name: 'Jane Smith', homepage: 'https://example.com/janesmith' },
          ],
          collected: false,
          collectionTime: '2023-11-27 18:30',
        },
        // 添加更多论文...
      ],

      citationDialogVisible :false
    };
  },
  methods: {

    copyCitation(paper) {
      const textarea = document.createElement('textarea');
      textarea.value = paper.citation;
      document.body.appendChild(textarea);

      // 选中并复制文本
      textarea.select();
      document.execCommand('copy');

      // 移除textarea元素
      document.body.removeChild(textarea);

      // 提示复制成功
      ElMessage({
        message: '引用格式已复制成功',
        type: 'success',
      })
      
      console.log("引用格式已复制：" + this.citationFormat);
      // 可以根据需要添加复制成功提示等逻辑
    },



    toggleCollection(paper) {
      // 切换收藏状态
      paper.collected = !paper.collected;
    },
    viewCitation(paper) {
      // 处理查看引用逻辑
      console.log('查看引用', paper);
      this.citationDialogVisible = true
    },

    async collect(paper){
      
      const result = await request(
        {
            url: '/user/add_favorite/',
            params:{
              work_id: paper.id
            },
            addToken: true,
            useTestEnv:false,
            testEnv: 'http://100.117.229.168:8000',
        }
        );
       
        console.log(result)
        if(result){
           paper.collected = true;
           ElMessage({
            message: "收藏成功",
            type: 'success',
          })
        }
        
    },

    async unCollect(paper){
      const result = await request(
        {
            url: '/user/remove_favorite/',
            params:{
              work_id: paper.id
            },
            addToken: true,
            useTestEnv:false,
            testEnv: 'http://100.117.229.168:8000',
        }
        );

        
        console.log(result)
        if(result){
          paper.collected = false;
          ElMessage({
          message: "取消收藏成功",
          type: 'success',
          })
        }

        
    },

    goToHomepage(author){

      const parts = author.id.split("/");
      const desiredId = parts[parts.length - 1];
      console.log("goto: ",'/authorhome/'+desiredId)
      router.push(`/authorhome/${desiredId}`);

      },


    async loadPaper(){
      const result = await get(
        {
            url: '/user/get_histories/',
            params:{
              // author_id: this.scholar.scholar_id
            },
            addToken: true,
            useTestEnv:false,
            testEnv: 'http://100.117.229.168:8000',
        }
        );
        
        
        console.log(result)
        this.paperCollection = result.data
    }

  },

  mounted(){
    this.loadPaper()
  },

  computed: {
    paperCount() {
      // return this.paperCollection.filter(p => p.collected).length;
      return this.paperCollection.length;
    },
  },
}
</script>

<style scoped>
.favorite-uppart{
    width: 100%;
    height: 14vh;
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

.paper-collection-list {
  margin-top: 20px;
}

.paper-item {
  /* display: flex; */
  /* align-items: center; */
  margin-bottom: 10px;
  padding-top: 2vh;
  /* height: 15vh; */
 

  background-color: #fff;
}

.lower-button{
  margin-top: 1vh;
}

.upper-part{
  width: 100%;
  display: flex;
  margin-bottom: 5vh;
}

.bottom-part{
  text-align: right;
  margin-top: -1.5vh;
}

.info {
  /* flex: 1; */
  text-align: left;
  width: 70%;
  padding-left: 4%;
}

.title {
  /* font-weight: bold; */
  font-size: 18px;
  color: #000;
  line-height: 22px;
}

.author{
  color: #067C08;
  font-size: 12px;
  
}

.actions {
  margin-left: 10px;
  /* display: flex; */
  width: 20%;
  margin-left: auto;
  padding-top: 1vh;
}

.collection-time {
  /* margin-top: 5px; */
  margin-right: 1vw;
  color: #545454;
  font-size: 14.2222px;
}
</style>