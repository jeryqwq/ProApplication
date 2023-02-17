---
title: Marquee-内容滚动
group:
  path: /
nav:
  title:
  path: /components
---

## 关于 marquee

<div style="color: red">
由于原生标签marquee标签已经不被支持，所以基于相同API的情况下重写该标签，在以前的基础上增加了更多配置。
</div>

[已弃用: 不再推荐使用该特性。虽然一些浏览器仍然支持它，但也许已从相关的 web 标准中移除，也许正准备移除或出于兼容性而保留。请尽量不要使用该特性，并更新现有的代码；参见本页面底部的兼容性表格以指导你作出决定。请注意，该特性随时可能无法正常工作。](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/marquee)

## 基本用法

实现子节点内的元素自动滚动

```jsx
import React, { useState } from 'react';
import { Marquee } from '@vis/components';
export default () => {
  const [play, setPlay] = useState(true);
  return (
    <div>
      <button
        button
        onClick={() => {
          setPlay(!play);
        }}
      >
        {play ? '暂停' : '开启'}
      </button>
      <h1>文本滚动 </h1>
      <Marquee play={play}>
        <div>123我是子节点内容，很长很长，文字要不要超出？？？？？？？？</div>
      </Marquee>
      <h1>其他元素</h1>
      <Marquee speed={100} play={play}>
        <div style={{ display: 'flex' }}>
          <div
            style={{ width: 200, height: 200, background: 'red', margin: 10 }}
          ></div>
          <div
            style={{ width: 200, height: 200, background: 'red', margin: 10 }}
          ></div>
          <div
            style={{ width: 200, height: 200, background: 'red', margin: 10 }}
          ></div>
          <div
            style={{ width: 200, height: 200, background: 'red', margin: 10 }}
          ></div>
        </div>
      </Marquee>
    </div>
  );
};
```

## 渐变色

反向 & 渐变 & 滑过暂停

```jsx
import React, { useState } from 'react';
import { Marquee } from '@vis/components';

export default () => {
  return (
    <div>
      <Marquee
        gradient
        gradientColor={[0, 0, 0]}
        direction="right"
        pauseOnHover
      >
        <h1>123我是子节点内容，很长很长，文字要不要超出？？？？？？？？</h1>
      </Marquee>
    </div>
  );
};
```

## 配合 useAudio 实现播报

在 Marquee 子节点内配置 ref 播放时，无法知道子组件的 useLayoutEffect 执行时机，故 useAudio 会失效。 [useAudio 文档](/components/common#useaudio)

```tsx
import React, { useState, useRef } from 'react';
import { Marquee, useAudio } from '@vis/components';
import { SoundOutlined } from '@ant-design/icons';
export default () => {
  const ref = useRef<HtmlElement>();
  useAudio(ref, {
    type: 'AUDIO',
    src: 'http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3',
  });
  return (
    <div ref={ref}>
      <Marquee direction="right" pauseOnHover>
        <h1>
          <SoundOutlined />: 点我播放🏎️音
        </h1>
      </Marquee>
    </div>
  );
};
```

<API id="./index.tsx" />
