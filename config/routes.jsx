import {
  BarChartOutlined,
  BorderInnerOutlined,
  GithubOutlined,
  IdcardOutlined,
  RocketOutlined,
  SubnodeOutlined,
} from '@ant-design/icons';
import React from 'react';

export default [
  { path: '/', redirect: '/dash' },
  {
    name: '首页',
    path: '/',
    component: '@/layouts/base',
    meta: {
      desc: '首页的描述',
    },
    routes: [
      {
        name: '首页',
        path: '/dash',
        component: './Dash',
        meta: {
          desc: '数据分析',
          keepAlive: false,
        },
        icon: <BarChartOutlined />,
      },
      {
        name: '工作区Demo',
        path: '/home',
        component: './Home',
        meta: {
          desc: '初始化demo，用来展示workSpace的基本用法，后续添加面包屑功能',
        },
        icon: <GithubOutlined />,
      },
      {
        name: '权限演示',
        path: '/access',
        component: './Access',
        meta: {
          desc: '演示权限',
          keepAlive: false,
        },
        icon: <IdcardOutlined />,
      },
      {
        name: 'CRUD 示例',
        path: '/table',
        component: './Table',
        meta: {
          desc: '基础的CRUD模型DEMO',
        },
        icon: <BorderInnerOutlined />,
      },
      {
        name: '测试',
        path: '/test',
        icon: <RocketOutlined />,
        routes: [
          {
            name: '测试主页',
            path: '/test/index',
            component: './Test',
            meta: {
              desc: '测试主页的描述',
            },
          },
          {
            name: '测试1',
            path: '/test/test1',
            component: './Test/Test1',
            meta: {
              desc: '测试1的描述',
            },
          },
        ],
      },
      {
        name: '微前端',
        path: '/subApp',
        icon: <SubnodeOutlined />,
        routes: [
          {
            name: '模版',
            path: '/subApp/template/*',
            // component: './MicroApp/dash'
            microApp: 'template',
            meta: {
              desc: '可视化页面配置',
            },
          },
        ],
      },
    ],
  },
  {
    name: '登录',
    path: '/login',
    component: '@/layouts/login',
    meta: {
      desc: '登录页面',
    },
  },
];
