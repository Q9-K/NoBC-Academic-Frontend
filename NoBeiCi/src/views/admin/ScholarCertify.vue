<script setup>
import {ref,onMounted,nextTick} from 'vue'
import get from "../../functions/Get.js";
import i18n from "../../locales/index.js";
import ImageViewer from "../../components/ImageViewer.vue";
const showInfoList = ref(true);
const detail = ref({
  id:0,
  img:[
    {src:"https://cdn.wwads.cn/creatives/m88Dv8ffgDW2NO9TVOfe2Ee3QYRtwORH2acMe3Id.png",},
    {src:"https://cdn.wwads.cn/creatives/m88Dv8ffgDW2NO9TVOfe2Ee3QYRtwORH2acMe3Id.png",},

  ],
  beizhu:"备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注备注",  
});
const certifications = ref([

])
const certificationsCopy = ref([

])
const scholarList = ref([
{id:"1",name:"111",scholarName:"222",time:"2023/23/01 21:21:09",status:"1"},
{id:"2",name:"222",scholarName:"222",time:"2023/23/01 21:21:09",status:"0"},
{id:"3",name:"333",scholarName:"222",time:"2023/23/01 21:21:09",status:"0"},
{id:"1",name:"444",scholarName:"222",time:"2023/23/01 21:21:09",status:"0"},
{id:"1",name:"111",scholarName:"222",time:"2023/23/01 21:21:09",status:"0"},
{id:"1",name:"111",scholarName:"222",time:"2023/23/01 21:21:09",status:"0"},
{id:"1",name:"111",scholarName:"222",time:"2023/23/01 21:21:09",status:"0"},
{id:"1",name:"111",scholarName:"222",time:"2023/23/01 21:21:09",status:"0"}
])
const checkDetail = (id)=>{
  detail.value.id = id;
  showInfoList.value = !showInfoList.value;
  //getDetail(id);
  imagePreview();
}
const backToList = ()=>{
  getCertifications();
  imageViewerRef.value = null;
  previewImgList.value = [];
  showInfoList.value = !showInfoList.value;
}
const getCertifications = async()=>{
  certifications.value = await get({
      url:"/manager/get_certifications_pending/",
      params:{},
      addtoken: true
  });
  certificationsCopy.value = certifications.value;
}
const getDetail = async(id)=>{
     detail.value  = await get({
      url:"/manager/get_certification_detail/",
      params:{certification_id:id},
      addtoken: true
     });
     
}
onMounted(()=>{
  getCertifications();
})
const sortEarliest = ()=>{

}
const sortLatest = ()=>{


}
const filterTobecertified = ()=>{
  certifications.value = certifications.value.filter(item=>item.status == 0);
}
const showall = ()=>{
  certifications.value = certificationsCopy.value;
}

//图片预览
const imageViewerRef = ref(null);
const previewImgList = ref([]);
const imagePreview = () => {
    const imageNodeList = document
      .querySelector("#detail")
      .querySelectorAll("img");
    console.log(imageNodeList);
    const imageList = [];
    imageNodeList.forEach((item, index) => {
      const src = item.getAttribute("src");
      imageList.push(src);
      item.addEventListener("click", () => {
        imageViewerRef.value.show(index);
      });
    });
    previewImgList.value = imageList;
};
</script>

<template>
  <div class="title">
    {{i18n.t('admin.reviewScholarCertification')}}
  </div>
  <!-- 简略信息列表 -->
  <Transition>
    <div class="brief-infoList" v-show="showInfoList">
      <div class="sort">
        <el-button color="#2353a4" @click="sortEarliest()">{{ i18n.t('admin.sortEarliest') }}</el-button>
        <el-button color="#2353a4" @click="sortLatest()">{{ i18n.t('admin.sortLatest') }}</el-button>
        <el-button color="#2353a4" @click="filterTobecertified()">{{ i18n.t('admin.tobecertified') }}</el-button>
        <el-button color="#2353a4" @click="showall()">{{ i18n.t('admin.showall') }}</el-button>
      </div>
      <div v-for="item in scholarList" class="scholar-item">
          <div class="brief-info">
            <div class="info-title">
              <div class="title-name">{{i18n.t('admin.applicantName')}}</div>
              <div class="title-schName">{{i18n.t('admin.scholarName')}}</div>
              <div class="title-time">{{i18n.t('admin.applicationTime')}}</div>
              <div class="title-status">{{i18n.t('admin.status')}}</div>
            </div>
            <el-divider style="margin: 5px !important"></el-divider>
            <div class="info-info">
              <div class="info-name">{{item.name}}</div>
              <div class="info-schName">{{item.scholarName}}</div>
              <div class="info-time">{{item.time}}</div>
              <div class="info-status">{{item.name}}</div>
            </div>
          </div>
          <div class="detail-button">
            <el-button type="primary"
             @click="checkDetail(item.id)" 
             style="width: 100px"
             color="#2353a4"
             >
              {{ i18n.t('admin.detail') }}
            </el-button>
          </div>
      </div>
    </div>
  </Transition>
  <!-- 详情 -->
  <Transition>
    <div class="detail" id="detail" v-show="!showInfoList">
      <ImageViewer
        ref="imageViewerRef" 
        :imageList="previewImgList"
      ></ImageViewer>
      <div @click="backToList()" class="back-to-list"><el-icon><DArrowLeft /></el-icon>{{i18n.t('admin.backToList')}}</div>
      <div class="detail-panel">
        <div class="info-panel">
          <div class="applicant-scholar">
            <div class="applicant-info">
              {{ i18n.t('admin.applicantName') }}
            </div>
            <el-divider direction="vertical" style="margin: 0; height: 150px; !important;"></el-divider>
            <div class="scholar-info">
              {{ i18n.t('admin.scholar') }}
            </div>
          </div>
          <el-divider style="margin: 0;"></el-divider>
          <div class="certification-label">{{ i18n.t('admin.certification') }}</div>
          
          <div class="certification">
          
            <div v-for="item in detail.img" class="certification-img">
              <el-image :src="item.src" style="width: 330px; height: 250px;"></el-image>
            </div>
          </div>
          <el-divider style="margin: 0;"></el-divider>
          <div class="addition">
            <div class="addition-label">{{ i18n.t('admin.remark') }}</div>
            <el-input
              v-model="detail.beizhu"
              :rows="10"
              type="textarea"
              disabled
            />
          </div>
        </div>
        <el-divider direction="vertical" style="margin: 0; height: 800px !important;"></el-divider>
        <div class="submit-panel">
          <el-button type="success" style="margin-top: 20px; !important">{{ i18n.t('admin.accept') }}</el-button>
          <el-button type="danger" style="margin-top: 20px; !important">{{ i18n.t('admin.decline') }}</el-button>
        </div>
      </div>
    </div>
</Transition>
</template>

<style scoped lang="scss">
.title {
  font-size: 20px;
}
.brief-infoList {
  .sort {
    margin-left: 10px;
    display: flex;
    justify-content: left;
  }
  .scholar-item {
        transition: all 0.3s ease-in-out;
        margin: 10px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 10px;
        background-color: #fff;
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: #333;
      .brief-info {

          .info-title {
            width: 800px;
            display: flex;
            justify-content:space-around;
            align-items: center;
            font-size: 14px;
            color: #333;
              .title-name {
                width: 200px;
              }
              .title-schName {
                width: 200px;
              }
              .title-time {
                width: 300px;
              }
              .title-status{
                width: 100px;
              }
          }
          .info-info {
            width: 800px;
            display: flex;
            justify-content:space-around;
            align-items: center;
            font-size: 14px;
            color: #333;
              .info-name {
                width: 200px;
              }
              .info-schName {
                width: 200px;
              }
              .info-time {
                width: 300px;
              }
              .info-status {
                width: 100px;
              }
          }
      }
        .detail-button {
          width: 400px;
        }
  }
  .scholar-item:hover{
      box-shadow: 3px 3px 12px 0px rgba(0, 0, 0, 0.618);
  }
}
.detail {
    .back-to-list {
      margin: 5px;
      padding-left: 20px;
      text-align: left;
      font-size: 14px;
      color: #000;
      cursor: pointer;
    }
    .back-to-list:hover{
      color: blue;
    }
    .detail-panel {
      margin:0 20px;
      height: 800px;
      border: 1px solid #ccc;
        border-radius: 10px;
        background-color: #fff;
      display: flex;
      justify-content: start;
        .info-panel {
          width: 80%;
          display: flex;
          flex-direction: column;
          .applicant-scholar{
            display: flex;
            height: 150px;
            .applicant-info {
              width: 50%;
              height: 150px;
             
            }
            .scholar-info {
              width: 50%;
              height: 150px;
              
            }
          }
          .certification-label{
            margin-top: 20px;
          }
            .certification {
              height: 350px;
              display: flex;
              overflow-x: scroll;
              justify-content: start;
              align-items: center;
              .certification-img {
                margin:20px;

              }
            }
            .addition{
              height: 300px;
              padding: 20px;
              .addition-label{

              }
            }
        }
        .submit-panel {

          width: 20%;
        }
    }
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(1000px);
}
</style>
