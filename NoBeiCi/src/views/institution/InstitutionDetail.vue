<script setup>
import {ref,onMounted,getCurrentInstance} from 'vue'
import {useRouter} from 'vue-router'
import NavigateBar from '../../components/NavigateBar.vue'
import i18n from "../../locales/index.js";
import DataSet from '@antv/data-set';
import { Column } from '@antv/g2plot';
const router = useRouter();
const proxy = getCurrentInstance();
const institution = ref({
  imageUrl:"https://upload.wikimedia.org/wikipedia/en/5/5c/University_of_North_Carolina_at_Chapel_Hill_seal.svg",
  name:"University of North Carolina at Chapel Hill University",
});
const backToList =async () => {
  const result = await proxy.request({
    url: "url",
    params: {
      articleId: articleInfo.value.articleId,
    },
  })
    // router.push({
    //     path: '/institution'
    // })
}

onMounted(() => {
  const columnPlot1 = new Column(document.getElementById('worksCount'), {
    title: {
      visible: true,
      text: '基础柱状图',
    },
    forceFit: true,
    data,
    padding: 'auto',
    data,
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
    data,
    padding: 'auto',
    data,
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
})
const data = [
      {
            "year": 2023,
            "works_count": 17032,
            "cited_by_count": 1158879
        },
        {
            "year": 2022,
            "works_count": 452732,
            "cited_by_count": 1208096
        },
        {
            "year": 2021,
            "works_count": 19397,
            "cited_by_count": 1223690
        },
        {
            "year": 2020,
            "works_count": 20440,
            "cited_by_count": 1115020
        },
        {
            "year": 2019,
            "works_count": 18297,
            "cited_by_count": 972737
        },
        {
            "year": 2018,
            "works_count": 17484,
            "cited_by_count": 880721
        },
        {
            "year": 2017,
            "works_count": 16816,
            "cited_by_count": 805017
        },
        {
            "year": 2016,
            "works_count": 15820,
            "cited_by_count": 782655
        },
        {
            "year": 2015,
            "works_count": 14756,
            "cited_by_count": 759812
        },
        {
            "year": 2014,
            "works_count": 14124,
            "cited_by_count": 721304
        },
        {
            "year": 2013,
            "works_count": 13928,
            "cited_by_count": 675526
        },
        {
            "year": 2012,
            "works_count": 12614,
            "cited_by_count": 615272
        }
];
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
          <span class="name">{{ institution.name }}</span>
        </div>
        <div class="institution-image">
          <img :src="institution.imageUrl" class="image"/>
        </div>
      </div>
      <el-divider style="margin: 5px;"></el-divider>
      <div class="content-middle">

        <div class="worksCount">
          <div class="worksCount-title">发表学术成果数量</div>
          <div id="worksCount"></div>
        </div>
        <div class="citedCount">
          <div class="citedCount-title">学术成果被引次数</div>
          <div id="citedCount"></div>
        </div>

      </div>
      <el-divider style="margin: 5px;"></el-divider>
      <div class="content-related-ins">
        <div class="related-ins-title">关联机构</div>
        <div class="related-ins-list">
          <div v-for="item in relatedInstitutions" class="ins-item">
            <div class="ins-name">
              <div class="name">{{ item.name }}</div>
            </div>
            <div class="image-box">
              <el-image  :src="item.img" :fit="fit" />
            </div>
          </div>
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
          width: 15vw;
          height: 15vw;
          border-radius: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
            .image {
              border-radius: 20px;
            }
        }

    }
    .content-middle {
      display: flex;
      justify-content: space-around;
        .worksCount {
            .worksCount-title {
              font-size: 20px;
            }
            #worksCount {

            }
        }
        .citedCount {
            .citedCount-title {
              font-size: 20px;
            }
            #citedCount {

            }
        }
        #worksCount {
          width: 40vw;
          height: 30vh;
        }
        #citedCount {
          width: 40vw;
          height: 30vh;
        }
    }
    .content-related-ins {
        padding: 20px;
        .related-ins-title {
          font-size: 30px;
        }
        .related-ins-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
            .ins-item {
              width: 10vw;

                .ins-name {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 10vw;
                  height: 6vw;
                    .name {

                    }
                }
                .image-box {
                  width: 10vw;
                    .image {
                      display: block;
                      width: 10vw;
                      height: 10vw;
                    }
                }
            }
        }
    }
}
</style>
