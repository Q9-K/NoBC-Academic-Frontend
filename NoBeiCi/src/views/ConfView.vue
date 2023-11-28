<template>
    <el-container class="home">
        <el-header>
            <el-row style="height: 10vh;">
                <NavBar />
            </el-row>
        </el-header>
        <el-container>
            <el-aside class="left-condition">
                condition
            </el-aside>
            <el-container>
                <el-main>
                    main
                </el-main>
            </el-container>
        </el-container>
        <el-footer>
            footer
        </el-footer>
    </el-container>
</template>

<script setup>
import NavBar from '../components/NavigateBar.vue';

</script>

<style>

.el-header {
    height: 25vh;
    background-color: rgb(255, 255, 255);
}

.el-aside {
    background-color: rgb(255, 255, 255);
    width: 25vw;
    height: 70vh;
}

.el-main {
    width: 75vw;
    height: 70vh;
    background-color: antiquewhite;
}

.el-footer {
    height: 5vh;
    background-color: rgb(255, 255, 255);
}

.home {
    width: 100vw;
    height: 100vh;
}

</style>