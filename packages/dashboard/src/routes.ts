import { IRouterConfig, lazy } from 'ice';
import { renderNotFound, isInIcestark } from '@ice/stark-app';
import BasicLayout from '@/layouts/BasicLayout';
import Dashboard from '@/pages/dashboard';
import NotFound from '@/components/NotFound';

const routerConfig: IRouterConfig[] = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/',
        exact: true,
        component: lazy(() => import('@/pages/dashboard/index')),
      },
      {
        path: '/detail',
        component: lazy(() => import('@/pages/Detail/index')),
      },
      {
        path: '/list',
        component: lazy(() => import('@/pages/List/index')),
      },
      {
        path: '/unitMonitor',
        component: lazy(() => import('@/pages/UnitMonitor/index')),
      },
      {
        path: '/loginForMonitor',
        component: lazy(() => import('@/pages/LoginForMonitor/index')),
      },
      {
        // 微应用独立运行 404 路由渲染 NotFound 组件
        component: isInIcestark() ? () => renderNotFound() as any : NotFound,
      },
    ],
  },
];

export default routerConfig;
