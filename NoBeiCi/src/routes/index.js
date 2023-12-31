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
      component: () => import('../views/personInfoView.vue'),
    },
    {
      path: '/authorhome/:id',
      name: "authorhome",
      component: () => import('../views/authorHomeView.vue'),
    },
    {
      path: '/thesisDetail/:thesisId',
      name: 'thesisDetail',
      component: () => import('../views/thesisDetail.vue')
    },
    // {
    //   path: '/chat',
    //   name: 'chatPDF',
    //   component: () => import('../views/chatPDF.vue')
    // },
    {
      path: '/scholar',
      name: 'scholar',
      component:() => import('../views/Scholar/AuthoritativeScholar.vue')
    },
    {
      path: '/institution',
      name: "institution",
      component: () => import('../views/institution/Institution.vue'),
    },
    {
      path: '/institution/:institutionId',
      name: "institutionDetail",
      component: () => import('../views/institution/InstitutionDetail.vue'),
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
          path: 'scholarClaim',
          name: "scholarClaim",
          component: () => import('../views/admin/ScholarClaim.vue'),
        }
      ]
    },
    {
      path: '/field',
      name: 'field',
      component: () => import('../views/field/Field.vue')
    },
    {
      path: '/fieldDetail/:fieldId',
      name: 'fieldDetail',
      component: () => import('../views/fieldDetail/FieldDetail.vue')
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
