<script setup>
    // props
    const props = defineProps({
        scholars: []
    })
</script>
<template>
    <div v-for="scholar in props.scholars" class="author_block">
        <div class="avatar">
            <img style="padding: 15px;width:100px;height:100px" :src= scholar.avatar>
        </div>
        <div class="info">
            <div class="scholar_head">
                <div class="name"> {{ scholar.display_name }} </div>
                <div class="follow">
                    <div class="page"> 学者主页 </div>
                    <div class="focus">
                        <el-icon style="font-size: 13px;"><Message /></el-icon>
                    <div style="font-family:fantasy;font-weight:600;font-size:12px;margin-left:5px">关注</div>
                    </div>
                </div>
            </div>
            <div class="scholar_makes">
                <div class="H-index">
                    <div style="font-size:11px">
                        H-index:
                        {{ scholar.summary_stats.h_index }}
                    </div>
                </div>
                <div class="thesis">
                    <div style="font-size:11px">
                        论文数:
                        {{ scholar.works_count }}
                    </div>
                </div>
                <div class="icon">
                    <el-icon style="background-color: #adbbdc;font-size:24px">
                        <Connection />
                    </el-icon>
                </div>
                <div class="used">
                    <div style="font-size:11px">
                        引用数:
                        {{ scholar.cited_by_count }}
                    </div>
                </div>
            </div>
            <div class="scholar_field">
                <div class="fieldHead">研究领域</div>
                <div v-for="field in scholar.x_concepts" class="field">
                    <el-icon style="margin-right: 5px;font-size:20px"><Grid /></el-icon>
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
    margin-top: 10px;
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
.name{
    margin-left: 10px;
    width: auto;
    flex-wrap: nowrap;
}
.follow{
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
    font-family:fantasy;
    font-weight:600;
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
.focus{
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
.focus:hover{
    background-color: burlywood;
}
.scholar_makes {
    margin-left: 20px;
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
        width: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.scholar_field {
    margin-left: 20px;
    height: auto;
    display: flex;
    margin-left: 30px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;
}
.fieldHead{
    margin-right: 30px;
    font-size: 15px;
}
.field{
    width: auto;
    margin-right: 10px;
    font-size: 12px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
}
.field:hover{
    color: burlywood;
    cursor: pointer;
}
.more{
    margin-top: 4px;
    height: 30px;
    display: flex;
    margin-left: 30px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.page:hover{
    color: burlywood;
    cursor: pointer;
}
</style>