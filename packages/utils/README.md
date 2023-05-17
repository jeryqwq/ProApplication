---
title: utils-工具函数库
group:
  path: /
nav:
  title:
  path: /components
---

# @vis/utils

> @vis/utils.

See our website [@ant-design/pro-utils](https://procomponent.ant.design/) for more information.

## Install

Using npm:

```bash
$ npm install --save  @vis/utils --registry http://xxx.xxx.xxx.xxx:xxxx/
```

or using yarn:

```bash
$ yarn add @vis/utils --registry http://xxx.xxx.xxx.xxx:xxxx/
```

## nanoid

用来生成唯一不重复 ID

```jsx
import { nanoid } from '@vis/utils';
import { Button } from 'antd';
import React from 'react';
export default () => {
  return (
    <Button
      onClick={() => {
        console.log(nanoid());
      }}
    >
      点我生成
    </Button>
  );
};
```
