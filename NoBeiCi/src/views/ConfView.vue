<template>
    <el-container class="home">
        <el-header class="header" >
                <NavBar />
                <SearchBar :info="hhh" :search-function="handleSearchField" />
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
                        <el-row v-for="number in 10">
                            <JournalDisplay />
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
import { ref } from 'vue'
import { onMounted } from 'vue'
import axios from 'axios'
import i18n from "../locales/index.js";
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')  

const journals = ref([]);

// 在组件加载完成后发起请求,默认是A
onMounted(() => {
    getJournalsByInitial('A'); 
});
const getJournalsByInitial = (initial) => {
    axios.get('http://100.92.185.118:8000' + '/souce/get_sources_by_initi/', {
        params: {
            initial: initial,
            page_num: 1,
            page_size: 10,
        }
        })
        .then(response => {
          journals.value = response.data;
        })
        .catch(error => {
          console.error('Error fetching journals:', error);
        });
};
const getJournalsBySelect = (initial, subject, publish) => {
    axios.get('http://100.96.145.140:8000' + '/source/get_resourcces_by_initial')
};
</script>

<style scoped>
.el-header {
    height: 42vh;
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