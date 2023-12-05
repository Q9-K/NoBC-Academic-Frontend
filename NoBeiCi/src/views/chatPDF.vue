<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import NavigateBar from '../components/NavigateBar.vue';
import Search from '../components/SearchBar.vue';
const sourceId = ref('');

const config = {
    headers: {
        "x-api-key": "sec_zUsE4WCLNOEUQxhWo6vzELTF0jRqZjKr",
        "Content-Type": "application/json",
    },
};
const inform = ref("hello")
const data = {
    url: "https://cz5waila03cyo0tux1owpyofgoryroob.aminersz.cn/FA/60/DE/FA60DE520C0221051FBE26CC43EB745A.pdf"
}
const fetchData = async () => {
    try {
        const response = await axios.post("https://api.chatpdf.com/v1/sources/add-url", {
            url: "https://cz5waila03cyo0tux1owpyofgoryroob.aminersz.cn/FA/60/DE/FA60DE520C0221051FBE26CC43EB745A.pdf"
        }, config);

        console.log("Source ID:", response.data.sourceId);
        sourceId.value = response.data.sourceId;

        setTimeout(() => {
            const pdfData = {
                sourceId: sourceId.value,
                messages: [
                    {
                        role: "user",
                        content: "Who made the constitution",
                    },
                ],
            };
            console.log("pdfData:", pdfData)
        }, 500);
        setTimeout(async() => {
            const chatResponse = await axios.post("https://api.chatpdf.com/v1/chats/message", {
                "sourceId": sourceId.value,
                "messages": [
                    {
                        "role": "user",
                        "content": "Who made the constitution",
                    },
                ],
            }, config);
            console.log("Result:", chatResponse.data.content);
        }, 2000);
    } catch (error) {
        console.error("Error:", error.message);
        console.log("Response:", error.response.data);
    }
};
function handleChildEvent(value){
    console.log('收到消息')
    // refs.myChildComponent.sendDataToParent();
}

// onMounted(() => {
//     fetchData();
// });
</script>
<template>
    <div class="main">
        <NavigateBar class="navbar"></NavigateBar>
        <Search class="search" :info="inform" @formDataChange="handleChildEvent"></Search>
    </div>
</template>
<style scoped> 
.main{
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: start;
    text-align: start;
}
.navbar
{
    
}
.search{
    margin-top: 10vh;
}
</style>