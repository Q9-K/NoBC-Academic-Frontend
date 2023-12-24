<template>
  <div>
    <button @click="toggleDrawer" :class="{ active: showDrawer }" class="journal">期刊</button>
    <div v-if="showDrawer" class="drawer">
      <ul style="list-style-type: none;" class="journal-list">
        <li v-for="(journal, index) in displayedjournals" :key="journal.id">
          <el-button class="journal-button"  @click="selectJournal(journal)">{{ journal.display_name }}({{ journal.doc_count }})</el-button>
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

const props = defineProps(['journals']);
const emit = defineEmits(['selectJournal']);
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
const displayedjournals = computed(() => {
  if (isExpanded.value) {
    organizations.value = props.journals;
    return organizations.value;
  } else {
      organizations.value = props.journals;
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
const selectJournal = (journal) => {
  emit('selectJournal', journal);
};
</script>
  
  <style scoped>
  .journal {
    border: 0;
    border-top: 3px solid #f4081c;
    background-color: #ff8640;
    width: 16vw;
    height: 5vh;
  }
  
  .button-group .el-button {
    flex: 0 0 calc(50% - 5px);
    margin-left: 0;
  }
  
  button.active {
    background-color: rgb(206, 67, 28);
    color: #fff;
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

  .journal-button {
  display: flex;
  width: 16vw;
  white-space: normal; /* Allow text to wrap to the next line */
  word-wrap: break-word; /* Break long words and wrap them */
  max-height: 3em; /* Set a maximum height; adjust as needed */
  overflow: hidden; /* Hide overflow content */
}
  </style>