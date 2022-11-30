import { defineConfig } from '@umijs/max';

const genAlias = require('./scripts/utils/genAlias')
import routes from './src/routes'
const isDev = process.env.NODE_ENV === 'development'

// 注： dev模式下的externals配置后增加相关development.js在开启mfsu的前提下优化效果可能不是很大，所以没做

// const moduleFederationName = '__vis';
// const shared = { // 使用mf共享模块
//   react: {
//     singleton: true,
//     eager: true,
//   },
//   'react-dom': {
//     singleton: true,
//     eager: true,
//   },
//   'antd':  {
//     singleton: true,
//     eager: true,
//   }
// }
export default defineConfig({
  externals:  isDev ? {} : { react: 'React', 'react-dom/client': 'ReactDOM', 'lodash': '_', 'moment': 'moment' },
  headScripts: isDev ? [] : ['/main/cdn/react.production.min.js', '/main/cdn/react-dom.production.min.js', '/main/cdn/lodash.min.js', '/main/cdn/moment.min.js'],
  ignoreMomentLocale: true,
  fastRefresh: true,
  // mf: {
  //   name: moduleFederationName,
  //   library: { type: "window", name: "__vis" },
  //   shared
  // },
  // mfsu: {
  //   // strategy: 'eager',
  //     mfName:`mf_${moduleFederationName}`,
  //     remoteName: moduleFederationName,
  //     shared
  // },
  antd: {
  },
  
  hash: true,
  history: {
    type: 'hash'
  },
  clickToComponent: {},
  access: {},
  model: {},
  initialState: {},
  alias: {
    ...genAlias()
  },
  // monorepoRedirect: {
  //   srcDir: ['src'],
  // },
  request: {},
  routes,
  npmClient: 'pnpm',
  qiankun: {
    master: {
      apps: [
        {
          name: 'dash',
          entry: isDev ? 'http://127.0.0.1:7777' : 'http://10.28.184.132:8088/dash/',
        },
        {
          name: 'dataModel',
          entry: isDev ? 'http://127.0.0.1:7780' : 'http://10.28.184.132:8088/dataModel/',
        },
        {
          name: 'visual',
          entry: isDev ? 'http://127.0.0.1:7778' : 'http://10.28.184.132:8088/visual/',
        }
      ],
    },
  },
  publicPath: isDev ? '/' : '/main/',
  proxy: {
    "/vis": {
      "target": "http://10.28.184.132:8089/"
    }
  }
});

