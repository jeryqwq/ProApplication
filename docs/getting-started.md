---
title: 快速开始
order: 2
group:
  path: /
nav:
  title: 文档
  path: /docs
---

## @vis

@vis 是基于 Ant Design & proComponents & @antdesign/charts 而开发的模板组件和图表二次封装等，提供了更高级别的抽象支持，开箱即用。可以显著的提升制作 CRUD 页面的效率，更加专注于页面的多个包集合。

- [Charts](/components/charts) 基于 G2 等图表库解决图表相关的渲染
- [Utils](/components/utils) 工具库，常用的工具函数或者 hooks 等，如 transformData,uuid,timeFormat....
- [Test](/components/test) 这里你可以做任意操作，如测试 CI 自动化脚本，功能相关的东西，总之就是随便玩
- [Components](/components/components) 存放功能性组件，更偏向系统功能，如右键菜单，拖拽改变布局宽高...
- [Common](/components/common) 其他相关通用性的东西
- [decorator](/components/common) 装饰器，包含svg渲染的所有动画和装饰，相比图片或者动图，可随意放大缩小，且轻量级。


## 安装

当前 @vis下 每一个组件都是一个独立的包，你需要在你的项目中安装对应的 npm 包并使用。

```shell
$ npm i @vis/xxx --save  --registry http://10.28.184.132:4837/
```

当前 @vis 提供了如下组件(包)可直接使用：

- `@vis/test `
- `@vis/utils `
- `@vis/charts `
- `@vis/common `
- `@vis/components `

## 在项目中使用


已对 antd 和 proComponent进行忽略（准确的说可以忽略所有第三方库代码）, 当你的项目依赖了以上时，我们并不会对相关库进行打包处理，并会保留当前包的文件依赖，而是在你当前的项目运行时编译依赖(所以构建速度非常快)，即不用挂在 window，也不会出现打包多次的情况,当依赖需要好几个 vis 下的组件时，可以通过这样引入。

```jsx
import React from 'react';
import { nanoid } from '@vis/utils';
import { Test } from '@vis/test';
export default () => {
  return (
    <div>
      {nanoid()}
      <Test />
    </div>
  );
};
```

我们所有的包都使用 less 来进行样式管理，方便进行主题的自定义。如果你没有 less-loader 可以尝试从 `dist` 中导入 css。这样做会把所有的包样式都引进来了，参考你的项目需要是否要这么做，如果只是单个包，建议还是增量引入。
```tsx | pure
import '@vis/components/dist/components.css';
import '@vis/components/dist/components.min.css'; // 压缩css
import '@vis/common/dist/common.css';
import '@vis/charts/dist/charts.css';
```
`建议还是使用 less`，可以方便进行主题自定义，也可以做到按需加载。

## 开发
### 调试Lib

#### 目前：
由于当前是初期，考虑到频繁的修改组件代码， 所以提供了组件在项目中热更新功能，但对应会有更多的消耗。在主应用中直接运行`npm run dev-project`即可, 在packages中修改你要调整的代码保存即可实时查看效果（需要对组件参与dev构建打包）

#### 版本稳定后：
在主应用中直接运行`npm run dev-lib`即可，会提示你输入需要调试的包名，然后选择对应的包修改代码即可
```bash
  npm run dev-lib
  > react-fusion@0.1.0 dev-lib
  > node ./scripts/devPackage.js

  ? 请选择需要热更新的包名 
  。components
  。common
  。charts
  ...
  热更新开启成功!
  visTip: libName: test  >> save: index.tsx, 正在热更新中...
  > @vis/test@2.0.2 dev
  > cross-env BUILD_TYPE=es father-build
```
<Alert type="error">
<span style="color: red">
`注： 这个功能会删除所有的umi的mfsu缓存文件，下次umi启动会比较久，不然会被umi一直缓存住，无法更新， 所以适用于packages下的包版本稳定，修改和调整少了之后`
</span>
</Alert>

### 运行文档

 `/docs `下的所有文档为项目相关文档描述，包含每个子包的更新日志，我们的项目说明，以及展示demo和组件库文档，运行`npm run docs`即可
## 适配 antd 主题

已接入 antd[主题系统](https://ant.design/docs/react/customize-theme-cn)，使用时直接在 less 文件中引入即可使用主题的颜色变量，也可以使用自己定义的一些额外的颜色，`建议还是使用 less`。

```less | pure
@import (reference) '~antd/es/style/themes/index.less';
@vis-test-prefix-cls: ~'@{ant-prefix}-vis-test'; // test包内的类名统一以这个开头，规范, 适配第三方系统自定义css样式

.@{vis-test-prefix-cls} {
  // 在我们test包内使用ant的主题色，或者其他自定义主题色
  font-size: @font-size-base;
  background-color: @component-background;
}
```


