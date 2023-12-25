<template>
    <div class="NewSelect">
      <p>ANTD-Vue select组件可输入可下拉单选</p>
      <a-select
        :disabled="getlistLoading"
        v-model="value"
        :show-search="true"
        :not-found-content="null"
        :showArrow="false"
        :filter-option="true"
        :autoClearSearchValue="false"
        @search="handleSearch"
        @blur="handleBlur"
        @change="handleChange"
        style="width: 200px"
      >
      <!-- 
        disabled             //是否禁用  
        v-model              //不多说了吧 这个还不会?
        show-search          //可搜索
        not-found-content    //当下拉列表为空时显示的内容
        showArrow            //是否显示下拉小箭头
        filter-option        //是否根据输入项进行筛选。当其为一个函数时，会接收 inputValue option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false
        autoClearSearchValue //是否在选中项后清空搜索框，只在 mode 为 multiple 或 tags 时有效。
        @search              //文本框值变化回调事件
        @blur                //失去焦点回调事件 
        @change              //选中回调事件
       -->
        <a-select-option v-for="(item, index) in list" :key="item" :value="item">
          {{ item }}</a-select-option
        >
      </a-select>
    </div>
  </template>
  
  <script>
  export default {
    name: "NewSelect",
    //数据源
    data() {
      return {
        list: ["list", "table"], //下拉数据列表
        value: "", //选择下拉列表中选项后的值(最终值)
        getlistLoading: false, //获取到下拉列表的数据前默认改选择器不可用
      };
    },
    methods: {
      // 实现select选择框可下拉单选，也可输入赋值
      handleSearch(value) {
        this.handleChange(value);
      },
      handleChange(value) {
        //判断value不等于null并且不为空的情况,然后把选择或者输入的值赋值,如果为空赋值为空数组 
        this.value = value != null && value != "" ? value : [];
        console.log(this.value)
      },
      handleBlur(value) {
        this.value = value;
        //判断数组里有没输入的值 如果没有再赋值
        if (this.list.indexOf(value) == -1) {
          this.list.push(value);
        }
      },
    },
  };
  </script>
  