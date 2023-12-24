<script setup>
import {ref,onMounted,getCurrentInstance,onUnmounted,watch,reactive,toRaw} from 'vue'
import {useRouter,useRoute} from 'vue-router'
import NavigateBar from '../../components/NavigateBar.vue'
import * as echarts from 'echarts';
import i18n from "../../locales/index.js";
import { Column } from '@antv/g2plot';
import get from "../../functions/Get.js";
import {useInstitution} from "../../stores/institution.js"
const api = {
  getInstitutionDetail:"http://100.117.229.168:8000/institution/getInstitutionDetail"
}
const language = ref("cn");
const store = useInstitution();
const router = useRouter();
const route = useRoute();
const institution = ref({
  image_url:"",
  display_name:"",
  geo:{
    country_code:"",
    city:"",
  },
  homepage_url: "",
  type: "",
  repositories:[
  ],
  associated_institutions:[
  ],
  counts_by_year:[
  ]
});
const backToList = () => {
    router.push({
        path: '/institution'
    })
}
const checkAssociatedInsititution = (id) => {
  store.changeId(id);
  var strs = id.split('/');
  console.log(strs[strs.length-1]);
  id = strs[strs.length-1];
  router.push({ name: 'institutionDetail', params: { institutionId: id },   query: {
     date: new Date().getTime(),
   }, });

}
watch(route, (to, from) => {
  router.go(0)
})
const getDetail = async () => {
  language.value = i18n.getLocale();
  if(store.getId == "") {
    let strs = window.location.href.split('/') 
    strs[strs.length-1] = "https://openalex.org/"+strs[strs.length-1];
    store.changeId(strs[strs.length-1]);
  }
  const result = await get({
    url: api.getInstitutionDetail,
    params: {
      id: store.getId,
    },

  });
  institution.value = result.data.institution[0];
  if(institution.value.image_url==null){
       institution.value.image_url = "/src/assets/background/institution.webp";
  }
  if(institution.value.chinese_display_name==""){
      institution.value.chinese_display_name = institution.value.display_name;
  }

  var chartDom = document.getElementById('worksCount');
  var myChart = echarts.init(chartDom);
  var option;
  option = {
    legend: {},
    tooltip: {},
    dataset: {

      dimensions: ['year','workscount'],
      source: [

      ]
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series: [{ type: 'bar' }]

  };
  for(var i=institution.value.counts_by_year.length-1;i>=0;i--){
    option.dataset.source.push({year:institution.value.counts_by_year[i].year,workscount:institution.value.counts_by_year[i].works_count});
  }
  console.log("op",option);
  option && myChart.setOption(option);

  var chartDom2 = document.getElementById('citedCount');
  var myChart2 = echarts.init(chartDom2);
  var option2;
  option2 = {
    legend: {},
    tooltip: {},
    dataset: {

      dimensions: ['year','citedcount'],
      source: [

      ]
    },
    xAxis: { type: 'category' },
    yAxis: {},
    series: [{ type: 'bar' }]

  };
  for(var i=institution.value.counts_by_year.length-1;i>=0;i--){
    option2.dataset.source.push({year:institution.value.counts_by_year[i].year,citedcount:institution.value.counts_by_year[i].cited_by_count});
  }
  console.log("op2",option2);
  option2 && myChart2.setOption(option2);
}
watch(()=>{ return i18n.getLocale()}, (newValue, oldValue) =>{
  language.value = newValue
}

)
onMounted(() => {
  getDetail();
});









</script>

<template>
  <div class="header"><NavigateBar></NavigateBar></div>
  <el-button plain  @click="backToList()" class="back" style="border: none; background-color: #FAFAFA;">{{ i18n.t('admin.backToList') }}</el-button>
  <el-scrollbar>
    <div class="content">
      <div class="content-top">
        <div class="institution-name">
          <span class="name">{{language === "cn" ? institution.chinese_display_name : institution.display_name}}</span>
        </div>
        <div class="institution-image" >
          <img :src="institution.image_url" class="image" style="background-color: rgb(250, 250, 250) !important;"/>
        </div>
      </div>
      <el-divider style="margin: 5px;"></el-divider>
      <div class="content-middle">
        <div class="description">
          <div class="homepage">
            <div class="homepage-label">{{ i18n.t('institution.homepage') }}</div>
            <div class="homepage-link"><a :href="institution.homepage_url">{{institution.homepage_url}}</a></div>
          </div>
          <el-divider style="margin: 5px;"></el-divider>
          <div class="type">
            <div class="type-label">{{ i18n.t('institution.type') }}</div>
            <div class="type-content">{{ institution.type }}</div>
          </div>
          <el-divider style="margin: 5px;"></el-divider>
          <div class="country-code">
            <div class="country-code-label">{{ i18n.t('institution.location') }}</div>
            <div class="country-code-content">{{ institution.geo.country_code }},{{ institution.geo.city }}</div>
          </div>
          <el-divider style="margin: 5px;"></el-divider>
          <div class="repositories">
            <div class="repositories-label">{{ i18n.t('institution.relatedJournal') }}</div>
            <div class="repositories-content" v-for="item in institution.repositories">
              {{item.display_name}}
            </div>
            <div class="repositories-content" v-if="institution.repositories.length==0">
              <el-empty :description=" language=='cn' ? '暂无相关期刊' : 'No Data' "  />
            </div>
          </div>
          <el-divider style="margin: 5px;"></el-divider>
        </div>
        <div class="count">
          <div class="worksCount">
            <div class="worksCount-title">{{ i18n.t('institution.worksCount') }}</div>
            <div id="worksCount"></div>
          </div>
          <div class="citedCount">
            <div class="citedCount-title">{{ i18n.t('institution.citedCount') }}</div>
            <div id="citedCount"></div>
          </div>
        </div>


      </div>
      <el-divider style="margin: 5px;"></el-divider>
      <div class="content-related-ins">
        <div class="related-ins-title">{{ i18n.t('institution.relatedInstitution') }}</div>
        <div class="related-ins-list">
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in institution.associated_institutions" :key="item">
              <span  class ="name" @click="checkAssociatedInsititution(item.id)">{{ item.display_name }}</span>
            </el-carousel-item>
            <el-carousel-item v-if="institution.associated_institutions.length==0">
              <span  class ="name" >{{ language=="cn" ? "暂无关联机构":"No Data" }}</span>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.header {
    height: 10vh;
}
.back {
  position: absolute;
  top: 11vh;
  left: 5vw;
  z-index: 1000;
}
#map {width:800px; height: 600px; }  
.content {
  width: 90vw;
  min-height: 85vh;
  margin-left: 5vw;
  margin-top: 5vh;
  background-color: rgb(250, 250, 250);
  border-radius: 0px 20px 20px 20px;
    .content-top {
      width: 90vw;
      display: flex;
      align-items: center;
        .institution-name {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 75vw;
          height: 15vw;
            .name {
              font-size: 30px;
            }
        }

        .institution-image {
          margin-right: 20px;
          width: 15vw;
          height: 15vw;
          border-radius: 2px;
          display: flex;
          justify-content: center;
          align-items: center;
            .image {
              max-height: 15vw;
              border-radius: 2px;
            }
        }

    }
    .content-middle {
      display: flex;
      justify-content: space-around;
      .description{
          width: 40vw;
            .homepage {
              height: 5vh;
              display: flex;
              align-items: center;
              justify-content: space-around;
                .homepage-label {
                  width: 10vw;

                }
                .homepage-link {
                  width: 30vw;
                    a {
                    }
                }
            }
            .type {
              height: 5vh;
              display: flex;
              align-items: center;
              justify-content: space-around;
                .type-label {
                  width: 10vw;
                }
                .type-content {
                  width: 30vw;
                }
            }
            .country-code {
              height: 5vh;
              display: flex;
              align-items: center;
              justify-content: space-around;
                .country-code-label {
                  width: 10vw;
                }
                .country-code-content {
                  width: 30vw;
                }
            }
            .repositories {
              height: 50vh;
              overflow-y: scroll;
                .repositories-label {
                  height: 5vh;

                }
                .repositories-content {
                  
                  margin-top: 5px;
                  cursor: pointer;
                  transition: all 0.3s ease-in-out;
                }
                .repositories-content:hover{
                  color: #409EFF;
                }
            }
      }
      .count {
        width: 40vw;
        .worksCount {
            .worksCount-title {
              font-size: 20px;
            }
            #worksCount {
            height: 30vh;
          }
        }
        .citedCount {
            .citedCount-title {
              font-size: 20px;
            }
            #citedCount {
              height: 30vh;
            }
        }

      }
    }
    .content-related-ins {
        padding: 20px;
        .related-ins-title {
          font-size: 30px;
          margin-bottom: 20px;
        }
        .related-ins-list {

          .el-carousel__item .name {
            font-size: 20px;
            color: #080a0b;
            opacity: 0.75;
            line-height: 200px;
            margin: 0;
            text-align: center;

          }

          .el-carousel__item:nth-child(2n) {
            background-image: url(../../assets/background/OIP-1.jpg);
            background-position: center center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-size: cover;
          }

          .el-carousel__item:nth-child(2n + 1) {
            background-image: url(../../assets/background/OIP-C.jpg);
            background-position: center center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-size: cover;
          }

        }
    }
}

</style>
