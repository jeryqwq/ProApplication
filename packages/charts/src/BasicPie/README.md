---
title: BasicPie 基础饼图
group:
  path: /
nav:
  title:
  path: /components
---

## 基础饼图
```jsx
import React from 'react';
import { BasicPie } from '@vis/charts';
export default () => {
  return (
    <BasicPie />
  );
};
```

<API src="./index.tsx">

## 默认配置
```ts
defaultConfig = {
  color: ["#4f8cbf", "#2ecc71", "#0065ba", "#FF0000", "#FFFF00 ", "#FF00FF "],
    appendPadding: 10,
    data: renderData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
}
```