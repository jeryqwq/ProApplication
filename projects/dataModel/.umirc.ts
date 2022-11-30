// @ts-nocheck
import { defineConfig } from '@umijs/max';
import routes from './src/routes'
const genAlias = require('../../scripts/utils/genAlias')
import config from './../../.umirc.ts'
const { externals, headScripts } = config

const isDev = process.env.NODE_ENV === 'development'
export default defineConfig({
  headScripts,
  externals,
  antd: { },
  hash: true,
  history: {
    type: 'hash'
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  routes,
  npmClient: 'pnpm',
  publicPath: isDev ? '/' : '/dataModel/',
  qiankun: {
    slave: {},
  },
  proxy: {
    "/maintain": {
      "target": "http://10.28.184.224:8113/"
    },
    "/vis": {
      "target": "http://10.28.184.132:8089/"
    }
  },
  alias: genAlias()
});

