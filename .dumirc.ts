// @ts-nocheck
import chalk from 'chalk';
import { defineConfig } from 'dumi';
import { readdirSync } from 'fs';
import { join } from 'path';
const isDev = process.env.NODE_ENV === 'development';

const headPkgList = [];
// utils must build before core
// runtime must build before renderer-react
const pkgList = readdirSync(join(__dirname, '/packages')).filter(
  (pkg) => pkg.charAt(0) !== '.' && !headPkgList.includes(pkg),
);
const alias = pkgList.reduce((pre, pkg) => {
  pre[`@vis/${pkg}`] = join(__dirname, '/packages', pkg, 'src');
  return {
    ...pre,
  };
}, {});

console.log(`🌼 alias list \n${chalk.blue(Object.keys(alias).join('\n'))}`);
// const isProduction = process.env.NODE_ENV === 'production';

const chartMenus = {
  title: '图表',
  children: [
    'charts',
    ...readdirSync(join(__dirname, '/packages/charts/src'))
      .filter((pkg) => pkg.charAt(0) !== '.' && pkg.split('.').length <= 1)
      .map((i) => {
        const _title = i.replace(i.charAt(0), i.charAt(0).toLowerCase());
        const link = `/components/${_title
          .replace(/([A-Z])/g, '-$1')
          .toLowerCase()}`;
        return {
          title: i,
          link,
        };
      }),
  ],
};
const componentMenus = {
  title: '其他组件',
  children: [
    'components',
    ...readdirSync(join(__dirname, '/packages/components/src'))
      .filter((pkg) => pkg.charAt(0) !== '.' && pkg.split('.').length <= 1)
      .map((i) => {
        const _title = i.replace(i.charAt(0), i.charAt(0).toLowerCase());
        const link = `/components/${_title
          .replace(/([A-Z])/g, '-$1')
          .toLowerCase()}`;
        return {
          title: i,
          link,
        };
      }),
  ],
};

export default defineConfig({
  title: 'yourname',
  apiParser: {},
  themeConfig: {
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    hd: { rules: [] },
    rtl: true,
    name: 'yourname',
    footer: `Open-source MIT Licensed | Copyright © 2023-present
    <br />
    Powered by <a href="https://github.com/jeryqwq">Chencc</a>`,
    sidebar: {
      '/components': [
        {
          title: '架构设计',
          children: [{ title: '通用配置', link: '/components' }],
        },
        {
          title: '工具 & 装饰',
          children: [
            { title: '测试', link: '/components/test' },
            { title: '工具函数', link: '/components/utils' },
            { title: '通用函数', link: '/components/common' },
            { title: '装饰器 & 动画', link: '/components/decorator' },
          ],
        },
        componentMenus,
        chartMenus,
      ],
    },
  },
  extraBabelPlugins: [],
  metas: [
    {
      property: 'og:site_name',
      content: 'VisNext',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
    {
      name: 'theme-color',
      content: '#1890ff',
    },
  ],
  alias,
  resolve: {
    atomDirs: [
      {
        type: 'components',
        dir: `/packages/test/src`,
      },
      {
        type: 'components',
        dir: `/packages/components/src`,
      },
      {
        type: 'components',
        dir: `/packages/utils/src`,
      },
      {
        type: 'components',
        dir: `/packages/common/src`,
      },
      {
        type: 'components',
        dir: `/packages/charts/src`,
      },
      {
        type: 'components',
        dir: `/packages/components/src`,
      },
      {
        type: 'components',
        dir: `/packages/decorator/src`,
      },
    ],
    // atomDirs: pkgList.map((i) => ({
    //   type: 'component',
    //   dir: `/packages/${i}/src`,
    // })),
    entryFile: './config/api.tsx',
  },
  history: { type: 'hash' },
  theme: {
    '@s-site-menu-width': '258px',
    '@root-entry-name': 'variable',
  },
  ignoreMomentLocale: true,
  exportStatic: {},
  outputPath: isDev ? undefined : 'build-docs',
  publicPath: isDev ? undefined : '/build-docs/',
});
