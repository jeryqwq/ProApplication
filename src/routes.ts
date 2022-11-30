
export default [
  { path: '/', redirect: '/home' },
  {
    name: '首页',
    path: '/',
    component: '@/layouts/base',
    routes: [
      {
        name: '首页',
        path: '/home',
        component: './Home',
      },
      {
        name: '权限演示',
        path: '/access',
        component: './Access'
      },
      {
        name: 'CRUD 示例',
        path: '/table',
        component: './Table'
      },
      {
        name: '测试',
        path: '/test',
        routes: [
          {
            name: '测试主页',
            path: '/test/index',
            component: './Test'
          },
          {
            name: '测试1',
            path: '/test/test1',
            component: './Test/Test1'
          },
        ]
      },
      {
        name: '微前端',
        path: '/subApp',
        routes: [
          {
            name: '仪表板',
            path: '/subApp/dash/*',
            // component: './MicroApp/dash'
            microApp: 'dash'
          },
          {
            name: '数据模型',
            path: '/subApp/dataModel/*',
            // component: './MicroApp/index'
            microApp: 'dataModel'
          },
          {
            name: '画布',
            path: '/subApp/visual/*',
            // component: './MicroApp/index'
            microApp: 'visual'
          }
        ]
      },
    ]
  },
]
