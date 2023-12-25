<template>
    <div class="condition">
        <p>{{ i18n.t('conf.confConditions')}}</p>
        <el-cascader-panel
            :options="subject"
            :value="['guide']"
            filterable
            expand-trigger="hover"
        />
    </div>
</template>

<script setup>
import i18n from "../../locales/index.js";

const subject = [
    {
        value: 'guide',
        label: i18n.t('conf.confSubject'),
        children: [
        {
                value: 'Computer Science',
                label: 'Computer Science'
            },
            {
                value: 'Economics',
                label: 'Economics'
            },
            {
                value: 'Law',
                label: 'Law'
            },
            {
                value: 'Mathematics',
                label: 'Mathematics'
            },
            {
                value: 'Psychology',
                label: 'Psychology'
            },
            {
                value: 'Medicine',
                label: 'Medicine'
            },
            {
                value: 'Chemistry',
                label: 'Chemistry'
            },
            {
                value: 'Physics',
                label: 'Physics'
            },
            {
                value: 'History',
                label: 'History'
            },
            {
                value: 'Biology',
                label: 'Biology'
            },
        ]
    },
];
</script>

<style scoped>
    .el-cascader-panel__body {
        max-height: none !important;
    }
</style>
