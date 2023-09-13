/*
 * @Date: 2023-09-14 00:15:07
 * @Author: Q9K
 * @Description: 
 */
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios'
import router from './router'


const app = createApp(App)
app.use(router)
app.mount('#app')
