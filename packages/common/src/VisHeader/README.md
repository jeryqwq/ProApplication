---
title: VisHeader-统一头部
group:
  path: /
nav:
  title:
  path: /components
---

## VisHeader 组件描述

VisHeader 大部分 API 与 WorkSpace 保持一致，很多地方他们都有一定的相似性，但又有一些差异。

## 单个 tab

```jsx
import React from 'react';
import { VisHeader } from '@vis/common';
export default () => {
  return (
    <VisHeader
      tabs={[
        {
          title: 'SQL视图',
          key: '1',
          content: <h1>SQL View</h1>,
        },
      ]}
    />
  );
};
```

## 多个 tab

```jsx
import React from 'react';
import { VisHeader } from '@vis/common';
export default () => {
  return (
    <VisHeader
      tabs={[
        {
          title: '表视图',
          key: '1',
          content: <h1>Table View</h1>,
        },
        {
          title: 'SQL视图',
          key: '2',
          content: <h1>SQL View</h1>,
        },
      ]}
    />
  );
};
```

## 右侧自定义渲染

```jsx
import React from 'react';
import { VisHeader } from '@vis/common';
export default () => {
  return (
    <VisHeader
      tabBarExtraContent={<div>+表单，或者图标</div>}
      tabs={[
        {
          title: '表视图',
          key: '1',
          content: <h1>Table View</h1>,
        },
        {
          title: 'SQL视图',
          key: '2',
          content: <h1>SQL View</h1>,
        },
      ]}
    />
  );
};
```

## 自定义布局

```jsx
import React from 'react';
import { VisHeader } from '@vis/common';
export default () => {
  return (
    <VisHeader
      tabs={[
        {
          title: '表视图',
          key: '1',
          content: <h1>Table View</h1>,
        },
        {
          title: 'SQL视图',
          key: '2',
          content: <h1>SQL View</h1>,
        },
      ]}
    >
      {(item) => {
        return <div style={{ border: '2px solid red' }}>{item.content}</div>;
      }}
    </VisHeader>
  );
};
```

<API id="./index.tsx"></API>
