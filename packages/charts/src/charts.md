---
title: charts-图表总览
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
$ npm install --save @vis/charts   --registry http://xxx.xxx.xxx.xxx:xxxx/
```

or using yarn:

```bash
$ yarn add @vis/charts   --registry http://xxx.xxx.xxx.xxx:xxxx/
```

## 词云图

大致与官方开源的一致，增加了滚动模式，超出可视化区域不会忽略词条 [详情](/components/word-cloud)

```jsx
import React from 'react';
// import { WordCloud } from '@vis/components'
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
      <div style={{ flex: 1 }}>
        <WordCloud config={{ ...config, mode: RENDER_MODE.NORMAL }} data={temp} />
      </div>
      <div style={{ flex: 1 }}>
        <WordCloud config={config} data={temp} />
      </div>
    </div>
  );
};
```

## 条形进度条
