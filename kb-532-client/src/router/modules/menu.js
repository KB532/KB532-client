export default [
  {
    path: '/menu',
    name: 'menu',
    component: () => import('@/views/menu/MenuView.vue'),
    meta: { bottomNav: true, title: '메뉴' },
  },
];
