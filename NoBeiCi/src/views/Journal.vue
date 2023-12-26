<template>
    <el-container class="home">
        <el-header class="nav">
            <NavigateBar />
        </el-header>
        <el-container >
           <el-header class="head">
                <div style="margin-top: 3vh;">
                    <h1  class="title">{{display_name}}</h1>
                </div>
                <el-row type="flex" justify="center">
                    <el-col :span="12">
                        <el-button type="primary" round >{{i18n.t('journal.journalStatistics')}}</el-button>
                    </el-col>
                </el-row>
           </el-header>

           <el-main>
                <div v-if="showPaper">
                <table class="basic-message">
                    <tr>
                        <td>{{ i18n.t('journal.journalCount') }}</td>
                        <td>{{ works_count }}</td>
                        <td>{{ i18n.t('journal.journalTwoCount') }}</td>
                        <td>{{ works2_count }}</td>
                    </tr>
                    <tr>
                        <td>{{ i18n.t('journal.journalCreatedYear') }}</td>
                        <td>{{ created_year }}</td>
                        <td>{{ i18n.t('journal.journalAverageCited') }}</td>
                        <td>{{ mean_citedness }}</td>
                    </tr>
                    <tr>
                        <td>h-index</td>
                        <td>{{ h_index }}</td>
                        <td>{{ i18n.t('journal.journalTwoIndex') }}</td>
                        <td>{{ h2_index }}</td>
                    </tr>
                </table>

                <div>
                    <div>
                        <el-row type="flex" justify="center">
                            <el-col :span="12">
                                <!-- <el-button style="margin-top: 1vh;">论文领域</el-button> -->
                                <div class="card">
                                    <p>{{i18n.t('journal.journalField')}}</p>
                                    <AsyncJournalWord :data="word" :key="key"/>
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="card">
                                    <h3>{{i18n.t('journal.journalArea')}}</h3>
                                    <AsyncJournalCountry :data="country" :key="key1"/>
                                </div>
                            </el-col>
                        </el-row>
                    </div>

                    <div>
                        <el-row type="flex" justify="center">
                            <el-col :span="12">
                                <div class="card">
                                    <h3>{{i18n.t('journal.journalCite')}}</h3>
                                    <AsyncJournalCite :data="cite" :key="key" />
                                </div>
                            </el-col>
                            <el-col :span="12">
                                <div class="card">
                                    <h3>{{i18n.t('journal.journalDistribution')}}</h3>
                                    <AsyncJournalInstitution :data="institute" :key="key1"/>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>

                <div>
                    <el-row type="flex" style="margin-left: 0; margin-top: 3vh;">
                        <el-button v-on:click="toShowThesis" type="primary" round>{{i18n.t('journal.journalHighPaper')}}</el-button>
                        <el-button @click="toShowAuthor" type="primary" round>{{i18n.t('journal.journalHighAuthor')}}</el-button>
                        <el-button @click="toShowInstitution" type="primary" round>{{i18n.t('journal.journalHighInstitution')}}</el-button>
                    </el-row>

                    <el-row type="flex" justify="center">
                        <div v-if="showAuthor">
                            <el-table :key="key" :data="authorData" :default-sort="{prop: 'data', order: 'descending'}" style="width: 100%">
                                <el-table-column prop="author" label="Author" sortable width="450" />
                                <el-table-column prop="thesisnumber" label="ThesisNumber"  sortable width="450" />
                                <el-table-column prop="citenumber" label="CiteNumber" sortable width="450" />
                            </el-table>
                        </div>
                        <div v-if="showThesis">
                            <el-table :key="key" :data="thesisData" :default-sort="{prop: 'data', order: 'descending'}" style="width: 100%">
                                <el-table-column prop="title" label="title" sortable width="900" />
                                <el-table-column prop="cited_by_count" label="cited_by_count" sortable width="450" />
                            </el-table>
                        </div>
                        <div v-if="showInstitution">
                            <el-table :key="key" :data="instituteData" :default-sort="{prop: 'data', order: 'descending'}" style="width: 100%">
                                <el-table-column prop="display_name" label="Institution" sortable width="450" />
                                <el-table-column prop="doc_count" label="ThesisNumber"  sortable width="450" />
                                <el-table-column prop="citenumber" label="CiteNumber" sortable width="450" />
                            </el-table>
                        </div>
                    </el-row>
                </div>
                </div>
                <div v-else="showPaper">
                    <JournalPaper></JournalPaper>
                </div>
           </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import NavigateBar from '../components/NavigateBar.vue';
import JournalPaper from '../components/conf/JournalPaper.vue'
import { onMounted, ref, getCurrentInstance, watch } from 'vue';
import i18n from '../locales/index.js'
import axios from 'axios';
import { defineAsyncComponent } from 'vue';
import { ElLoading } from 'element-plus'
const AsyncJournalWord = defineAsyncComponent(() => import('../components/conf/JournalWord.vue'));
const AsyncJournalCite = defineAsyncComponent(() => import('../components/conf/JournalCite.vue'));
const AsyncJournalCountry = defineAsyncComponent(() => import('../components/conf/Country.vue'));
const AsyncJournalInstitution = defineAsyncComponent(() => import('../components/conf/JournalInstitute.vue'));
const data = ref();
const showPaper = ref(true);
const showAuthor = ref(true);
const showInstitution = ref(false);
const showThesis = ref(false);
const display_name = ref("");
const works_count = ref("");
const works2_count = ref("");
const h_index = ref("");
const h2_index = ref("");
const created_year = ref("");
const mean_citedness = ref("");

let key = 0;
let key1 = 0;
const country = ref([]);
const word = ref([]);
const cite = ref([]);
const institute = ref([]);
const instituteData = ref([]);

const thesisData =ref([]);

const authorData = ref([]);

const toShowPaper=() => {
    showPaper.value = !showPaper.value;
};

const toShowInstitution = () => {
    showThesis.value = false;
    showAuthor.value = false;
    showInstitution.value = true;
};

const toShowThesis= () => {
    showThesis.value = true;
    showAuthor.value = false;
    showInstitution.value = false;
}

const toShowAuthor = () => {
    showThesis.value = false;
    showAuthor.value = true;
    showInstitution.value = false;
}

const getAllInfo = async () => {
    try {
            const instance = getCurrentInstance();
            const ident = 'https://openalex.org/'+instance.proxy.$route.params.id;
            let loading;
            loading = ElLoading.service({
              lock: true,
              text: "加载中......",
              background: 'rgba(0,0,0,0.7)'
            })
            const response1 = await axios.get('https://api.buaa-q9k.xyz/source/get_source_by_id', {
                params: {
                source_id: ident,
                },
            });
            const response2 = await axios.get('https://api.buaa-q9k.xyz/source/get_authors_distribution', {
                params: {
                    source_id: ident,
                },
            });
            const response3 = await axios.get('https://api.buaa-q9k.xyz/source/get_authors_by_cited', {
                params: {
                    source_id: ident,
                }
            });
            const response4 = await axios.get('https://api.buaa-q9k.xyz/source/get_works_by_cited',{
                params: {
                    source_id: ident,
                }
            });
            const response5 = await axios.get('https://api.buaa-q9k.xyz/source/get_institutions_by_cited', {
                params: {
                    source_id: ident,
                }
            });
            data.value = response1.data;
            country.value = response2.data.data[1];
            institute.value = response2.data.data[0];
            word.value = data.value.data.x_concepts;
            cite.value =data.value.data.counts_by_year;
            display_name.value = data.value.data.display_name;
            works_count.value = data.value.data.works_count;
            h_index.value = data.value.data.summary_stats.h_index;
            works2_count.value = data.value.data.summary_stats['2yr_works_count'];
            h2_index.value = data.value.data.summary_stats['2yr_h_index'];
            mean_citedness.value = data.value.data.summary_stats['2yr_mean_citedness'];
            created_year.value = data.value.data.created_date;
            authorData.value =response3.data.data.map(item => ({
                author: item.key.display_name,
                thesisnumber: item.doc_count,
                citenumber: item.reverse_nested_cited_by_count.total_cited_by_count.value,
            }));
            thesisData.value = response4.data.data;
            instituteData.value = response5.data.data.map(item => ({
                display_name: item.key.display_name,
                doc_count: item.doc_count,
                citenumber: item.reverse_nested_cited_by_count.total_cited_by_count.value,
            }));
            key = 1;
            key1 = 1;
            loading.close();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
};

onMounted(() =>{
    getAllInfo();
});
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
