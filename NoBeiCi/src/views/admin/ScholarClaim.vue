<script setup>
import {ref,onMounted,nextTick,watch} from 'vue'
import get from "../../functions/Get.js";
import i18n from "../../locales/index.js";
import ImageViewer from "../../components/ImageViewer.vue";
import request from "../../functions/Request.js";
import { useRouter } from 'vue-router';
const router = useRouter();
const api = {
  getcomplaints: "http://100.117.229.168:8000/manager/get_complaints_all/",
  getcomplaintDetail: "http://100.117.229.168:8000/manager/get_complaint_detail/",
  reviewcomplaint:"http://100.117.229.168:8000/manager/check_complaint/",
}
const showInfoList = ref(true);
const detail = ref({
  id:1,
  user:"",
  author_id:"http://openalex.org/aaa123",
  author_name:"aaa123",
  date_time:"",
  imgs:[]
});
const complaints = ref([


])
const complaintsCopy = ref([

])
const opinion = ref("");
const checkDetail = (id)=>{
  getDetail(id);
  showInfoList.value = !showInfoList.value;
}
const backToList = ()=>{
  imageViewerRef.value = null;
  previewImgList.value = [];
  opinion.value = "";
  detail.value = {
    imgs:[],
    author:{
      avatar:"",
    },
  };
  showInfoList.value = !showInfoList.value;
}
const getcomplaints = async()=>{
  const result = await get({
      url: api.getcomplaints,
      params:{},
      addManagerToken: true
  });
  complaints.value = result.data;
  console.log(result.data);
  for(let i = 0; i < complaints.value.length; i++){
    complaints.value[i].date_time = complaints.value[i].date_time.replace("T", "  ");
  }
  complaintsCopy.value = complaints.value;
  sortLatest();
}
const getDetail = async(id)=>{
     const result  = await get({
      url: api.getcomplaintDetail,
      params:{complaint_id:id},
      addManagerToken: true
     });
     detail.value = result.data;
     let avater;
     detail.value.imgs = [];
     for(let i = 0; i < complaintsCopy.value.length; i++){
        if(complaintsCopy.value[i].id == id){
          avater = complaintsCopy.value[i];
        }
     }
     detail.value.user_avatar = avater.user_avatar;
     detail.value.author_avatar = avater.author_avatar;
     if(detail.value.remark=="") detail.value.remark = "申请者没有填写备注信息";
     console.log(detail.value);
     nextTick(()=>{
       imagePreview();
     })
}

const review = async(pass)=>{
  
  const result = await request({
    url: api.reviewcomplaint,
    params: {
      complaint_id: detail.value.id,
      status: pass,
      opinion: opinion.value
    },
    addManagerToken: true
  });
  getcomplaints();
  setTimeout(backToList(),500);
}


onMounted(()=>{
  language.value = i18n.getLocale();
  getcomplaints();
})

const toAuthor = (id)=>{
  let strs = id.split('/')
  id = strs[strs.length-1];
  window.open(router.resolve('/authorhome/'+id).href, '_blank')
}

const sortLatest = ()=>{
  sortEarliest();
  complaints.value = complaints.value.reverse();
}
const sortEarliest = ()=>{
    complaints.value = complaints.value.sort((a,b)=>{
      let yearA,yearB,monthA,monthB,dayA,dayB,hourA,hourB,minuteA,minuteB,secondA,secondB;
      let tmp = a.date_time.split(" ");
      console.log(tmp);
      yearA = tmp[0].split("-")[0];
      monthA = tmp[0].split("-")[1];
      dayA = tmp[0].split("-")[2];
      hourA = tmp[2].split(":")[0];
      minuteA = tmp[2].split(":")[1];
      secondA = tmp[2].split(":")[2];
      tmp = b.date_time.split(" ");
      yearB = tmp[0].split("-")[0];
      monthB = tmp[0].split("-")[1];
      dayB = tmp[0].split("-")[2];
      hourB = tmp[2].split(":")[0];
      minuteB = tmp[2].split(":")[1];
      secondB = tmp[2].split(":")[2];
      console.log(yearA,monthA,dayA,hourA,minuteA,secondA);
      console.log(yearB,monthB,dayB,hourB,minuteB,secondB);
      if(yearA>yearB) return 1;
      else if(yearA<yearB) return -1;
      else{
        if(monthA>monthB) return 1;
        else if(monthA<monthB) return -1;
        else{
          if(dayA>dayB) return 1;
          else if(dayA<dayB) return -1;
          else{
            if(hourA>hourB) return 1;
            else if(hourA<hourB) return -1;
            else{
              if(minuteA>minuteB) return 1;
              else if(minuteA<minuteB) return -1;
              else{
                if(secondA>secondB) return 1;
                else if(secondA<secondB) return -1;
                else return 0;
              }
            }
          }
        }
      }
    });

}
const filterTobecertified = ()=>{
  complaints.value = complaints.value.filter(item=>item.status == "pending");
}
const showall = ()=>{
  complaints.value = complaintsCopy.value;
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
const language = ref("cn");
watch(()=>{ return i18n.getLocale()}, (newValue, oldValue) =>{
    language.value = newValue
});
</script>

<template>
  <div class="title">
    {{i18n.t('admin.handleScholarGrievances')}}
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
      <div class="no-complaint">
        <el-empty :description=" language=='cn' ? '没有数据' : 'No Data' " v-if="complaints.length==0" ></el-empty>
      </div>
      <div v-for="item in complaints" class="scholar-item">
          <div class="brief-info">
            <div class="info-title">
              <div class="title-name">{{i18n.t('admin.applicantName')}}</div>
              <div class="title-schName">{{i18n.t('admin.scholarName')}}</div>
              <div class="title-time">{{i18n.t('admin.applicationTime')}}</div>
              <div class="title-status">{{i18n.t('admin.status')}}</div>
            </div>
            <el-divider style="margin: 5px !important"></el-divider>
            <div class="info-info">
              <div class="info-name">{{item.user}}</div>
              <div class="info-schName" >{{item.author_name}}</div>
              <div class="info-time">{{item.date_time}}</div>
              <div class="info-status">
                {{item.status == "passed" ? (language=="cn" ? "已通过": "Passed") : 
                  ( item.status == "pending" ? (language=="cn" ? "待审核": "ToBeReviewd") :
                    (language=="cn" ? "已拒绝": "Rejected")
                  ) 
                }}
              
            </div>
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
    <div class="detail" id="detail" v-if="!showInfoList">
      <ImageViewer
        ref="imageViewerRef" 
        :imageList="previewImgList"
      ></ImageViewer>
      <div @click="backToList()" class="back-to-list"><el-icon><DArrowLeft /></el-icon>{{i18n.t('admin.backToList')}}</div>
      <div class="detail-panel">
        <div class="info-panel">
          <div class="applicant-scholar">
            <div class="applicant-info">
              <div class="applicant-info-label">{{ i18n.t('admin.applicantName') }}</div>
              <div class="applicant-info-detail">
                <div class="applicant-avatar">
                  <el-avatar :size="100" :src="detail.user_avatar"></el-avatar>
                </div>
                <div class="applicant-name">{{ detail.user }}</div>
              </div>
            </div>
            <el-divider direction="vertical" style="margin: 0; height: 150px; !important;"></el-divider>
            <div class="scholar-info">
              <div class="scholar-info-label">{{ i18n.t('admin.scholar') }}</div>
              <div class="scholar-info-detail">
                <div class="scholar-avater">
                  <el-avatar :size="100" :src="detail.author_avatar"></el-avatar>
                </div>
                <div class="scholar-name" @click="toAuthor(detail.author_id)" >{{ detail.author_name }}</div>
              </div>
            </div>
          </div>
          <el-divider style="margin: 0;"></el-divider>
          <div class="addition">
            <div class="addition-label">{{ i18n.t('admin.reason') }}</div>
            <el-input
              v-model="detail.complaint_content"
              :rows="10"
              type="textarea"
              disabled
            />
          </div>
        </div>
        <el-divider direction="vertical" style="margin: 0; height: 800px !important;"></el-divider>
        <div class="submit-panel">
          <el-button 
            type="success" 
            style="margin-top: 20px; !important" 
            @click="review(1)"
            v-if ="detail.status == 'pending'"
          >{{ i18n.t('admin.accept') }}</el-button>
          <el-button 
            type="danger" 
            style="margin-top: 20px; !important" 
            @click="review(2)"
            v-if ="detail.status == 'pending'"
          >{{ i18n.t('admin.decline') }}</el-button>
          <div class="opinion-label">{{ i18n.t('admin.opinion') }}</div>
          <el-input 
            type="textarea" 
            v-model="opinion" 
            :rows="10" 
            :placeholder='language == "cn" ? "请输入审核意见" : "Please enter a review comment" '
            v-if ="detail.status == 'pending'"
          ></el-input>
          <el-input 
            type="textarea" 
            v-model="detail.result_msg" 
            :rows="10" 
            :placeholder='language == "cn" ? "管理员没有意见" : "No comment" '
            v-if ="detail.status != 'pending'"
            disabled
          ></el-input>
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
      min-height: 600px;
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
              display: flex;
              flex-direction: column;
              justify-content: center;
              .applicant-info-label{

              }
              .applicant-info-detail{
                display: flex;
                justify-content: space-around;
                align-items: center;
                .applicant-avatar{
                  margin-left: 80px;
                }
                .applicant-avater:hover {
                  cursor: pointer;
                }
                .applicant-name{
                  font-size: 20px;
                  width: 60%;
                  transition: all 0.3s ease-in-out;
                }
                .applicant-name:hover{
                  cursor: pointer;
                  color : rgb(38, 168, 255);
                }
              }
            }
            .scholar-info {
              width: 50%;
              height: 150px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              .scholar-info-label{

              }
              .scholar-info-detail{
                display: flex;
                justify-content: space-around;
                align-items: center;
                .scholar-avater{
                  margin-left: 80px;
                }
                .scholar-avater:hover {
                  cursor: pointer;
                }
                .scholar-name{
                  font-size: 20px;
                  width: 60%;
                  transition: all 0.3s ease-in-out;
                }
                .scholar-name:hover{
                  cursor: pointer;
                  color : rgb(38, 168, 255);
                }
              }
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
          .opinion-label{
            margin: 10px 0;
          }
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
