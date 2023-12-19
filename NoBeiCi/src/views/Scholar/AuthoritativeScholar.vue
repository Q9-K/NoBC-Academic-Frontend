<template>
    <NavigateBar></NavigateBar>
    <SearchBar></SearchBar>
    <div class="main">
        <div class="leftNavigate">
            <a-menu id="dddddd" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" style="width: 256px"
                mode="inline" :items="items" @click="handleClick"></a-menu>
        </div>
        <div class="detail">
            <div v-for="author in authors">
                <div class="author-block">
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import NavigateBar from '../../components/NavigateBar.vue';
import SearchBar from '../../components/SearchBar.vue';
import { reactive, ref, watch, h } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
const selectedKeys = ref(['1']);
const openKeys = ref(['sub1']);
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = reactive([
    getItem('Navigation One', 'sub1', () => h(MailOutlined), [
        getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
        getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
    ]),
    getItem('Navigation Two', 'sub2', () => h(AppstoreOutlined), [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),
    {
        type: 'divider',
    },
    getItem('Navigation Three', 'sub4', () => h(SettingOutlined), [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),
    getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
]);
const handleClick = e => {
    console.log('click', e);
};
watch(openKeys, val => {
    console.log('openKeys', val);
});

const authors = reactive([1,2,3,4,5])
</script>
<style scoped>
.main {
    position: absolute;
    top: 40vh;
    flex-direction: row;
    justify-content: flex-start;
    display: flex;
    text-align: space-around;
    width: 100vw;
    max-height: 60vh;
}
.leftNavigate{
    flex: 4;
    max-height: 60vh;
    overflow: auto;
}
.leftNavigate::-webkit-scrollbar {
    width: 2px; /* 设置滚动条宽度 */
}

.leftNavigate::-webkit-scrollbar-thumb {
    background-color: #888; /* 设置滚动条拖动部分的颜色 */
    border-radius: 6px; /* 设置滚动条拖动部分的圆角 */
}

.leftNavigate::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* 设置滚动条轨道的颜色 */
}
.detail{
    flex: 25;
    overflow-y: auto;
}
.author-block{
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    height: 150px;
    margin-bottom: 10px;
    margin-top: 5px;
    border: solid;
    border-radius: 20px;
}
</style>