<template>
    <div class="condition">
        <p> {{ i18n.t('conf.confConditions')}} </p>
        <el-cascader-panel :options="subject" filterable close />
        <el-cascader-panel :options="publish" clearable />
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
                value: '计算机科学',
                label: '计算机科学'
            },
            {
                value: '经济学',
                label: '经济学'
            },
            {
                value: '法学',
                label: '法学'
            },
            {
                value: '数学',
                label: '数学'
            },
            {
                value: '心理学',
                label: '心理学'
            },
            {
                value: '医学',
                label: '医学'
            },
        ]
    },
]

const publish = [
    {
        value: 'Publish',
        label: i18n.t('conf.confPublish'),
        children: [
            {
                value: 'Springer',
                label: 'Springer'
            },
            {
                value: 'Elsevier',
                label: 'Elsevier'
            },
            {
                value: 'Wiley',
                label: 'Wiley'
            }
        ]
    }
]
</script>

<style>

</style>