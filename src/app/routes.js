import usersRoutes from './features/users/routes';
import todosRoutes from './features/todos/routes';

export default [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('./pages/Dashboard.vue'),
  },
  ...usersRoutes,
  ...todosRoutes,
  {
    path: '*',
    name: 'not-found',
    component: () => import('./pages/NotFound.vue'),
  },
];
