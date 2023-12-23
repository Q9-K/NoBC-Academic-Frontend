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
                    <el-icon style="font-size: 20px;"><Plus /></el-icon>
                    <div>关注</div>
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
                    {{ field.display_name }}
                </div>
            </div>
            <div class="more">
                <div class="page"> 学者主页 </div>
            </div>
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
    height: 150px;
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
    margin-right: 100px;
    font-size: 16px;
    font-weight: 300;
    border: solid #ccc;
    border-width: 1px;
    padding: 3px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
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
.page {
    font-size: 13px;
}
.page:hover{
    color: burlywood;
    cursor: pointer;
}
</style>