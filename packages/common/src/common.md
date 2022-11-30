---
title: common-通用函数｜配置
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
$ npm install --save @vis/common   --registry http://10.28.184.132:4837/
```

or using yarn:

```bash
$ yarn add @vis/common   --registry http://10.28.184.132:4837/
```



## useAudio
用于一些多媒体场景下的语音播报或者播放音频功能

```jsx
  import React, { useRef, useLayoutEffect } from 'react';
  import { useAudio } from '@vis/common' 
  export default () => {
    const ref = useRef()
    useAudio(ref, {
        type: 'SPEAK',
        speakText: 'Hello World!',
        auto: false,
        // loop: true,
      })
    return <div  ref={ref} onClick={() => {
    }} >click</div>
  }
```

<API src="./audio/useAudio.tsx" hideTitle/>

