import { createApp } from 'vue'
import './style.css' 
import App from './App.vue'
import axios from 'axios'
import router from './routes'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router);
app.use(ElementPlus);
app.mount('#app')
