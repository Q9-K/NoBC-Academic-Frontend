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
    import Journal from '../components/search/Journal.vue'
    import Subject from '../components/search/Subject.vue'
    import i18n from '../locales'
</script>

<template>
    <el-container class="home">
      <el-header>
        <el-row style="height: 10vh;">
            <NavBar />
        </el-row>
        <el-row style="height: 6vh; margin-left: 25vw; margin-right: 27vw; margin-top: 2vh;">
            <el-input v-model="input" placeholder="Please input" class="input-with-select" size="small">
                <template #prepend>
                    <el-select v-model="select" placeholder="Select" style="width: 15vw">
                        <el-option label="biology" value="1" />
                        <el-option label="physical" value="2" />
                        <el-option label="math" value="3" />
                    </el-select>
                </template>
                <template #append>
                    <el-button :icon="Search" />
                </template>
            </el-input>
        </el-row>
      </el-header>
      <el-container>
        <el-aside class="left">
            <el-row class="classify">
                <div>
                <!-- 选择日期 -->
                <TimeRange />
                </div>
            </el-row>
            <el-row class="classify">
                <!-- 选择学科 -->
                <div>
                    <Subject />
                </div>
            </el-row>
            <el-row class="classify">
                <div>
                    <Journal />
                </div>
            </el-row>
            <el-row class="classify">
                <div>
                <!-- 选择机构 -->
                    <Institution />
                </div>
            </el-row>
        </el-aside>
        <el-container>
            <el-main>
                <el-row gutter="10" style="margin-bottom: 3px;">
                    <el-col :span="2"><el-button>最新</el-button></el-col>
                    <el-col :span="2"><el-button>综合</el-button></el-col>
                    <el-col :span="3"><el-button>引用数</el-button></el-col>
                </el-row>
                <div>
                <el-row>
                    <ArticleDispaly />
                </el-row>
                <el-row>
                    <ArticleDispaly />
                </el-row>
                <el-row>
                    <ArticleDispaly />
                </el-row>
                <el-row>
                    <ArticleDispaly />
                </el-row>
                <el-row>
                    <ArticleDispaly />
                </el-row>
                <el-pagination style="margin-top: 10px;" layout="prev, pager, next" :total="1000" />
                </div>
            </el-main>
            <el-aside class="right">
                <SearchResultStatics />
                <p style="text-align: center;">前1000条结果统计图</p>
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
.el-header {
    height: 20vh;
    background-color: rgb(255, 255, 255);
}

.el-aside {
    background-color: rgb(255, 255, 255);
    width: 25vw;
    height: 75vh;
}

.left {
    float: left;
}

.right {
    float: right;
}

.classify{
    margin-left: 5vw;
    margin-top: 3vh;
}

.el-main {
    width: 75vw;
    height: 75vh;
    background-color: antiquewhite;
}

.el-footer {
    height: 5vh;
    background-color: rgb(255, 255, 255);
}
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
.home {
    width: 100vw;
    height: 100vh;
}
</style>