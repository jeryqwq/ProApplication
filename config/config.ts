import { defineConfig } from '@umijs/max';
import { autoImportPlugin } from './auto-import';
import routes from './routes';
const genAlias = require('./../scripts/utils/genAlias');
const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  ignoreMomentLocale: true,
  fastRefresh: true,
  antd: {},
  hash: true,
  history: {
    type: 'hash',
  },
  //Configure the threshold of base64 compilation for image files. The default is 10000 bytes, less than it will be compiled into base64 encoding, otherwise a separate file will be generated
  inlineLimit: 10000,
  access: {},
  model: {},
  initialState: {},
  alias: {
    ...genAlias(),
  },
  monorepoRedirect: {
    // 优化 子包的热更新，目前没用，走的是alias
    exclude: [/^@vis\/.+/],
  },
  request: {},
  routes,
  // Do not recognize files in the components and models directories as routes
  conventionRoutes: {
    exclude: [/\/components\//, /\/models\//],
  },
  base: '/',
  npmClient: 'pnpm',
  qiankun: {
    master: {
      apps: [
        {
          name: 'dash',
          entry: isDev
            ? 'http://127.0.0.1:7777'
            : 'http://10.28.184.132:8088/dash/',
        },
        {
          name: 'dataModel',
          entry: isDev
            ? 'http://127.0.0.1:7780'
            : 'http://10.28.184.132:8088/dataModel/',
        },
        {
          name: 'visual',
          entry: isDev
            ? 'http://127.0.0.1:7778'
            : 'http://10.28.184.132:8088/visual/',
        },
      ],
    },
  },
  plugins: [],
  moment2dayjs: {},
  chainWebpack(config, {}) {
    // when need to import outside src
    config.module.rule('ts-in-node_modules').include.clear();
    // Introduce global public method
    // config.plugin('$global').use(
    //   new webpack.ProvidePlugin({
    //     React: 'react',
    //     ReactDOM: 'react-dom',
    //   }),
    // )

    config.plugin('unplugin-icons').use(
      require('unplugin-icons/webpack')({
        compiler: 'jsx',
        jsx: 'react',
      }),
    );
    config.plugin('unplugin-auto-import').use(autoImportPlugin());

    return config;
  },
});
