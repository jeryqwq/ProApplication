---
title: decorator-边框装饰
group:
  path: /
nav:
  title:
  path: /components
---

所有装饰均由 SVG 元素绘制，体积轻量不失真，它们的使用极为方便。

<h3>边框内布局</h3>
边框组件默认宽高均为 100%，组件内容将子组件（类似于 Vue 插槽）分发至边框组件下 class 为border-box-content的容器内，如有布局需要，请针对该容器布局，以免产生样式冲突，导致边框显示异常。
<h3>重置宽高</h3>

如果边框组件的父容器宽高发生了变化，而边框组件没有侦知这一变化，边框就无法自适应父容器宽高。针对这种情况，你可以给边框绑定 key 值，在父容器宽高发生变化且完成渲染后更改 key 值，强制边框组件重新渲染，获取正确的宽高。但这会造成边框内的组件销毁和重新创建，在某些时候这可能并不是我们想要的，此时我们可以调用组件内置的 setWH 方法去重置边框组件的宽高以避免组件销毁和重新创建带来的非预期副作用。

## 自定义颜色

所有边框均支持自定义颜色及背景色，配置项及示例如下。

```jsx | pure
<BorderBox1 color={['red', 'green']} backgroundColor="blue">
  BorderBox1
</BorderBox1>
```

`color属性支持配置两个颜色，一主一副。颜色类型可以为颜色关键字、十六进制色、RGB及RGBA。`

## 背景特效

基于[particles](https://particles.js.org/samples/index.html#chars)渲染，更多效果和配置可以查看相关代码

<code src="@vis/decorator/Background/demos/index.tsx" ></code>

<!-- <API id="./Background/index.tsx"/> -->

## 边框

### 特殊边框

配置与其他通用的不同，参考下下方 API 文档支持内嵌文字和其他图表，文字可以增加打字机效果，文字全部展示完成会做一个动画降级， 内嵌其他元素只提供默认五秒的动画加速度，之后降级。

```jsx
import { BorderBox } from '@vis/decorator';
import React from 'react';
export default () => {
  return <BorderBox />;
};
```

#### 特殊 API 配置

<!-- <API id="./BorderBox/index.tsx" hideTitle/> -->

### 通用边框

```jsx
import { BorderBox1 } from '@vis/decorator';
import React from 'react';
export default () => {
  return (
    <div style={{ height: 200 }}>
      <BorderBox1 />
    </div>
  );
};
```

```jsx
import { BorderBox2 } from '@vis/decorator';
import React from 'react';
export default () => {
  return (
    <div style={{ height: 200 }}>
      <BorderBox2 />
    </div>
  );
};
```

与其他的边框组件略有不同的是，该组件具有翻转形态，你只需要设置 reverse 属性为 true 即可

```jsx
import { BorderBox3 } from '@vis/decorator';
import React from 'react';
export default () => {
  return (
    <div style={{ height: 200 }}>
      <BorderBox3 />
    </div>
  );
};
```

同理，改边框组件也支持 reverse 属性

```jsx
import { BorderBox4 } from '@vis/decorator';
import React from 'react';
export default () => {
  return (
    <div style={{ height: 200 }}>
      <BorderBox4 />
    </div>
  );
};
```

```jsx
import { BorderBox5 } from '@vis/decorator';
import React from 'react';
export default () => {
  return (
    <div style={{ height: 200 }}>
      <BorderBox5 />
    </div>
  );
};
```

```jsx
import { BorderBox6 } from '@vis/decorator';
import React from 'react';
export default () => {
  return (
    <div style={{ height: 200 }}>
      <BorderBox6 />
    </div>
  );
};
```

```jsx
import { BorderBox7 } from '@vis/decorator';
import React from 'react';
export default () => {
  return (
    <div style={{ height: 200 }}>
      <BorderBox7 />
    </div>
  );
};
```

```jsx
import { BorderBox8 } from '@vis/decorator';
import React from 'react';
export default () => {
  return (
    <div style={{ height: 200 }}>
      <BorderBox8 />
    </div>
  );
};
```

```jsx
import { BorderBox9 } from '@vis/decorator';
import React from 'react';
export default () => {
  return (
    <div style={{ height: 200 }}>
      <BorderBox9 />
    </div>
  );
};
```

```jsx
import { BorderBox10 } from '@vis/decorator';
import React from 'react';
export default () => {
  return (
    <div style={{ height: 200 }}>
      <BorderBox10 />
    </div>
  );
};
```

#### 特殊 API 配置

<!-- <API id="./BorderBox10/index.tsx" hideTitle> -->

```jsx
import { BorderBox11 } from '@vis/decorator';
import React from 'react';
export default () => {
  return (
    <div style={{ height: 200 }}>
      <BorderBox11 />
    </div>
  );
};
```

## 装饰

### 自定义颜色

所有装饰均支持自定义颜色，配置项及示例如下。

```jsx | pure
<Decoration1 color={['red', 'green']} />
```

`color属性支持配置两个颜色，一主一副。颜色类型可以为颜色关键字、十六进制色、RGB及RGBA。`

```jsx
import { Decoration1 } from '@vis/decorator';
import React from 'react';
export default () => {
  return (
    <div style={{ height: 80, width: 200 }}>
      <Decoration1 />
    </div>
  );
};
```

```jsx
import { Decoration2 } from '@vis/decorator';
import React from 'react';
export default () => {
  return (
    <div style={{ height: 40, width: 200 }}>
      <Decoration2 />
    </div>
  );
};
```

```jsx
import { Decoration3 } from '@vis/decorator';
import React from 'react';
export default () => {
  return (
    <div style={{ height: 40 }}>
      <Decoration3 />
    </div>
  );
};
```

```jsx
import { Decoration4 } from '@vis/decorator';
import React from 'react';
export default () => {
  return (
    <div style={{ height: 40 }}>
      <Decoration4 />
    </div>
  );
};
```

```jsx
import { Decoration5 } from '@vis/decorator';
import React from 'react';
export default () => {
  return (
    <div style={{ height: 40, width: 600 }}>
      <Decoration5 />
    </div>
  );
};
```

```jsx
import { Decoration6 } from '@vis/decorator';
import React from 'react';
export default () => {
  return (
    <div style={{ height: 40, width: 600 }}>
      <Decoration6>标题Title</Decoration6>
    </div>
  );
};
```

```jsx
import { Decoration7 } from '@vis/decorator';
import React from 'react';
export default () => {
  return (
    <div style={{ height: 40, display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <Decoration7 />
      </div>
      <div style={{ flex: 1 }}>
        <Decoration7 reverse />
      </div>
    </div>
  );
};
```

```jsx
import { Decoration8 } from '@vis/decorator';
import React from 'react';
export default () => {
  return (
    <div style={{ height: 150, width: 150 }}>
      <Decoration8>80%</Decoration8>
    </div>
  );
};
```

```jsx
import { Decoration9 } from '@vis/decorator';
import React from 'react';
export default () => {
  return (
    <div style={{ height: 40, width: 600 }}>
      <Decoration9 style={{ height: '5px' }} />
    </div>
  );
};
```

```jsx
import { Decoration10 } from '@vis/decorator';
import React from 'react';
export default () => {
  return (
    <div style={{ height: 40, width: 200 }}>
      <Decoration10>标题Title</Decoration10>
    </div>
  );
};
```

```jsx
import { Decoration11 } from '@vis/decorator';
import React from 'react';
export default () => {
  return (
    <div style={{ height: 300, width: 300 }}>
      <Decoration11 />
    </div>
  );
};
```
