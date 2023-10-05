<!--
 * @Date: 2023-09-14 00:16:18
 * @Author: Q9K
 * @Description: 
-->
<script setup>
import Beian from './components/Beian.vue'
</script>

<template>
  <router-view />
</template>

<style scoped lang="scss">
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
