export default [
  {
    path: '/reports',
    name: 'reports',
    component: () => import('@/views/reports/ReportsView.vue'),
    meta: { bottomNav: true, title: '리포트' },
  },
];
