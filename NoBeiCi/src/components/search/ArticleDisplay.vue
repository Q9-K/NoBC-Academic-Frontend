<script setup>
    import {ref} from 'vue'
    const number1 = ref(12)
    const number2 = ref(13)
</script>

<template>
    <el-card class="box-card">
        <p class="title">A New Method for Gene Deletion to Investigate Cell Wall Biogenesis in Fusobacterium</p>
        <h5 class="author">G C Bibek,Peng Zhou,Chenggang Wu</h5>
        <p class="context"> Controlled septal peptidoglycan hydrolysis is vital for bacterial cell division, preserving cellular integrity and facilitating proper daughter cell separation. In Escherichia coli, the FtsEX ABC system 
            governs cell wall hydrolase activation by regulating the EnvC activator. Howe...</p>
        <p class="issue">Methods in molecular biology (Clifton, N.J.) (2024): 69-82</p>
        <p>引用 <span>{{ number1 }}</span> | 浏览 <span>{{ number2 }}</span> <el-button class="quoteButton">“引用”</el-button> <el-button>收藏</el-button></p>
    </el-card>
  </template>

<style scoped>
.title {
    font-weight: bold;
}

.author {
    font-weight: 500;
}

span {
    color: rgb(0, 128, 11);
}

.context {
    font-weight: 400;
}

.issue {
    font-weight: 500;
}

.el-button {
    background-color: aquamarine;
}

.quoteButton {
    margin-left: 23vw;
}

</style>