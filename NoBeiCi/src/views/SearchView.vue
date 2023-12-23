<script setup>
    import { ref } from 'vue'
    import NavBar from '../components/NavigateBar.vue'
    import 'element-plus/dist/index.css'
    import { Search } from '@element-plus/icons-vue'
    import { ElContainer, ElHeader, ElAside, ElMain, ElRow, ElCol, ElFooter, ElPagination } from 'element-plus'
    import ArticleDispaly from '../components/search/ArticleDisplay.vue'
    import SearchResultStatics from '../components/search/SearchResultStatistics.vue'
    import AuthorDisplay from '../components/search/AuthorDisplay.vue'
    import TimeRange from '../components/search/TimeRange.vue'
    import Institution from '../components/search/Institution.vue'
    import SelectJournal from '../components/search/SelectJournal.vue'
    import Subject from '../components/search/Subject.vue'
    import i18n from '../locales'
    import axios from 'axios'

    const input = ref('');
    const startTime = ref('');
    const endTime = ref('');
    const subject = ref('');
    const journal = ref('');
    const institution = ref('');
    const orderWay = ref('default');
    const data = ref([]);
    const articleData = ref([]);
    const pageNum = ref();
    const activeButton = ref('searchSynthesis');
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
    const search = async () => {
        try {
            const response = await axios.get('http://100.99.200.37:8000/work/advanced_search/', {
            params: {
                content: input.value,
                start_time: startTime.value || undefined,
                end_time: endTime.value || undefined,
                source: journal.value || undefined,
                concept: subject.value || undefined,
                institution: institution.value || undefined,
                order_by: orderWay.value,
                page_number: pageNum.value || undefined,
            },
            });
            data.value = response.data;
            articleData.value = data.value.data.data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const receiveTime = (data) => {
        startTime.value = data.startTime;
        endTime.value = data.endTime;
        console.log(startTime.value);
    }
</script>

<template>
    <el-container class="home">
      <el-header>
        <el-row style="height: 10vh;">
            <NavBar />
        </el-row>
        <el-row style="height: 6vh; margin-left: 25vw; margin-right: 27vw; margin-top: 2vh;">
            <el-input v-model="input" placeholder="Search" class="input-with-select" size="small">
                <!-- <template #>
                    <el-button>高级搜索</el-button>
                </template> -->
                <template #append>
                    <el-button :icon="Search" @click="searchSynthesis"/>
                </template>
            </el-input>
        </el-row>
      </el-header>
      <el-container>
        <el-aside class="left">
            <el-row class="classify">
                <div>
                <!-- 选择日期 -->
                <TimeRange style="margin-bottom: 1vh; margin-left: 2vw;" @sendData="receiveTime"/>
                </div>
            </el-row>
            <el-row class="classify">
                <!-- 选择学科 -->
                <div>
                    <Subject style="margin-bottom: 1vh; margin-left: 2vw;"/>
                </div>
            </el-row>
            <el-row class="classify">
                <div>
                    <SelectJournal style="margin-bottom: 1vh; margin-left: 2vw;"/>
                </div>
            </el-row>
            <el-row class="classify">
                <div>
                <!-- 选择机构 -->
                    <Institution style="margin-bottom: 1vh; margin-left: 2vw;"/>
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
                <el-row v-for="data in articleData">
                    <ArticleDispaly :data="data" type="highlight"/>
                </el-row>
                <el-pagination style="margin-top: 10px;" layout="prev, pager, next" :total="1000" />
                </div>
            </el-main>
            <el-aside style="margin-left: 0;">
                <SearchResultStatics />
                <p style="text-align: center; margin-bottom:30px">前1000条结果统计图</p>
                <AuthorDisplay />
            </el-aside>
        </el-container>
      </el-container>
      <el-footer>
        footer
      </el-footer>
    </el-container>
</template>

<style scoped lang="less">
.active-button {
  background-color:rgb(11, 224, 47);
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
</style>