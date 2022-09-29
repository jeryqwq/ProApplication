---
title: 通用配置
order: 1
group:
  path: /
nav:
  title: 组件
  path: /components
---

## 通用
每个组件下的`README.md`就是我们当前组件的文档描述。用来描述组件的用法和常用api配置demo等。
<br />
我们推荐使用TypeScript去写组件代码，这样在主应用或者其他项目中使用我们的包时会有代码类型校验和错误提示，且能规避很多不易发现的基本错误，更好的适配dumi自动生成api文档，不需要再单独去md文档写当前组件的api参数等。

## api自动生成
`还是建议使用完整的ts类型来写你的组件`，在每个类型上可以规范添加对应的内容描述，前面的事情清晰的做好后后面文档你会发现几乎不需要太多时间，你的组件文档就写完了，差不多只要写几个demo示例，后面的所有api都可以自动导出api来自定生成。

- 我们建议在每个组件下定义一个`api.tsx`， 导出到处当前文档的类型。基于[react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript)语法，更多功能可以参考该语法。
<Alert type="info">
切记：每个导出的类型需要变成组件参数，然后导出组件，不可🙅直接导出类型
</Alert>

```js
import React from 'react';
const Api: React.FC<{ 
  /** 
   * @description 这是props1的描述
   * @default  支持定义默认值
   *
   */
  props1: string
}> = () => <></>;
const Api2: React.FC<{
    /** 这是props1简写的描述 */
  props1: string
}> = () => <></>;
export default Api;
export const Api2;
```

配置完之后我们就可以去当前组件下的README.md文件引入该组件api了
```js
<API src="./api.tsx" hideTitle exports='["Api2"]'></API> // 不展示api头部，渲染导出的Api2的表格api格式
<API src="./api.tsx" ></API> // 展示api头部，渲染导出的Api的表格api格式
```
最终效果：


| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| props1 | 这是props1简写的描述  | string | - |

## api

| 属性 | 描述 | 类型 | 默认值 |
| --- | --- | --- | --- |
| props1 | 这是props1简写的描述  | string | 支持定义默认值 |

## 资产元数据
该功能提供一套可视化的组件区块拖拽后代码生成功能，但是目前仅兼容了umi3，没适配其他脚手架依赖，接入可能需要很大的成本，暂不考虑接入。
<img src="https://gw.alipayobjects.com/zos/bmw-prod/a873195d-32fe-427d-9756-a002d7644d85/kc5y7qpk_w2078_h1757.png"/>

<img src="https://gw.alipayobjects.com/zos/bmw-prod/4102a494-e4d8-494e-a790-1a7a5562da51/kc6gnqjd_w680_h387.gif"/>

关于[构建资产](https://d.umijs.org/zh-CN/guide/advanced#ui-%E8%B5%84%E4%BA%A7%E6%95%B0%E6%8D%AE%E5%8C%96)，可以看这里的文档，如何对接umi3项目
