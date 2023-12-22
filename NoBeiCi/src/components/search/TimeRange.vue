<template>
    <div>
      <button @click="toggleDrawer" :class="{active: showDrawer}" class="time-range">{{ i18n.t('timeRanges.timeRangesTime') }}</button>
      <div v-if="showDrawer" class="drawer">
        <div class="form-row">
          <select v-model="startYear" class="select">
            <option v-for="year in years" :value="year">{{ year }}</option>
          </select>
          <span style="padding: 7px;">至</span>
          <select v-model="endYear" class="select">
            <option v-for="year in years" :value="year">{{ year }}</option>
          </select>
        </div>
        <div class="buttons">
          <el-button @click="setTimeRange(3)" class="default-time">近三年</el-button>
          <el-button @click="setTimeRange(10)" class="default-time">近五年</el-button>
          <el-button @click="setTimeRange(5)" class="default-time">近十年</el-button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import i18n from "../../locales/index.js";
  
  const currentYear = new Date().getFullYear();
  const years = [...Array(50).keys()].map(i => currentYear - i);
  const showDrawer = ref(false);
  const startYear = ref(null);
  const endYear = ref(null);
  
  const toggleDrawer = () => {
    showDrawer.value = !showDrawer.value;
  };
  
  const sendDataToParent = () => {
    if (startYear.value !== null && endYear.value !== null) {
      this.$emit('sendData', { startYear: startYear.value, endYear: endYear.value });
    }
  };

  const setTimeRange = (years) => {
    endYear.value = currentYear;
    startYear.value = currentYear - years + 1;
    sendDataToParent();
  };
  
  watch([startYear, endYear], () => {
    sendDataToParent();
  });
  </script>
  
  
  <style>
  .time-range {
    border: 0;
    border-top: 3px solid #f4081c;
    background-color: #409EFF;
    width: 16vw;
    height: 5vh;
  }

  button.active {
   background-color: rgb(17, 0, 255);
   color: #fff;
  }

  .drawer {
    border: 1px solid #120ef7;
    padding: 10px;
    margin-top: 5px;
    background-color: rgb(240, 236, 236);
  }
  
  .form-row {
    margin-bottom: 5px;
    margin-left: 2vw;
    height: 4vh;
    padding: 0;
  }
  
  .buttons {  
    display: flex;  
    justify-content: flex-start;
    flex-wrap: nowrap;
  }  
  
  .select {
    padding-bottom: 0;
    padding: 0.5vw;
  }

  .default-time {
    height: 1vh;
    padding: 0.7vw;
    margin-top: 9px;
  }
  </style>