---
title: 简介
order: 1
---

## 我们的理念

随着项目的增多, 工程日益复杂,代码复用和版本管理显得格外的繁琐，版本升级没有日志，相互依赖的包需要手动管理版本，以往的组件库独立开发的方式并没有很好的区分组件和组件之间的关系，即我往往只需要一种类型的组件，例如图表，但还是不得不安装一整个组件库，并没有很好的对组件进行区分，如哪些是图表组件，哪些是功能组件，哪些是业务组件等，每次一个小改动就不得不直接发布一整个包，且无法支持本地调试，针对上述问题我们引入了 Monorepo 的概念，并且做了严格的 CR 机制，自动化构建、测试流水线、代码问题校验，工程化的最终目的是让业务开发可以 100% 聚焦在业务逻辑上，这往往需要脚手架、框架从自动化、设计上解决的问题。[精读《Monorepo 的优势》](https://zhuanlan.zhihu.com/p/65533186), [现代化前端应用为什么越来越离不开 Monorepo](https://juejin.cn/post/6944877410827370504)

## 包划分思路(packages)

- [Charts](/components/charts) 基于 G2 等图表库解决图表相关的渲染
- [Utils](/components/utils) 工具库，常用的工具函数或者 hooks 等，如 transformData,uuid,timeFormat....
- [Test](/components/test) 这里你可以做任意操作，如测试 CI 自动化脚本，功能相关的东西，总之就是随便玩
- [Components](/components/components) 存放功能性组件，更偏向系统功能，如右键菜单，拖拽改变布局宽高...
- [Common](/components/common) 其他相关通用性的东西
- [Decorator](/components/decorator) 装饰器，包含 svg 渲染的所有动画和装饰，相比图片或者动图，可随意放大缩小，且轻量级。
- `@vis/?` 等你添加

## 子应用(projects)

防止后期主应用过大增加 dev 和编译负担，我们把以往的主应用下不相关的部分拆分成了独立的项目，然后使用微前端和模块联邦来对接子应用（代码共享和状态管理），这样整个应用能 hold 住未来不断扩张的业务线和人员开发，也不会出现在不同应用中组件库代码被重复打包。我们特意将组件库代码从主应用中抽离出来，每个独立的子应用共享主应用内导出的 exposes 文件夹下的模块。

- [/projects/template]子应用模版

[相关子应用接入查看这里](/guide/subapp)

## monorepo

基于 monorepo 的仓库管理方式，我们能够更好的处理包和包之间的依赖关系，避免了以往单一仓库的一些痛点：

- 组件耦合严重，组件代码量大
- 业务开发分工不明确，业务开发人员要关心非业务的代码
- 编译慢，效率低
- 相关包基础依赖可能会重复打包，如： lodash,moment...
- 管理、调试、追踪 bug 困难
- 不同项目之间 node、node-sass、webpack 等基础依赖版本不统一，切换增加心智负担。
- 不同项目可能存在技术栈不统一，如：状态管理，less,sass
- 分支管理混乱
- 多包多项目之间依赖关系复杂
- 第三方依赖库版本可能不一致
- 占用总空间大
- 不利于团队协作
- 无法针对主应用统一跑测试用例,发布时很难避免一些基本的错误发生
- 需要频繁切换项目
- 搭建独立的文档系统和其他子应用时，相关依赖又要单独管理，又有上述的症状
- 无法跨部门共享基建产物[资产元数据](/components/schema#资产元数据)

## 本地调试

> 多个包之间本地调试不需要走发布，直接代码跑完修改保存查看效果跨项目调试推荐使用，不用走发布流程，直接本地开启 package 热更新功能，修改后立即生效,[更多](/guide/getting-started#调试lib)。

### 设计与样式

已接入 antd 主题样式，可以在自己的组件中使用 antd 变量和自定义添加 antd 样式

### 脚手架概览

当我们 clone 完项目之后会看到如下的目录结构。

```bash
- .changeset         * 版本更新日志相关配置和记录文件
- .dumi              * dumi工作区目录，主题和相关配置等
- .husky             * 规范commit配置
- docs               * 存放公用的文档
- config             * 主应用umi工程化配置
- projects           * 子应用目录,于主应用共享packages
- mock               * api Mock
- packages           * 我们维护的包
- README.md          * 展示在 github 主页的代码
- tests              * 编写测试用例的地方
- src                * 主应用代码
- exposes            * 模块联邦主应用导出的模块
- public             * 部署所用的静态文件
- scripts            * 开发或者部署所用的脚本
- .prettierrc.js     * prettier 的相关配置
- .eslintrc.js       * eslint 的配置
- .dumirc.js         * dumi 的核心配置
- webpack.config.js  * 打包组件库的配置文件
- jest.config.js     * jest配置
- pnpm-workspace.yaml* monorepo工作空间的配置
- package.json       * 项目的配置
- tsconfig.json      * typescript 的配置
- pnpm-lock.yaml     * 依赖 lock 文件
- unocss.config.ts   * unocss配置
```

`coverage` ， `.umi` 这几个文件夹比较特殊，`coverage` 是测试覆盖率文件，在跑完测试覆盖率后才会出现，`.umi` 是运行主应用时的一些临时文件，在执行 `npm run dev` 时生成

### 源码概览

在 packages 文件夹中包含了我们所有的组件，每个组件一般都有一个 `src`，`package.json` 和 `README.md`。`package.json` , `README.md`,`tsconfig.js` 和`.fatherrc.ts` 可以在新建文件夹后通过执行 `npm run bootstrap` 来自动生成。

`src` 中就是我们主应用的源码，我们约定 `src` 下会有 demos 文件夹里面会存储所有的 demo, 方便提供编辑器的代码提示等功能被文档引用，并且 `${包名}.md` 的文件用于介绍这个组件，同时引入 demo 和 API 文档。 `projects`中就是我们整个子应用的源码，里面包含了一些独立的模块和应用。

> 我们使用了 dumi 的语法，要求全部使用外置组件，用 code 引入，调试起来会更加方便。

### 风格指南

### 开发工作流

我们使用了 [monorepo](https://danluu.com/monorepo/) 的方式来管理我们的仓库，仓库中包含多个独立的包，以便于更改可以一起联调，这样可以一起跑测试用例，如果变更出现问题，我们可以很快的定位到问题。

因为使用了 monorepo ,我们要求必须要使用 pnpm 来安装依赖。 可以帮助我们在多个包中共享依赖。

安装完成后请先执行`npm run build-lib`打包一边依赖包，然后你可以使用以下常用命令：

- `npm run dev` # 运行主项目
- `npm run dev-project` # 运行子应用
- `npm run dev-lib` # 本地调试 vis 库
- `npm run build-lib` # 懒加载打包(esm, cjs 格式)package 下所有库(保留文件的引用关系,可以查看对应包下面的 lib 和 es 文件夹)，能解耦主应用代码，避免重复打包
- `npm run build-dist` # 打包生产环境下 package 下所有库(压缩，生成单文件)
- `npm run doc` # 运行项目文档， 包含组件库文档和项目说明等
- `npm run test` # 跑测试用例

我们建议运行 `npm run test` 以确保你的代码变更有没有影响原有功能，同时保证你写的每行代码都被正确的测试到，不管怎样这样都会提升组件库的整体质量。

## 新增包

### 自动生成包配置

在 package 下新增你自己的包名，控制台执行`npm run bootstrap` 来自动生成对应的需要的文件，此时会多出 package.json 和 readme.md，上述做完我们再按照规定创建`src/index.tsx`文件即可，可以随便导出点东西测试

[增加包总览文档](#文档规范)可以参考下面的文档规范

## 新增组件

在对应的包内 src 目录下新增文件夹或者 ts 文件即可，记得在当前包下的 src/index.tsx 中导出你需要在外部被使用到的组件或者函数变量等。[更多相关规范点击这里跳转](/components/schema)

## 新增子应用

内容有点多，[跳转](/guide/subapp)

### 文档规范

- 每个包下的同名且小写的 md 文件为该包的总览，描述改包如何单独安装和该包下的所有东西的 demo 或者总体的展示出来， 如[charts 总览](/components/charts)。
- 我们规定每一个组件下的 README.md 文件为该组件的文档,这样不用写文档和组件一直跳来跳去，也很麻烦，可以参考 WordCloud 组件的文档写法[WordCloud 组件文档](/components/word-cloud)
- api 自动生成[点击这里跳转](/components)

### 组件文件结构

在`.dumirc.ts`中， 我们会自动扫描当前组件下的文档路径，并自动配置路由菜单，所以只要加个相同的文档路由即可，在文档的组件中就可以渲染出来了

### 组件代码结构

```
|-- vis
    |-- packages
        |--  charts
          |-- charts.md // 组件总览，每个组件放一个demo即可
          |--  src
            |--  WordCloud
                |--  README.md // 组件说明文档
```

- 上述的对应文件新增后我们就可以去重新跑下文档，在`.dumirc.ts` 中 ctrl + s 或者重新启动文档命令`npm run doc`，就可以看到我们的组件文档被渲染出来了

### 一些约定

@vis 基于 antd 和 proComponent 之上来开发，为了与 antd 的生态保持兼容性，我们要求覆盖 antd 的样式必须要使用 `.@{vis-prefix}` 变量来生成类名,并不需要在组件中使用类似 module 模块化样式编译，会导致每次发包后的 css 类名都会被修改，无法在组件外修改 css 样式，否则下一次组件更新就失效了，所以在写你的组件的时候请尽可能使用`vis-${packageName}`开头的 css 类名开头切包在改类名内，防止类名冲突，建议在写组件之前看下 Test 写法，防止发布后发生无法预知的 bug

#### 组件书写规范

```tsx | pure
import { ConfigProvider } from 'antd';
import { useContext } from 'react';
import './index.less';
export default () => {
  const prefixCls = 'vis-world-cloud'; // vis-{packageName}
  return <div className={prefixCls}>Test Component</div>;
};
```

#### Less:

```less
// ./index.less
@vis-worldCloud-prefix-cls: ~'vis-world-cloud';

.@{vis-worldCloud-prefix-cls} {
  border: solid 1px greenyellow;
}
```
