import { createRouter, createWebHistory } from 'vue-router'
import PersonInfo from '../views/personinfoView.vue'

const routes = [
    {
        path: '/',
        name: 'index',
        // component: () => import('../App.vue')
        // component: { template: '<div></div>' }
    },

    {
        path: '/personinfo',
        name: 'personinfo',
        component: PersonInfo
    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})
export default router
