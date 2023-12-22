<template>
    <div>
      <button @click="toggleDrawer" :class="{ active: showDrawer }" class="journal">期刊</button>
  
      <div class="drawer" v-show="showDrawer">
        <div class="button-group">
          <el-button
            v-for="(zone, index) in sciZones"
            :key="index"
            @click="toggleZone(index)"
            :class="{ active: activeZone === index }"
            class="journal-kind"
          >
            {{ zone }}
          </el-button>
        </div>
        <div v-for="(zone, index) in sciZones" :key="index" v-show="activeZone === index">
          <ul>
            <li v-for="(journal, jIndex) in journalList[zone]" :key="jIndex" v-show="!collapsed[index] || jIndex < 3">
              <el-button style="width: 16vw;">{{ journal }}</el-button>
            </li>
          </ul>
          <button @click="toggleCollapse(index)">
            {{ collapsed[index] ? '展开+' : '折叠-' }}
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showDrawer: false,
        activeZone: null,
        collapsed: [true, true, true, true], // 初始化全部折叠
        sciZones: ['SCI一区', 'SCI二区', 'SCI三区', 'SCI四区'],
        journalList: {
          'SCI一区': ['期刊1', '期刊2', '期刊3', '期刊4', '期刊5', '期刊6', '期刊7'],
          'SCI二区': ['期刊8', '期刊9', '期刊10', '期刊11', '期刊12', '期刊13', '期刊14'],
          'SCI三区': ['期刊15', '期刊16', '期刊17', '期刊18', '期刊19', '期刊20', '期刊21'],
          'SCI四区': ['期刊22', '期刊23', '期刊24', '期刊25', '期刊26', '期刊27', '期刊28']
        }
      };
    },
    created() {
      this.sciZones.forEach((zone) => {
        // 判断期刊数量是否大于3，设置初始折叠状态
        this.collapsed.push(this.journalList[zone].length > 3);
      });
    },
    methods: {
      toggleDrawer() {
        this.showDrawer = !this.showDrawer;
      },
      toggleZone(index) {
        if (this.activeZone === index) {
          this.activeZone = null;
        } else {
          this.activeZone = index;
        }
      },
      toggleCollapse(index) {
        this.collapsed[index] = !this.collapsed[index];
      }
    }
  };
  </script>
  
  <style>
  .journal {
    border: 0;
    border-top: 3px solid #f4081c;
    background-color: #409EFF;
    width: 16vw;
    height: 5vh;
  }
  
  .button-group .el-button {
    flex: 0 0 calc(50% - 5px);
    margin-left: 0;
  }
  
  button.active {
    background-color: #f00;
    color: #fff;
  }
  
  .drawer {
    background-color: #f5f5f5;
    margin-top: 10px;
    padding: 10px;
    border-radius: 4px;
  }
  
  .drawer button {
    margin-right: 10px;
  }
  
  .drawer ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  
  .drawer button:last-child {
    margin-top: 10px;
  }
  </style>