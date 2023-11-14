import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: "layout",
      component: () => import('../pages/Home.vue'),
    },
    {
      path: '/admin',
      name: "admin",
      component: () => import('../views/admin/Layout.vue'),
      redirect: '/admin/scholarCertify',
      children:[
        {
            path: 'scholarCertify',
            name: "scholarCertify",
            component: () => import('../views/admin/ScholarCertify.vue'),
        },
        {
            path: 'achievementCertify',
            name: "achievementCertify",
            component: () => import('../views/admin/AchievementCertify.vue'),
        },
        {
            path: 'achievementClaim',
            name: "achievementClaim",
            component: () => import('../views/admin/AchievementClaim.vue'),
        },
        {
            path: 'achievementPublication',
            name: "achievementPublication",
            component: () => import('../views/admin/AchievementPublication.vue'),
        },       
         {
          path: 'scholarClaim',
          name: "scholarClaim",
          component: () => import('../views/admin/ScholarClaim.vue'),
        },
      ]
    }
  ]
})


export default router