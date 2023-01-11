---
title: BasicRingPie 基础环形饼图
group:
  path: /
nav:
  title:
  path: /components
---

## 基础环形饼图

```jsx
import React from 'react';
import { BasicRingPie } from '@vis/charts';
export default () => {
  const data = [
    {
      type: '类型1',
      value: 10,
    },
    {
      type: '类型2',
      value: 30,
    },
  ];
  const config = {
    angleField: 'value',
    colorField: 'type',
  };
  return <BasicRingPie data={data} config={config} />;
};
```

<API id="./index.tsx" />

## 默认配置

```ts
defaultConfig = {
  appendPadding: 10,
  angleField: 'value',
  colorField: 'name',
  radius: 1,
  innerRadius: 0.6,
  label: false,
  interactions: [
    {
      type: 'element-selected',
    },
    {
      type: 'element-active',
    },
  ],
  legend: {
    position: 'right',
    offsetX: -108,
    title: {
      text: '',
      spacing: 0,
    },
    itemValue: {
      formatter: (text, item) => {
        const value = renderData.map((item) => item.value);
        const total = value.reduce((a, b) => {
          return a + b;
        }, 0);
        const items = renderData.filter((d) => d.name === item.value);
        return items.length
          ? total
            ? (items.reduce((a, b) => a + b.value, 0) / items.length / total) *
                100 +
              '%'
            : 0
          : '-';
      },
      style: {
        opacity: 0.65,
      },
    },
  },
  statistic: {
    title: {
      offsetY: 30,
      customHtml: (container, view, datum) => {
        const { width, height } = container.getBoundingClientRect();
        const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
        const text = datum ? datum.name : '总计';
        return renderStatistic(d, text, {
          fontSize: 28,
        });
      },
    },
    content: {
      offsetY: -30,
      style: {
        fontSize: '32px',
      },
      customHtml: (container, view, datum, data) => {
        const { width } = container.getBoundingClientRect();
        const text = datum
          ? `${datum.value}`
          : `${data.reduce((r, d) => r + d.value, 0)}`;
        return renderStatistic(width, text, {
          fontSize: 32,
        });
      },
    },
  },
};
```
