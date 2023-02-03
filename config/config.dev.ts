import { defineConfig } from '@umijs/max';

console.log('config.dev is working 😊');

export default defineConfig({
  devtool: 'source-map',
  clickToComponent: {},
  monorepoRedirect: {
    // 优化 子包的热更新，目前没用，走的是alias
    exclude: [/^@vis\/.+/],
  },
  mfsu: {
    shared: {
      react: {
        singleton: true,
      },
    },
  },
  // externals: {
  //   //  适配auto-import 必须使用cdn, 否则会报错，不是同一个react
  //   react: 'React',
  //   'react-dom/client': 'ReactDOM',
  // },
  // headScripts: ['/cdn/react.dev.js', '/cdn/react-dom.dev.js'],

  proxy: {
    '/vis': {
      target: 'http://10.28.184.132:8089/',
    },
  },
});
