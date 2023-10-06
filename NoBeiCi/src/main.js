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
// import router from 'vue-router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
