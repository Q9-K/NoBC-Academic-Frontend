<script setup>
import router from '../routes/index.js';
import request from "../functions/Request"
import { ElMessage } from 'element-plus';
import i18n from "../locales/index.js";
// props
const props = defineProps({
    scholars: []
})
function jumpToField(field){
    router.push('/fieldDetail/' + field.id.substring(field.id.indexOf("C")))
}
function NavigateToScholar(id) {
    router.push('/authorhome/' + id.substring(id.indexOf("A")))
}
async function followScholar(id){
    const scholar_id = id.substring(id.indexOf("A"))   
    const result = await request(
        {
            url: "http://100.99.200.37:8000/user/follow_scholar/",
            params: {
                scholar_id: scholar_id
            },
            addToken: true
        }
    )
    if(result.code==200){
        ElMessage({
            message: "关注成功",
            type: 'success',
        })        
    }
    else{
        ElMessage({
            message: result.msg,
            type: 'error',
        })
    }
    console.log(result)
}
</script>
<template>
    <div v-for="scholar,index in props.scholars" class="author_block" :class="{grey: index%2==1}">
        <div class="avatar">
            <img style="padding: 20px;width:100px;height:100px;" :src=scholar.avatar>
        </div>
        <div class="info">
            <div class="scholar_head">
                <div class="name"> {{ scholar.display_name }} </div>
                <div class="follow">
                    <div class="page" @click="NavigateToScholar(scholar.id)"> {{ i18n.t("scholarDisplay.mainPage") }} </div>
                    <div class="focus">
                        <el-icon style="font-size: 13px;">
                            <Message />
                        </el-icon>
                        <div style="font-family:fantasy;font-weight:600;font-size:12px;margin-left:5px" @click="followScholar(scholar.id)">{{ i18n.t("scholarDisplay.focus") }}</div>
                    </div>
                </div>
            </div>
            <div class="scholar_makes">
                <div class="H-index">
                    <div style="font-size:11px;display:flex;flex-direction:row">
                        H-index:
                        <div style="color: green;margin-left:5px">{{ scholar.summary_stats.h_index }}</div>
                    </div>
                </div>
                <div class="thesis">
                    <div style="font-size:11px;display:flex;flex-direction:row">
                        {{ i18n.t("scholarDisplay.thesises") }}:
                        <div style="color: blue;margin-left:5px;">{{ scholar.works_count }}</div>
                    </div>
                </div>
                <div class="icon">
                    <el-icon style="background-color: #adbbdc;font-size:24px">
                        <Connection />
                    </el-icon>
                </div>
                <div class="used">
                    <div style="font-size:11px;display:flex;flex-direction:row">
                        {{ i18n.t("scholarDisplay.quotes") }}:
                        <div style="color: red;margin-left:5px;">{{ scholar.cited_by_count }}</div>
                    </div>
                </div>
            </div>
            <div class="scholar_field">
                <div class="fieldHead">{{ i18n.t("scholarDisplay.field") }}</div>
                <div v-for="field in scholar.x_concepts" class="field"
                    @click="jumpToField(field)">
                    <el-icon style="margin-right: 5px;font-size:20px">
                        <Grid />
                    </el-icon>
                    {{ field.display_name }}
                </div>
            </div>
            <!-- <div class="more">
                <div class="page"> 学者主页 </div>
            </div> -->
        </div>
    </div>
</template>
<style scoped lang="scss">
.author_block {
    width: 95%;
    display: flex;
    flex-direction: row;
    border: solid #f2f4f7;
}

.avatar {
    align-self: flex-start;
    flex: 1;
}

.info {
    margin-left: auto;
    margin-right: auto;
    height: auto;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    flex: 10;
}

.scholar_head {
    margin-top: 15px;
    margin-left: 20px;
    height: 30px;
    font-size: 18px;
    font-weight: 700;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.name {
    margin-left: 10px;
    width: auto;
    max-width: 70%;
    flex-wrap: nowrap;
    text-align: left;
}

.follow {
    margin-left: 10px;
    margin-right: 30px;
    font-size: 16px;
    font-weight: 300;
    padding: 3px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.page {
    margin-right: 20px;
    font-family: fantasy;
    font-weight: 600;
    font-size: 12px;
    border: solid #ccc;
    border-width: 1px;
    border-radius: 5px;
    padding: 3px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.focus {
    height: 30px;
    display: flex;
    margin-left: 20px;
    height: 20px;
    padding: 5px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    border: solid #ccc;
    border-width: 1px;
}

.focus:hover {
    background-color: burlywood;
}

.scholar_makes {
    margin-left: 30px;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    .H-index {
        border: solid #ccc;
        border-width: 1px;
        margin-right: 20px;
        height: 50%;
        width: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .thesis {
        border: solid #ccc;
        border-width: 1px;
        margin-right: 20px;
        height: 50%;
        width: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icon {
        height: 50%;
    }

    .used {
        border: solid #ccc;
        border-width: 1px;
        margin-right: 20px;
        height: 50%;
        min-width: 80px;
        width: auto;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.scholar_field {
    margin-left: 20px;
    margin-bottom: 10px;
    height: auto;
    display: flex;
    margin-left: 30px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
}

.fieldHead {
    margin-right: 30px;
    font-size: 15px;
}

.field {
    width: auto;
    margin-right: 10px;
    font-size: 12px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0px;
}

.field:hover {
    color: burlywood;
    cursor: pointer;
}

.more {
    margin-top: 4px;
    height: 30px;
    display: flex;
    margin-left: 30px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.page:hover {
    color: burlywood;
    cursor: pointer;
}
.grey{
    background-color: #f2f4f7;
}
</style>