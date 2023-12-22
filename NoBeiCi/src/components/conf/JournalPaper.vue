<template>
    <el-container>
        <el-aside>
            <!-- 学者列表 -->
        </el-aside>
        <el-main>
            <ArticleDispaly />
            <el-row gutter="10" style="margin-bottom: 3px;">
                    <ArticleDispaly />
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
    </el-container>
</template>

<script>
import ArticleDispaly from '../search/ArticleDisplay.vue'
</script>

<style>

</style>