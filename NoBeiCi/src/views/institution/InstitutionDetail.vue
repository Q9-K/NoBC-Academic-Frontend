<script setup>
import {ref,onMounted,getCurrentInstance,onUnmounted,watch,reactive,toRaw} from 'vue'
import {useRouter} from 'vue-router'
import NavigateBar from '../../components/NavigateBar.vue'
import i18n from "../../locales/index.js";
import DataSet from '@antv/data-set';
import { Column } from '@antv/g2plot';
import get from "../../functions/Get.js";
import {useInstitution} from "../../stores/institution.js"
const store = useInstitution();
const router = useRouter();
const proxy = getCurrentInstance();
var data = [];
const institution = reactive({
  image_url:"https://upload.wikimedia.org/wikipedia/en/5/5c/University_of_North_Carolina_at_Chapel_Hill_seal.svg",
  display_name:"University of North Carolina at Chapel Hill University",
  geo:{
    country_code:"US",
    city:"Chapel Hill",
  },
  homepage_url: "https://www.umich.edu",
  type: "education",
  repositories:[
  {
                        "id": "https://openalex.org/S4306400393",
                        "display_name": "Deep Blue (University of Michigan)"
                    },
                    {
                        "id": "https://openalex.org/S4306400708",
                        "display_name": "CINECA IRIS Institutional Research Information System (IRIS Istituto Nazionale di Ricerca Metrologica)"
                    }
  ],
  associated_institutions:[
  {
                        "id": "https://openalex.org/I4210104572",
                        "display_name": "Michigan Sea Grant"
                    },
                    {
                        "id": "https://openalex.org/I4210163254",
                        "display_name": "Michigan Space Grant Consortium"
                    },
                    {
                        "id": "https://openalex.org/I4210130704",
                        "display_name": "University of Michigan–Dearborn"
                    },
                    {
                        "id": "https://openalex.org/I4210092198",
                        "display_name": "University of Michigan–Flint"
                    },
                    {
                        "id": "https://openalex.org/I2799370151",
                        "display_name": "Beaumont Health"
                    },
                    {
                        "id": "https://openalex.org/I2801799315",
                        "display_name": "Hurley Medical Center"
                    },
                    {
                        "id": "https://openalex.org/I4210114445",
                        "display_name": "Michigan Medicine"
                    }
  ],
  counts_by_year:[
  {
                        "year": 2023,
                        "works_count": 15625,
                        "oa_works_count": 5541,
                        "cited_by_count": 1067379
                    },
                    {
                        "year": 2022,
                        "works_count": 452653,
                        "oa_works_count": 367759,
                        "cited_by_count": 1202325
                    },
                    {
                        "year": 2021,
                        "works_count": 19327,
                        "oa_works_count": 12622,
                        "cited_by_count": 1217749
                    },
                    {
                        "year": 2020,
                        "works_count": 20271,
                        "oa_works_count": 12943,
                        "cited_by_count": 1107977
                    },
                    {
                        "year": 2019,
                        "works_count": 18178,
                        "oa_works_count": 10989,
                        "cited_by_count": 965215
                    },
                    {
                        "year": 2018,
                        "works_count": 17243,
                        "oa_works_count": 9932,
                        "cited_by_count": 872941
                    },
                    {
                        "year": 2017,
                        "works_count": 16568,
                        "oa_works_count": 9229,
                        "cited_by_count": 800304
                    },
                    {
                        "year": 2016,
                        "works_count": 15616,
                        "oa_works_count": 8653,
                        "cited_by_count": 779114
                    },
                    {
                        "year": 2015,
                        "works_count": 14671,
                        "oa_works_count": 7620,
                        "cited_by_count": 757254
                    },
                    {
                        "year": 2014,
                        "works_count": 14042,
                        "oa_works_count": 7161,
                        "cited_by_count": 719158
                    },
                    {
                        "year": 2013,
                        "works_count": 13805,
                        "oa_works_count": 6776,
                        "cited_by_count": 673108
                    },
                    {
                        "year": 2012,
                        "works_count": 12557,
                        "oa_works_count": 6169,
                        "cited_by_count": 612426
                    }
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
  router.push({ name: 'institutionDetail', params: { institutionId: id } });
  console.log(id);
}
const getDetail = async () => {
  const result = await get({
    url: "http://100.117.229.168:8000//institution/getInstitutionDetail",
    // url:"https://api.openalex.org/institutions/I27837315",
    params: {
      id: store.getId,
    },

  });
  institution.value = result.data.institution[0];
  data = result.data.institution[0].associated_institutions;
  console.log(data)
    // router.push({
    //     path: '/institution'
    // })
}
watch(()=>{ return i18n.getLocale()}, (newValue, oldValue) =>{
    console.log(newValue);
}

)
onMounted(() => {
  getDetail();


  const columnPlot1 = new Column(document.getElementById('worksCount'), {
    title: {
      visible: true,
      text: '基础柱状图',
    },
    forceFit: true,
    data: toRaw(institution).counts_by_year,
    padding: 'auto',
    data: toRaw(institution).counts_by_year,
    xField: 'year',
    yField: 'works_count',
    meta: {
      year: {
        alias: '年份',
      },
      worksCount: {
        alias: '作品数',
      },
    },
  });
  const columnPlot2 = new Column(document.getElementById('citedCount'), {
    title: {
      visible: true,
      text: '基础柱状图',
    },
    forceFit: true,
    data:toRaw(institution).counts_by_year,
    padding: 'auto',
    data:toRaw(institution).counts_by_year,
    xField: 'year',
    yField: 'cited_by_count',
    meta: {
      year: {
        alias: '年份',
      },
      citedByCount: {
        alias: '引用次数',
      },
    },
  });
  columnPlot1.render();
  columnPlot2.render();

});


// onUnmounted(() => {
//   map?.destroy();
// });

const relatedInstitutions = ref([
{id:"1",name:"University of North Carolina at Chapel Hill University",img:"https://upload.wikimedia.org/wikipedia/en/5/5c/University_of_North_Carolina_at_Chapel_Hill_seal.svg"},
{id:"2",name:"111",img:"https://upload.wikimedia.org/wikipedia/en/5/5c/University_of_North_Carolina_at_Chapel_Hill_seal.svg"},
{id:"3",name:"111",img:"https://upload.wikimedia.org/wikipedia/en/5/5c/University_of_North_Carolina_at_Chapel_Hill_seal.svg"},
{id:"4",name:"111",img:"https://upload.wikimedia.org/wikipedia/en/5/5c/University_of_North_Carolina_at_Chapel_Hill_seal.svg"},
{id:"5",name:"111",img:"https://upload.wikimedia.org/wikipedia/en/5/5c/University_of_North_Carolina_at_Chapel_Hill_seal.svg"},
{id:"6",name:"111",img:"https://upload.wikimedia.org/wikipedia/en/5/5c/University_of_North_Carolina_at_Chapel_Hill_seal.svg"},
{id:"7",name:"111",img:"https://upload.wikimedia.org/wikipedia/en/5/5c/University_of_North_Carolina_at_Chapel_Hill_seal.svg"},
{id:"8",name:"111",img:"https://upload.wikimedia.org/wikipedia/en/5/5c/University_of_North_Carolina_at_Chapel_Hill_seal.svg"},
{id:"9",name:"111",img:"https://upload.wikimedia.org/wikipedia/en/5/5c/University_of_North_Carolina_at_Chapel_Hill_seal.svg"},
])




</script>

<template>
  <div class="header"><NavigateBar></NavigateBar></div>
  <el-button plain  @click="backToList()" class="back" style="border: none; background-color: #FAFAFA;">返回机构列表</el-button>
  <el-scrollbar>
    <div class="content">
      <div class="content-top">
        <div class="institution-name">
          <span class="name">{{ institution.display_name }}</span>
        </div>
        <div class="institution-image">
          <img :src="institution.image_url" class="image"/>
        </div>
      </div>
      <el-divider style="margin: 5px;"></el-divider>
      <!-- <div id="map"></div> -->
      <div class="content-middle">
        <div class="description">
          <div class="homepage">
            <div class="homepage-label">机构官网</div>
            <div class="homepage-link"><a :href="institution.homepage_url">{{institution.homepage_url}}</a></div>
          </div>
          <el-divider style="margin: 5px;"></el-divider>
          <div class="type">
            <div class="type-label">机构类别</div>
            <div class="type-content">{{ institution.type }}</div>
          </div>
          <el-divider style="margin: 5px;"></el-divider>
          <div class="country-code">
            <div class="country-code-label">地理位置</div>
            <div class="country-code-content">{{ institution.geo.country_code }},{{ institution.geo.city }}</div>
          </div>
          <el-divider style="margin: 5px;"></el-divider>
          <div class="repositories">
            <div class="repositories-label">相关期刊</div>
            <div class="repositories-content" v-for="item in institution.repositories">
              {{item.display_name}}
            </div>
          </div>
          <el-divider style="margin: 5px;"></el-divider>
        </div>
        <div class="count">
          <div class="worksCount">
            <div class="worksCount-title">发表学术成果数量</div>
            <div id="worksCount"></div>
          </div>
          <div class="citedCount">
            <div class="citedCount-title">学术成果被引次数</div>
            <div id="citedCount"></div>
          </div>
        </div>


      </div>
      <el-divider style="margin: 5px;"></el-divider>
      <div class="content-related-ins">
        <div class="related-ins-title">关联机构</div>
        <div class="related-ins-list">
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in institution.associated_institutions" :key="item">
              <span  class ="name" @click="checkAssociatedInsititution(item.id)">{{ item.display_name }}</span>
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
