import { createApp } from 'vue'
import './style.css'
import animate from "animate.css";
import App from './App.vue'
import axios from 'axios'
// import router from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import i18n from "./locales/index.js";


const app = createApp(App)

app.use(ElementPlus)
app.use(i18n)
app.mount('#app')
