/*
 * @Date: 2023-09-14 00:15:07
 * @Author: Q9K
 * @Description:
 */
import { createApp } from 'vue'
import './style.css'
import animate from "animate.css";
import App from './App.vue'
import axios from 'axios'
import router from './routes'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons'
import 'element-plus/dist/index.css'
import i18n from "./locales/index.js";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Antd from 'ant-design-vue';
import { anyType } from 'ant-design-vue/es/_util/type.js';
import {vue3Debounce} from "vue-debounce";
import {createPinia} from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import message from './functions/Message'
import request from './functions/Request'
const app = createApp(App)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
app.directive('debounce', vue3Debounce({ lock: true }))
app.use(router)
app.use(ElementPlus)
app.use(router)
app.use(i18n)
app.use(Antd)
app.use(pinia)
app.use(anyType)
app.config.globalProperties.message = message;
app.config.globalProperties.request = request;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.mount('#app')
