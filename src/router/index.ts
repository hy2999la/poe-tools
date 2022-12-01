import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      component: HomeView,
      name: 'home',
      path: '/',
    },
    {
      component: () => import('../views/TimelessView.vue'),
      name: 'timeless',
      path: '/timeless',
    },
    {
      component: () => import('../views/ForbiddenJewelView.vue'),
      name: 'forbiddenJewel',
      path: '/forbiddenJewel',
    },
  ],
});

export default router;
