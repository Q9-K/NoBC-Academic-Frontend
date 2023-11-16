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
import {vue3Debounce} from "vue-debounce";

const app = createApp(App)
app.directive('debounce', vue3Debounce({ lock: true }))
app.use(router)
app.use(ElementPlus)
app.use(router)
app.use(i18n)




for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.mount('#app')
