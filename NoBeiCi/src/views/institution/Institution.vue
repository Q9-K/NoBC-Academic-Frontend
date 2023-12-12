<script setup>
import {ref,onMounted} from 'vue'
import {useRouter} from 'vue-router'
import NavigateBar from '../../components/NavigateBar.vue'
import SearchBar from '../../components/SearchBar.vue'
import i18n from "../../locales/index.js";
const router = useRouter();
const institutions = ref([
    {id:"1",name:"University of Michigan–Ann Arbor",img:"https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/University%20of%20Michigan%20logo.svg"},
    {id:"2",name:"111",img:"https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Si%C3%A8ge%20du%20CNRS%20rue%20Michel-Ange%20Paris%206.jpg"},
    {id:"3",name:"University of Michigan–Ann Arbor",img:"https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/University%20of%20Michigan%20logo.svg"},
    {id:"4",name:"University of Michigan–Ann Arbor",img:"https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/University%20of%20Michigan%20logo.svg"},
    {id:"5",name:"111",img:"https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/University%20of%20Michigan%20logo.svg"},
    {id:"6",name:"111",img:"https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/University%20of%20Michigan%20logo.svg"},
    {id:"7",name:"111",img:"https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/University%20of%20Michigan%20logo.svg"},
    {id:"8",name:"111",img:"https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/University%20of%20Michigan%20logo.svg"},
    {id:"9",name:"111",img:"https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/University%20of%20Michigan%20logo.svg"},
    {id:"10",name:"111",img:"https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/University%20of%20Michigan%20logo.svg"},
])
const goInstitution = (id) =>{
    router.push({ name: 'institutionDetail', params: { institutionId: id } });
}
const search = (value)=>{
    console.log(value.value)
}
</script>

<template>

    <div class="header"><NavigateBar></NavigateBar></div>
    <el-scrollbar>
        <div class="search">
            <SearchBar 
            @formDataChange="search"
            ></SearchBar>
        </div>
        <div class="i-container">
            
            <div v-for="item in institutions" class="card">
                <div class="card-box" >
                    <div class="img-box">
                        <img
                        :src="item.img"
                        class="image"
                        />
                    </div>
                    <div style="padding: 14px">
                        <span>{{item.name}}</span>
                        <div class="bottom">
                        <button text class="button" @click=goInstitution(item.id)>详细信息</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    
    </el-scrollbar>
    <div class="page"><el-pagination background layout="total, prev, pager, next, jumper" :total="100" class="pagination" /></div>
    
</template>

<style scoped lang="scss">
.header {
    height: 10vh;
}
.search{
    height: 30vh;
}
.i-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100vw;
    height: 55vh;
    
    .card {
        background-color: rgb(250, 250, 250);
        width: 300px;
        text-align: center;
        margin: 20px 10px ;
        border-radius: 20px;
        transition: all 0.5s;
        .card-box {
            .img-box {
            width: 100%;
            height: 300px;
            display: flex;
            justify-content: center;
            align-items: center;
                .image {
                }
            }
            div {
                span {
                }
                .bottom {
                    .button {
                        border: none;
                        transition: all 0.5s;
                    }
                    .button:hover{
                        background-color: rgb(238, 238, 238);
                        border: none;
                        box-shadow:  3px 3px 2px 1px  rgba(75, 72, 72, 0.907);
                    }

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
