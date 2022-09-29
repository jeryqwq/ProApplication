import { defineConfig } from 'umi';
import routers from './src/routers/index'
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  routes: routers,
  history: { type: 'hash' },
  fastRefresh: {},
  mfsu:{},
  locale:{},
  theme: {
    '@primary-color': '#0e5ecc',
  },
  proxy: {
    '/lease-center': {
      'target': 'http://121.204.145.151:44000/',
      'changeOrigin': true,
    }
  }
});
