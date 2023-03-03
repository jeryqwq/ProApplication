import { defineConfig } from '@umijs/max';
import { theme } from 'antd';
import pkg from './../package.json';
import { autoImportPlugin } from './auto-import';
// @ts-ignore
import routes from './routes';
import componentTheme from './theme/component';
import { antdTheme } from './theme/tokens';
const genAlias = require('./../scripts/utils/genAlias');

const { defaultAlgorithm, defaultSeed } = theme;
const mapToken = defaultAlgorithm(defaultSeed);

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  ignoreMomentLocale: true,
  fastRefresh: true,
  antd: {
    import: false,
    theme: {
      token: antdTheme,
      components: componentTheme,
    },
  },
  lessLoader: {
    modifyVars: mapToken,
  },
  hash: true,
  history: {
    type: 'hash',
  },
  define: {
    'process.env.version': pkg.version,
    'process.env.isDev': isDev,
  },
  //Configure the threshold of base64 compilation for image files. The default is 10000 bytes, less than it will be compiled into base64 encoding, otherwise a separate file will be generated
  inlineLimit: 10000,
  access: {},
  model: {},
  initialState: {},
  alias: {
    ...genAlias(),
  },
  request: {},
  routes,
  // Do not recognize files in the components and models directories as routes
  conventionRoutes: {
    exclude: [/\/components\//, /\/models\//],
  },
  plugins: [
    require.resolve('@umijs/plugins/dist/unocss'),
    require.resolve('./plugins/cssVarible'),
  ], // 使用unocss 按需原子级别css
  unocss: {
    watch: [
      'src/**/**.tsx',
      'src/**.tsx',
      'src/**/**/**.tsx',
      'src/**/**/**/**.tsx',
    ],
  },
  mfsu: {
    shared: {
      react: {
        singleton: true,
      },
      'react-router': {
        singleton: true,
      },
      'react-router-dom': {
        singleton: true,
      },
      '@ant-design/pro-components': {
        singleton: true,
      },
      antd: {
        singleton: true,
      },
    },
  },
  routePrefetch: {},
  valtio: {}, // 开启 valtio 数据流方案
  manifest: {},
  clientLoader: {}, // 避免瀑布流请求 https://umijs.org/docs/guides/client-loader
  base: '/',
  npmClient: 'pnpm',
  qiankun: {
    master: {
      apps: [
        {
          name: 'template',
          entry: isDev ? 'http://127.0.0.1:7779' : '/template/',
        },
      ],
    },
  },
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
