
const routerConfig = [
      {
        path: '/',
        name: 'layout',
        component:"@/layouts/main",
        routes: [
          {
            path: '/',
            component: './index',
            name: 'index'
          },
          {
            path: '/detail',
            component: './detail',
            name: 'detail'
          }
        ]
      },
];

export default routerConfig;
