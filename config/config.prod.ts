import { defineConfig } from '@umijs/max';

console.log('config.prod is working 😊');

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
  // deadCode: {
  // failOnHint: true, // will force a error message and exit immediately
  // exclude some folder or directory
  // exclude: ['pages/unused/**'],
  // },
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
  publicPath: '/main/',
  mfsu: {
    esbuild: true,
  },
  jsMinifier: 'esbuild',
  jsMinifierOptions: {
    minifyWhitespace: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    drop: ['console'],
  },
  cssMinifierOptions: {
    minifyWhitespace: true,
    minifySyntax: true,
  },
  codeSplitting: {
    // granularChunks as testing in lighthouse it get 1% better performance
    jsStrategy: 'granularChunks',
    jsStrategyOptions: {},
    cssStrategyOptions: {},
  },
});
