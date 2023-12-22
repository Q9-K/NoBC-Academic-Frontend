<template>
    <el-card class="box-card">
        <el-button time="primary" class="title" @click="navigateToJournal"  style="border:none;">ACM Computing Surveys</el-button>
        <p class="influence">   
            <span class="have-border" >H5 Index: 131</span> <span class="have-border">H5 Index: 131</span>
            <span class="have-border">H5 Index: 131</span> <span class="have-border">SCI 一区</span>
        </p>
        <p class="area">
            <span style="border: none;">{{ i18n.t('conf.confField')}}</span> :
            <span class="have-border">Machine Learning</span> 
            <span class="have-border">DeepLearning</span> 
            <span class="have-border">CloudComputing</span> 
        </p>
    </el-card>
</template>

<script setup>
import {ref} from 'vue'
import router from '../../routes'
import i18n from "../../locales/index.js";

const navigateToJournal = () => {
    // router.push({path: '/journal/123/statics'}) 移动端
    window.open('/journal/123/statics', '_blank');  
}
</script>

<style>
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

.have-border {
    border: solid 1px;
    margin: 5px;
    margin-top: 10px;
    font-size: smaller;
}
</style>