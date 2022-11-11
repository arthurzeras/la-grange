export default [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/view-home.vue'),
  },
  {
    name: 'deployments.list',
    path: '/:cluster/deployment',
    component: () => import('../views/deployment/view-deployment.vue'),
  },
];
