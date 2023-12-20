<script setup>
import {ref,onMounted} from 'vue'
import i18n from "../../locales/index.js";
const showInfoList = ref(true);
const detail = ref({id:0});
const scholarList = ref([
{id:"1",name:"111",scholarName:"222",time:"2023/23/01 21:21:09"},
{id:"2",name:"111",scholarName:"222",time:"2023/23/01 21:21:09"},
{id:"3",name:"111",scholarName:"222",time:"2023/23/01 21:21:09"},
{id:"1",name:"111",scholarName:"222",time:"2023/23/01 21:21:09"},
{id:"1",name:"111",scholarName:"222",time:"2023/23/01 21:21:09"},
{id:"1",name:"111",scholarName:"222",time:"2023/23/01 21:21:09"},
{id:"1",name:"111",scholarName:"222",time:"2023/23/01 21:21:09"},
{id:"1",name:"111",scholarName:"222",time:"2023/23/01 21:21:09"}
])
const checkDetail = (id)=>{
  detail.value.id = id;
  console.log("id:",detail.value.id);
  showInfoList.value = !showInfoList.value;

}
const backToList = ()=>{
  showInfoList.value = !showInfoList.value;
}


</script>

<template>
  <div class="title">
    {{i18n.t('admin.handleScholarGrievances')}}
  </div>
  <!-- 简略信息列表 -->
  <Transition>
    <div class="brief-infoList" v-show="showInfoList">
      <div class="sort">
        <el-button color="#2353a4">{{ i18n.t('admin.sortEarliest') }}</el-button>
        <el-button color="#2353a4">{{ i18n.t('admin.sortLatest') }}</el-button>
      </div>
      <div v-for="item in scholarList" class="scholar-item">
          <div class="brief-info">
            <div class="info-title">
              <div class="title-name">{{i18n.t('admin.applicantName')}}</div>
              <div class="title-schName">{{i18n.t('admin.scholarName')}}</div>
              <div class="title-time">{{i18n.t('admin.applicationTime')}}</div>
            </div>
            <el-divider style="margin: 5px !important"></el-divider>
            <div class="info-info">
              <div class="info-name">{{item.name}}</div>
              <div class="info-schName">{{item.scholarName}}</div>
              <div class="info-time">{{item.time}}</div>
            </div>
          </div>
          <div class="">
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
    <div class="detail" v-show="!showInfoList">
      <div @click="backToList()" class="back-to-list"><el-icon><DArrowLeft /></el-icon>{{i18n.t('admin.backToList')}}</div>
      <div class="detail-panel">{{ detail.id }}</div>
    </div>
</Transition>
</template>

<style scoped lang="scss">
.title {
  font-size: 20px;
}
.brief-infoList {
  .sort {
    margin-left: 20px;
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
                width: 400px;
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
                width: 400px;
              }
          }
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
