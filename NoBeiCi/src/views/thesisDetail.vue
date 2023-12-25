<script setup>
import * as echarts from 'echarts'
import { ref, onMounted, toRaw } from 'vue';
import NavigateBar from "../components/NavigateBar.vue";
import axios from "axios";
import { computed } from 'vue'
import i18n from "../locales/index.js";
import chatInThesis from "../components/chatPDF/chatInThesis.vue"
import request from "../functions/Request"
import { ElMessage } from 'element-plus';
import router from "../routes/index.js";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { nextTick } from 'vue';
// 
var isParentReady = ref(false)
// title和abstract
var title = ref('')
var abstract = ref('')
//const translate = ref('尽管音频生成在不同类型的音频(如语音、音乐和音效)之间存在共性,但为每种类型设计模型需要仔细考虑特定目标和偏差,这些目标和偏差可能与其他类型的目标和偏差有显著差异。为了使我们更接近统一的音频生成观点,本文提出了一个利用相同的学习方法进行语音、音乐和音效生成的框架。我们引入了一种音频的一般表示,称为音频语言(LOA)。任何音频都可以基于音频多模态自监督预训练表示学习模型(AudioMAE)将其转换为 LOA。在生成过程中,我们使用 GPT-2 模型将任何模态转换为 LOA,然后使用基于 LOA 的条件潜在扩散模型进行自监督音频生成学习。所提出的框架自然带来了诸如上下文学习能力以及可重复使用的自监督预训练 AudioMAE 和潜在扩散模型等优势。在文本到音频、文本到音乐和文本到语音的主要基准测试中，实验证明了之前方法的新的最先进或竞争性能。我们的演示和代码可在 https://audioldm.github.io/audioldm2 上获得。')
const ifShowMoreButton = ref(true)
const authorShips = ref([])

// 当前论文id
var currentId = ref('')
// 是否打开链接
var isShowLink = ref(false)

//原文链接开关
function changeShowLink() {
    isShowLink.value = !isShowLink.value
}
//原文链接列表
var links = ref([])

function openLink(link) {
    window.open(link, '_blank')
}
//存放论文数据
var pdf_url = ref(null)
var hasPDF = ref(true)
var date = ref('')
var instituion = ref('')
var data = ref({ name: '', children: [] })
var visit_count = ref('')
var cited_by_count = ref('')
var work_id = ref('')
var fields = ref('')
//存放是否全局加载
var fullscreenLoading = ref(false)

const allAbstractStyles = computed(() => {
    return { 'max-height': ifShowMoreButton.value ? '88px' : 'initial' };
});
const ifShowTranslate = ref(true)
var works = ref([])
var relavantWork = ref([])
var relatedWork = ref([])
var isHighlighted1 = ref(true)
var isHighlighted2 = ref(false)
function showTranslate() {
    ifShowTranslate.value = !ifShowTranslate.value;
}
function showAllAbstract() {
    ifShowMoreButton.value = !ifShowMoreButton.value;
}
//相关论文设置引用
function setRelated() {
    works = relavantWork
    isHighlighted1.value = true
    isHighlighted2.value = false
}
//相关论文设置相关
function setRelavant() {
    works = relatedWork
    isHighlighted1.value = false
    isHighlighted2.value = true
}
//打开当前论文的pdf
function navigateToExternalURL() {
    console.log(pdf_url)
    if (pdf_url != null) {
        window.open(pdf_url, '_blank')
    }
}
// 打开PDF
function openPDF(url) {
    if (url != null) {
        window.open(url, '_blank')
    }
}
function NavigateToScholar(id) {
    router.push('/authorhome/' + id)
}
function jumpToField(field){
    console.log(1)
    router.push('/fieldDetail/' + field.id.substring(field.id.indexOf("C")))
}
// 收藏论文
async function collection(id) {
    const result = await request(
        {
            url: "http://api.buaa-q9k.xyz/user/add_favorite/",
            params: {
                work_id: id
            },
            addToken: true
        }
    )
    if (result) {
        ElMessage({
            message: "收藏成功",
            type: 'success',
        })
    }
}
// 跳转到其他的论文
async function LookThesis(id) {
    console.log(id)
    await router.push('/thesisDetail/' + id);

    // 等待下一次 DOM 更新
    await nextTick();

    // 在 router.push 的回调函数中执行 router.go(0) 刷新页面
    router.go(0);
}
//获取数据
async function getThesis() {
    try {
        fullscreenLoading.value = true
        const { data: res } = await axios.get("http://api.buaa-q9k.xyz/work/get_work/", {
            params: {
                id: currentId.value,
                user_id: "1592295057@qq.com"
            }
        });
        fullscreenLoading.value = false
        abstract.value = res.data.data.abstract
        title.value = res.data.data.title
        authorShips.value = res.data.data.authorships
        if (res.data.data.pdf_url == null) {
            hasPDF.value = false
            pdf_url.value = null
        } else {
            pdf_url = toRaw(res.data.data.pdf_url)
        }
        date.value = res.data.data.publication_date
        instituion = toRaw(res.data.data.locations[0].source.display_name)
        visit_count = res.data.data.visit_count
        cited_by_count = res.data.data.cited_by_count
        relatedWork.value = res.data.data.related_works_info
        relavantWork.value = res.data.data.referenced_works_info
        works.value = relavantWork.value
        data.value.name = res.data.data.title.substring(0, 10) + ".."
        data.value.id = res.data.data.id
        work_id.value = res.data.data.id
        fields.value = res.data.data.concepts
        //原文链接列表初值
        for (let i = 0; i < res.data.data.locations.length; i++) {
            links.value.push(res.data.data.locations[i].landing_page_url)
        }
        for (let i = 0; i < res.data.data.referenced_works_info.length; i++) {
            data.value.children.push({
                name: res.data.data.referenced_works_info[i].title.substring(0, 10) + "..",
                id: res.data.data.referenced_works_info[i].id
            })
        }
    } catch (error) {
        console.error()
    }
}
// 为子结点添加数据
function findChildren(data, name, referenced_works) {
    for (let children of data.children) {
        if (children.name === name && children.children == null) {
            children.id = referenced_works.data.id
            children.children = []
            for (let i = 0; i < referenced_works.data.referenced_works_info.length; i++) {
                children.children.push({
                    name: referenced_works.data.referenced_works_info[i].title.substring(0, 10) + "..",
                    id: referenced_works.data.referenced_works_info[i].id
                })
            }
            return;
        }
        if (children.children != null) {
            findChildren(children, name, referenced_works)
        }
    }
}
onMounted(async () => {
    // getThesisData();
    const { params } = useRoute();
    currentId.value = params.thesisId
    await getThesis()
    isParentReady.value = true;
    nextTick(() => {
    });
    const treemapOfBigField = echarts.init(document.getElementById('containerOfTreemap'))
    const options = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [
            {
                type: 'tree',
                data: [toRaw(data.value)],
                top: '1%',
                left: '10%',
                bottom: '1%',
                right: '20%',
                symbolSize: 7,
                label: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right',
                    fontSize: 12
                },
                leaves: {
                    label: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                },
                emphasis: {
                    focus: 'descendant'
                },
                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750
            }
        ]
    }
    treemapOfBigField.hideLoading();
    treemapOfBigField.setOption(options)
    treemapOfBigField.on('click', async function (params) {
        if (params.data.children == null && params.treeAncestors.length <= 4) {
            const { data: res } = await axios.get("http://api.buaa-q9k.xyz/work/get_work/", {
                params: {
                    id: params.data.id,
                    user_id: "1592295057@qq.com"
                }
            });
            findChildren(data.value, params.name, res.data)
            const options = {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: [
                    {
                        type: 'tree',
                        data: [toRaw(data.value)],
                        top: '1%',
                        left: '30%',
                        bottom: '1%',
                        right: '30%',
                        symbolSize: 7,
                        label: {
                            position: 'left',
                            verticalAlign: 'middle',
                            align: 'right',
                            fontSize: 12
                        },
                        leaves: {
                            label: {
                                position: 'right',
                                verticalAlign: 'middle',
                                align: 'left'
                            }
                        },
                        emphasis: {
                            focus: 'descendant'
                        },
                        expandAndCollapse: true,
                        animationDuration: 550,
                        animationDurationUpdate: 750
                    }
                ]
            }
            treemapOfBigField.setOption(options)
        }
    })
});
</script>

<template>
    <NavigateBar></NavigateBar>
    <div class="main" v-loading.fullscreen.lock="fullscreenLoading">
        <div class="indexArticle">
            <div class="indexContent">
                <div class="background">
                    <div class="titleline">
                        <h1 class="titleInner">
                            <span class="text">
                                {{ title }}
                            </span>
                        </h1>
                    </div>
                    <div class="author-line">
                        <div class="authors-authors">
                            <div class="authors">
                                <div v-for="author, index in authorShips">
                                    <span>
                                        <span class="author-link-font-author">
                                            <span class="personLink">
                                                <a class="author_label" @click="NavigateToScholar(author.author.id)">
                                                    <span>{{ author.author.display_name }}</span>
                                                </a>
                                            </span>
                                        </span>
                                        <span class="mr" v-if="index != authorShips.length - 1">,&nbsp;&nbsp;</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="confInfo">
                        <svg t="1656696243622" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="54726" width="20px" height="20px">
                            <path
                                d="M511.163 62.422c-242.734 0-439.51 196.775-439.51 439.51s196.776 439.51 439.51 439.51 439.51-196.776 439.51-439.51-196.776-439.51-439.51-439.51zM548.7 93.559s27.53-15.968 37.11-6.388c9.58 9.58 43.113-1.596 129.338 49.5 0 0-18.99 20.252-23.143 19.037 2.424 4.403 9.876 17.825 15.159 26.122 6.387 10.03 7.984 10.728 7.984 10.728l-6.388 9.58 6.388 1.596c-6.388-1.596-9.58 17.564-18.825 20.758-9.244 3.194 2.857 20.758-0.336 23.951-3.193 3.194 1.597 31.936 0 48.865-1.596 16.93-7.983 2.231-15.967 0-7.984-2.23-20.758-7.35-21.85-12.14-1.094-4.79-3.698-19.16-0.505-27.144 3.193-7.984-9.58-15.968-15.968-21.823-6.388-5.856-31.935 1.065-36.726 0-4.79-1.066-7.983-14.903-7.983-27.677s22.355 1.597 34.936 0c12.582-1.596 14.564-33.431 14.564-33.431l-0.723-27.062c-5.162-2.064-6.005-4.74 2.32-8.168 0 0-27.146-6.387-33.532 7.984-6.388 14.372-9.58 12.976-11.178 27.246-1.596 14.27-26.613 1.697-32.467 0-5.855-1.698-21.823-20.86-21.823-20.86 4.79-11.177 7.983-19.16 7.983-19.16l-8.368-19.16V93.559zM296.797 242.058c2.708-3.614 20.757-35.13 43.113-25.548 22.355 9.58 36.725-11.177 36.725-11.177s32.823-33.532 34.774-28.742l1.951 4.79c-1.951-4.79 27.146-12.774 30.338 3.194 3.194 15.967 22.356 24.001 22.356 24.001s-11.178 19.112-7.984 33.482c3.193 14.371 14.371 17.564 7.984 30.339-6.388 12.774-19.162 17.564-22.356 23.951-3.193 6.388-29.451-20.757-32.29-30.339-2.839-9.58-16.868-19.16-29.015-15.967-12.146 3.194-44.082 11.177-50.468 7.984-6.387-3.194-42.61-5.986-35.128-15.968zM724.73 711.507c-12.774 33.532-43.113 91.016-59.08 106.983-15.968 15.968-35.13 46.307-49.5 57.484-14.371 11.177-14.371 31.935-31.935 30.339-17.564-1.597-38.323-51.097-33.532-63.871 4.79-12.774-87.822-35.13-87.822-35.13s-39.92-4.79-47.903-81.434c-1.422-13.64-2.334-23.32-2.879-30.043-11.998-5.302-59.06-24.783-88.137-17.86-33.532 7.984-41.516-10.653-70.258-14.907l-49.5-45.77s-81.434-94.21-71.854-110.177c9.58-15.968 9.58-59.08 11.177-68.66 1.597-9.581-12.744-70.26-11.961-78.243 0.784-7.984-11.99-38.323-11.99-38.323s30.339-63.87 35.129-63.87 22.355 54.29 39.92 55.886c17.563 1.597 65.466-1.596 72.652-9.58 7.186-7.984 13.572-17.564 21.556-17.564 7.984 0 7.984-4.79 22.355 1.597 14.371 6.387 30.339 15.967 36.725 25.547 6.388 9.58-4.79 28.742 28.742 28.742s33.532-7.984 38.323 14.371c4.79 22.356 10.467 71.855-3.548 75.049-14.016 3.193-55.532 51.804-52.338 67.418 3.194 15.614 3.194 39.565-3.194 53.936-6.387 14.37-11.177 19.16-35.129 17.564-23.951-1.597-44.2-14.372-50.842 4.79-6.642 19.161-19.348 62.327 2.94 57.969 0 0 35.128-10.692 47.902 0 12.774 10.692 94.21 45.82 94.21 45.82s73.45-79.838 188.418-28.741l19.162 12.774 31.935-6.943s41.515-12.219 55.887-9.025l14.371 3.194v-6.388c-0.002 0.002 12.772 33.534-0.002 67.066z m186.822-182.031s-9.58-14.371-9.58-29.487-11.178-13.626-11.178-32.786c0-19.162-14.371-12.774-23.951-25.548s-14.372 4.79-22.355 6.387c-7.984 1.597-6.388 14.372-14.372 29.54-7.984 15.17-28.741 24.75-35.129 21.911-6.387-2.84-30.339-24.305-31.935-29.097-1.597-4.79-33.532-31.935-32.646-38.322 0.887-6.388-8.87-39.92-15.257-55.887-6.388-15.968 0-78.877 0-78.877-9.58-5.424 87.822-45.672 75.048-50.462-12.774-4.79-19.161-57.483-19.161-57.483l46.483 23.951c46.484 23.952 105.21 213.968 105.21 213.968v54.29l-11.177 47.902z"
                                p-id="54727"></path>
                        </svg>
                        <span>
                            {{ instituion }}
                            <!-- -->
                            {{ date }}
                        </span>
                    </p>
                    <div class="tagLine">
                        <div class="miscLine">
                            <span class="citation">
                                <span>{{ i18n.t("thesisDetail.quote") }}</span>
                                <strong> {{ cited_by_count }}</strong>
                            </span>
                            <span class="line-split">|</span>
                            <span class="views">
                                <span>
                                    <span>{{ i18n.t("thesisDetail.browse") }}</span>
                                    <span> {{ visit_count }} </span>
                                </span>
                            </span>
                        </div>
                        <div class="panelAbout">
                        </div>
                    </div>
                    <div class="abstract">
                        <div class="abstract-title">
                            <div class="abstract-absTop" style="margin-top: 0px;">
                                <span> {{ i18n.t("thesisDetail.abstract") }} </span>
                            </div>
                            <span class="abstract-absLabel">
                                <div class="abstract-abstractContent">
                                    <div class="abstract-translatecontent"></div>
                                    <div class="abstract-aiabstractcontent">
                                        <div class="abstract-reasonWrap">
                                            <div class="abstract-more" :style="allAbstractStyles">
                                                <div style="text-align: left;font-size: 14px;font-weight: 400;">
                                                    {{ abstract }}
                                                </div>
                                                <span v-if="ifShowMoreButton" class="abstract-morebtn">
                                                    <span class="morebtn" @click="showAllAbstract"> {{
                                                        i18n.t("thesisDetail.more") }} </span>
                                                </span>
                                                <span v-if="!ifShowMoreButton" class="abstract-morebtn2">
                                                    <span class="morebtn" @click="showAllAbstract">{{
                                                        i18n.t("thesisDetail.fold") }}</span>
                                                </span>
                                            </div>
                                            <!-- <div class="abstract-tranText" v-if="ifShowTranslate" @click="showTranslate">
                                                    查看译文</div>
                                                <div class="abstract-tranText" v-if="!ifShowTranslate" @click="showTranslate">
                                                    收起译文</div>
                                                <div style="margin-top: 5px;line-height: 22px" v-if="!ifShowTranslate">
                                                    <p style="text-align: left;">{{ translate }}</p>
                                                </div> -->
                                        </div>
                                    </div>
                                </div>
                            </span>
                        </div>
                    </div>
                    <div class="fieldHead">
                        相关领域
                    </div>
                    <div class="fields">
                        <div v-for="field in fields" class="field" @click="jumpToField(field)">
                            <el-icon style="margin-right: 5px;font-size:20px"><Grid /></el-icon>
                            {{ field.display_name }}
                        </div>
                    </div>
                    <div class="actionButton">
                        <div class="pdf-download" :class="{ grey: !hasPDF }" @click="navigateToExternalURL">
                            <svg t="1656602493083" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="33567" width="200" height="200">
                                <path
                                    d="M482.114017 444.641987c-17.534816 56.44419-37.693456 143.670302-67.25946 215.40946-15.294968 38.845378-14.527019 32.061836-26.046242 56.572181l9.919331-3.199784c101.881123-28.542073 173.236307-35.581598 239.535831-47.804773-13.311102-10.495292-24.89432-18.622743-34.045702-27.006177-45.564924-50.492592-61.435853-59.963952-122.103758-193.906912z m499.99825 323.178185c-12.991123 14.527019-35.837581 22.910454-69.435313 22.910454-57.916091 0-110.584536-15.99892-186.867386-54.908294-131.191145 14.527019-270.701728 29.885983-349.160432 55.036285-3.839741 1.535896-8.383434 3.071793-13.759071 5.311642-94.52162 161.653088-164.788877 230.192462-226.480713 227.504643-19.582678-0.89594-47.99676-12.223175-57.148142-17.534816l-11.327236-10.751275L64.030238 987.837321a69.371317 69.371317 0 0 1-3.839741-41.213218c8.383434-40.381274 51.836501-104.44095 143.350324-161.653089 14.527019-10.687279 47.612786-27.518143 78.07473-42.045161 23.102441-36.73352 33.789719-60.219935 63.035745-125.303543 33.149762-78.586695 63.291728-172.468358 82.362441-239.599827v-0.767948c-28.158099-92.217775-44.988963-154.869546-16.766869-256.238704 6.847538-28.990043 31.99784-58.748035 60.219935-58.748034h18.302765c17.534816 0 34.301685 6.143585 46.52486 18.302764 50.300605 50.3646 26.686199 180.019849 1.535896 281.453002-1.535896 4.543693-2.303844 8.383434-3.071793 10.687279C564.220475 458.849028 612.473218 543.963282 660.469978 583.640604c19.838661 15.230972 39.293348 32.765788 63.675702 46.460864 34.36568-3.839741 65.083607-7.103521 96.313499-7.10352 94.585615 0 151.797754 16.766868 173.876263 52.604449 7.679482 12.159179 11.455227 26.686199 9.151383 41.91717-0.767948 19.070713-7.615486 36.605529-21.310562 50.364601z m-48.188747-63.675702c-7.679482-7.679482-29.566004-29.374017-136.310799-29.374017-5.311641 0-18.430756-1.343909-25.278294 6.271577 55.676242 24.382354 108.920648 42.877106 143.990281 42.877105 5.375637 0 9.983326-0.703952 14.52702-1.4719h3.071792c3.839741-1.535896 6.07959-2.303844 6.847538-9.919331-1.535896-2.303844-3.071793-5.311641-6.847538-8.319438zM262.67283 813.449092c-15.99892 9.151382-28.926047 17.534816-36.60553 23.678402-54.140346 49.532657-88.44203 99.833261-92.281771 128.823304 34.36568-11.391231 79.354644-61.755831 128.887301-152.501706z m217.713304-516.381144l3.839741-3.071793c5.311641-24.318359 9.087387-50.556587 13.63108-67.387451l2.303844-12.159179c7.679482-43.517063 4.73568-68.859352-8.255443-87.162117l-11.455226-3.839741c-1.91987 2.943801-3.711749 6.015594-5.311642 9.151383-12.991123 31.99784-12.287171 95.865529 5.311642 164.468898z"
                                    p-id="33568" fill="#ffffff"></path>
                            </svg>
                            <span class="pdf">PDF</span>
                        </div>
                        <div class="ppt">
                            <span style="color: #979797;">认领</span>
                        </div>
                        <div class="codeData">
                            <p class="code-title" id="code"><span>代码</span></p>
                            <p class="data-title" id="data">
                                <span class="code-data-label">数据</span>
                            </p>
                        </div>
                        <div class="originLink">
                            <div class="origin" @click="changeShowLink()">
                                <el-icon>
                                    <Promotion />
                                </el-icon>
                                <span> {{ i18n.t("thesisDetail.Link") }} </span>
                                <el-icon>
                                    <ArrowDown />
                                </el-icon>
                            </div>
                            <div v-if="isShowLink" class="Link">
                                <div v-for="link, index in links" class="link" @click="openLink(link)">
                                    <div> {{ link }} </div>
                                </div>
                            </div>
                        </div>
                        <div class="share">
                            <el-icon>
                                <Share />
                            </el-icon>
                            <span>分享</span>
                        </div>
                        <div class="bib">
                            <el-icon>
                                <Paperclip />
                            </el-icon>
                            <span>引用</span>
                        </div>
                        <div class="mark" @click="collection(work_id)">
                            <el-icon>
                                <StarFilled />
                            </el-icon>
                            <span> {{ i18n.t("thesisDetail.collection") }} </span>
                        </div>
                    </div>
                </div>
                <div class="relation">
                    <div class="relavant"> {{ i18n.t("thesisDetail.related") }} </div>
                    <div class="relavantDetail">
                        <div class="relavantDetailHead">
                            <div class="first" @click="setRelated" :class="{ highlighted: isHighlighted1 }">
                                <el-icon style="margin-right: 5px;font-size:20px">
                                    <Document />
                                </el-icon>
                                {{ i18n.t("thesisDetail.quoted") }}
                            </div>
                            <div class="second" @click="setRelavant" :class="{ highlighted: isHighlighted2 }">
                                <el-icon style="margin-right: 5px;font-size:20px">
                                    <Document />
                                </el-icon>
                                {{ i18n.t("thesisDetail.relavant") }}
                            </div>
                        </div>
                        <div class="relavantDetailBody">
                            <div v-for="work in works" class="relavantWork">
                                <div class="work_name">
                                    <p>{{ work.title }}</p>
                                </div>
                                <div class="work_related">
                                    {{ i18n.t("thesisDetail.beQuoted") }}
                                    {{ work.cited_by_count }}
                                </div>
                                <div class="more">
                                    <div class="jump" @click="LookThesis(work.id)">查看</div>
                                    <div class="pdf1" @click="openPDF(work.pdf_url)"
                                        :class="{ grey1: work.pdf_url == null }">PDF</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="relationHead"> {{ i18n.t("thesisDetail.net") }} </div>
                    <div id="containerOfTreemap" class="map"></div>
                </div>
            </div>
            <div class="chat">
                <div>
                    <chatInThesis class="rightBar" :pdf_url="pdf_url" v-if="!isParentReady"></chatInThesis>
                    <chatInThesis class="rightBar" :pdf_url="pdf_url" v-if="isParentReady"></chatInThesis>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.main {
    margin-top: 10vh;
    display: flex;
    width: 100%;
    min-height: 90vh;
    height: auto;
    background-color: #f2f4f7;
    overflow-x: hidden;
}

.indexArticle {
    width: 100%;
    color: #333;
    /*max-width: 2000px;*/
    padding-left: 15px;
    padding-right: 15px;
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-top: 30px;
    background-color: #f2f4f7;
    max-width: 1440px;
    overflow-x: hidden;

    .indexContent {
        width: 100%;
        flex: 1 1;
        /*margin-right: 20px;*/
        margin-right: 400px;

        .background {
            background-color: #fff;
            border-radius: 10px;
            padding: 20px;

            .titleline {
                display: flex;
                flex-direction: row;
                margin-bottom: 6px;
                font-size: 24px;
                font-weight: 700;

                .titleInner {
                    line-height: 25px;
                    display: flex;
                    flex-wrap: wrap;
                    font-size: 24px;
                    font-weight: 700;

                    .text {
                        text-align: left;
                        font-size: 22px;
                        font-family: TimesNewRomanPS-BoldMT, TimesNewRomanPS;
                        font-weight: 700;
                        color: #000e28;
                        line-height: 26px;
                    }
                }
            }

            .author-line {
                overflow: hidden;
                display: flex;
                text-overflow: ellipsis;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;

                .authors-authors {
                    max-height: 40px;
                    overflow: hidden;

                    .authors {
                        display: flex;
                        flex-wrap: wrap;
                        margin-top: 8px;
                        overflow: hidden;
                        font-size: 12px;

                        .author-link-font-author {
                            .personLink {
                                position: relative;

                                .author_label {
                                    color: #6b6b6b;
                                    cursor: pointer;
                                }

                                .author_label:hover {
                                    color: yellow;
                                }
                            }
                        }
                    }
                }
            }

            .confInfo {
                font-size: 14px;
                color: #6b6b6b;
                margin-top: 5px;
                margin-bottom: 0;
                display: flex;

                .icon {
                    font-size: 16px;
                    text-align: center;
                    margin-right: 5px;
                    line-height: 28px;
                }
            }

            .tagLine {
                display: flex;
                align-items: center;
                margin-bottom: 15px;
                flex-wrap: wrap;

                .miscLine {
                    margin-top: 7px;
                    margin-right: 12px;
                    font-size: 13px;

                    .citation {
                        color: #067c08;
                        font-size: 13px;
                        white-space: pre;
                    }

                    .line-split {
                        margin: 0 10px;
                        color: #d5d5d5;
                    }

                    .views {
                        color: #4759c5;
                        font-size: 13px;
                        font-weight: bolder;
                    }
                }
            }

            .abstract {
                display: flex;
                align-items: center;
                margin-bottom: 7px;
                flex-wrap: wrap;

                .abstract-title {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-direction: column;

                    .abstract-absTop {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-bottom: 10px;
                        line-height: 15px;
                        font-size: 15px;
                        font-weight: 500;
                        color: #222;
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .abstract-absLabel {
                        width: 100%;
                        font-size: 20px;
                        font-weight: 500;
                        color: #666;

                        .abstract-abstractContent {
                            display: flex;
                            position: relative;
                            margin: 0 !important;
                            flex-direction: column;

                            .abstract-translatecontent {
                                position: absolute;
                                right: 20px;
                                top: 0;
                            }

                            .abstract-aiabstractcontent {
                                display: flex;
                                flex-direction: column;
                                justify-content: space-between;

                                .abstract-reasonWrap {
                                    line-height: 20px;
                                    position: relative;
                                    font-size: 14px;
                                    font-weight: 400;
                                    color: #666;

                                    .abstract-more {
                                        display: flex;
                                        font-size: 14px;
                                        font-weight: 400;
                                        color: #666;
                                        max-height: 88px;
                                        overflow: hidden;
                                        line-height: 22px;
                                        position: relative;

                                        .abstract-morebtn {
                                            font-size: 12px;
                                            margin-left: 2px;
                                            color: #4759c5;
                                            border: none;
                                            cursor: pointer;
                                            padding: 0 10px;
                                            background: #fff;
                                            position: absolute;
                                            top: 66px;
                                            right: 0;
                                            z-index: 10;
                                        }

                                        .abstract-morebtn2 {
                                            font-size: 12px;
                                            margin-left: 2px;
                                            color: #4759c5;
                                            border: none;
                                            cursor: pointer;
                                            padding: 0 10px;
                                            background: #fff;
                                            position: absolute;
                                            bottom: 0px;
                                            right: 0;
                                            z-index: 10;
                                        }
                                    }

                                    .abstract-tranText {
                                        margin-top: 3px;
                                        cursor: pointer;
                                        color: #4759c5;
                                        display: flex;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .actionButton {
                display: flex;
                flex-direction: row;
                grid-row-gap: 10px;
                row-gap: 10px;
                margin-top: 16px;
                flex-wrap: wrap;
                height: 25px;

                .pdf-download {
                    background-color: #c51c01;
                    width: 100%;
                    max-width: 60px;
                    position: relative;
                    cursor: pointer;
                    height: 24px;
                    padding-left: 10px;
                    padding-right: 10px;
                    font-weight: 700;
                    margin-right: 10px;
                    display: flex;
                    font-size: 14px;
                    justify-content: center;
                    align-items: center;
                    box-shadow: 0 4px 13px 0 #e8edf4, 0 2px 2px 0 hsla(0, 0%, 87.5%, .5);
                    border-radius: 2px !important;
                    border: 1px solid #e7e7e7 !important;

                    .icon {
                        width: 23px;
                        height: 20px;
                        margin-right: 4px;
                        vertical-align: -0.15em;
                        fill: currentColor;
                        color: blue;
                    }

                    .pdf {
                        /*color: #e8edf4;*/
                        color: white;
                    }

                }

                .grey {
                    background-color: #e7e7e7;
                    cursor: auto;
                }

                .ppt {
                    background-color: #e7e7e7;
                    width: 100%;
                    max-width: 64px;
                    height: 24px;
                    box-shadow: 0 4px 13px 0 #e8edf4, 0 2px 2px 0 hsla(0, 0%, 87.5%, .5);
                    border-radius: 2px !important;
                    border: 1px solid #e7e7e7 !important;
                    border: none !important;
                    display: flex;
                    font-size: 14px;
                    justify-content: center;
                    align-items: center;
                    font-weight: 700;
                    margin-right: 10px;
                    cursor: pointer;
                }

                .codeData {
                    display: flex;
                    flex-direction: row;

                    .code-title {
                        border-radius: 2px;
                        border: 1px solid #e7e7e7;
                        background-color: #e7e7e7;
                        color: #979797;
                        height: 24px;
                        display: flex;
                        font-size: 14px;
                        justify-content: center;
                        align-items: center;
                        padding-left: 10px;
                        padding-right: 10px;
                        font-weight: 700;
                        margin-right: 10px;
                        margin-bottom: 0;
                        cursor: pointer;
                    }

                    .data-title {
                        color: #979797;
                        background-color: #e7e7e7;
                        height: 24px;
                        display: flex;
                        font-size: 14px;
                        justify-content: center;
                        align-items: center;
                        border-radius: 4px;
                        padding-left: 10px;
                        padding-right: 10px;
                        font-weight: 700;
                        margin-right: 10px;
                        margin-bottom: 0;
                        cursor: pointer;
                    }
                }

                .originLink {
                    display: flex;
                    flex-direction: column;


                    .origin {
                        color: #979797;
                        background-color: #fff;
                        cursor: pointer;
                        height: 24px;
                        width: 106px;
                        background: #fff;
                        box-shadow: 0 4px 13px 0 #e8edf4, 0 2px 2px 0 hsla(0, 0%, 87.5%, .5);
                        border-radius: 2px !important;
                        border: 1px solid #e7e7e7 !important;
                        display: flex;
                        font-size: 14px;
                        justify-content: center;
                        align-items: center;
                        padding-left: 10px;
                        padding-right: 10px;
                        font-weight: 700;
                        margin-right: 10px;

                        .icon {
                            margin-right: 3px;
                            width: 1em;
                            height: 1em;
                            vertical-align: -0.15em;
                            fill: currentColor;
                        }
                    }

                    .Link {
                        margin-top: 5px;
                        height: auto;
                        width: auto;
                        border: solid #ccc;
                        border-width: 1px;
                        background-color: #fff;
                        display: flex;
                        flex-direction: column;
                        z-index: 9999;

                        .link {
                            padding-top: 8px;
                            padding-bottom: 8px;
                            padding-left: 5px;
                            padding-right: 5px;
                            font-size: 12px;
                            cursor: pointer;
                            opacity: 1;
                        }

                        .link:hover {
                            background-color: lightblue;
                            color: #4759c5;
                        }
                    }

                    .icon {
                        margin-right: 3px;
                        width: 1em;
                        height: 1em;
                        vertical-align: -0.15em;
                        fill: currentColor;
                    }
                }

                .share {
                    margin-left: auto;
                    height: 24px;
                    background: #fff;
                    box-shadow: 0 4px 13px 0 #e8edf4, 0 2px 2px 0 hsla(0, 0%, 87.5%, .5);
                    border-radius: 2px !important;
                    border: 1px solid #e7e7e7 !important;
                    color: #6d6d6d;
                    display: flex;
                    font-size: 14px;
                    justify-content: center;
                    align-items: center;
                    padding-left: 10px;
                    padding-right: 10px;
                    font-weight: 700;
                    margin-right: 10px;

                    .icon {
                        margin-right: 3px;
                        width: 1em;
                        height: 1em;
                        vertical-align: -0.15em;
                        fill: currentColor;
                    }
                }

                .bib {
                    height: 24px;
                    background: #fff;
                    box-shadow: 0 4px 13px 0 #e8edf4, 0 2px 2px 0 hsla(0, 0%, 87.5%, .5);
                    border-radius: 2px !important;
                    border: 1px solid #e7e7e7 !important;
                    color: #6d6d6d;
                    display: flex;
                    font-size: 14px;
                    justify-content: center;
                    align-items: center;
                    padding-left: 10px;
                    padding-right: 10px;
                    font-weight: 700;
                    margin-right: 10px;
                }

                .mark {
                    height: 24px;
                    background: #fff;
                    box-shadow: 0 4px 13px 0 #e8edf4, 0 2px 2px 0 hsla(0, 0%, 87.5%, .5);
                    border-radius: 2px !important;
                    border: 1px solid #e7e7e7 !important;
                    color: #6d6d6d;
                    display: flex;
                    font-size: 14px;
                    justify-content: center;
                    align-items: center;
                    padding-left: 10px;
                    padding-right: 10px;
                    font-weight: 700;
                    margin-right: 10px;
                    cursor: pointer;
                }
            }

            .fieldHead {
                height: 30px;
                text-align: left;
                margin-top: 0px;
                font-size: 15px;
                font-weight: 500;
                color: #222;
            }
            .fields{
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                gap: 10px;
                .field{
                    margin-right: 20px;
                    font-size: 14px;
                    color: #6b6b6b;
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                }
                .field:hover{
                    color: burlywood;
                }
            }
        }

        .relation {
            margin-top: 3vh;
            width: 100%;
            height: auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            background-color: #fff;

            .relavant {
                padding: 20px;
                font-weight: 700;
                font-size: large;
            }

            .relavantDetail {
                padding-left: 20px;
                width: 100%;
                border-color: #979797;
                display: flex;
                flex-direction: column;

                .relavantDetailHead {
                    flex-direction: row;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    min-width: 100%;
                    width: auto;
                    border: solid lightgray;
                    border-left: hidden;
                    border-right: hidden;
                    border-top: hidden;
                    border-width: 1px;
                    margin-bottom: 8px;

                    .first {
                        min-width: 120px;
                        width: auto;
                        height: 40px;
                        border: solid;
                        border-color: #979797;
                        border-width: 1px;
                        margin-right: 1px;
                        font-size: 13px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: 600;
                        cursor: pointer;
                        padding-left: 5px;
                        padding-right: 5px;
                    }

                    .second {
                        min-width: 120px;
                        width: auto;
                        height: 40px;
                        border: solid;
                        border-color: #979797;
                        border-width: 1px;
                        margin-right: 1px;
                        font-size: 13px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-weight: 600;
                        cursor: pointer;
                        padding-left: 5px;
                        padding-right: 5px;
                    }

                    .highlighted {
                        color: #4759c5;
                        background-color: #fafafa;
                        border-bottom: hidden;
                    }
                }

                .relavantDetailBody {
                    width: 100%;
                    height: auto;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;

                    .relavantWork {
                        padding-top: 10px;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        width: 100%;
                        min-height: 10vh;
                        height: auto;
                        border-bottom: dashed;
                        border-width: 1px;
                        border-left: hidden;
                        border-top: hidden;

                        .work_name {
                            align-self: flex-start;
                            margin-left: 20px;
                            font-size: 15px;
                            font-weight: 600;
                            display: flex;
                            justify-content: left;
                            flex-direction: row;

                            p {
                                text-align: left;
                            }
                        }

                        .work_related {
                            margin-top: 5px;
                            margin-left: 20px;
                            font-size: 13px;
                        }

                        .more {
                            display: flex;
                            margin-left: 20px;
                            flex-direction: row;
                            align-items: center;
                            justify-content: flex-start;
                            height: 30px;

                            .jump {
                                width: 50px;
                                font-size: 12px;
                                color: white;
                                border-width: 1px;
                                background-color: #4759c5;
                                cursor: pointer;
                            }

                            .pdf1 {
                                border: solid;
                                border-width: 1px;
                                margin-left: 20px;
                                font-size: 12px;
                                width: 50px;
                                color: white;
                                font-weight: 700;
                                background-color: #c51c01;
                                cursor: pointer;
                            }

                            .grey1 {
                                background-color: #e7e7e7;
                                cursor: auto;
                            }
                        }
                    }
                }

            }

            .relationHead {
                padding: 20px;
                font-weight: 700;
                font-size: large;
            }


            .map {
                align-self: center;
                margin-top: 20px;
                min-width: 90%;
                width: auto;
                min-height: 30vh;
                height: auto;
            }
        }
    }

    .chat {
        display: block;
        position: fixed;
        /*right: 200px;*/
        left: 68vw;

        .rightBar {
            flex: 0 0 370px;
            max-width: 370px;
            min-width: 370px;
            height: 70vh;
        }
    }
}

.indexArticle::-webkit-scrollbar {
    width: 1px;
    /* 设置滚动条宽度 */
}</style>
