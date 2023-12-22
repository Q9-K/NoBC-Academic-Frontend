<template>
    <div>
      <button @click="toggleDrawer" :class="{ active: showDrawer }" class="subject">学科</button>
      <div v-if="showDrawer" class="drawer">
        <ul style="list-style-type: none;" class="subject-list">
          <li v-for="(organization, index) in displayedOrganizations" :key="organization.id">
            <el-button style="width: 16vw;">{{ organization.name }}</el-button>
          </li>
        </ul>
        <el-button v-if="organizations.length > 5" @click="toggleExpansion">
          {{ isExpanded ? '收起-' : '展开+' }}
        </el-button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showDrawer: false,
        isExpanded: false,
        organizations: [
          { id: 1, name: '物理学(952)' },
          { id: 2, name: '化学(452)' },
          { id: 3, name: '光学工程(134)' },
          { id: 4, name: '材料科学与工程(496)' },
          { id: 5, name: '生物工程(462)' },
          { id: 6, name: '能源动力(93)' },
          // 更多机构...
        ]
      };
    },
    computed: {
      displayedOrganizations() {
        if (this.isExpanded) {
          return this.organizations;
        } else {
          return this.organizations.slice(0, 5);
        }
      }
    },
    methods: {
      toggleDrawer() {
        this.showDrawer = !this.showDrawer;
        this.isExpanded = false; // 关闭抽屉时重置展开状态
      },
      toggleExpansion() {
        this.isExpanded = !this.isExpanded;
      }
    }
  };
  </script>
  
  <style>
  .subject {
    border: 0;
    border-top: 3px solid #f4081c;
    background-color: #409EFF;
    width: 16vw;
    height: 5vh;
  }

  button.active {
   background-color: rgb(0, 140, 255);
   color: #fff;
  }

  .drawer {
    border: 1px solid #ccc;
    width: 16vw;
    padding: 0px;
    margin-top: 0px;
  }

  .subject-list {
    padding: 0;
    margin: 0;
  }
  </style>