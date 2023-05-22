---
title: ProApp - 快速构建现代化monorepo应用
hero:
  title: Pro-App
  description: 🏆 快速构建现代化monorepo应用 🚀
  actions:
    - text: 🏮🏮 快速开始 →
      link: /guide

features:
  - emoji: 🏰
    title: Umi生态
    description: 基于 React18+ 的应用研发框架<a href="https://umijs.org/" target="_blank" rel="noreferrer">[Umi4.x]</a> ，支持 Vite & Webpack 模式, mfsu极速dev环境编译优化，同时提供了微前端、Hooks、高度集成dumi等一体化解决方案，让前端开发更加简单规范,带给你简单而愉悦的 Web 开发体验。
  - emoji: 🎨
    title: Ant Design生态 + 丰富自研组件
    description: 已适配<a href="https://ant-design.gitee.io/theme-editor-cn" target="_blank" >[antd5.x主题]</a><a href="https://ant-design.gitee.io/docs/react/customize-theme-cn#overridetoken" target="_blank" >[token]</a>配置，轻松在css|js中使用token来定制开发，base<a href="https://ant-design.gitee.io/index-cn" target="_blank" rel="noreferrer">[Ant Design]</a>, <a href="https://procomponents.ant.design/" target="_blank" rel="noreferrer">[ProComponents]</a> ，提供了更高级别的抽象支持，开箱即用。可以显著的提升制作 CRUD 页面的效率，更加专注于页面。基于以上封装了<a href="/#/components">[更上层的组件]</a>，加快研发效率。
  - emoji: 🚥
    title: pnpm & monorepos
    description: 节约磁盘空间并提升安装速度，<a href="https://pnpm.io/zh/" target="_blank" rel="noreferrer">[pnpm]</a> 比其他包管理器快 2 倍，全场景自动化脚本支持，简化开发体验 , 版本管理，change-log日志自动生成， 多包管理,只需在一个仓库中开发，编码会相当方便, 代码复用高，方便进行代码重构, 仓库体积小，模块划分清晰。
  - emoji: 💎
    title: API组件研发工具 & 极速构建
    description: <a href="https://d.umijs.org" target="_blank" rel="noreferrer">[dumi2.x]</a>丰富的Markdown扩展，不止于渲染组件demo，使得组件的文档不仅易于编写、管理，还好看、好用,API自动生成, 适配移动端，兼容主题系统，资产数据化能力。最新版组件构建工具<a href="https://github.com/umijs/father/blob/master/guide/guide/index.md" target="_blank" rel="noreferrer">[father4.x]</a>,更高效、高质量地研发 NPM 包、生成构建产物、再完成发布。
  - emoji: 💪
    title: TypeScript & AntV
    description: 使用 TypeScript 开发，组件和工具包提供完整的类型定义文件，引入类型定义(进行类型检查)和编译器,可以避免JavaScript大多数runtime错误,更可靠,易维护,更清晰, 类型就是最好的注释 & 企业级可视化解决方案<a href="https://antv.vision/zh" target="_blank" rel="noreferrer">[antv]</a>，任何图表，都可以基于图形语法灵活绘制，满足你无限的创意。
  - emoji: 💡
    title: CI集成 + 增量更新
    description: 集成发版工具<a href="https://github.com/changesets/changesets" target="_blank" rel="noreferrer">[changeset]</a>，自动打tag，自动生成项目更新日志，校验<a href="https://www.conventionalcommits.org/zh-hans/v1.0.0/" target="_blank" rel="noreferrer">[commit规范]</a>，让项目管理变得轻松自如，搭配自动化测试工具，代码更新出现问题时能快速定位bug并修复，基于微前端下，支持各大子应用<a href="/#/guide/publish#部署">增量更新部署</a>，做到改哪更新哪，进一步优化编译效率。
---

[主应用](https://jeryqwq.github.io/main/#/home) [子应用 demo](https://jeryqwq.github.io/template/) [在线文档](https://jeryqwq.github.io/build-docs#/)

### 我们推荐

[![](https://img.shields.io/badge/OS-Monterey-A936CC?style=flat-square&logo=Apple)](https://www.apple.com/macos/monterey/)&nbsp; [![](https://img.shields.io/badge/Shell%20-OhMyZsh-C5D928?style=flat-square&logo=image%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw%2FeHBhY2tldCBiZWdpbj0i77u%2FIiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8%2BIDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE3MDg2QTAyQUZCMzExRTVBMkQxRDMzMkJDMUQ4RDk3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE3MDg2QTAzQUZCMzExRTVBMkQxRDMzMkJDMUQ4RDk3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTcwODZBMDBBRkIzMTFFNUEyRDFEMzMyQkMxRDhEOTciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTcwODZBMDFBRkIzMTFFNUEyRDFEMzMyQkMxRDhEOTciLz4gPC9yZGY6RGVzY3JpcHRpb24%2BIDwvcmRmOlJERj4gPC94OnhtcG1ldGE%2BIDw%2FeHBhY2tldCBlbmQ9InIiPz6lm45hAAADkklEQVR42qyVa0yTVxzGn7d9Wy03MS2ii8s%2BeokYNQSVhCzOjXZOFNF4jx%2BMRmPUMEUEqVG36jo2thizLSQSMd4N8ZoQ8RKjJtooaCpK6ZoCtRXKpRempbTv5ey83bhkAUphz8fznvP8znn%2B%2F3NeEEJgNBoRRSmz0ub%2FfuxEacBg%2FDmYtiCjgo5NG2mBXq%2BH5I1ogMRk9Zbd%2BQU2e1ML6VPLOyf5tvBQ8yT1lG10imxsABm7SLs898GTpyYynEzP60hO3trHDKvMigUwdeaceacqzp7nOI4n0SSIIjl36ao4Z356OV07fSQAk6xJ3XGg%2BLCr1d1OYlVHp4eUHPnerU79ZA%2F1kuv1JQMAg%2BE4O2P23EumF3VkvHprsZKMzKwbRUXFEyTvSIEmTVbrysp%2BWr8wfQHGK6WChVa3bKUmdWou%2BjpArdGkzZ41c1zG%2Fu5uGH4swzd561F%2BuhIT4%2BLnSuPsv9%2BJKIpjNr9dXYOyk7%2FBZrcjIT4eCnoKgedJP4BEqhG77E3NKP31FO7cfQA5K0dSYuLgz2TwCWJSOBzG6crzKK%2BohNfni%2Bx6OMUMMNe%2Fgf7ocbw0v0acKg6J8Ql0q%2BT%2FAXR5PNi5dz9c71upuQqCKFAD%2BYhrZLEAmpodaHO3Qy6TI3NhBpbrshGtOWKOSMYwYGQM8nJzoFJNxP2HjyIQho4PewK6hBktoDcUwtIln4PjOWzflQ%2Be5yl0yCCYgYikTclGlxadio%2BBQCSiW1UXoVGrKYwH4RgMrjU1HAB4vR6LzWYfFUCKxfS8Ftk5qxHoCUQAUkRJaSEokkV6Y%2F%2BJUOC4hn6A39NVXVBYeNP8piH6HeA4fPbpdBQV5KOx0QaL1YppX3Jgk0TwH2Vg6S3u%2BdB91%2B%2FpuNYPYFl5uP5V7ZqvsrX7jxqMXR6ff3gCQSTzFI0a1TX3wIs8ul%2Bq4HuWAAiM39vhOuR1O1fQ2gT%2F26Z8Z5vrl2OHi9OXZn995nLV9aFfS6UC9JeJPfuK0NBohWpCHMSAAsFe74WWP%2BvT25wtP9Bpob6uGqqyDnOtaeumjRu%2ByFu36VntK%2FPA5umTJeUtPWZSU9BCgud661odVp3DZtkc7AnYR33RRC708PrVi1larW7XwZIjLnd7R6SgSqWSNjU1B3F72pz5TZbXmX5vV81Yb7Lg7XT%2FUXriu8XLVqw6c6XqWnBKiiYU%2BMt3wWF7u7i91XlSEITwSAZ%2FCzAAHsJVbwXYFFEAAAAASUVORK5CYII%3D)](https://ohmyz.sh/)&nbsp; [![](https://img.shields.io/badge/CodeEditor-Visual%20Studio%20Code-2966B2?style=flat-square&logo=Visual-Studio-Code)](https://code.visualstudio.com/)&nbsp; [![](https://img.shields.io/badge/pkgManage-pnpm-brightgreen?logo=pnpm&style=flat-square)](https://code.visualstudio.com/)&nbsp;

### 相关技术栈

[![](https://img.shields.io/badge/-TypeScript-2496ED?style=flat-square&logo=typescript&logoColor=ffffff)](https://www.typescriptlang.org/) &nbsp; [![](https://img.shields.io/badge/-React-45B8D8?style=flat-square&logo=react&logoColor=ffffff)](https://beta.reactjs.org/)&nbsp; [![](https://img.shields.io/badge/-antd-blue?&logo=ant-design)](https://ant-design.gitee.io/index-cn)&nbsp; [![](https://img.shields.io/badge/-proComponent-orange?logo=ant-design)](https://procomponents.ant.design/)&nbsp; [![](https://img.shields.io/badge/-@antd/charts-critical?logo=graphql)](https://antv.vision/zh)&nbsp; [![](https://img.shields.io/badge/-jest-green?logo=jest)](https://jestjs.io/zh-Hans/)&nbsp; [![ docs by dumi](https://img.shields.io/badge/guide-dumi-blue)](https://d.umijs.org/) [![](https://img.shields.io/badge/-unocss-yellowgreen?&logo=unocss)](https://uno.antfu.me/)

### 环境

[![](https://img.shields.io/badge/-node_v16+-green?logo=node.js)](https://nodejs.org/en/)&nbsp; [![](https://img.shields.io/badge/pnpm_v7+-blue?logo=pnpm&style=flat-square)](https://code.visualstudio.com/)&nbsp; [![](https://img.shields.io/badge/-webpack_v5+-red?logo=webpack)](https://www.webpackjs.com/)&nbsp;

### 运行

我们所有的包管理都强制使用[pnpm](https://pnpm.io/zh/motivation)，在 monorepo 架构之上，pnpm 能极大发挥他的作用(设计初期就很好的考虑了当前复杂项目的痛点)，相比 yarn 和 npm，pnpm 能节约磁盘空间并提升安装速度，且避免了关于深度嵌套包的一些意外情况，如果你还没有接触了解过 pnpm,可以看看[相关文章](https://zhuanlan.zhihu.com/p/377593512), 而且当前已有众多[前端团队](https://pnpm.io/zh/users)和开源项目抛弃 npm,yarn，开始接入 pnpm。[快速开始](/guide/getting-started)

- `npm pure-install` (建议使用)纯净模式，仅安装主应用和 packages 的依赖， 忽略所有子应用依赖
- `pnpm i` 安装所有依赖，包括 packages 和 projects
- `npm run dev` # 运行主项目
- `npm run build` # 打包主项目
- `npm run dev-project` # 运行项目下的子应用(visual, dashboard, dataModel, ....)
- `npm run build-lib` # 懒加载打包(esm 格式)package 下所有库(保留文件的引用关系)，能解耦主应用代码，避免重复打包
- `npm run build-dist` # 打包生产环境下 package 下所有库(压缩，生成单文件),适用于给其他团队项目中使用，仅忽略 antd,proComponents,moment 库
- `npm run build-selectPkg` # 手动选择打包，防止后期包太多的情况全部打包消耗过多资源和时间
- `npm run doc` # 运行项目文档， 包含组件库文档和项目说明等
- `npm run test` # 跑测试用例

## 特性

- umi4.x: [快速构建 React 应用，react(V18.2),router(V6),集成 auto import, 微前端等插件。](https://umijs.org/)

- TypeScript: 包代码提供强类型支持

- state management: Umi Model & Valtio

- unocss: [即使按需原子化 CSS 编译](https://uno.antfu.me/)

- ant5.x: [快速研发企业级中后台产品, 开箱即用的高质量 React 组件](https://ant-design.gitee.io/index-cn)

- theme ｜ layout: 完全兼容新版 antd5 特性，支持自定义配置主题，主题 token 接入 unocss 和 css，less 变量, keep-alive 等。

- dumi4.x: [为组件开发场景而生的静态站点框架](https://d.umijs.org/)

- father: [帮助开发者更高效、高质量地研发 NPM 包、生成构建产物、再完成发布。](https://github.com/umijs/father)

- commontLint: [让你的 commits 更有意义](https://typicode.github.io/husky/#/)

- jest: [优雅、简洁的 JavaScript 测试框架](https://jestjs.io/zh-Hans/)

- proComponents: [页面级组件让中后台开发更简单](https://procomponents.ant.design/)

- CI / CD: 一整套发布操作流自动化流程， 打包构建 =>跑测试用例 => 选择发包（多个）=> 选择升级的主版本包 => 打版本 tag => 生成日志 change-log => 写入到 dumi 文档 => 发布 npm

- monorepos: 包和应用划分清晰，跨应用复用代码，按需安装，支持纯净模式，仅安装主应用和相关包依赖

- dev | build: 优化 dev & build 配置，无需担心打包相关问题和 dev 环境的研发体验。

- vscode integrate: [适配研发插件 monorepo-workspace，快速铺平应用，优化 commit 显示，加速研发效率](https://marketplace.visualstudio.com/items?itemName=folke.vscode-monorepo-workspace)

- vscode cofig：针对该项目特有的编辑器的配置优化，如多文件折叠，autosave...

- pwa: 支持离线访问，独立安装，缓存机制等[wrokbox](https://developer.chrome.com/docs/workbox/modules/workbox-webpack-plugin/)功能，增加首屏的打开速度。

- search: 支持全文内容动态拼音检索，纠错检索等。

- auto-import: 接入[unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)插件，在应用中所有关于 react, antd, proComponents, ahooks, antd/icons 中的 api 可以不用导入直接使用，插件会自动导入需要的 API;

- CRUD: 丰富的业务组件，覆盖常用业务

- final: 一直都在持续更新中,只为更快更好的研发体验...

### 发布

- `npm run release` 提供界面交互可视化发包
- `npm run release:only` 手动修改版本号后发包 [查看更多](/guide/publish)

### 部署

为了很好的区分应用和对应的路由，我们建议所有子应用使用 hash 路由开发，这样能统一路由风格，增加路由的可读性，且能减少很多不必要的 nginx 配置 😊

`http://xxx.xxx.xxx.xx:8088/dash/#/list?type=dashboard`

地址拆分解析：

- `http://xxx.xxx.xxx.xx:8088` - 主机地址
- `/dash` - 路由的 history 用来区分子应用
- `/#/list` - hash 路由参数为子应用自己的路由
- `?type=dashboard` - 传参

  [查看更多](/guide/publish#部署)

### 相关插件

- [changeSets](https://github.com/changesets/changesets) :发包工具
- [dumi](https://d.umijs.org/zh-CN):文档工具
- [father-builder](https://github.com/umijs/father): 库打包工具
- [testing-library](https://testing-library.com/): react 测试库
- [husky](https://typicode.github.io/husky/#/): 代码提交规范工具
- [jest](https://jestjs.io/zh-Hans/):自动化测试框架
- [react chorme debug](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en): react 调试 & 性能分析
- [vscode monorepo workspace](https://marketplace.visualstudio.com/items?itemName=folke.vscode-monorepo-workspace): monorepo 工程 vscode 插件，进一步优化你的开发体验

## 🖥 浏览器兼容性

- 现代浏览器和 Internet Explorer 11 (with [polyfills](https://stackoverflow.com/questions/57020976/polyfills-in-2019-for-ie11))
- [Electron](https://www.electronjs.org/)

| [![edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png)](http://godban.github.io/browsers-support-badges/) | [![electron_48x48](https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png)](http://godban.github.io/browsers-support-badges/) |
| --- | --- | --- | --- | --- |
| Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |
