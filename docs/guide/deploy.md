---
nav:
  title: 指南
  order: -1
title: 部署
order: 6
group:
  path: /
---

## 部署

### 路由规则

为了很好的区分应用和对应的路由，我们建议所有子应用使用 hash 路由开发，这样就能统一路由风格，增加路由的可读性，且能减少很多不必要的 nginx 配置 😊

地址拆分解析：

`http://xxx.xxx.xxx.xx:8088/dash/#/list?type=dashboard`

- `http://xxx.xxx.xxx.xx:8088` - 主机地址
- `/dash` - 路由的 history 用来区分子应用
- `/#/list` - hash 路由参数为子应用自己的路由
- `?type=dashboard` - 传参

### 全量更新

进入[部署地址](http://10.28.184.220:8888/job/yourname/)后点击`Build Now` 即可, 包含：仪表板，主应用，画布，文档， 数据模型...

### 构建环境文件结构

```bash
- main/                   * 主应用入口
- visual/                 * 画布入口
- dash/                   * 仪表板
- build-docs/             * 文档
- dataModel/              * 数据模型

```

### 增量更新

为了优化构建速度，我们建议在构建时尽可能的对指定的模块更新即可，这样原本几十分钟的全量构建过程仅仅只要几分钟就好了。

- 进入[仪表板增量更新](http://10.28.184.220:8888/job/vis-dash/)后点击`Build Now`即可
- 进入[文档增量更新](http://10.28.184.220:8888/job/vis-docs/)后点击`Build Now`即可
- 进入[画布增量更新](http://10.28.184.220:8888/job/vis-visual/)后点击`Build Now`即可
- 进入[主应用增量更新](http://10.28.184.220:8888/job/vis-main/)后点击`Build Now`即可
- 进入[数据模型增量更新](http://10.28.184.220:8888/job/vis-dataModel/)后点击`Build Now`即可

### 访问地址：

- [主应用](http://xxx.xxx.xxx.xx:8088/#/)
- [仪表板](http://xxx.xxx.xxx.xx:8088/dash/#/list)
- [文档](http://xxx.xxx.xxx.xx:8088/docs/#/)
- [画布](http://xxx.xxx.xxx.xx:8088/visual#/)
- [数据模型](http://xxx.xxx.xxx.xx:8088/dataModel#/)
