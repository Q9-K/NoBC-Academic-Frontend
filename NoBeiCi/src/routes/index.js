import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: "home",
      component: () => import('../views/home/Home.vue'),
    },
    {
      path: '/personinfo',
      name: "personinfo",
      component: () => import('../views/personinfoView.vue'),
    },
    {
      path: '/thesisDetail',
      name: 'thesisDetail',
      component: () => import('../views/thesisDetail.vue')
    },
    {
      path: '/chat',
      name: 'chatPDF',
      component: () => import('../views/chatPDF.vue')
    },
    {
      path: '/admin',
      name: "admin",
      component: () => import('../views/admin/Layout.vue'),
      redirect: '/admin/scholarCertify',
      children: [
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
        }
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/SearchView.vue')
    },
    {
      path: '/conf',
      name: 'conf',
      component: () => import('../views/ConfView.vue')
    },
    {
      path: '/journal/:id/statics',
      name: 'journal',
      component: () => import('../views/Journal.vue')
    },
    {
      path: '/field',
      name: 'field',
      component: () => import('../views/field/Field.vue')
    },
  ]
})


export default router
