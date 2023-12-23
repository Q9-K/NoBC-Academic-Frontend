<script setup>
import {ref, computed} from 'vue'
import i18n from '../../locales/index.js'
import Clipboard from 'clipboard';
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios';

const {data, type} = defineProps(['data', 'type']);
const title = ref(data.other.title);
const authors = ref(data.other.authorships.map(authorship => authorship.author.display_name));
const abstract =computed(() => {
    if(type === "highlight") {
        return data.highlight.abstract.join('').replace(/<em>/g, '<em style="color:red;">');
    } else {
        return data.other.abstract;
    }
})
const issue = computed(() => {
    if (data.other.locations && data.other.locations.length > 0) {
        return data.other.locations[0].source.host_organization_name + '(' + data.other.publication_date+ ')';
    } else {
        return "";
    }
})
const numberCite = ref(data.other.cited_by_count);
const numberViews = ref(data.other.visit_count);
const word_id = data.other.id;
const citeMessage = ref(data.other.citation);

const copyText = () => {
  const clipboard = new Clipboard(document.body, {
    text: () => citeMessage.value
  });
  clipboard.on('success', () => {
    open();
    clipboard.destroy(); 
  });
  clipboard.on('error', () => {
    console.error('Failed to copy to clipboard');
    clipboard.destroy(); 
  });
};

const open = () => {
  ElMessageBox.alert(`${citeMessage.value}`, `${i18n.t('articleDisplay.articleDisplayCite')}`, {
    confirmButtonText: '复制',
    callback: (action) => {
      ElMessage({
        type: 'info',
        message: `已复制到剪贴板`,
      })
    },
  })
}

const collectArticle = () => {
    try {
        const response = axios.post('http://100.99.200.37:8000/user/add_favorite/', {
            params: {
                word_id: word_id
            }
        });
        if (response.status === 200) {  
            ElMessage({
                message: 'Collect successfully.',
                type: 'success',
            });
        } else {
            ElMessage({
                message: 'Oops, fail to collect it.',
                type: 'warning',
            });
            console.error('收藏失败:', response.error);  
        }  
    } catch(error) {
        console.error('Error fetching data:', error);
    }
}

</script>

<template>
    <el-card class="box-card">
        <div class="title">
            <p class="title-content" href="toPaperPage" >{{ title}}</p>
        </div>
        <div class="author">
            <span v-for="(author, index) in authors">
                <el-link type="success">{{ author }}</el-link>
                <span v-if="index < authors.length - 1">, &nbsp;</span>
            </span>
        </div>
        <div class="abstract">
            <span class="abstract-content" :innerHTML="abstract"></span>
        </div>
        <div class="issue">
            <span>{{ issue }}</span>
        </div>
        <div class="oprs">
            <span>{{i18n.t('articleDisplay.articleDisplayCitations')}}&nbsp; </span><span style="color: rgb(241, 16, 181);">{{ numberCite }}</span>  &nbsp;|&nbsp;
            <span>{{i18n.t('articleDisplay.articleDisplayViews')}} </span> <span style="color: rgb(241, 16, 181);">{{ numberViews }}</span>
            <el-button class="quote-button" @click="copyText"><el-icon><Link /></el-icon>{{i18n.t('articleDisplay.articleDisplayCite')}}</el-button>
            <el-button class="collect-button" @click="collectArticle"><el-icon><FolderAdd /></el-icon>{{i18n.t('articleDisplay.articleDisplayCollect')}}</el-button>
        </div>
    </el-card>
</template>

<style scoped>
.box-card {
    background-color: rgb(246, 250, 250);
}

.title {
    margin: 0;
    padding: 0;
}
.title-content {
    color: #3a031a;
    font-size: large; 
    font-family: HiraginoSansGB-W6,HiraginoSansGB;
    background-color: transparent;
    font-weight: 700;
    overflow-wrap: break-word;
    word-break: break-word;
    text-align: start;
}
.author {
    display: flex;
    margin-top: 8px;
    font-size: 12px;
    color: #3a031a;
}

.abstract {
    font-size: 15px;
}

.abstract-content {
    display: block; /* 确保是块级元素 */
    overflow: hidden;           /* 隐藏溢出部分 */
    text-overflow: ellipsis;    /* 显示省略号 */
    display: -webkit-box;       /* 将元素视为弹性伸缩盒子 */
    -webkit-box-orient: vertical;/* 设置伸缩盒子的子元素垂直排列 */
    -webkit-line-clamp: 3;       /* 显示的行数 */
    word-wrap: break-word;  /* 避免拆分单词 */
    text-align: left;
}

.abstract-content em {
    text-align: left;
}

.issue {
    display: flex;
    font-weight: 300;
    font-size: 13px;
}

.oprs {
    display: flex;
    align-items: center;
    margin-top: 5px;
    font-size: 12px;
    color: #000;
}

.quote-button {
    margin-left:31vw;
    background-color: transparent;
}
.collect-button {
    margin-left: 1vw;
    font-size: large; 
    background-color: transparent;
    margin-right: 3vw;
}

</style>