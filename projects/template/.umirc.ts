// @ts-nocheck
import { defineConfig } from '@umijs/max';
import routes from './src/routes';
const genAlias = require('../../scripts/utils/genAlias');
import { antdTheme } from './../../config/theme/tokens';
import componentTheme from './../../config/theme/component';
const isDev = process.env.NODE_ENV === 'development';
export default defineConfig({
  antd: {
    import: false,
    theme: {
      token: antdTheme,
      components: componentTheme,
    },
  },
  hash: true,
  history: {
    type: 'hash',
  },
  access: {},
  model: {},
  initialState: {},
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
  request: {},
  routes,
  npmClient: 'pnpm',
  publicPath: isDev ? '/' : '/template/',
  plugins: [
    require.resolve('@umijs/plugins/dist/unocss'),
    require.resolve('../../config/plugins/cssVarible'),
  ],
  unocss: {
    watch: [
      'src/**/**.tsx',
      'src/**.tsx',
      'src/**/**/**.tsx',
      'src/**/**/**/**.tsx',
    ],
  },
  qiankun: {
    slave: {},
  },
  proxy: {},
  alias: genAlias(),
});
