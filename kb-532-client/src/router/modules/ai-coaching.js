export default [
  {
    path: '/ai-coaching',
    name: 'ai-coaching',
    component: () => import('@/views/ai/AiCoachingView.vue'),
    meta: { bottomNav: true, title: 'AI 코칭' },
  },
];
