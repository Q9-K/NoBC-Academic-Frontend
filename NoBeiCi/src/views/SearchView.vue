<script setup>
    import { ref, watch, defineAsyncComponent, onMounted } from 'vue'
    import NavBar from '../components/NavigateBar.vue'
    import 'element-plus/dist/index.css'
    import { ElContainer, ElHeader, ElAside, ElMain, ElRow, ElCol, ElFooter, ElPagination } from 'element-plus'
    import ArticleDispaly from '../components/search/ArticleDisplay.vue'
    import SearchResultStatics from '../components/search/SearchResultStatistics.vue'
    import AuthorDisplay from '../components/search/AuthorDisplay.vue'
    import TimeRange from '../components/search/TimeRange.vue'
    import Institution from '../components/search/Institution.vue'
    import SelectJournal from '../components/search/SelectJournal.vue'
    import { ElLoading } from 'element-plus'
    const AsyncSubject = defineAsyncComponent(() => import('../components/search/Subject.vue'));
    import i18n from '../locales'
    import axios from 'axios'
    import {debounce} from "vue-debounce";
    import { useSearchContentStore } from '../stores/searchContent.js'
    const store = useSearchContentStore();
    const input = ref('');
    const showAriticle = ref([true]);
    const key = ref(Date.now());
    const startTime = ref('');
    const endTime = ref('');
    const subjects = ref([]);
    const journals = ref([]);
    const institutions = ref([]);
    const selectedSubject = ref('');
    const selectedJournal = ref('');
    const selectedInstitution = ref('');
    const orderWay = ref('default');
    const data = ref([]);
    const articleData = ref([]);
    const pageNum = ref();
    const statics = ref([]);
    const authors = ref([]);
    const activeButton = ref('searchSynthesis');
    const showPagination = ref(false);
    const totalPage = ref(1);
    const pageSize3 = ref(10);
    const searchLatest = () => {
        activeButton.value = 'searchLatest';
        orderWay.value = 'time';
        search();
    };
    const searchSynthesis = () => {
        activeButton.value = 'searchSynthesis';
        orderWay.value = 'default';
        search();
    };
    const searchCitations = () => {
        activeButton.value = 'searchCitations';
        orderWay.value = 'cited_by_count';
        search();
    };
    const search = debounce( async () => {
        try {
            let loading;
            loading = ElLoading.service({
              lock: true,
              text: "加载中......",
              background: 'rgba(0,0,0,0.7)'
            })
            if(input.value != '') {
              const response = await axios.get('https://api.buaa-q9k.xyz/work/advanced_search/', {
              params: {
                  content: input.value,
                  start_time: startTime.value || undefined,
                  end_time: endTime.value || undefined,
                  source: selectedJournal.value || undefined,
                  concept: selectedSubject.value || undefined,
                  institution: selectedInstitution.value || undefined,
                  order_by: orderWay.value,
                  order_term: "desc",
                  page_number: pageNum.value || undefined,
              },
              });
              console.log(input.value);
              console.log(selectedJournal.value);
              if(response.data.data.count > 0) {
                  showAriticle.value = true;
                  data.value = response.data;
                  articleData.value = data.value.data.data;
                  showPagination.value = true;
                  statics.value = response.data.data.statistics.docs_by_year;
                  authors.value = response.data.data.statistics.top_authors;
                  subjects.value = response.data.data.statistics.top_concepts;
                  journals.value = response.data.data.statistics.top_sources;
                  institutions.value = response.data.data.statistics.top_institutions;
                  totalPage.value = response.data.data.count / 10;
                  key.value = Date.now();
                  loading.close();
              } else{
                  showAriticle.value = false;
                  loading.close();
                  window.alert("无结果");
              }

          }
        } catch (error) {
            loading.close();
            console.error('Error fetching data:', error);
        }
    }, "300ms");

    const receiveTime = (start_time, end_time) => {
        startTime.value = start_time.value+'-01-01';
        endTime.value = end_time.value+'-12-31';
    }

    watch([startTime, endTime], () => {
        search();
    });
    watch(selectedSubject, () => {
      search();
    });
    watch(selectedJournal, () => {
      search();
    });
    watch(input, ()=>{

    });
    watch(selectedInstitution, () =>{
      search();
    });
    const data1 = ref([]);
    let timeout = null;
    let showDropdown = ref(false);

    const fetchData = async (value) => {
      const response = await axios.get('https://api.buaa-q9k.xyz/work/get_suggestion', {
        params: {
          content: value,
        },
      });
      const result = await response.data.data;
       return result.suggestions;
    };

    const handleInput = async () => {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      timeout = setTimeout(async () => {
        const suggestions = await fetchData(input.value);
        data1.value = suggestions;
        showDropdown.value = true;
      }, 300);
    };

    const handleFocus = () => {
      if(input.value !== null) {
        showDropdown.value = true;
      } else{
        showDropdown.value = false;
      }
    };

    const handleBlur = () => {
      // Using setTimeout to delay hiding the dropdown
      setTimeout(() => {
        showDropdown.value = false;
      }, 200);
    };

    const selectItem = (item) => {
      input.value = item; // Adjust this based on your item structure
      showDropdown.value = false;
    };

    const handleSelectSubject = (subject) => {
      selectedSubject.value = subject.display_name;
    };
    const handleSelectJournal = (journal) => {
      selectedJournal.value = journal.id;
    };
    const handleSelectInstitution = (institution) => {
      selectedInstitution.value = institution.id;
    }
    const handleCurrentChange = (number) => {
      pageNum.value = number;
      search();
    }

    onMounted( () => {
      input.value = store.getContent;

      if (input.value !== '') {
        search();
      }
  });
</script>

<template>
    <el-container class="home">
      <el-header>
        <el-row style="height: 10vh;">
            <NavBar />
        </el-row>
        <el-row style="height: 6vh; margin-left: 25vw; margin-right: 27vw; margin-top: 2vh;">
            <div class="search-container">
                <a-input-search
                    v-model:value="input"
                    placeholder="input search text"
                    enter-button="Search"
                    size="large"
                    @input="handleInput"
                    @focus="handleFocus"
                    @blur="handleBlur"
                    @search="search"
                    style="background-color: #1890ff; border-color: #1890ff; color: #fff; width: 30vw;"
                    />
                <ul v-show="showDropdown" class="dropdown-list">
                <li v-for="item in data1" :key="item.id" @click="selectItem(item)">
                    {{ item }}
                </li>
                </ul>
            </div>
        </el-row>
      </el-header>
      <el-container>
        <el-aside class="left">
            <el-row class="classify">
                <div>
                <!-- 选择日期 -->
                <TimeRange style="margin-bottom: 1vh; margin-left: 2vw;" @changeTime="receiveTime"/>
                </div>
            </el-row>
            <el-row class="classify">
                <!-- 选择学科 -->
                <div>
                    <AsyncSubject style="margin-bottom: 1vh; margin-left: 2vw;" :subjects="subjects" @selectSubject="handleSelectSubject"/>
                </div>
            </el-row>
            <el-row class="classify">
                <div>
                    <SelectJournal style="margin-bottom: 1vh; margin-left: 2vw;" :journals="journals" @selectJournal="handleSelectJournal"/>
                </div>
            </el-row>
            <el-row class="classify">
                <div>
                <!-- 选择机构 -->
                    <Institution style="margin-bottom: 1vh; margin-left: 2vw;" :institutions="institutions" @selectInstitution="handleSelectInstitution"/>
                </div>
            </el-row>
        </el-aside>
        <el-container class="main-content">
            <el-main>
                <el-row gutter="10" style="margin-bottom: 7px; border: outset 0.5px; height: 5vh;">
                    <el-col :span="3"><el-button :class="{'active-button': activeButton === 'searchLatest'}" style="border:none; font-size: large;" @click="searchLatest">{{ i18n.t('search.searchLatest') }}</el-button></el-col>
                    <el-col :span="3"><el-button :class="{ 'active-button': activeButton === 'searchSynthesis' }" style="border:none; font-size: large;" @click="searchSynthesis">{{ i18n.t('search.searchSynthesis') }}</el-button></el-col>
                    <el-col :span="3"><el-button :class="{ 'active-button': activeButton === 'searchCitations' }" style="border:none; font-size: large;" @click="searchCitations">{{ i18n.t('search.searchCitations') }}</el-button></el-col>
                </el-row>
                <div>
                <el-row v-for="data in articleData" v-if="showAriticle" >
                    <ArticleDispaly :data="data" type="highlight" :key="key"/>
                </el-row>
                <el-pagination
                  v-model:current-page="currentPage3"
                  v-model:page-size="pageSize3"
                  :small="false"
                  :disabled="disabled"
                  :background="true"
                  layout="prev, pager, next, jumper"
                  :total="totalPage"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  style="margin-top: 10px; margin-left: 6vw"
                />
                </div>
            </el-main>
            <el-aside v-if="showAriticle">
                <SearchResultStatics :data="statics" :key="key" />
                <p style="text-align: center;" v-if="showAriticle">搜索结果时间分布统计图</p>
                <AuthorDisplay :data="authors" :key="key" />
                <p style="text-align: center;" v-if="showAriticle"><br/>发表数量最多的作者</p>
            </el-aside>
        </el-container>
      </el-container>
      <!-- <el-footer>
        footer
      </el-footer> -->
    </el-container>
</template>

<style scoped lang="less">
.active-button {
  background-color:#b5bef4;
}
.el-header {
    height: 20vh;
    background-color: rgb(255, 255, 255);
}

.left {
    margin-left: 0vw;
    margin-right: 0vw;
    padding: 0;
}

.el-footer {
    height: 5vh;
    background-color: rgb(255, 255, 255);
}

.home {
    width: 99.3vw;
    padding: 0;
    background-color: white;
}

.search-container {
    position: relative;
    display: inline-block;
    justify-content: center;
    margin-left: 10vw;
  }

  .search-input {
    width: 200px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }

  .dropdown-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
    border: 1px solid #ccc;
    position: absolute;
    z-index: 1000;
    background-color: #fff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    width: 30vw;
    overflow-y: auto;
  }
  .dropdown-list li {
    text-align: left;
    padding: 10px;
    background-color: #f5f5f5; /* Default background color */
  }

  .dropdown-list li:nth-child(odd) {
    background-color: #e0e0e0; /* Background color for odd rows */
  }
</style>
