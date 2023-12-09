<!--
 * @Date: 2023-09-14 00:16:18
 * @Author: Q9K
 * @Description:
-->
<script setup>
import Beian from './components/Beian.vue'
import SearchBar from "./components/SearchBar.vue";
import axios from "axios";
import {useUpperSearchBarStore} from "./stores/upperSearchBar.js";

const search = (value) => {
  return axios.get('http://100.92.185.118:8000' + '/concept/search_concept/', {
    params: {
      keyword: value,
      language: 1
    }
  }).then((response) => {
    if (response.status === 200) {
      const data = response.data.data
      console.log(data)
      const upperSearchBar = useUpperSearchBarStore();
      for (let {id, chinese_display_name} of data) {
        upperSearchBar.addIntoOptions(id, chinese_display_name)
        console.log({id, chinese_display_name})
      }
    }
  })
}
</script>

<template>

  <div >

<!--    <router-view></router-view>-->
    <!-- <Beian></Beian> -->
    <SearchBar :info="'can u see me'" :search-function="search"/>
  </div>
</template>

<style scoped lang="scss">


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

