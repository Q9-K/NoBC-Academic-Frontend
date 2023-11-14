<!--
 * @Date: 2023-09-14 00:16:18
 * @Author: Q9K
 * @Description: 
-->
<script setup>
import Beian from './components/Beian.vue'
</script>

<template>
  
  <div >
    
    <router-view></router-view>
    <!-- <Beian></Beian> -->
  </div>
</template>

<style>


html,
body {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  height: 100vh;
  /* margin: 0 !important; */
  /* padding: 0 !important; */
  max-width: none;
}
</style>


<style scoped >


.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

