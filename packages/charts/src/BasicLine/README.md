---
title: BasicLine 基础折线图
group:
  path: /
nav:
  title:
  path: /components
---

## 基础折线图

```jsx
import React from 'react';
import { BasicLine } from '@vis/charts';
export default () => {
  const data = [
    {
      type: '家具家电',
      sales: 38,
    },
    {
      type: '粮油副食',
      sales: 52,
    },
    {
      type: '生鲜水果',
      sales: 61,
    },
    {
      type: '家具家电1',
      sales: 145,
    },
    {
      type: '粮油副食1',
      sales: 61,
    },
    {
      type: '生鲜水果1',
      sales: 145,
    },
  ];
  const config = {
    xField: 'type',
    yField: 'sales',
    seriesField: 'series',
    colorField: 'type',
  };
  return <BasicLine data={data} config={config} />;
};
```

<API id="./index.tsx"/>

## 默认配置

```ts
defaultConfig = {
  autoFit: true,
  padding: 'auto',
  renderer: 'canvas',
  limitInPlot: false,
  data: renderData,
  xField: 'name',
  yField: 'value',
  xAxis: {
    tickCount: 5,
  },
  smooth: true,
  connectNulls: true,
  isStack: false,
};
```
