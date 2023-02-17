---
title: commit & 发布
order: 5
group:
  path: /
---

## 提交代码

### commit 规范

为了帮助我们更好的生成 changelog，我们希望你严格按照目前统一的[commit 规范](https://www.conventionalcommits.org/zh-hans/v1.0.0/)来规范化你的提交，这更有利于编写自动化工具。 通过在提交信息中描述功能、修复和破坏性变更，使其他部门或者人员更好的知道我们对于当前版本都做了什么。

### 开发人员

当我们单独修改某一个包后， 当你觉得此次的修改需要记录在发布日志的 change-log 时，这时候需要用我们提供的工具去按照规范提交对应代码并生成 patch 文件后提交即可, 仅将你的修改提交到暂存区，切记不要先 commit，然后执行`npm run commit`，这时候会提示你做相应的自动化界面，你只需要根据他的提示一步一步操作即可，后续统一发版的时候就会生成你之前的记录。

## 发布

### 统一发包

当我们需要统一发包的时候，该操作比较适合当前整体应用的管理者来操作，管理者需要对整体项目有一个大概，直接运行`npm run release`即可。

发包流程如下:

```jsx
import { SmileOutlined } from '@ant-design/icons';
import { Timeline } from 'antd';
import React from 'react';
export default () => {
  const arr = [
    '打包构建',
    '跑测试用例',
    '选择发包（多个）',
    '选择升级的主版本包',
    '自动升级其他相关有依赖的包(升级版本)',
    '打版本tag',
    '生成日志change-log',
    '写入到dumi文档',
    '发布npm',
  ];
  return (
    <Timeline style={{ marginTop: 30 }}>
      {arr.map((i) => (
        <Timeline.Item color="green">{i}</Timeline.Item>
      ))}
    </Timeline>
  );
};
```

所以在我们确认完开发内容，提交 PR 之前，执行 `npm run release`, 这是自动化工具会将上述流程自动跑完，我们要做的就是在执行过程中输入相关内容来表示此次更新的意图（版本大小，改动情况）这些都是为了使项目后期看起来更具有历史性和意义。

### 操作流程

以上构建流程中，选择发包 => 选择升级的主版本包 => 自动升级其他相关有依赖的包 需要我们手动干预，需要做如下操作：

- 选择自己修改的包。

```
🦋 Which packages would you like to include? 空格选择
```

- 选择是不是大版本修改
  如果不确定，以下两个问题都不选，直接回车。

```
🦋  Which packages should have a major bump? · No items were selected
🦋  Which packages should have a minor bump? · No items were selected
```

- 输入修改内容说明
  命令行写起来麻烦，可以随便写一下。在下一步里面详细写明。

```
🦋  Please enter a summary for this change (this will be in the changelogs). Submit empty line to open external editor
🦋  Summary : ...
```

- 如果已在命令行中写明 changelog，这一步可以跳过

执行完前三步，会在 `.changeset` 目录下面，随机生成一个文件。双击打开编辑里面的 changelog 就可以。

- 将生成的文件，与本次的所有修改，提交到云端即可。再发版本的时候，这些文件会被自动消耗。

建议： `所有核心的功能和组件相关都写几个测试用例，这样能防止发包后主应用出现一些非常低级的问题，也能快速定位到对应的问题去解决它`

### 手动发布

当修改完对应的包内容和版本后，直接运行命令行`npm run release:only`， changeset 会自动检查你的包版本是否已发布，没有发布自动帮你发布。(适合版本统一管理的项目， 目前 umi 的做法也是如此，所有的子包版本都跟随主应用走，不用繁琐的记录某个包具体的版本，直接统一，坏处是新版刚发布版本就已经是很高的版本的，无法知道版本更新迭代的时间顺序)

## 错误和警告
