---
title: DragLayoutResize-拖拽布局
group:
  path: /
nav:
  title:
  path: /components
---

## DragLayoutResize 组件描述

拖拽布局(布局切割)，最初版本，后期添加拖拽样式自定义渲染等功能，基于 flex 布局实现，故在使用时记得外层包一个 flex 代码的包裹层

### 横向

```jsx
import React from 'react';
import { DragLayoutResize } from '@vis/components';
export default () => {
  const { DRAG_DIRECTION } = DragLayoutResize;
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, background: 'yellow' }}></div>
      <DragLayoutResize
        direction={DRAG_DIRECTION.LEFT_RIGHT}
        style={{ color: 'red', width: 300, background: 'green' }}
      >
        <h1>点我旁边拖拽</h1>
      </DragLayoutResize>
    </div>
  );
};
```

### 竖向

```jsx
import React from 'react';
import { DragLayoutResize } from '@vis/components';
const { DRAG_DIRECTION } = DragLayoutResize;

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 500 }}>
      <DragLayoutResize
        direction={DRAG_DIRECTION.TOP_BUTTOM}
        style={{ color: 'red', height: 300, background: 'green' }}
      >
        <h1>点我下方拖拽</h1>
      </DragLayoutResize>
      <div style={{ flex: 1, background: 'yellow' }}></div>
    </div>
  );
};
```

### 布局切割

```jsx
import React from 'react';
import { DragLayoutResize } from '@vis/components';
export default () => {
  const { DRAG_DIRECTION } = DragLayoutResize;
  return (
    <div style={{ display: 'flex', height: 400 }}>
      <div style={{ flex: 1, background: 'yellow' }}></div>
      <DragLayoutResize
        direction={DRAG_DIRECTION.LEFT_RIGHT}
        style={{
          color: 'red',
          width: 600,
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <DragLayoutResize
            direction={DRAG_DIRECTION.TOP_BUTTOM}
            style={{ color: 'red', height: 300, background: 'green' }}
          >
            <h1>点我下方拖拽</h1>
          </DragLayoutResize>
          <div style={{ flex: 1, background: 'red' }}></div>
        </div>
      </DragLayoutResize>
    </div>
  );
};
```

<API id="./index.tsx"></API>
