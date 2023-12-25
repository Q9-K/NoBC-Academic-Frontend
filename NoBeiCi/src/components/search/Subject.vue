<template>
  <div>
    <el-button @click="toggleDrawer" :class="{ active: showDrawer }" class="subject">学科</el-button>
    <div v-if="showDrawer" class="drawer">
      <ul style="list-style-type: none;" class="subject-list">
        <li v-for="(subject, index) in displayedSubjects" :key="subject.id" style="display: flex;"> 
          <el-button class="subject-button" @click="selectSubject(subject)">{{ subject.display_name }}({{ subject.doc_count }})</el-button>
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

const props = defineProps(['subjects']);
const emit = defineEmits(['selectSubject']);
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
const displayedSubjects = computed(() => {
  if (isExpanded.value) {
    organizations.value = props.subjects;
    return organizations.value;
  } else {
      organizations.value = props.subjects;
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
const selectSubject = (subject) => {
  emit('selectSubject', subject);
};

</script>

  
  <style scoped>
  .subject {
    background-color: #b5bef4;
    width: 16vw;
    height: 5vh;
  }

  button.active {
   background-color: #fafafa;
   color: b5bef4;
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

  .subject-button {
  display: flex;
  width: 16vw;
  height: 300%;
  white-space: normal; /* Allow text to wrap to the next line */
  word-wrap: break-word; /* Break long words and wrap them */
  max-height: 4em; /* Set a maximum height; adjust as needed */
  overflow: hidden; /* Hide overflow content */
}
  </style>