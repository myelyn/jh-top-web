import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboardIndex',
      component: () => import('@/pages/dashboard/ranklist.vue')
    },
    {
      path: '/dashboard/detail/:battleId/:playerId',
      name: 'playerDetail',
      component: () => import('@/pages/dashboard/playerdetail/playerdetail.vue'),
    },
    {
      path: '/dashboard/:id',
      name: 'rankDetail',
      meta: {
        keepAlive: true
      },
      component: () => import('@/pages/dashboard/rankdetail/rankdetail.vue'),
    },
    {
      path: '/analysys',
      name: 'analysysIndex',
      component: () => import('@/pages/analysys/index.vue'),
    },
    {
      path: '/manage',
      name: 'manageBattle',
      component: () => import('@/pages/manage/manageBattle.vue'),
    }
  ]
})

export default router;
