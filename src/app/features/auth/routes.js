import config from './config';

const redirectRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('./pages/Login.vue'),
    meta: { isPublic: true },
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('./pages/Registration.vue'),
    meta: { isPublic: true },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('./pages/ForgotPassword.vue'),
    meta: { isPublic: true },
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () => import('./pages/ResetPassword.vue'),
    meta: { isPublic: true },
  },
  {
    path: '/verify-email',
    name: 'verify-email',
    component: () => import('./pages/VerifyEmail.vue'),
    meta: { isPublic: true },
  },
];

export default config.gatewayType === 'redirect' ? redirectRoutes : [];
