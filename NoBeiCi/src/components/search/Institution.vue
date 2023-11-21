<template>
    <div>
      <button @click="toggleDrawer" :class="{ active: showDrawer }" class="institution">机构</button>
      <div v-if="showDrawer" class="drawer">
        <el-input v-model="input" placeholder="搜素机构" class="input-with-select" size="small">
            <template #append>
                <el-button :icon="Search">Search</el-button>
            </template>
        </el-input>
        <ul class="institution-list">
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
          { id: 1, name: '北京大学(357)' },
          { id: 2, name: '清华大学(22)' },
          { id: 3, name: '中国科学院(20)' },
          { id: 4, name: '悉尼大学(232)' },
          { id: 5, name: '石溪大学(43)' },
          { id: 6, name: '纽约大学(2)' },
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
  .institution {
    border: 0;
    border-top: 3px solid #120ef7;
    background-color: rgb(153, 203, 224);
    width: 16vw;
    height: 5vh;
  }

  button.active {
   background-color: rgb(17, 0, 255);
   color: #fff;
  }

  .drawer {
    border: 1px solid #ccc;
    padding: 10px;
    margin-top: 0px;
  }

  .institution-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  </style>