<template>
    <el-container class="home">
        <el-header class="nav">
            <NavigateBar />
        </el-header>
        <el-container >
           <el-header class="head">
                <div style="margin-top: 3vh;">
                    <h1  class="title">ACM Computing Surveys</h1>
                </div>
                <el-row type="flex" justify="center">
                    <el-col :span="12">
                        <el-button type="primary" round>{{i18n.t('journal.journalStatistics')}}</el-button>
                        <el-button type="primary" round>{{i18n.t('journal.journalPapers')}}</el-button>
                    </el-col>
                </el-row>
           </el-header>

           <el-main>
                <div v-if="showStatistics">
                <table class="basic-message">
                    <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
                        <td v-for="(column, columnIndex) in row" :key="columnIndex">
                            {{ column }}
                        </td>
                    </tr>
                </table>

                <div>
                    <div>
                        <el-row type="flex" justify="center">
                            <el-col :span="12">
                                <!-- <el-button style="margin-top: 1vh;">论文主题</el-button> -->
                                <div class="card">
                                    <p>{{i18n.t('journal.journalTopic')}}</p>
                                    <JournalWord :data="word"></JournalWord>
                                </div>
                            </el-col>
                            <el-col :span="12">   
                                <div class="card">
                                    <h3>{{i18n.t('journal.journalArea')}}</h3>
                                    <JournalCountry :data="country"></JournalCountry>
                                </div>
                            </el-col>
                        </el-row>
                    </div>

                    <div>
                        <el-row type="flex" justify="center">
                            <el-col :span="12">
                                <div class="card">
                                    <h3>{{i18n.t('journal.journalCite')}}</h3>
                                    <JournalCite :data="cite"></JournalCite>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="card">
                                    <h3>{{i18n.t('journal.journalDistribution')}}</h3>
                                    <JournalInstitute :data="institute"></JournalInstitute>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>

                <div>
                    <el-row style="border:  groove rgb(100, 2, 255);">
                        <el-col>
                            <div>
                                <h3>{{i18n.t('journal.journalHighAuthor')}}</h3>
                                <el-table :data="thesisData" stripe style="width: 100%">
                                    <el-table-column prop="2019" label="2019" width="280" />
                                    <el-table-column prop="2020" label="2020" width="280" />
                                    <el-table-column prop="2021" label="2021" width="280" />
                                    <el-table-column prop="2022" label="2022" width="280" />
                                    <el-table-column prop="2023" label="2023" />
                                </el-table>
                            </div>
                        </el-col>
                    </el-row>
                </div>

                <div>
                    <el-row type="flex" style="margin-left: 0; margin-top: 3vh;">
                        <el-button v-on:click="toShowThesis" type="primary" round>{{i18n.t('journal.journalHighPaper')}}</el-button>
                        <el-button type="primary" round>{{i18n.t('journal.journalHighAuthor')}}</el-button>
                        <el-button type="primary" round>{{i18n.t('journal.journalHighInstitution')}}</el-button>
                    </el-row>

                    <el-row type="flex" justify="center">
                        <div v-if="showAuthor">
                            <el-table :data="authorData" :default-sort="{prop: 'data', order: 'descending'}" style="width: 100%">
                                <el-table-column prop="author" label="Author" sortable width="450" />
                                <el-table-column prop="thesisnumber" label="ThesisNumber"  sortable width="450" />
                                <el-table-column prop="citenumber" label="CiteNumber" sortable width="450" />
                            </el-table>
                        </div>
                        <div v-if="showThesis">
                            <p>test</p>
                        </div>
                        <div v-if="showInstitution">
                            <p>test</p>
                        </div>
                    </el-row>
                </div>
                </div>
                <div v-else="showStatistics">
                    <JournalPaper></JournalPaper>
                </div>
           </el-main>
        </el-container>
        <el-footer>
            foot
        </el-footer>
    </el-container>
</template>

<script setup>
import NavigateBar from '../components/NavigateBar.vue';
import JournalCountry from '../components/conf/JournalCountry.vue'
import JournalWord from '../components/conf/JournalWord.vue';
import JournalCite from '../components/conf/JournalCite.vue';
import JournalInstitute from '../components/conf/JournalInstitute.vue'
import JournalPaper from '../components/conf/JournalPaper.vue'
import { ref } from 'vue';
import i18n from '../locales/index.js'



const tableData = [  
        [i18n.t('journal.journalField'), '计算机体系结构/并行与分布计算/存储系统', i18n.t('journal.journal2021Number'), '54'],
        [i18n.t('journal.journalCreatedYear'), '2005', i18n.t('journal.journal2021factors'), '2.04'],
        ['h5-index', '25', i18n.t('journal.journalAverageCited'), '10.28'],
];  

const country = ref( [
        { type: '中国', value: 27 },
        { type: '日本', value: 25 },
        { type: '英国', value: 18 },
        { type: '美国', value: 15 },
        { type: '西班牙', value: 10 },
        { type: '德国', value: 15 },
        { type: '法国', value: 10 },
        { type: '其他', value: 5 },
]);

const word = ref([
        {"value": 9, "name": "AntV"},
        { "value": 8, "name": "F2"},
        {"value": 8, "name": "G2"},
        {"value": 8, "name": "G6"},
        {"value": 8, "name": "DataSet"},
        {"value": 8, "name": "墨者学院"},
]);

const cite = ref([
        { time: '2019-03', value: 350, count: 800 },
        { time: '2019-04', value: 900, count: 600 },
        { time: '2019-05', value: 300, count: 400 },
        { time: '2019-06', value: 450, count: 380 },
        { time: '2019-07', value: 470, count: 220 },
]);

const institute = ref([
        { type: '清华', value: 27 },
        { type: '北大', value: 25 },
        { type: '人大', value: 18 },
        { type: '南大', value: 15 },
        { type: '中科大', value: 10 },
        { type: '哈工大', value: 15 },
        { type: '武大', value: 10 },
        { type: '华科', value: 5 },
        { type: '南大', value: 15 },
        { type: '中科大', value: 10 },
        { type: '哈工大', value: 15 },
]);

const thesisData =ref([
  {
    2019: 'Tom',
    2020: 'Tom',
    2021: 'Tom',
    2022: 'Tom',
    2023: 'Tom'
  },
  {
    2019: 'Tom',
    2020: 'Tom',
    2021: 'Tom',
    2022: 'Tom',
    2023: 'Tom'
  },
  {
    2019: 'Tom',
    2020: 'Tom',
    2021: 'Tom',
    2022: 'Tom',
    2023: 'Tom'
  },
  {
    2019: 'Tom',
    2020: 'Tom',
    2021: 'Tom',
    2022: 'Tom',
    2023: 'Tom'
  },
]);

const authorData = ref([
    {author: 'Tom', thesisnumber: 123, citenumber: 23},
    {author: 'Tom', thesisnumber: 123, citenumber: 23},
    {author: 'Tom', thesisnumber: 223, citenumber: 23},
    {author: 'Tom', thesisnumber: 123, citenumber: 33},
    {author: 'Tom', thesisnumber: 123, citenumber: 23},
])

const toShowThesis=() => {
    showAuthor = false;
    showInstitution = false;
    showThesis = true;
}

</script>

<style scoped>
.nav {
    height: 10vh;
    background-color: rgb(255, 255, 255);
    margin: 0;
    padding: 0;
}

.head {
    margin: 0;
    padding: 0;
    background: linear-gradient(180deg,rgba(213,219,248,.7),40%,rgba(229,234,255,0));
}

.title {
    font-family: "Open Sans",Arial,Helvetica,Sans-Serif;
    text-align: center; 
    font-weight: bold; 
    font-size: 40px;
    margin-bottom: 8px;
}
.basic-message {
    margin-left: 10vw;
    margin-top: 5vh;
    width: 80vw;
}

.basic-message tr,
.basic-message td {
    padding: 5px;
    text-align: center;
    border: solid #1d99e6;
}

.card {
    border:  groove rgb(2, 255, 255);
    margin: 1vh;
    padding: 0;
}
.el-footer {
    height: 5vh;
    background-color: rgb(255, 255, 255);
}

.home {
    width: 100vw;
    background-color: rgb(255, 255, 255);
}

</style>