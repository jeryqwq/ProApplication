const routerConfig = [
  {
    path: '/',
    name: 'layout',
    component: '@/layouts/main',
    routes: [
      {
        path: '/',
        component: './index',
        name: 'index',
      },
      {
        path: '/test',
        component: './test',
        name: 'test',
      },
    ],
  },
];

export default routerConfig;
