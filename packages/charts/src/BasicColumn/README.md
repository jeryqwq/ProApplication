## 基础柱状图

```jsx
import React from 'react';
import { BasicColumn } from '@vis/charts';
export default () => {
  const data = [
    {
      name: '类型一',
      value: 23,
    },
    {
      name: '类型二',
      value: 31,
    },
    {
      name: '类型三',
      value: 15,
    },
    {
      name: '类型四',
      value: 62,
    },
  ];
  const config = {
    xField: 'name',
    yField: 'value',
    meta: {
      name: {
        alias: '类别',
      },
      value: {
        alias: '数量',
      },
    },
  };
  return <BasicColumn data={data} config={config} />;
};
```

<API id="_ColumnConfig"></API>

## 默认配置

```ts
defaultConfig = {
  data: renderData,
  xField: 'type',
  yField: 'sales',
  label: {
    // 可手动配置 label 数据标签位置
    position: 'middle',
    // 'top', 'bottom', 'middle',
    // 配置样式
    style: {
      fill: '#FFFFFF',
      opacity: 0.6,
    },
  },
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
    },
  },
  meta: {
    type: {
      alias: '类别',
    },
    sales: {
      alias: '销售额',
    },
  },
};
```
