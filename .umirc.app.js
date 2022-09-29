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
 
  }
});
