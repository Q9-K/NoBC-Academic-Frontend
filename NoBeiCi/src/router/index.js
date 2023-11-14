import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '',
        redirect: '/home'
    },
    {
        path: '/thesisDetail',
        name: 'thesisDetail',
        component: () => import('../views/thesisDetail.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../pages/Home.vue')
    },
    {
        path: '/chat',
        name: 'chat',
        component: () => import('../views/chatPDF.vue')
    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})
export default router
