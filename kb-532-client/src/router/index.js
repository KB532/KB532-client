import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import aiCoaching from './modules/ai-coaching';
import menu from './modules/menu';
import reports from './modules/reports';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    ...reports,
    ...aiCoaching.map((r) => ({
      ...r,
      meta: { ...(r.meta || {}), pageBg: 'bg-white' },
    })),
    ...menu.map((r) => ({
      ...r,
      meta: { ...(r.meta || {}), pageBg: 'bg-white' },
    })),
  ],
});

export default router;
