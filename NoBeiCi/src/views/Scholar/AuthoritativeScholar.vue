<template>
    <NavigateBar></NavigateBar>
    <SearchBar style="margin-top: 10vh;"></SearchBar>
    <div class="main">
        <div class="filter">
            <div v-for="layer, layerIndex in layers" class="filterOption">
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
                    <div class="all" @click="select1" :class="{ highlighted: isHighlighted1 }">综合</div>
                    <div class="hNum" @click="select2" :class="{ highlighted: isHighlighted2 }">h指数</div>
                    <div class="thesisNum" @click="select3" :class="{ highlighted: isHighlighted3 }">论文数</div>
                    <div class="usedNum" @click="select4" :class="{ highlighted: isHighlighted4 }">引用数</div>
                </div>
                <div v-for="scholar in scholars" class="author_block">
                    <div class="scholar_head">{{scholar.name}}</div>
                    <div class="scholar_makes">
                        <div class="H-index">
                            <div style="font-size:11px">
                                H-index:
                                {{ scholar.makes.H_index }}
                            </div>
                        </div>
                        <div class="thesis">
                            <div style="font-size:11px">
                                论文数:
                                {{ scholar.makes.thesis }}
                            </div>
                        </div>
                        <div class="icon">
                            <el-icon style="background-color: #adbbdc;font-size:24px"><Connection /></el-icon>
                        </div>
                        <div class="used">
                            <div style="font-size:11px">
                                引用数:
                                {{ scholar.makes.used }}
                            </div>
                        </div>
                    </div>
                    <div class="scholar_field">
                        <div v-for="field in fields">
                            {{ field }}
                        </div>
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
// import { fa } from 'element-plus/es/locale';
const selectedKeys = ref(['1']);
const openKeys = ref(['sub1']);

var isHighlighted1 = ref(true)
var isHighlighted2 = ref(false)
var isHighlighted3 = ref(false)
var isHighlighted4 = ref(false)
function select1() {
    isHighlighted1.value = true
    isHighlighted2.value = false
    isHighlighted3.value = false
    isHighlighted4.value = false
}
function select2() {
    isHighlighted1.value = false
    isHighlighted2.value = true
    isHighlighted3.value = false
    isHighlighted4.value = false
}
function select3() {
    isHighlighted1.value = false
    isHighlighted2.value = false
    isHighlighted3.value = true
    isHighlighted4.value = false
}
function select4() {
    isHighlighted1.value = false
    isHighlighted2.value = false
    isHighlighted3.value = false
    isHighlighted4.value = true
}

var scholars = ref([{ name: 'vouzenus', makes: { H_index: 999, thesis: 25, used: 50 }, fields: ["co", "os"] }
    , { name: 'vouzenus', makes: { H_index: 999, thesis: 25, used: 50 }, fields: ["co", "os"] }
    , { name: 'vouzenus', makes: { H_index: 999, thesis: 25, used: 50 }, fields: ["co", "os"] }
    , { name: 'vouzenus', makes: { H_index: 999, thesis: 25, used: 50 }, fields: ["co", "os"] }
    , { name: 'vouzenus', makes: { H_index: 999, thesis: 25, used: 50 }, fields: ["co", "os"] }
])

var layers = ref([{ name: "h指数:", options: [1, 2, 3, 4] }, { name: "性别:", options: ['男', '女'] }, { name: "地区", options: ['中国', '美国', '俄罗斯', '台湾省'] }])
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
    getItem('职称', 'sub1', () => h(MailOutlined), [
        getItem('Professor', '1'),
        getItem('Research', '2'),
    ]),
    getItem('机构', 'sub2', () => h(AppstoreOutlined), [
        getItem('北航大专', '3'),
        getItem('清华大学', '4'),
    ]),
]);
const handleClick = e => {
    console.log('click', e);
};
watch(openKeys, val => {
    console.log('openKeys', val);
});
function chooseFilter(index) {
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
    justify-content: flex-start;
}

.filter {
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

.filterOption {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: left;
    border-bottom: solid #fff;
    border-width: 1px;
    height: 40px;
    width: auto;
}

.filterName {
    width: 100px;
    margin-right: 50px;
    font-size: 12px;
    font-weight: 600;
}

.option {
    width: 50px;
    font-size: 12px;
    font-weight: 600;
    margin-right: 10px;
}

.option:hover {
    background-color: lightblue;
    border: 1px solid #ccc;
    cursor: pointer;
}

.author {
    margin-top: 10px;
    flex-direction: row;
    justify-content: flex-start;
    display: flex;
    text-align: space-around;
    width: 70vw;
    margin-left: 15vw;
    background-color: #fff;
}

.leftNavigate {
    flex: 5;
    max-height: 60vh;
    overflow: auto;
}

.leftNavigate::-webkit-scrollbar {
    width: 2px;
    /* 设置滚动条宽度 */
}

.leftNavigate::-webkit-scrollbar-thumb {
    background-color: #888;
    /* 设置滚动条拖动部分的颜色 */
    border-radius: 6px;
    /* 设置滚动条拖动部分的圆角 */
}

.leftNavigate::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    /* 设置滚动条轨道的颜色 */
}

.detail {
    flex: 25;
}

.search {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    height: 50px;
    align-items: center;
    border-bottom: solid #f2f4f7;
}

.all {
    width: 100px;
}

.hNum {
    width: 100px;
}

.thesisNum {
    width: 100px;
}

.usedNum {
    width: 100px;
}

.author_block {
    width: 95%;
    margin-left: auto;
    margin-right: auto;
    height: 150px;
    margin-bottom: 10px;
    border: solid #f2f4f7;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.scholar_head{
    margin-top: 10px;
    margin-left: 20px;
    height: 30px;
    font-size: 18px;
    font-weight: 700;
}
.scholar_makes{
    margin-left: 20px;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    .H-index{
        border: solid #ccc;
        border-width: 1px;
        margin-right: 20px;
        height: 50%;
        width: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .thesis{
        border: solid #ccc;
        border-width: 1px;
        margin-right: 20px;
        height: 50%;
        width: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .icon{
        height: 50%;
    }
    .used{
        border: solid #ccc;
        border-width: 1px;
        margin-right: 20px;
        height: 50%;
        width: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
.scholar_field{
    margin-left: 20px;
    height: 50px;
}
.highlighted {
    color: #4759c5;
    background-color: #fafafa;
    border-bottom: hidden;
}</style>