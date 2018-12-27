import authRoutes from './features/auth/routes';
import usersRoutes from './features/users/routes';
import todosRoutes from './features/todos/routes';

export default [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('./pages/Dashboard.vue'),
  },
  ...authRoutes,
  ...usersRoutes,
  ...todosRoutes,
  {
    path: '*',
    name: 'not-found',
    component: () => import('./pages/NotFound.vue'),
  },
];
