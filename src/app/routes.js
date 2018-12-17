export default [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('./pages/Dashboard.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./pages/Login.vue'),
    meta: { layout: 'gateway' },
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('./pages/Registration.vue'),
    meta: { layout: 'gateway' },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('./pages/PasswordForgot.vue'),
    meta: { layout: 'gateway' },
  },
  {
    path: '/reset-password/:token',
    name: 'reset-password',
    component: () => import('./pages/PasswordReset.vue'),
    meta: { layout: 'gateway' },
  },
  {
    path: '/verify-email/:token',
    name: 'verify-email',
    component: () => import('./pages/VerifyEmail.vue'),
    meta: { layout: 'gateway' },
  },
  {
    path: '*',
    name: 'not-found',
    component: () => import('./pages/NotFound.vue')
  },
];
