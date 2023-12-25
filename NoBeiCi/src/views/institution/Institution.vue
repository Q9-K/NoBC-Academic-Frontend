<script setup>
import {ref,onMounted,watch} from 'vue'
import {useRouter} from 'vue-router'
import axios from "axios";
import NavigateBar from '../../components/NavigateBar.vue'
import SearchBar from '../../components/SearchBar.vue'
import i18n from "../../locales/index.js";
import get from "../../functions/Get.js";
import {useInstitution} from "../../stores/institution.js"
import {checkIsChinese} from "../../functions/checkIsChinese.js";
import {handleResponse} from "../../functions/handleResponse.js";
import {useUpperSearchBarStore} from "../../stores/upperSearchBar.js";
const router = useRouter();
const api = {
  getInstitutions: '/institution/getInstitutionList/',
  getInstitutionByKeyword: 'http://api.buaa-q9k.xyz/institution/getInstitutionByKeyword/',
}

const language = ref("cn")
const store = useInstitution();
const page_num = ref(1);
const page_size = ref(20);
const total = ref(0);
const institutions = ref([
    {id:"1",display_name:"University of Michigan–Ann Arbor",image_url:"https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/University%20of%20Michigan%20logo.svg"},
    {id:"2",display_name:"111",image_url:"https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Si%C3%A8ge%20du%20CNRS%20rue%20Michel-Ange%20Paris%206.jpg"},
    {id:"3",display_name:"University of Michigan–Ann Arbor",image_url:"https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/University%20of%20Michigan%20logo.svg"},
    {id:"4",display_name:"University of Michigan–Ann Arbor",image_url:"https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/University%20of%20Michigan%20logo.svg"},
    {id:"5",display_name:"111",image_url:"https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/University%20of%20Michigan%20logo.svg"},
    {id:"6",display_name:"111",image_url:"https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/University%20of%20Michigan%20logo.svg"},
    {id:"7",display_name:"111",image_url:"https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/University%20of%20Michigan%20logo.svg"},
    {id:"8",display_name:"111",image_url:"https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/University%20of%20Michigan%20logo.svg"},
    {id:"9",display_name:"111",image_url:"https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/University%20of%20Michigan%20logo.svg"},
    {id:"10",display_name:"111",image_url:"https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/University%20of%20Michigan%20logo.svg"},
])
const goInstitution = (id) =>{
    store.changeId(id);
    console.log("store.id:",store.getId);
    var strs = id.split('/');
    id = strs[strs.length-1];

    router.push({ name: 'institutionDetail', params: { institutionId: id } });
}
const search = (value)=>{
    console.log(value.value)
}
const getInstitutions =async (page_size,page_num)=>{
    console.log(page_size,page_num)
    const result = await get(
        {
            url: api.getInstitutions,
            params:{
                page_size:page_size,
                page_num:page_num
            },
            useTestEnv:false,
            // testEnv:"http://100.117.229.168:8000"
        }
    );
    institutions.value = result.data.institutions;
    for(let i=0;i<institutions.value.length;i++){
        if(institutions.value[i].image_url==null){
            institutions.value[i].image_url = "/src/assets/background/institution.webp";
        }
        if(institutions.value[i].chinese_display_name==""){
            console.log(institutions.value[i].display_name);
            institutions.value[i].chinese_display_name = institutions.value[i].display_name;
        }
    }
    total.value = result.data.total;

}
onMounted(()=>{
    language.value = i18n.getLocale();
    getInstitutions(20,1);
})

const handleSearchInstitution= (value) => {

    let codeOfLanguage = 0
    if (checkIsChinese(value)) {
    codeOfLanguage = 1
}

return axios.get(api.getInstitutionByKeyword, {
    params: {
        keyword: value,
        language: codeOfLanguage
    }
    }).then((response) => {
    handleResponse(response, false, (data) => {
        const upperSearchBar = useUpperSearchBarStore()
        if (codeOfLanguage === 0) {
            for (let {id, display_name} of data.institutions) {
                upperSearchBar.addIntoOptions(id, display_name)
            }
        }
        else if (codeOfLanguage === 1) {
            for (let {id, chinese_display_name} of data.institutions) {
                upperSearchBar.addIntoOptions(id, chinese_display_name)
            }
        }
    })
    })
}

const handleSelectInstitution = (value) => {
    let fullId = ''
    fullId += value
    store.changeId(fullId)
    const depart = fullId.split('/')
    let id = depart.at(depart.length - 1)
    router.push('/institution/' + id)
}
watch(()=>{ return i18n.getLocale()}, (newValue, oldValue) =>{
    language.value = newValue
});
</script>

<template>

    <div class="header"><NavigateBar></NavigateBar></div>
    <el-scrollbar>
        <div class="search">
            <SearchBar
            :search-function="handleSearchInstitution"
            :select-function="handleSelectInstitution"
            ></SearchBar>
        </div>
        <div class="i-container">

            <div v-for="item in institutions" class="card" style="background-color: rgb(250, 250, 250) !important;">
                <div class="card-box" style="background-color: rgb(250, 250, 250) !important;">
                    <div class="img-box" style="background-color: rgb(250, 250, 250) !important;">
                        <img
                        :src="item.image_url"
                        class="image"
                        style="background-color: rgb(250, 250, 250) !important;"
                        />
                    </div>
                    <el-divider style="margin: 0;"></el-divider>
                    <div class="name-box" style="background-color: rgb(250, 250, 250) !important;">
                        <div class="name" style="background-color: rgb(250, 250, 250) !important; color:black !important">{{language === "cn" ? item.chinese_display_name : item.display_name}}</div>
                    </div>
                    <div class="button-box" style="background-color: rgb(250, 250, 250) !important;">
                            <button text class="button" @click=goInstitution(item.id)>{{i18n.t('institution.detail')}}</button>
                    </div>
                </div>
            </div>

        </div>

    </el-scrollbar>
    <div class="page">
        <el-pagination background layout="total, prev, pager, next, jumper"
        :total="total"
        v-model:currentPage = "page_num"
        class="pagination"
        @current-change = "getInstitutions(20,page_num)"
        />
    </div>

</template>

<style scoped lang="scss">
.header {
    height: 10vh;
}
.search{
    height: 30vh;
}
.image-viewer {
  .el-image-viewer__mask {
    opacity: 0.7;
  }
}
.i-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100vw;
    height: 55vh;

    .card {
        background-color: rgb(250, 250, 250) !important;
        width: 300px;
        text-align: center;
        margin: 20px 10px ;
        border-radius: 20px;
        transition: all 0.5s;
        .card-box {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .img-box {
            width: 100%;
            height: 300px;
            display: flex;
            justify-content: center;
            align-items: center;
                .image {
                    max-height: 300px;
                    object-fit: cover;
                }

            }
            .name-box {
                height: 60px;
                display: flex;
                justify-content: center;
                align-items: center;
                .name {
                }

            }
            .button-box {
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
                .button {
                    border: none;
                    transition: all 0.5s;
                }
                .button:hover{
                        background-color: rgb(238, 238, 238) !important;
                        border: none;
                        box-shadow:  3px 3px 2px 1px  rgba(75, 72, 72, 0.907);
                }
            }

        }
    }
    .card:hover{
        box-shadow:  12px 12px 2px 1px  rgba(75, 72, 72, 0.907);
    }

}
.page{
    height: 5vh;
    display: flex;
    justify-content: center;
}
</style>
