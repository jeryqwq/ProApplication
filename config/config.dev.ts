import { defineConfig } from '@umijs/max';

console.log('config.dev is working 😊');

export default defineConfig({
  devtool: 'source-map',
  mfsu: {},
  clickToComponent: {},
  externals: {
    //  适配auto-import 必须使用cdn, 否则会报错，不是同一个react
    react: 'React',
    'react-dom/client': 'ReactDOM',
    'react-dom': 'window.ReactDOM',
  },
  headScripts: [
    '/cdn/react.production.min.js',
    '/cdn/react-dom.production.min.js',
  ],
  proxy: {
    '/vis': {
      target: 'http://10.28.184.132:8089/',
    },
  },
});
