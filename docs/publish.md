---
title: commit & 发布 & 部署
order: 4
group:
  path: /
nav:
  title:
  path: /docs
---

## 提交代码

### 开发人员

当我们单独修改某一个包后， 当你觉得此次的修改需要记录在发布日志的change-log时，这时候需要用我们提供的工具去按照规范提交对应代码并生成patch文件后提交即可, 仅将你的修改提交到暂存区，切记不要先commit，然后执行`npm run commit`，这时候会提示你做相应的自动化界面，你只需要根据他的提示一步一步操作即可，后续统一发版的时候就会生成你之前的记录。 
### commit规范
为了帮助我们更好的生成changelog，我们希望你严格按照目前统一的[commit规范](https://www.conventionalcommits.org/zh-hans/v1.0.0/)来规范化你的提交，这更有利于编写自动化工具。 通过在提交信息中描述功能、修复和破坏性变更，使其他部门或者人员更好的知道我们对于当前版本都做了什么。
## 发布
### 统一发包
当我们需要统一发包的时候，该操作比较适合当前整体应用的管理者来操作，管理者需要对整体项目有一个大概，直接运行`npm run release`即可。
- 整个发包流程: 
```jsx
  import { SmileOutlined } from '@ant-design/icons';
  import { Timeline } from 'antd';
  import React from 'react';
  export default () => {
    const arr = ['打包构建', '跑测试用例','选择发包（多个）', '选择升级的主版本包', '自动升级其他相关有依赖的包(升级版本)', '打版本tag','生成日志change-log', '写入到dumi文档', '发布npm']
    return <Timeline style={{marginTop: 30}}>
    {arr.map(i => <Timeline.Item color="green">{i}</Timeline.Item>)}
    </Timeline>
  }
```
`建议对所有核心的功能和组件相关都写几个测试用例，这样能防止发包后主应用出现一些非常低级的问题，也能快速定位到对应的问题去解决它`
### 手动发布

当修改完对应的包内容和版本后，直接运行命令行`npm run release:only`，  changeset会自动检查你的包版本是否已发布，没有发布自动帮你发布。

## 部署
### 全量更新
进入[部署地址](http://10.28.184.220:8888/job/vis-next/)后点击`Build Now`即可

### 构建环境文件结构
```bash
- vis-web.html            * 主应用入口
- vis-visual.html         * 画布入口
- dash/                   * 仪表板
- build-docs/             * 文档
```
### 增量更新
可以手动打包后覆盖文件，也可以单独构建
- 进入[仪表板增量](http://10.28.184.220:8888/job/vis-dash/)后点击`Build Now`即可
- 进入[文档增量](http://10.28.184.220:8888/job/vis-docs/)后点击`Build Now`即可

### 访问地址：
* [主应用](http://10.28.184.132:8088/#/)
* [仪表板](http://10.28.184.132:8088/dash/#/list)
* [文档](http://10.28.184.132:8088/docs/#/)
* [画布](http://10.28.184.132:8088/visual#/)


## 错误和警告
