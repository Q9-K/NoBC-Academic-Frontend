<template>
    <el-container class="home">
        <el-header class="header" >
            <NavBar />
            <SearchBar :info="hhh" :search-function="handleSearchJournal" :select-function="handleSelectJournal" style="margin-top: 10vh;position:relative; left: -2vw;"/>
        </el-header>
        <el-container>
            <el-aside class="left-condition">
                <LeftCondition />
            </el-aside>
            <el-container style="margin-top: 0;">
                <el-main>
                    <el-row style="margin-bottom: 2vh; margin-top: -2vh;"> 
                        <el-button style="border: 0;">{{ i18n.t('conf.confInitial') }}:</el-button>
                        <el-button class="letter" v-for="letter in letters" :key="letter"  @click="getJournalsByInitial(letter)" :style="{ marginTop: '0' }">{{ letter }}</el-button>
                    </el-row>
                    <el-row style="margin-bottom: 3px;">
                        <el-button style="border: none; margin-right: 54vw">{{ i18n.t('conf.confJournalList') }}</el-button>
                        <el-button>{{ i18n.t('conf.confUpdatedJournal') }}</el-button>
                    </el-row>
                        <el-row v-for="data in journalsData">
                            <JournalDisplay :data="data"/>
                        </el-row>
                </el-main>
            </el-container>
        </el-container>
        <el-footer>
            footer
        </el-footer>
    </el-container>
</template>

<script setup>
import NavBar from '../components/NavigateBar.vue'
import SearchBar from '../components/SearchBar.vue'
import LeftCondition from '../components/conf/LeftCondition.vue'
import JournalDisplay from '../components/conf/JournalDisplay.vue'
import {checkIsChinese} from "../functions/checkIsChinese.js";
import {handleResponse} from "../functions/handleResponse.js";
import {useUpperSearchBarStore} from "../stores/upperSearchBar.js";
import router from "../routes/index.js";
import { ref } from 'vue'
import { onMounted } from 'vue'
import axios from 'axios'
import i18n from "../locales/index.js";
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')  

const journalsData = ref([]);
const subject = ref("");
// 在组件加载完成后发起请求,默认是A
onMounted(() => {
    getJournalsByInitial('A'); 
});
const getJournalsByInitial = (initial) => {
    axios.get('http://100.96.145.140:8000/source/get_source_list/', {
        params: {
            initial: initial,
            page_num: 1,
            page_size: 10,
        }
        })
        .then(response => {
          journalsData.value = response.data.sources;
        })
        .catch(error => {
          console.error('Error fetching journals:', error);
        });
};

const handleSearchJournal = (value) => {
    let codeOfLanguage = 0
    if (checkIsChinese(value)) {
        codeOfLanguage = 1
    }
    return axios.get('http://100.99.200.37:8000' + '/source/search_sources/', {
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

.el-main {
    width: 75vw;
    background-color: rgb(255, 255, 255);
    margin-left: 0;
}

.el-footer {
    height: 5vh;
    background-color: rgb(255, 255, 255);
}

.home {
    width: 100vw;
    background-color: rgb(255,255,255);
}

</style>