<template>
  <div class="searchBox" >
    <div class="searchMain">
      <h2>{{ i18n.t("scholar.title") }}</h2>
      <a-select
        v-model:value="value"
        show-search size='large'
        placeholder="Select"
        :options="options"
        class="select"
        :filter-option="false"
        @focus="handleFocus"
        @blur="handleBlur"
        @search="handleSearch"
        @select="handleOptionSelect"
      ></a-select>
    </div>
    <div class="info">
      <div class="infoDetail">
        <div class="avatar">
          <el-icon style="font-size: 25px; color:antiquewhite"><Avatar /></el-icon>
        </div>
        <div class="data">
          <div class="num">
            89,520,174
          </div>
          <div class="name">
            {{ i18n.t("scholar.scholar") }}
          </div>
        </div>
      </div>
      <div class="infoDetail">
        <div class="avatar">
          <el-icon style="font-size: 25px; color:antiquewhite"><Collection /></el-icon>
        </div>
        <div class="data">
          <div class="num">
            246,328,942
          </div>
          <div class="name">
            {{ i18n.t("scholar.thesis") }}
          </div>
        </div>
      </div>
      <div class="infoDetail">
        <div class="avatar">
          <el-icon style="font-size: 25px;color:antiquewhite"><Money /></el-icon>
        </div>
        <div class="data">
          <div class="num">
            65,073
          </div>
          <div class="name">
            {{ i18n.t("scholar.field") }}
          </div>
        </div>
      </div>
      <div class="infoDetail">
        <div class="avatar">
          <el-icon style="font-size: 25px;color:antiquewhite"><Share /></el-icon>
        </div>
        <div class="data">
          <div class="num">
            107,246
          </div>
          <div class="name">
            {{ i18n.t("scholar.institution") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import { toRefs, defineProps, onMounted } from 'vue'
import { ref } from 'vue';
import {debounce} from "vue-debounce";
import {useUpperSearchBarStore} from "../stores/upperSearchBar.js";
import i18n from "../locales/index.js";
const props = defineProps({
  info: String,
  searchFunction: {
    type: Function
  },
  selectFunction: {
    type: Function
  }
})
const options = ref([]);
const value = ref(undefined);

const handleOptionSelect = (value) => {
  props.selectFunction(value)
}

const handleBlur = () => {
  console.log('blur');
};

const handleFocus = () => {
  console.log('focus');
};

const handleSearch = debounce((value) => {

  const upperSearchBar = useUpperSearchBarStore()
  upperSearchBar.cleanOptions()

  const p = props.searchFunction(value)

  Promise.all([p])
    .then(() => {
      options.value = upperSearchBar.getOptions;
      console.log(upperSearchBar.getOptions)
    })

}, "10ms")
</script>
<style scoped>
.searchBox {
  left: 0;
  width: 100vw;
  height: 30vh;
  display: flex;
  /* background: linear-gradient(#0000CD , #000000  ); */
  /* background-image: url(https://img2.baidu.com/it/u=3199718864,3543619270&fm=253&fmt=auto&app=138&f=JPEG?w=844&h=350); */
  background-image: url(https://img.zcool.cn/community/0136cf57c68a000000012e7ead255d.jpg@2o.jpg);
  /* background-position: right 5% bottom 65%; */
}

.searchMain {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  width: 40vw;
  height: 100%;
  margin-left: 200px;
  margin-right: auto;
}

h2 {
  flex: 1;
  margin-top: 70px;
  margin-bottom: 0px;
  color: white;
  font-weight: 600;
  font-family: 'Courier New', Courier, monospace;
  text-align: center;
  font-size: 35px;
  letter-spacing: 3px;
}

.select {
  flex: 1;
  margin-top: 0px;
  margin-bottom: 20px;
  width: 500px;
  height: 80px;
  border-radius: 30px;
}
.ant-select-selector{
  height: 200px;
}
.info {
  flex: 0 0 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  padding-top: 30px;
  padding-bottom: 30px;
}

.infoDetail {
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
}
.avatar {
  height: 20px;
  margin: auto;
  margin-right: 10px;
  flex: 1;
}
.data {
  flex: 2;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.num {
  font-weight: 600;
  color: aliceblue;
  width: auto;
  flex: 0 1 0;
  font-size: 10px;
}
.name {
  font-weight: 200;
  opacity: 0.8;
  color: aliceblue;
  width: auto;
  flex: 0 1 0;
  font-size: 12px;
}
</style>
