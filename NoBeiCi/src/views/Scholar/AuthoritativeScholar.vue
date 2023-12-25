<template>
    <NavigateBar></NavigateBar>
    <div class="searchBox" >
        <div class="searchMain">
            <h2>{{ i18n.t("scholar.title") }}</h2>
            <div class="searchIcon">
                <div style="margin-top:10px;background-color: #fff;width:40px;margin-right:3pxh;eight:20px;z-index:9999">
                    <el-icon style="font-size: 20px; z-index:9999;cursor:pointer;" @click="searchScholar()">
                        <Search />
                    </el-icon>
                </div>
            </div>
            <a-select v-model:value="value" show-search size='large' placeholder="Select" :options="options" class="select"
                :filter-option="false" @focus="handleFocus" @blur="handleBlur" @search="handleSearch"
                @select="handleOptionSelect"></a-select>
        </div>
        <div class="info1">
            <div class="infoDetail">
                <div class="avatar1">
                    <el-icon style="font-size: 25px; color:antiquewhite">
                        <Avatar />
                    </el-icon>
                </div>
                <div class="data">
                    <div class="num">
                        1111
                    </div>
                    <div class="name">
                        科研人员
                    </div>
                </div>
            </div>
            <div class="infoDetail">
                <div class="avatar1">
                    <el-icon style="font-size: 25px; color:antiquewhite">
                        <Collection />
                    </el-icon>
                </div>
                <div class="data">
                    <div class="num">
                        1111
                    </div>
                    <div class="name">
                        论文成果
                    </div>
                </div>
            </div>
            <div class="infoDetail">
                <div class="avatar1">
                    <el-icon style="font-size: 25px;color:antiquewhite">
                        <Money />
                    </el-icon>
                </div>
                <div class="data">
                    <div class="num">
                        1111
                    </div>
                    <div class="name">
                        知识概念
                    </div>
                </div>
            </div>
            <div class="infoDetail">
                <div class="avatar1">
                    <el-icon style="font-size: 25px;color:antiquewhite">
                        <Share />
                    </el-icon>
                </div>
                <div class="data">
                    <div class="num">
                        1111
                    </div>
                    <div class="name">
                        引用关系
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="main" v-loading.fullscreen.lock="fullscreenLoading">
        <div class="result" v-if="showResult">
            <p>{{ i18n.t("scholar.include") }}&nbsp;&nbsp;&nbsp;'</p>
            <p style="font-size: 30px;color:blue; font-size: 800"> {{ final_name }} </p>
            <p>'&nbsp;&nbsp;&nbsp;({{ scholar_num }}</p>
            <p v-if="scholar_num == 10000">+</p>
            <p>){{ i18n.t("scholar.thesises") }}</p>
            <div style="margin-left: 30px;font-size: 12px;width:auto;display:flex;flex-direction:row;text-align: left;">
                <p>{{ i18n.t("scholar.result") }}</p>
                <p style="color: blue;font-weight: 800;"> {{ time }} </p> ms
            </div>
        </div>
        <div class="filter" v-if="showResult">
            <div v-for="layer, layerIndex in layers" class="filterOption">
                <div class="filterName">
                    {{ layer.name }}
                </div>
                <div v-for="option, index in layer.options" @click="chooseFilter(layerIndex, index)" class="option"
                    :class="{ highlight: index === layers[layerIndex].highlight }">
                    {{ option }}
                </div>
            </div>
        </div>
        <div class="author">
            <div class="leftNavigate">
                <!-- <a-menu id="dddddd" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys1" style="width: 213px"
                    mode="inline" :items="h_index" @click="handleClick1"></a-menu> -->
                <a-menu id="dddddd" v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys2" style="width: 213px"
                    mode="inline" :items="institution" @click="handleClick2" @hover="handleHover()"></a-menu>
            </div>
            <div class="detail">
                <div class="search">
                    <div class="all" @click="select1" :class="{ highlighted: isHighlighted1 }">{{ i18n.t("scholar.synthesis") }}</div>
                    <div class="hNum" @click="select2" :class="{ highlighted: isHighlighted2 }">{{ i18n.t("scholar.h") }}</div>
                    <div class="thesisNum" @click="select3" :class="{ highlighted: isHighlighted3 }">{{ i18n.t("scholar.thesises") }}</div>
                    <div class="usedNum" @click="select4" :class="{ highlighted: isHighlighted4 }">{{ i18n.t("scholar.quotes") }}</div>
                </div>
                <ScholarDisplay :scholars="scholars" />
                <div class="page">
                    <el-pagination :page-size="20" layout="prev, pager, next" :total=scholar_num :current-page=currentPage
                        @current-change="changePage" v-if="showResult" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import NavigateBar from '../../components/NavigateBar.vue';
import ScholarDisplay from '../../components/ScholarDisplay.vue';
import { reactive, ref, watch, h, toRaw, nextTick, onMounted } from 'vue';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { debounce } from "vue-debounce";
import axios from 'axios';
import i18n from "../../locales/index.js";
import request from "../../functions/Request"
// 全局等待
const fullscreenLoading = ref(false)
//接口响应的时间
const time = ref(null)
// 选择的选项
const options = ref([]);
// 搜索的名字
const value = ref();
// 学者的数量
const scholar_num = ref(0)
// 是否展示搜索结果
const showResult = ref(false)
// const handleOptionSelect = (value) => {
//     props.selectFunction(value)
// }
// 当前页数
const currentPage = ref()
const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;
// 搜索的学者名字
const scholar_name = ref()
// 最终的学者名
const final_name = ref()
const handleSearch = debounce(async (value) => {
    if (isNonEmptyString(value)) {
        scholar_name.value = value
        const { data: res } = await axios.get('http://100.103.70.173:8000/author/get_author_by_name/', {
            params: {
                author_name: value,
                page_num: "1",
                page_size: "10"
            }
        })
        const option = []
        for (let i = 0; i < res.data.authors.length; i++) {
            option.push({ value: res.data.authors[i].display_name })
        }
        options.value = option
    }
}, "10ms")
//左侧聚类选择选项1
var selectedKeys1 = ref();
//左侧聚类选择选项2
var selectedKeys2 = ref();
// 选定的机构
const selectedInstitution = ref('')
// 过滤条件
const h_index_up = ref('')
const h_index_down = ref('')
const order_by = ref("")
const openKeys = ref(['sub1']);
// 选择order种类
var isHighlighted1 = ref(true)
var isHighlighted2 = ref(false)
var isHighlighted3 = ref(false)
var isHighlighted4 = ref(false)
async function select1() {
    isHighlighted1.value = true
    isHighlighted2.value = false
    isHighlighted3.value = false
    isHighlighted4.value = false
    // 按default排序
    fullscreenLoading.value = true
    const { data: res } = await axios.get('http://100.103.70.173:8000/author/get_author_by_name/', {
        params: {
            author_name: final_name.value,
            page_num: "1",
            page_size: "20",
            order_by: "default",
            instituion: selectedInstitution.value,
            h_index_up: h_index_up.value,
            h_index_down: h_index_down.value
        }
    })
    order_by.value = "default"
    fullscreenLoading.value = false
    scholars.value = res.data.authors
}
async function select2() {
    isHighlighted1.value = false
    isHighlighted2.value = true
    isHighlighted3.value = false
    isHighlighted4.value = false
    // 按h_index排序
    fullscreenLoading.value = true
    const { data: res } = await axios.get('http://100.103.70.173:8000/author/get_author_by_name/', {
        params: {
            author_name: final_name.value,
            page_num: "1",
            page_size: "20",
            order_by: "h-index",
            instituion: selectedInstitution.value,
            h_index_up: h_index_up.value,
            h_index_down: h_index_down.value
        }
    })
    order_by.value = "h-index"
    fullscreenLoading.value = false
    scholars.value = res.data.authors
    console.log(res)
    console.log(selectedInstitution.value)
    console.log(h_index_up.value)
    console.log(h_index_down.value)
}
async function select3() {
    isHighlighted1.value = false
    isHighlighted2.value = false
    isHighlighted3.value = true
    isHighlighted4.value = false
    fullscreenLoading.value = true
    const { data: res } = await axios.get('http://100.103.70.173:8000/author/get_author_by_name/', {
        params: {
            author_name: final_name.value,
            page_num: "1",
            page_size: "20",
            order_by: "work",
            instituion: selectedInstitution.value,
            h_index_up: h_index_up.value,
            h_index_down: h_index_down.value
        }
    })
    order_by.value = "work"
    fullscreenLoading.value = false
    scholars.value = res.data.authors
}
async function select4() {
    isHighlighted1.value = false
    isHighlighted2.value = false
    isHighlighted3.value = false
    isHighlighted4.value = true
    fullscreenLoading.value = true
    const { data: res } = await axios.get('http://100.103.70.173:8000/author/get_author_by_name/', {
        params: {
            author_name: final_name.value,
            page_num: "1",
            page_size: "20",
            order_by: "cite",
            instituion: selectedInstitution.value,
            h_index_up: h_index_up.value,
            h_index_down: h_index_down.value
        }
    })
    order_by.value = "cite"
    fullscreenLoading.value = false
    scholars.value = res.data.authors
    console.log(scholars)
}
async function changePage(val) {
    fullscreenLoading.value = true
    const { data: res } = await axios.get('http://100.103.70.173:8000/author/get_author_by_name/', {
        params: {
            author_name: final_name.value,
            page_num: val,
            page_size: "20",
            order_by: order_by.value,
            institution: selectedInstitution.value,
            h_index_up: h_index_up.value,
            h_index_down: h_index_down.value
        }
    })
    fullscreenLoading.value = false
    scholars.value = res.data.authors
    currentPage.value = val
}
var isfilterHighlight = ref(false)
// 搜索结果，学者列表
// var scholars = ref([{ name: 'vouzenus', makes: { H_index: 999, thesis: 25, used: 50 }, fields: ["co", "os"], avatar: "https://img.zcool.cn/community/019bf45ad58a97a8012040290778f1.jpg@3000w_1l_2o_100sh.jpg" }
//     , { name: 'vouzenus', makes: { H_index: 999, thesis: 25, used: 50 }, fields: ["co", "os"], avatar: "https://img.zcool.cn/community/019bf45ad58a97a8012040290778f1.jpg@3000w_1l_2o_100sh.jpg" }
//     , { name: 'vouzenus', makes: { H_index: 999, thesis: 25, used: 50 }, fields: ["co", "os"], avatar: "https://img.zcool.cn/community/019bf45ad58a97a8012040290778f1.jpg@3000w_1l_2o_100sh.jpg" }
//     , { name: 'vouzenus', makes: { H_index: 999, thesis: 25, used: 50 }, fields: ["co", "os"], avatar: "https://img.zcool.cn/community/019bf45ad58a97a8012040290778f1.jpg@3000w_1l_2o_100sh.jpg" }
//     , { name: 'vouzenus', makes: { H_index: 999, thesis: 25, used: 50 }, fields: ["co", "os"], avatar: "https://img.zcool.cn/community/019bf45ad58a97a8012040290778f1.jpg@3000w_1l_2o_100sh.jpg" }
// ])
const scholars = ref(null)
// 过滤条件层
var layers = ref([{ name: "h指数:", options: [1, 2, 3, 4], highlight: -1 }
    // { name: "性别:", options: ['男', '女'], highlight: -1 },
    // { name: "地区", options: ['中国', '美国', '俄罗斯', '台湾省'], highlight: -1 }
])
//下拉框的种类
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const h_index = reactive([
    getItem('h_index', 'sub1', () => h(MailOutlined), [
        getItem('Professor (12)', 1),
        getItem('Research (13)', 2),
    ]),
]);
const institutionNum = ref('..')
var institution = reactive([
    getItem('机构 ' + '(' + institutionNum.value + ')', 'sub2', () => h(AppstoreOutlined), [
    ]),
]);
//第一个聚类的点击事件
const handleClick1 = e => {
    if (toRaw(selectedKeys1.value) == e.key) {
        selectedKeys1.value[0] = -1
    }
    else {
        selectedKeys1.value = e.key
    }
};
//第二类聚类的点击事件
const handleClick2 = async e => {
    if (toRaw(selectedKeys2.value) == e.key) {
        selectedKeys2.value[0] = -1
        const name = e.item.originItemValue.label.split("(")[0].trim()
        fullscreenLoading.value = true
        const startTime = performance.now();
        const { data: res } = await axios.get('http://100.103.70.173:8000/author/get_author_by_name/', {
            params: {
                author_name: final_name.value,
                page_num: "1",
                page_size: "20",
                // order_by: order_by.value,
                institution: "",
                h_index_up: "",
                h_index_down: ""
            }
        })
        const endTime = performance.now();
        const elapsedTime = endTime - startTime;
        // 输出时间
        time.value = elapsedTime
        isHighlighted1.value = true
        isHighlighted2.value = false
        isHighlighted3.value = false
        isHighlighted4.value = false
        selectedInstitution.value = ""
        showResult.value = true
        scholar_num.value = res.data.total
        scholars.value = res.data.authors
        const children = []
        const options = []
        for (let i = 0; i < res.data.institutions.length; i++) {
            children.push(getItem(res.data.institutions[i].institution + '(' + res.data.institutions[i].count + ')', i + 1))
        }
        institution = [getItem('机构 ' + '(' + res.data.institutions.length + ')', 'sub2', () => h(AppstoreOutlined), children)]
        for (let i = 0; i < res.data.h_index.length; i++) {
            options.push(res.data.h_index[i].h_index + '(' + res.data.h_index[i].count + ')')
        }
        layers = [{ name: 'h指数:', options: options, highlight: -1 }]
        fullscreenLoading.value = false
        currentPage.value = 1
    }
    else {
        selectedKeys2.value = e.key
        const name = e.item.originItemValue.label.split("(")[0].trim()
        fullscreenLoading.value = true
        const startTime = performance.now();
        const { data: res } = await axios.get('http://100.103.70.173:8000/author/get_author_by_name/', {
            params: {
                author_name: final_name.value,
                page_num: "1",
                page_size: "20",
                // order_by: order_by.value,
                institution: name,
                h_index_up: "",
                h_index_down: ""
            }
        })
        const endTime = performance.now();
        const elapsedTime = endTime - startTime;
        // 输出时间
        time.value = elapsedTime
        isHighlighted1.value = true
        isHighlighted2.value = false
        isHighlighted3.value = false
        isHighlighted4.value = false
        selectedInstitution.value = name
        showResult.value = true
        scholar_num.value = res.data.total
        scholars.value = res.data.authors
        const children = []
        const options = []
        for (let i = 0; i < res.data.institutions.length; i++) {
            children.push(getItem(res.data.institutions[i].institution + '(' + res.data.institutions[i].count + ')', i + 1))
        }
        institution = [getItem('机构 ' + '(' + res.data.institutions.length + ')', 'sub2', () => h(AppstoreOutlined), children)]
        for (let i = 0; i < res.data.h_index.length; i++) {
            options.push(res.data.h_index[i].h_index + '(' + res.data.h_index[i].count + ')')
        }
        layers = [{ name: 'h指数:', options: options, highlight: -1 }]
        fullscreenLoading.value = false
        nextTick()
        selectedKeys2.value[0] = 1
        currentPage.value = 1
    }
};
const handleHover = e => {
    console.log(1)
}
// watch(openKeys, val => {
//     console.log('openKeys', val);
// });
// 点击之后高亮，并取消同层的其他高亮,再次点击取消高亮
async function chooseFilter(layerIndex, index) {
    if (layers[layerIndex].highlight == index) {
        layers[layerIndex].highlight = -1
        fullscreenLoading.value = true
        const startTime = performance.now();
        const { data: res } = await axios.get('http://100.103.70.173:8000/author/get_author_by_name/', {
            params: {
                author_name: final_name.value,
                page_num: "1",
                page_size: "20",
                institution: selectedInstitution.value,
                h_index_up: "",
                h_index_down: ""
            }
        })
        const endTime = performance.now();
        const elapsedTime = endTime - startTime;
        // 输出时间
        time.value = elapsedTime
        scholar_num.value = res.data.total
        h_index_up.value = (index + 1) * 10 - 1
        h_index_down.value = index * 10
        fullscreenLoading.value = false
        scholars.value = res.data.authors
        currentPage.value = 1
    }
    else {
        layers[layerIndex].highlight = index
        fullscreenLoading.value = true
        const startTime = performance.now();
        let res = {};
        if (index < 5) {
            const { data: result } = await axios.get('http://100.103.70.173:8000/author/get_author_by_name/', {
                params: {
                    author_name: final_name.value,
                    page_num: "1",
                    page_size: "20",
                    institution: selectedInstitution.value,
                    h_index_up: (index + 1) * 10-1,
                    h_index_down: index * 10
                }
            })
            h_index_up.value = (index + 1) * 10 - 1
            h_index_down.value = index * 10
            res = result
        } else {
            const { data: result } = await axios.get('http://100.103.70.173:8000/author/get_author_by_name/', {
                params: {
                    author_name: final_name.value,
                    page_num: "1",
                    page_size: "20",
                    institution: selectedInstitution.value,
                    h_index_up: 1000,
                    h_index_down: 50
                }
            })
            h_index_up.value = 1000
            h_index_down.value = 50
            res = result
        }
        const endTime = performance.now();
        const elapsedTime = endTime - startTime;

        // 输出时间
        time.value = elapsedTime
        scholar_num.value = res.data.total
        // h_index_up.value = (index + 1) * 10 - 1
        // h_index_down.value = index * 10
        fullscreenLoading.value = false
        scholars.value = res.data.authors
        currentPage.value = 1
    }
}
//搜索学者
async function searchScholar() {
    try {
        final_name.value = scholar_name.value
        fullscreenLoading.value = true
        const startTime = performance.now();
        const { data: res } = await axios.get('http://100.103.70.173:8000/author/get_author_by_name/', {
            params: {
                author_name: final_name.value,
                page_num: "1",
                page_size: "20"
            }
        })
        const endTime = performance.now();
        const elapsedTime = endTime - startTime;
        // 输出时间
        time.value = elapsedTime
        isHighlighted1.value = true
        isHighlighted2.value = false
        isHighlighted3.value = false
        isHighlighted4.value = false
        showResult.value = true
        scholar_num.value = res.data.total
        scholars.value = res.data.authors
        const children = []
        const options = []
        for (let i = 0; i < res.data.institutions.length; i++) {
            children.push(getItem(res.data.institutions[i].institution + '(' + res.data.institutions[i].count + ')', i + 1))
        }
        institution = [getItem('机构 ' + '(' + res.data.institutions.length + ')', 'sub2', () => h(AppstoreOutlined), children)]
        for (let i = 0; i < res.data.h_index.length; i++) {
            options.push(res.data.h_index[i].h_index + '(' + res.data.h_index[i].count + ')')
        }
        layers = [{ name: 'h指数:', options: options, highlight: -1 }]
        fullscreenLoading.value = false
        currentPage.value = 1
    } catch (error) {
        console.log(error)
    }
}
const handleOptionSelect = async (value) => {
    final_name.value = value
    fullscreenLoading.value = true
    const startTime = performance.now();
    const { data: res } = await axios.get('http://100.103.70.173:8000/author/get_author_by_name/', {
        params: {
            author_name: value,
            page_num: "1",
            page_size: "20"
        }
    })
    const endTime = performance.now();
    const elapsedTime = endTime - startTime;
    // 输出时间
    time.value = elapsedTime
    isHighlighted1.value = true
    isHighlighted2.value = false
    isHighlighted3.value = false
    isHighlighted4.value = false
    showResult.value = true
    scholar_num.value = res.data.total
    scholars.value = res.data.authors
    const children = []
    const options = []
    for (let i = 0; i < res.data.institutions.length; i++) {
        children.push(getItem(res.data.institutions[i].institution + '(' + res.data.institutions[i].count + ')', i + 1))
    }
    institution = [getItem('机构 ' + '(' + res.data.institutions.length + ')', 'sub2', () => h(AppstoreOutlined), children)]
    for (let i = 0; i < res.data.h_index.length; i++) {
        options.push(res.data.h_index[i].h_index + '(' + res.data.h_index[i].count + ')')
    }
    layers = [{ name: 'h指数:', options: options, highlight: -1 }]
    fullscreenLoading.value = false
    currentPage.value = 1
}
const isLight = ref(false)
// onMounted(() => {
//     isLight.value = localStorage.getItem('theme') === 'light'
// })
watch(
  () => localStorage.getItem('theme'),
  (newValue) => {
    if (newValue == 'light') {
      isLight.value = true
      console.log(1)
    }
    else {
      isLight.value = false
      console.log(2)
    }
  }
)
</script>
<style scoped>
.searchBox {
    margin-top: 10vh;
    left: 0;
    width: 100vw;
    height: 30vh;
    display: flex;
    background: linear-gradient(#0000CD, #000000);
}

.searchMain {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    width: 40vw;
    height: 100%;
    margin-left: 200px;
    margin-right: auto;
}

h2 {
    flex: 1;
    margin-top: 70px;
    margin-bottom: 0px;
    color: white;
    font-weight: 600;
    font-family: 'Courier New', Courier, monospace;
    text-align: center;
    font-size: 35px;
    letter-spacing: 3px;
}

.searchIcon {
    height: 1px;
    width: 500px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}

.select {
    flex: 1;
    margin-top: 0px;
    margin-bottom: 20px;
    width: 500px;
    height: 80px;
    border-radius: 30px;
}

.ant-select-selector {
    height: 200px;
}

.info1 {
    flex: 0 0 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    padding-top: 30px;
    padding-bottom: 30px;
}

.infoDetail {
    margin-top: 5px;
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 30px;
}

.avatar1 {
    height: 20px;
    margin: auto;
    margin-right: 10px;
    flex: 1;
}

.data {
    flex: 2;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

.num {
    font-weight: 600;
    color: aliceblue;
    width: auto;
    flex: 0 1 0;
    font-size: 10px;
}

.name {
    font-weight: 200;
    opacity: 0.8;
    color: aliceblue;
    width: auto;
    flex: 0 1 0;
    font-size: 12px;
}

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

.result {
    height: 30px;
    text-align: left;
    margin-left: 16vw;
    font-size: 12px;
    display: flex;
    align-items: center;
}

.filter {
    width: 70vw;
    margin-left: 15vw;
    margin-top: 5px;
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
    width: auto;
    font-size: 12px;
    font-weight: 600;
    margin-right: 20px;
}

.option:hover {
    background-color: lightblue;
    border: 1px solid #ccc;
    cursor: pointer;
}

.highlight {
    background-color: #4759c5;
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
    position: sticky;
    top: 10vh;
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
    cursor: pointer;
    font-weight: 600;
    font-size: 13px;
}

.hNum {
    width: 100px;
    cursor: pointer;
    font-weight: 600;
    font-size: 13px;
}

.thesisNum {
    width: 100px;
    cursor: pointer;
    font-weight: 600;
    font-size: 13px;
}

.usedNum {
    width: 100px;
    cursor: pointer;
    font-weight: 600;
    font-size: 13px;
}

.page {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-right: 50px;
    margin-top: 30px;
    margin-bottom: 30px;
}

.highlighted {
    color: #4759c5;
    background-color: #fafafa;
    border-bottom: hidden;
}
.light{
    height: 30vh;
    background: linear-gradient(#333, #444);
}
</style>