---
title: components-功能组件总览
group:
  path: /
nav:
  title:
  path: /components
---

# 总览

## Install

Using npm:

```bash
$ npm install --save @vis/components   --registry http://xxx.xxx.xxx.xxx:xxxx/
```

or using yarn:

```bash
$ yarn add @vis/components   --registry http://xxx.xxx.xxx.xxx:xxxx/
```

## DragLayoutResize 拖拽改变宽高

```jsx
import React from 'react';
import { DragLayoutResize } from '@vis/components';
const {  DRAG_DIRECTION } = DragLayoutResize
export default () => {
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
