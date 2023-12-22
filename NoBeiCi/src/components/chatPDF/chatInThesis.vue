<template>
    <div class="box">
        <div class="top">
            <div class="head">
                <h2>Chat Paper</h2>
            </div>
            <div class="introduction">
                <el-icon style="font-size: 30px;">
                    <Orange />
                </el-icon>
                <p>一句话总结</p>
            </div>
        </div>
        <div class="Intro" ref="scrollContainer">
            <div v-for="(message, index) in messages" :key="index">
                <div v-if="index % 2 === 0" class="left">
                    <div class="topHead">
                        <img src="../../assets/vouzenus/vouzenus.jpg" style="width:25px;height:25px;margin-right: 2%">
                        <div class="name">vouzenus</div>
                    </div>
                    <div class="message">{{ message }}</div>
                </div>
                <div v-if="index % 2 === 1" class="right">
                    <div class="topHead">
                        <el-icon style="font-size: 20px;margin-left: 2%">
                            <UserFilled />
                        </el-icon>
                        <div class="name">用户</div>
                    </div>
                    <div class="message">{{ message }}</div>
                </div>
            </div>
        </div>
        <el-input class="input" v-model="textarea" rows="4" type="textarea" :placeholder=content :suffix-icon="Search"
            clearable></el-input>
        <div class="sendButton">
            <p @click="getMessage" class="button">发送</p>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { Search } from "@element-plus/icons-vue";
//对这篇文章的介绍
const introduce = ref('')
//第一条消息
const message = ref('详细介绍这篇论文')
//pdf的url
const pdf_url = ref('https://hal.science/hal-00001006/document')
// placeholder
const content = ref('请输入你的想法')
// 发送的消息
const textarea = ref('')
// 所有的消息
const messages = ref([])
async function getIntroduction() {
    try {
        const { data: res } = await axios.get("http://100.99.200.37:8000/work/get_reply/",
            {
                params: { msg: message.value, pdf_url: pdf_url.value }
            }
        );
        introduce.value = res.data.reply.result
        messages.value.push(introduce.value)
    } catch (error) {
        console.error(error);
    }
}
async function getMessage() {
    try {
        console.log(textarea.value)
        messages.value.push(textarea.value)
        const { data: res } = await axios.get("http://100.99.200.37:8000/work/get_reply/",
            {
                params: { msg: textarea.value, pdf_url: pdf_url.value }
            }
        );
        introduce.value = res.data.reply.result
        messages.value.push(introduce.value)
        textarea.value = ''
        // 滚动到最底部
        // const container = this.$refs.scrollContainer;
        // container.scrollTo({
        //     top: container.scrollHeight,
        //     behavior: 'smooth'
        // });
    } catch (error) {
        console.error(error.response.data);
    }
}
onMounted(() => {
    getIntroduction();
})
</script>
<style scoped>
.box {
    position: relative;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-self: start;
}

.top {
    display: flex;
    flex-direction: column;
    height: 12vh;
    justify-self: start;
    background: linear-gradient(to bottom, #87CEEB, #ffffff);
}

.head {
    display: flex;
    margin-left: 7%;
    justify-content: flex-start;
    align-items: center;
    height: 8vh;
}

.introduction {
    display: flex;
    height: 4vh;
    margin-left: 7%;
    align-items: center;
}

.Intro {
    height: 45vh;
    background-color: #fff;
    margin-left: 5%;
    margin-right: 5%;
    overflow-y: auto;
    scrollbar-color: #eee;
    /* 在 Firefox 中设置滚动条颜色 */
    scrollbar-width: 1px;
    /* 在 Firefox 中设置滚动条宽度 */
}

/* 在 WebKit（Chrome 和 Safari）中设置滚动条样式 */
.Intro::-webkit-scrollbar {
    width: 1px;
}

.Intro::-webkit-scrollbar-thumb {
    background-color: #87CEEB;
    /* 滚动条拖动块的颜色 */
    border-radius: 6px;
    /* 滚动条拖动块的圆角 */
}

.Intro::-webkit-scrollbar-track {
    background-color: #eee;
    /* 滚动条轨道的颜色 */
    border-radius: 6px;
    /* 滚动条轨道的圆角 */
}

.input {
    border-radius: 20px;
    margin-top: 1vh;
    margin-left: 5%;
    margin-right: 5%;
    height: 5vh;
    width: 90%;
}

.sendButton {
    margin-top: 1vh;
    margin-left: 8%;
    margin-right: 8%;
    height: 5vh;
    display: flex;
    justify-content: flex-end;
    z-index: 9999;
    cursor: pointer;
}

.button {
    font-size: 15px;
    font-weight: 450;
}

.left {
    display: flex;
    flex-direction: column;

    .topHead {
        min-height: 5vh;
        height: auto;
        display: flex;
        margin-left: 3%;
        margin-right: 3%;
        display: flex;
        justify-self: start;
        align-items: center;
        margin-bottom: 2px;

        .name {
            font-weight: 700;
        }
    }

    .message {
        margin-left: 3%;
        text-align: left;
        margin-bottom: 2vh;
    }
}

.right {
    display: flex;
    flex-direction: column;

    .topHead {
        min-height: 5vh;
        height: auto;
        margin-left: 3%;
        margin-right: 3%;
        display: flex;
        flex-direction: row-reverse;
        justify-self: flex-start;
        align-items: center;
        margin-bottom: 2px;

        .name {
            font-weight: 700;
        }
    }

    .message {
        margin-right: 3%;
        text-align: right;
        margin-bottom: 2vh;
    }
}

h2 {
    font-weight: 1000;
}
</style>