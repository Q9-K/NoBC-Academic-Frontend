<template>
    <NavigateBar></NavigateBar>
    <SearchBar></SearchBar>
    <div class="main">
        <div class="filter">
            <div v-for="layer,layerIndex in layers" class="filterOption">
                <div class="filterName">
                    {{ layer.name }}
                </div>
                <div v-for="option, index in layer.options" @click="chooseFilter(layerIndex)" class="option">
                    {{ option }}
                </div>
            </div>
        </div>
        <div class="author">
            <div class="leftNavigate">
                <a-menu id="dddddd" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" style="width: 213px"
                    mode="inline" :items="items" @click="handleClick"></a-menu>
            </div>
            <div class="detail">
                <div class="search">
                    <div class="all">综合</div>
                    <div class="hNum">h指数</div>
                    <div class="thesisNum">论文数</div>
                    <div class="usedNum">引用数</div>
                </div>
                <div v-for="author in authors">
                    <div class="author-block">
                        
                    </div>
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
var layers = ref([{name:"h指数:", options:[1,2,3,4]},{name:"性别:",options:['男','女']},{name:"地区",options:['中国','美国','俄罗斯','台湾省']}])
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
        getItem('Submenu', 'sub3',null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
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
]);
const handleClick = e => {
    console.log('click', e);
};
watch(openKeys, val => {
    console.log('openKeys', val);
});

const authors = reactive([1,2,3,4,5])
function chooseFilter(index){
    layers.filter(index)
}
</script>
<style scoped>
.main {
    position: absolute;
    top: 41vh;
    width: 100vw;
    min-height: 60vh;
    background-color: #f2f4f7;
    display: flex;
    flex-direction: column;
    justify-content: start;
}
.filter{
    width: 70vw;
    margin-left: 15vw;
    height: auto;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    border: solid #ccc;
    border-width: 1px;
    margin-bottom: 10px;
}
.filterOption{
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: left;
    border-bottom:solid #fff;
    border-width: 1px;
    height: 40px;
    width: auto;
}
.filterName{
    width: 100px;
    margin-right: 50px;
    font-size: 12px;
    font-weight: 600;
}
.option{
    width: 50px;
    font-size: 12px;
    font-weight: 600;
    margin-right: 10px;
}
.option:hover{
    background-color: lightblue; 
    border: 1px solid #ccc; 
    cursor: pointer; 
}
.author{
    margin-top: 10px;
    flex-direction: row;
    justify-content: flex-start;
    display: flex;
    text-align: space-around;
    width: 70vw;
    margin-left: 15vw;
    background-color: #fff;
}
.leftNavigate{
    flex: 5;
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
}
.search{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 50px;
    align-items: center;
    border-bottom: solid #f2f4f7;
}
.all{
    width: 100px;
}
.hNum{
    width: 100px;
}
.thesisNum{
    width: 100px;
}
.usedNum{
    width: 100px;
}
.author-block{
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    height: 150px;
    margin-bottom: 10px;
    border: solid #f2f4f7;
}
</style>