<template>
    <NavigateBar></NavigateBar>    
    <div class="root">
        <div class="all">
            <div class="head">

            </div>
        </div>
    </div>
</template>
<script setup>
import NavigateBar from "../components/NavigateBar.vue"
</script>
<style scoped>
.root {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    min-height: 100vh;
    width: 100vw;
    display: block;
}

.all {
    display: flex;
    flex-direction: column;
}

.head {
    height: 10vh;
    width: 100vw;
    background-color: aqua;
}
</style>