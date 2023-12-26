<template>
    <el-container class="home">
        <el-header class="header" >
            <NavBar />
            <SearchBar :info="hhh" :search-function="handleSearchJournal" :select-function="handleSelectJournal" style="margin-top: 10vh;position:relative; left: -2vw;"/>
        </el-header>
        <el-container>
            <el-aside class="left-condition">
                <div class="condition">
                    <p>{{ i18n.t('conf.confConditions')}}</p>
                    <el-select v-model="selectvalue" multiple filterable placeholder="Select" @change="handleChange" @blur="handleBlur">
                        <el-option
                        v-for="item in selectSubject"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        />
                    </el-select>
                </div>
            </el-aside>
            <el-container style="margin-top: 0;">
                <el-main>
                    <el-row style="margin-bottom: 2vh; margin-top: -2vh;">
                        <el-button style="border: 0;">{{ i18n.t('conf.confInitial') }}:</el-button>
                        <el-button class="letter" v-for="letter in letters" :key="letter"  @click="getJournalsByInitial(letter)"  :style="{ marginTop: '0' }">{{ letter }}</el-button>
                    </el-row>
                    <el-row style="margin-bottom: 3px;">
                        <el-button style="border: none; margin-right: 54vw">{{ i18n.t('conf.confJournalList') }}</el-button>
                        <el-button @click="getLatestJournal">{{ i18n.t('conf.confUpdatedJournal') }}</el-button>
                    </el-row>
                    <div>
                        <el-row v-for="data in journalsData">
                            <JournalDisplay :data="data"/>
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
            </el-container>
        </el-container>
        <!-- <el-footer>
            footer
        </el-footer> -->
    </el-container>
</template>

<script setup>
import NavBar from '../components/NavigateBar.vue';
import SearchBar from '../components/SearchBar.vue';
import JournalDisplay from '../components/conf/JournalDisplay.vue';
import {checkIsChinese} from "../functions/checkIsChinese.js";
import {handleResponse} from "../functions/handleResponse.js";
import {useUpperSearchBarStore} from "../stores/upperSearchBar.js";
import router from "../routes/index.js";
import { ref } from 'vue'
import { onMounted } from 'vue'
import axios from 'axios'
import i18n from "../locales/index.js";
import { debounce } from 'vue-debounce'
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const type = ref(0);
const tempLetter = ref('');
const journalsData = ref([]);
const pageNum = ref(1);
const selectvalue = ref([]);
const test = "math";
const selectSubject = [
        {
                value: 'Computer Science',
                label: 'Computer Science'
            },
            {
                value: 'Economics',
                label: 'Economics'
            },
            {
                value: 'Law',
                label: 'Law'
            },
            {
                value: 'Mathematics',
                label: 'Mathematics'
            },
            {
                value: 'Psychology',
                label: 'Psychology'
            },
            {
                value: 'Medicine',
                label: 'Medicine'
            },
            {
                value: 'Chemistry',
                label: 'Chemistry'
            },
            {
                value: 'Physics',
                label: 'Physics'
            },
            {
                value: 'History',
                label: 'History'
            },
            {
                value: 'Biology',
                label: 'Biology'
            },
];
// 在组件加载完成后发起请求,默认是A
onMounted(() => {
    getJournalsByInitial('A');
});
const getJournalsByInitial = debounce((initial) => {
    tempLetter.value = initial;
    axios.get('https://api.buaa-q9k.xyz/source/get_source_list/', {
        params: {
            initial: initial,
            page_num: pageNum.value,
            page_size: 10,
            subject: JSON.stringify(selectvalue.value),
        }
        })
        .then(response => {
          console.log(JSON.stringify(selectvalue.value));
          journalsData.value = response.data.data;
          type.value = 0;
        })
        .catch(error => {
          console.error('Error fetching journals:', error);
        });
}, "200ms");


const getLatestJournal = debounce(() => {
    axios.get('https://api.buaa-q9k.xyz/source/get_latest_sources/', {
        params: {
            page_num: pageNum.value,
            page_size: 10,
            subject: selectvalue.value,
        }
        })
        .then(response => {
          journalsData.value = response.data.data;
          type.value = 1;
        })
        .catch(error => {
          console.error('Error fetching journals:', error);
        });
},"300ms");

const handleSearchJournal = (value) => {
    let codeOfLanguage = 0
    if (checkIsChinese(value)) {
        codeOfLanguage = 1
    }
    return axios.get('https://api.buaa-q9k.xyz/' + '/source/search_sources/', {
        params: {
            journal_name: value,
        }
    }).then((response) => {
        handleResponse(response, false, (data) => {
            const upperSearchBar = useUpperSearchBarStore()
            if (codeOfLanguage === 0) {
                for (let {id, display_name} of data.sources) {
                    upperSearchBar.addIntoOptions(id, display_name)
                }
            }
            else if (codeOfLanguage === 1) {
                for (let {id, chinese_display_name} of data) {
                    upperSearchBar.addIntoOptions(id, chinese_display_name)
                }
            }
        })
    })
}

const handleSelectJournal = (value) => {
    let fullId = ''
    fullId += value
    const depart = fullId.split('/')
    let id = depart.at(depart.length - 1)
    router.push('/journal/' + id+'/statics')
}

const handleCurrentChange = (number) => {
      pageNum.value = number;
      if(type === 0) {
        getJournalsByInitial(tempLetter.value);
      } else {
        getLatestJournal();
      }
}

const searchJournal =debounce( () => {
    if(type.value == 0) {
        getJournalsByInitial(tempLetter.value);
    }
}, "300ms");

const handleChange = () => {
    searchJournal();
}

const handleBlur = () => {
    searchJournal();
}

</script>

<style scoped>
.el-header {
    height: 42vh;
    margin-left: 0;
    background-color: rgb(255, 255, 255);
}

.el-aside {
    background-color: rgb(255, 255, 255);
    width: 25vw;
}

.letter {
    padding: 0.5vw;
}

.el-cascader-panel__body {
        max-height: none !important;
}
.el-main {
    width: 75vw;
    background-color: rgb(255, 255, 255);
    margin-left: 0;
}

.home {
    width: 100vw;
    background-color: rgb(255,255,255);
}

</style>
