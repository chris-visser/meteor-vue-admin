export default [{
  path: '/todos',
  name: 'todos-index',
  component: () => import('./pages/TodosIndex'),
}, {
  path: '/todos/:todoId',
  name: 'todos-detail',
  component: () => import('./pages/TodosDetail'),
}];
