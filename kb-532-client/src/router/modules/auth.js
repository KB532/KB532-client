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
    component: () => import('@/views/auth/login/LoginView.vue'),
    meta: { hideLayout: true },
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/auth/signup/SignUpView.vue'),
    meta: { hideLayout: true },
  },

  {
    path: '/signup-success',
    name: 'signup-success',
    component: () => import('@/views/auth/signup/SignUpSuccessView.vue'),
    meta: { hideLayout: true },
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/views/auth/account/AccountView.vue'),
    meta: { hideLayout: true },
  },
  {
    path: '/account-loading',
    name: 'account-loading',
    component: () => import('@/views/auth/account/AccountLoadingView.vue'),
    meta: { hideLayout: true },
  },
  {
    path: '/account-success',
    name: 'account-success',
    component: () => import('@/views/auth/account/AccountSuccessView.vue'),
    meta: { hideLayout: true },
  },
];
