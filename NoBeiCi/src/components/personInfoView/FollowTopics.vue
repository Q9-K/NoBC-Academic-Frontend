<template>
  <div class="follow_topics_content">
        <div class="label">
            <span style="float: left;">我关注的领域</span>
        </div>

        <div class="tag">
            <div style="float: left;">
                <el-tag
            v-for="tag in dynamicTags"
            :key="tag"
            class="mx-1"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
        >
            {{ tag }}
        </el-tag>
        <el-button v-if="!inputVisible" class="button-new-tag ml-1" size="small" @click="showInput">
            + New Tag
        </el-button>
        <el-input
            v-if="inputVisible"
            ref="InputRef"
            v-model="inputValue"
            class="input"
            size="small"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
        />
            </div>

    
        </div>

        <div>
            <el-input
                v-model="inputValue"
                placeholder="添加感兴趣领域关键词"
                suffix-icon="el-icon-circle-plus"
                @keyup.enter="handleInputConfirm"
                @blur="handleInputConfirm"
                style="margin-top:0;width: 20vw;float: left;margin-left:auto;"
            >
            </el-input>
                 <el-button type="primary" icon="Check"  style="float: left" @click="handleInputConfirm"/>
        </div>
        
    </div>
</template>

<script lang="ts" setup>

    import { onMounted } from 'vue'
    import { nextTick, ref } from 'vue'
    import { ElInput } from 'element-plus'

    import { defineProps } from 'vue';
    import request from '../../functions/Request';

    const props = defineProps({
    dynamicTags: {
        type: Array,
        required: true,
    },
    });

    const inputValue = ref('')
    const dynamicTags = ref(props.dynamicTags)

    
    const inputVisible = ref(false)
    const InputRef = ref<InstanceType<typeof ElInput>>()

    const handleClose = (tag: string) => {
    dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
    }

    const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value!.input!.focus()
    })
    }

    const handleInputConfirm = async () => {
    if (inputValue.value) {
        dynamicTags.value.push(inputValue.value)
    }
    inputVisible.value = false
    inputValue.value = ''


    // const result = await request(
    //     {
    //         url: 'http://100.103.70.173:8000/user/change_user_info/',
    //         params:{
    //             name: this.person.nickName,
    //             real_name: this.person.realName,
    //             position: this.person.position,
    //             organization: this.person.organization,
    //             subject: this.person.subject,
    //             gender: this.person.gender
    //         },
    //         addToken: true,
    //     }
    //     );
    //     if(result){
    //         ElMessage({
    //             message: "修改信息成功",
    //             type: "success"
    //         })
    //     }
    //     console.log("save:",result)
    }

    onMounted(async () => {
        // 从后端导入 dynamicTags
        // const res = await fetch('/api/tags')
        // const data = await res.json()
        // dynamicTags.value = data.tags
        console.log("entering tag page")
    })


</script>

<style>

.button-new-tag{
    /* float: left; */
}
.mx-1{
   left: 0;
}

.input{
    width: 10vw;
    margin-left: 0;
    margin-right: auto;
}


.tag{
    margin-bottom: 3vh;
    display: flex;
    /* float: left; */
}
.label{
    font-size: 1.22222222em;
    line-height: 1.09090909em;
    color: #fff;
    margin-bottom: 5vh;
    font-weight: 700;
    /* float: left; */

    width: 90%;
    
}

.follow_topics_content{
    /* position: relative; */
    border: 1px solid #eeeeef;
    border-radius: 2px;
    background: #6e83f7;
    padding: 17px 20px 20px;
    /* height: 20vh; */
    min-height: 20vh;
    /* display: flex; */
}

</style>