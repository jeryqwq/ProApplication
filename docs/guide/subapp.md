---
title: 子应用
order: 3
group:
  path: /
---

<!-- 在整体设计中，为了防止应用之间的重复打包，我们借助于webpack5的模块联邦，在生产环境中能进一步缩小子应用的打包体积，增加打包的构建速度，避免package下发布的组件库代码被重复打包到每个子应用中，但这个确实是不需要且可以规避的问题。

`注：此优化仅对生产环境生效，dev环境相比减少资源加载，组件的实时热更新就显得更加重要了！` -->

## 自有子应用

可以先看下[umi 的微前端](https://umijs.org/docs/max/micro-frontend)相关配置后再尝试,也可以直接复制 project/template 项目的模板代码，改为你需要的子应用名字，在项目内全局把 yourname 替换成你应用的名称即可。相关文档就不多做废话了。

### 主应用

@umi/max 已很好的集成了 qiankun，仅需要在.umirc 文件中配置对应的 qiankun 对象即可

```js
qiankun: {
    master: {
      apps: [
        {
          name: 'dash',
          entry: isDev ? 'http://127.0.0.1:7777' : 'http://xxx.xxx.xxx.xxx:8088/template/',
        }
      ],
    },
  },
```

然后在对应的 router 配置中添加渲染子应用需要的路由

```js
 {
        name: '微前端',
        path: '/subApp',
        routes: [
          {
            name: '仪表板',
            path: '/subApp/dash/*',
            microApp: 'dash'
          },
          {
            name: '数据模型',
            path: '/subApp/dataModel/*',
            microApp: 'dataModel'
          },
          {
            name: '画布',
            path: '/subApp/visual/*',
            microApp: 'visual'
          }
        ]
      },
```

`⚠️ 这里由于path带有通配符，所以在菜单渲染中，如果使用ProLayout或者max的layout插件无法兼容这种情况，如： /subApp/dash/detail 这种路由会被匹配到subApp/dash/*, 但是插件并没有做匹配，会导致子应用中的路由无法在主应用中激活，所以暂且先关闭对应的插件重写路由相关渲染逻辑， 具体代码在主应用 layout/base.tsx中`

## 子应用

子应用添加对应的配置即可： ` qiankun: { slave: {}, },`

[状态共享](https://umijs.org/docs/max/micro-frontend#%E7%88%B6%E5%AD%90%E5%BA%94%E7%94%A8%E9%80%9A%E4%BF%A1)

## 模块联邦

模块联邦是 umi 脚手架 mfsu 优化性能的核心基础，基于此，umi 可以缓存所有的依赖包，实现代码不变的情况下仅打包一次，也可以实现跨应用共享代码。

### umi 项目接入

主应用内模块联邦到处的包名为`vis`,在子应用中需要增加如下配置: .umirc.ts

```js
const shared = {
  // 需要用到的包
  moment: {
    singleton: true,
    eager: true,
  },
  lodash: {
    singleton: true,
    eager: true,
  },
};
const remoteMFName = '@vis';
// import all from '@vis/moment'

export default defineConfig({
  mfsu: {
    mfName: 'mfsu_global_uniq_name_youname',
    remoteAliases: [remoteMFName],
  },
  mf: {
    remotes: [
      {
        name: remoteMFName,
        entry: 'http://xxx.xxx.xxx.xx:8088/main/remote.js', // 主应用导出的包
      },
    ],
    // 配置 MF 共享的模块
    shared,
  },
});
```

### 其他应用接入
