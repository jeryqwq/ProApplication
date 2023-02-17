---
title: WordCloud-词云图
group:
  path: /
nav:
  title:
  path: /components
---

## 渲染模式

### 滚动模式

词云图方向：RENDER_MODE.SCROLL

```jsx
import React from 'react';
import { WordCloud } from '@vis/charts';

const temp = [];
const words = [
  '这根本就不好玩',
  '再见',
  'MDML在线测试',
  '深入浅出CSS3',
  'React测试',
  '这就是个文字内容',
  '高刷屏',
  '默认触发间隔',
  '假如我说假如',
  '发现越来越多的美好',
  '小惊喜',
  '不会只有我',
  '哦次打次',
  '客气客气',
];
for (let index = 0; index < words.length; index++) {
  const item = words[index];
  temp.push({
    value: Math.floor(Math.random() * 1000),
    name: item || `test-${index}`,
  });
}
export default () => {
  const { RENDER_MODE, TEXT_ORIENTATION } = WordCloud;
  const config = {
    mode: RENDER_MODE.SCROLL,
    animate: true,
  };
  return (
    <div style={{ height: 200, display: 'flex' }}>
      <div style={{ flex: 1, height: '100%' }}>
        <WordCloud config={config} data={temp} />
      </div>
    </div>
  );
};
```

### 普通模式

RENDER_MODE.NORMAL

```jsx
import React from 'react';
import { WordCloud } from '@vis/charts';

const temp = [];
const words = [
  '这根本就不好玩',
  '再见',
  'MDML在线测试',
  '深入浅出CSS3',
  'React测试',
  '这就是个文字内容',
  '高刷屏',
  '默认触发间隔',
  '假如我说假如',
  '发现越来越多的美好',
  '小惊喜',
  '不会只有我',
  '哦次打次',
  '客气客气',
];
for (let index = 0; index < words.length; index++) {
  const item = words[index];
  temp.push({
    value: Math.floor(Math.random() * 1000),
    name: item || `test-${index}`,
  });
}
export default () => {
  const { RENDER_MODE, TEXT_ORIENTATION } = WordCloud;
  const config = {
    mode: RENDER_MODE.NORMAL,
    animate: true,
  };
  return (
    <div style={{ height: 200, display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <WordCloud config={config} data={temp} />
      </div>
    </div>
  );
};
```

<API id="./index.tsx" ></API>

### Config

词云图配置 <API id="./api.tsx" hideTitle></API>

## 默认配置

```ts
export const defaultOptions = {
  mode: MODE.NORMAL, // 模式 ， 滚动 ｜ 普通
  orientation: TEXT_ORIENTATION.RANDOM, // 方向
  animate: true, // 是否开启普通模式的动画
  color: [
    '#ff9ecc',
    '#00b6ff',
    '#f3bd00',
    '#884dff',
    '#d3f0ff ',
    '#5cc4ee',
    '#eadf2b',
    '#e1583e',
    '#05e1b5',
    '#3e61e1',
    '#884dff',
    '#c59eff',
    '#06b8d1',
  ],
  colors: [
    {
      from: 0,
      to: 60,
      name: '差',
      color: 'red',
    },
    {
      from: 61,
      to: 79,
      name: '良',
      color: 'blue',
    },
    {
      from: 80,
      to: 100,
      name: '优秀',
      color: 'green',
    },
  ],
  sizeMin: 12,
  sizeMax: 16,
  gridSize: 0, //字符间隔 (不包含padding)
  borderColor: 'rgba(105,207,255)', // 单项的css配置
  borderWidth: 0,
  backgroundColor: 'rgba(16,22,24,0)',
  padding: [0, 0], // 单项的padding属性
  events: {
    // 自定义事件
    // click: (item: MappingDataItem, instance: WordChartBase) => {
    //   console.log(item, '----')
    // }
  },
  tooltip: {
    show: true,
    // render(item: MappingDataItem, el: HTMLElement) {
    //   return `<span style="color: red">${item.name}</span>`
    // },
    tooltipEditor: '',
    padding: [15, 35],
    backgroundColor: 'rgba(50,50,50,0.7)',
    borderRadius: 0,
    textStyle: {
      color: '#fff',
      fontFamily: 'Microsoft YaHei',
      fontSize: 14,
      lineHeight: 30,
    },
    bgStyle: {
      width: 0,
      height: 0,
      url: '',
    },
  },
};
```

为了提高通用性，我们把配置也单独抽出到组件
