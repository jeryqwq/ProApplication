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


## interceptors
基于ice应用下的app.ts入口文件内request拦截器配置, 接入个大子应用时使用，否则无法全局提示和错误处理等
<br/>
使用方法: 在ice项目app.ts内
```jsx | pure
import { interceptors } from "@vis/common";
import { runApp, IAppConfig } from 'ice';

const appConfig: IAppConfig = {
  app: {
    getInitialData: async (ctx) => {
      getConfigMap();
      return {
      };
    },
  },
  request: {
    withFullResponse: false,
    // 拦截器
    interceptors,
  },
  router: {
    type: 'hash',
  },
};
runApp(appConfig);
```
