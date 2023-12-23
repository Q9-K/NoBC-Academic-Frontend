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
            <div class="scholar_head">{{ scholar.display_name }}</div>
            <div class="scholar_makes">
                <div class="H-index">
                    <div style="font-size:11px">
                        H-index:
                        1
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
                <div v-for="field in scholars.x_concepts">
                    {{ field.display_name }}
                </div>
            </div>
        </div>
    </div>
</template>
<style>
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
    height: 50px;
}

</style>