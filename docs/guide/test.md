---
title: 自动化测试
order: 4
group:
  path: /
---

## 测试

### 简述

基于 monorepo 架构下，我们能很好的统一跑测试用例，生成测试覆盖率文件等，因为相对于 jest，他们仅仅都是在同一个项目中，所以我们推荐，当你写完一个组件和某些核心功能时，都可以去 tests 文件夹适当的添加一些测试用例，防止以后有其他人不小心修改了相关代码或者增加新功能时，无法适配旧的代码功能等异常情况能够提前检查到并快速定位到对应的问题进行调整修改。

我们基于[react-testing-library](https://testing-library.com/docs/react-testing-library/intro)来测试我们的组件。基于 DOM Testing Library 的基础上添加一些 API，主要用于测试 React 组件。如果是其它的技术栈，可以选择对应的 Testing Library 库。该库在使用过程并不关注组件的内部实现，而是更关注测试。该库基于 react-dom 和 react-dom/test-utils，是以上两者的轻量实现。

## 功能测试

### api

更多详情看这里[api](https://testing-library.com/docs/react-testing-library/api)

### dom 相关

```ts
import { render } from '@testing-library/react';
import { WordCloud } from '@vis/charts'
const html = render(WordCloud)
//render 的结果, 与浏览器domApi一致
{
   ...queries, //选择器，例如(get/query/find)By(Text/Label/...)
   container: HTMLDivElement,//自动创建一个div,并插入到body中
   baseElement: HTMLBodyElement, //相当于document.body
   debug: Function, //打印当前document.body
   rerender: Function, //重新渲染组件
   unmount: Function, //组件卸载，此时container.innerHTML === ''
   asFragment:Function //记录某个时刻的dom
}
```

### hooks

```ts
import { renderHook } from '@testing-library/react';

const { result } = renderHook(() => {
  const [name, setName] = useState('');
  React.useEffect(() => {
    setName('Alice');
  }, []);

  return name;
});
expect(result.current).toBe('Alice');
```

### 事件

```ts
import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';

const TestComponent = () => {
  const [count, setCounter] = useState(0);

  return (
    <button onClick={() => setCounter((count) => count + 1)}>
      Click to increase: {count}
    </button>
  );
};

const { getByText, asFragment } = render(<TestComponent />);
const firstRender = asFragment();

fireEvent.click(getByText(/Click to increase/));

// This will snapshot only the difference between the first render, and the
// state of the DOM after the click event.
// See https://github.com/jest-community/snapshot-diff
expect(firstRender).toMatchDiffSnapshot(asFragment()); // 对比Dom快照，可以简单理解为dom字符串
```
