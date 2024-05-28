import { createRouter, createWebHistory } from "vue-router";
import { ref } from 'vue'
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
      meta: {
        keepAlive: ref(false)
      },
      component: () => import('@/pages/dashboard/detail/detail.vue'),
    },
    {
      path: '/dashboard/:id',
      name: 'dashboardRank',
      meta: {},
      component: () => import('@/pages/dashboard/rank/rank.vue'),
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
});

export default router;
