export default [
  {
    path: '/reports',
    name: 'reports',
    component: () => import('@/views/reports/ReportsView.vue'),
    meta: { bottomNav: true, title: '리포트' },
  },
  {
    path: '/expense',
    name: 'expense',
    component: () => import('@/views/reports/expense/ExpenseListView.vue'),
    meta: { bottomNav: true, title: '내 지출 내역'},
  },
];
