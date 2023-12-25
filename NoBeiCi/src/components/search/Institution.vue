<template>
  <div>
    <el-button @click="toggleDrawer" :class="{ active: showDrawer }" class="institution">机构</el-button>
    <div v-if="showDrawer" class="drawer">
      <ul style="list-style-type: none;" class="institution-list">
        <li v-for="(institution, index) in displayedinstitutions" :key="institution.id">
          <el-button class="institution-button"  @click="selectInstitution(institution)">{{ institution.display_name }}({{ institution.doc_count }})</el-button>
        </li>
      </ul>
      <el-button v-if="organizations.length > 5" @click="toggleExpansion">
        {{ isExpanded ? '收起-' : '展开+' }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps(['institutions']);
const emit = defineEmits(['selectInstitution']);
const showDrawer = ref(false);
const isExpanded = ref(false);
const organizations = ref([
  { id: 1, display_name: '北京大学', doc_count: "" },
  { id: 2, display_name: '清华大学', doc_count: "" },
  { id: 3, display_name: '中国科学院', doc_count: "" },
  { id: 4, display_name: '悉尼大学', doc_count: "" },
  { id: 5, display_name: '石溪大学', doc_count: "" },
  { id: 6, display_name: '纽约大学', doc_count: "" },
  { id: 1, display_name: '北京大学', doc_count: "" },
  { id: 2, display_name: '清华大学', doc_count: "" },
  { id: 3, display_name: '中国科学院', doc_count: "" },
  { id: 4, display_name: '悉尼大学', doc_count: "" },
  { id: 5, display_name: '石溪大学', doc_count: "" },
  // 更多机构...
]);
const displayedinstitutions = computed(() => {
  if (isExpanded.value) {
    organizations.value = props.institutions;
    return organizations.value;
  } else {
      organizations.value = props.institutions;
      return organizations.value.slice(0, 5);
  }
});

const toggleDrawer = () => {
  showDrawer.value = !showDrawer.value;
  isExpanded.value = false; // 关闭抽屉时重置展开状态
};

const toggleExpansion = () => {
  isExpanded.value = !isExpanded.value;
};
const selectInstitution = (institution) => {
  emit('selectInstitution', institution);
};
</script>
  
  <style scoped>
  .institution {
    border: 0;
    background-color: #b5bef4;
    width: 16vw;
    height: 5vh;
  }
  
  .button-group .el-button {
    flex: 0 0 calc(50% - 5px);
    margin-left: 0;
  }
  
  button.active {
    background-color:  #fafafa;
    color: #b5bef4;
  }
  
  .drawer {
    border: 1px solid #ccc;
    width: 16vw;
    padding: 0px;
    margin-top: 0px;
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

  .institution-button {
  display: flex;
  width: 16vw;
  white-space: normal; /* Allow text to wrap to the next line */
  word-wrap: break-word; /* Break long words and wrap them */
  max-height: 3em; /* Set a maximum height; adjust as needed */
  overflow: hidden; /* Hide overflow content */
}
  </style>