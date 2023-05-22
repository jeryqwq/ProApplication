import { defineConfig } from '@umijs/max';

console.log('config.dev is working 😊');

export default defineConfig({
  devtool: 'source-map',
  clickToComponent: {},
  monorepoRedirect: {
    // 优化 子包的热更新，目前没用，走的是alias
    exclude: [/^@vis\/.+/],
  },
  // externals: {
  //   react: 'React',
  //   'react-dom/client': 'ReactDOM',
  // },
  // headScripts: ['/cdn/react.dev.js', '/cdn/react-dom.dev.js'],
  proxy: {
    '/vis': {
      // target: 'http://xxx.xxx.xx.xxx:8089/',
    },
  },
});
