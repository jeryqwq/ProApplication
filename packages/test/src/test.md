---
title: test-测试组件
group:
  path: /
nav:
  title:
  path: /components
---

# @vis/test

> @vis/test.

See our website [@vis/test](https://umijs.org/plugins/test) for more information.

## Install

Using npm:

```bash
$ npm install --save @vis/test   --registry http://xxx.xxx.xxx.xxx:xxxx/
```

or using yarn:

```bash
$ yarn add @vis/test   --registry http://xxx.xxx.xxx.xxx:xxxx/
```

测试组件描述

```jsx
import React from 'react';
import { Test } from '@vis/test';
export default () => {
  return (
    <h1>
      自定义渲染代码块update
      <Test />
    </h1>
  );
};
```
