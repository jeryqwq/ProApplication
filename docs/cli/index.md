---
title: 工程配置
order: 1
group:
  path: /
---

## ant5 主题

新版本主题适配

### 接入自定义主题

进入[主题编辑器](https://ant-design.gitee.io/theme-editor-cn)编辑好对应的 token 复制到`config/tokens.ts`，然后在`antdTheme`对象内替换对应的配置即可，该属性会被写入 [unocss](https://marketplace.visualstudio.com/items?itemName=antfu.unocss)和 css 变量，可通过自定义前缀使用主题 token， 如`text-color-text-quaternary bg-colorBgBase`等。

### 适配 unocss

应用已经集成 [unocss](https://uno.antfu.me/)，所有的 token 已经写入 unocss 变量，建议学习常用语法，能极大的减少 css 大小。
推荐安装[unocss 插件](https://marketplace.visualstudio.com/items?itemName=antfu.unocss)，可为所有的 token 提供 css 的代码提示和预览

```tsx | pure
import React from 'react';

const App: React.FC = () => {
  return (
    /**
     * 语法翻译：
     * 背景使用定义的veryCool变量
     * 文本颜色使用定义的colorTextQuaternary antd5 token
     */
    <h2 className="bg-very-cool text-color-text-quaternary h-full text-center select-none all:transition-400">
      子节点, 使用unocss 预定义的css变量
    </h2>
  );
};

export default App;
```

### 适配 js

```tsx | pure
import React from 'react';
import { Button, theme } from 'antd';

const { useToken } = theme;

const App: React.FC = () => {
  const { token } = useToken();

  return (
    <Button style={{ backgroundColor: token.colorPrimary }}>Button</Button>
  );
};

export default App;
```

### 适配 css & less

```tsx | pure
import React from 'react';
import styles from './index.less';
const App: React.FC = () => {
  return (
    <h2 className={styles.test} style={{ color: `var(--colorPrimary)` }}>
      子节点,预定义的css变量
    </h2>
  );
};

export default App;
```

等价于下面的效果

```less
.test {
  color: var(--colorPrimary);
}
```

### 动态修改 token

所有的 token 我们基于 layout 级别的主题定制，所以可以做到不同页面不同的主题，在`layout/base.tsx`中动态配置`ConfigProvider`组件传参即可。

```tsx | pure
<ConfigProvider
  theme={{
    token: {
      colorPrimary: settings.colorPrimary, // 渲染ProLayout配置的主题色
      ...otherTokens,
    },
  }}
>
  <ProLayout {...props}></ProLayout>
</ConfigProvider>
```

### theme-todo

- 子应用公用主应用 token
- 子应用集成 unocss

## 全局 API

集成 [auto-import](https://github.com/antfu/unplugin-auto-import) 插件，常用库可以无需引入，目前适配了 antd5, ahooks, proComponents, @ant-design/icons, umi, 由于不是所有库都严格按照规范开发，所以部分 API 会存在没有导出或者导出异常的情况，可以在`config/auto-import`目录中修改对应的配置或者手动引入相关应用来修复。

### without

```jsx | pure
import { useState } from 'react';
import { Spin } from 'antd';
export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      {count}
      <Spin />
    </div>
  );
}
```

### with

```jsx | pure
export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      {count}
      <Spin />
    </div>
  );
}
```
