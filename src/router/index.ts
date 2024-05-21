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
      component: () => import('@/pages/dashboard/index.vue')
    },
    {
      path: '/dashboard/detail/:battleId/:playerId',
      name: 'dashboardDetail',
      component: () => import('@/pages/dashboard/detail/detail.vue'),
    },
    {
      path: '/dashboard/:id',
      name: 'dashboardRank',
      meta: {
        keepAlive: true
      },
      component: () => import('@/pages/dashboard/rank/rank.vue'),
    },
    {
      path: '/analysys',
      name: 'analysysIndex',
      component: () => import('@/pages/analysys/index.vue'),
    }
  ]
});

export default router;
