
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
          }
        ]
      },
];

export default routerConfig;
