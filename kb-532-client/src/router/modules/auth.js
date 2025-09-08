export default [
  {
    path: '/welcome',
    name: 'welcome',
    component: () => import('@/views/auth/WelcomeView.vue'),
    meta: { hideLayout: true },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: { hideLayout: true },
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/auth/SignUpView.vue'),
    meta: { hideLayout: true },
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/views/auth/AccountView.vue'),
    meta: { hideLayout: true },
  },
];
