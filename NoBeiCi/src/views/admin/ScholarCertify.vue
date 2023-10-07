<script setup>
import {ref} from 'vue'

const scholarList = ref([
{name:"111"},{name:"111"},{name:"111"},{name:"111"},{name:"111"},{name:"111"},{name:"111"},{name:"111"},{name:"111"},{name:"111"},{name:"111"},
])

</script>

<template>
  <div>
    审核学者认证
  </div>
  <div v-for="item in scholarList" class="scholar-list">
    <div class="scholar-item">{{ item.name }}</div>
  </div>
</template>

<style scoped lang="scss">

.scholar-list {
    .scholar-item {
        transition: all 0.3s ease-in-out;
        margin: 10px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 10px;
        background-color: #fff;
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: #333;
    }
    .scholar-item:hover{
       box-shadow: 3px 3px 12px 0px rgba(0, 0, 0, 0.618);
    }
}
</style>
