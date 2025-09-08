export default [
  {
    path: '/menu',
    name: 'menu',
    component: () => import('@/views/menu/MenuView.vue'),
    meta: { bottomNav: true, title: '메뉴' },
  },
  {
    path: '/goals/edit',
    name: 'goal-edit',
    component: () => import('@/views/menu/GoalEditView.vue'),
    meta: {  hideLayout: true },
  },
];
