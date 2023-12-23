<template>
    <el-card class="box-card">
        <el-button time="primary" class="title" @click="navigateToJournal"  style="border:none;">{{data.display_name}}</el-button>
        <p class="influence">   
            <span class="hae-border" >{{ i18n.t('journalDisplay.paperCount') }}: {{ data.summary_stats.works_count }}</span> 
            <span class="hae-border">h_index: {{data.summary_stats.h_index}}</span>
            <span class="hae-border">i10_index: {{data.summary_stats.i10_index}}</span> 
            <span class="hae-border">oa_percent: {{data.summary_stats.oa_percent}}</span>
        </p>
        <p class="area">
            <span class="have-border">{{ i18n.t('conf.confField')}} :</span>
            <span class="have-border" v-for="(item, index) in data.x_concepts.slice(0, 5)" :key="index">
                {{ item.display_name }}
            </span>
        </p>
    </el-card>
</template>

<script setup>
import {ref} from 'vue'
import router from '../../routes'
import i18n from "../../locales/index.js";
const { data } = defineProps(['data']);
const url = data.id;
const parts = url.split('/');
const ident = parts[parts.length - 1];
const navigateToJournal = () => {
    window.open(`/journal/${ident}/statics`, '_blank');  
}

</script>

<style scoped>
.box-card {
    display: flex;
    width: 100%;
}

.title {
    display: flex;
    color: rgb(74, 11, 40);
    padding: 0;
    font-size: larger;
    font-weight: 600;
    margin-left: 0;
}

.influence {
    display: flex;
    font-weight: 400;
}

.hae-border {
    border: solid 1px;
    margin: 5px;
    margin-top: 10px;
    font-size: smaller;
}

.area {
    display: flex;
}

.have-border {
    border: solid 1px;
    margin: 5px;
    margin-top: 10px;
    font-size: smaller;
}

</style>