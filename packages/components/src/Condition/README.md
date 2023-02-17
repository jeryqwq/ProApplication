---
title: Condition 条件筛选
---

## Condition 组件描述

条件生成通用组件，常用语根据条件筛选或者选中数据范围。

条件分为三个部分， 左侧 TreeSelect 字段选择， 中间操作符选择， 右侧对应的条件输入或者选择。

### 原始数据格式

```js | pure
  {
    exprs: [], // 子表达式
    connect: 'AND', // 连接方式
    column: 'age'; // 左侧字段
    operator: '>'; // 操作符
    value: '50'; // 右侧值
  }
```

```tsx
import { Condition } from '@vis/components';
import { useState } from 'react';
export default () => {
  const [val, setVal] = useState({
    connect: 'OR',
    exprs: [
      {
        connect: 'AND',
        column: 'age',
        operator: '>',
        value: '50',
      },
    ],
  });
  return (
    <div>
      <span>{JSON.stringify(val)}</span>
      <Condition
        value={val}
        onChange={(_val) => {
          setVal({ ..._val });
        }}
      />
    </div>
  );
};
```

### 按顺序输入

实际业务中的参数往往是根据左侧的选择一步一步往下走的，所以增加`isSequenceInput`这个 API 防止用户先从右侧输入发生异常

```tsx
import { Condition } from '@vis/components';
import { useState } from 'react';
export default () => {
  const [val, setVal] = useState({
    connect: 'OR',
    exprs: [{}],
  });
  return (
    <div>
      <span>{JSON.stringify(val)}</span>
      <Condition
        value={val}
        onChange={(_val) => {
          setVal({ ..._val });
        }}
        isSequenceInput
      />
    </div>
  );
};
```

### 格式转换

使用`transformKey`对源数据格式进行 formate

```js
{connect: 'myconnect', exprs: 'children', column: 'mycolumn', operator: 'myoperator', value: 'label'}
```

```tsx
import { Condition } from '@vis/components';
import { useState } from 'react';
export default () => {
  const [val, setVal] = useState({
    children: [{ mycolumn: '0-1-1', myoperator: 'equals', label: '男' }],
    myconnect: 'AND',
  });
  return (
    <div>
      <span>{JSON.stringify(val)}</span>
      <Condition
        onChange={(_val) => {
          setVal({ ..._val });
        }}
        value={val}
        transformKey={{
          connect: 'myconnect',
          exprs: 'children',
          column: 'mycolumn',
          operator: 'myoperator',
          value: 'label',
        }}
      />
    </div>
  );
};
```

### 开启校验

先配置`required`api 开启校验功能，校验未通过时无法添加字段条件和分组，使用`condRef`下的`validate`函数对所有的已增加条件进行校验， 该校验进支持 required 配置，不支持其它复杂的条件判断

```tsx
import { Condition } from '@vis/components';
import { Button } from 'antd';
import { useRef, useState } from 'react';
export default () => {
  const condRef = useRef({});
  const [val, setVal] = useState({
    connect: 'OR',
    exprs: [
      {
        connect: 'AND',
        operator: '>',
      },
    ],
  });
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          const res = condRef.current?.validate();
          if (res.value) {
            alert('pass！');
          } else {
            alert('校验失败!!');
          }
        }}
      >
        点我校验
      </Button>
      <Button
        type="primary"
        style={{ margin: '0 10px' }}
        onClick={() => {
          const res = condRef.current?.resetValidate();
        }}
      >
        清空校验
      </Button>
      <div>{JSON.stringify(val)}</div>

      <Condition
        value={val}
        required
        condRef={condRef}
        onChange={(_val) => {
          setVal({ ..._val });
        }}
      />
    </div>
  );
};
```

### 自定义渲染

实际业务中，往往需要支持更多的功能配置，此时，需要使用自定义渲染各个条件并兼容原有的校验，顺序输入，转换，禁用等功能，下面是一个组合了所有功能的自定义渲染的复杂情况下的 demo。每一块的 render 函数均由下列的传参组成，由此可以渲染一个受控的任何自定义组件。`注: columnRender由于第一个渲染，所以没有disabled参数`

```jsx | pure
/**
 * @val 当前的值
 * @onChange 改变值的回调
 * @curItem 当前项 类型: StandardValue
 * @disbaled 是否禁用
 */
(val, onChange, curItem, disabled) => {
  // 这样一个很基本的适配组件的自定义渲染就完成了
  return <Input value={val} onChange={onChange} disabled={disabled} />;
};
```

```tsx
import { Condition } from '@vis/components';
import { Button, Select, Tag } from 'antd';
import { useRef, useState } from 'react';

const options: SelectProps['options'] = [];
for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}

export default () => {
  const condRef = useRef({});
  const [val, setVal] = useState({
    connect: 'OR',
    exprs: [
      {
        connect: 'AND',
      },
    ],
  });
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          const res = condRef.current?.validate();
          if (res.value) {
            alert('pass！');
          } else {
            alert('校验失败!!');
          }
        }}
      >
        点我校验
      </Button>
      <div>{JSON.stringify(val)}</div>

      <Condition
        value={val}
        required
        transformKey={{ column: 'key' }} // 转换column key
        condRef={condRef}
        columnRender={(val, onChange) => {
          // 自定义渲染左侧
          return (
            <Select
              value={val}
              mode="multiple"
              onChange={onChange}
              style={{ width: 200 }}
              options={options}
            />
          );
        }}
        operatorRender={(val, onChange, { key }, disabled) => {
          //根据左侧选中的渲染中间的，向右传递
          return (
            <div
              style={{
                background: disabled ? 'gray' : 'white',
                margin: '0 5px',
              }}
            >
              {key?.map((i) => (
                <Tag
                  color="magenta"
                  onClick={() => {
                    onChange((val || []).concat(i));
                  }}
                >
                  {i}
                </Tag>
              ))}{' '}
              -
            </div>
          );
        }}
        valueRender={(val, onChange, { operator }, disabled) => {
          // 根据中间选中的渲染， 点击赋值
          return (
            <div style={{ background: disabled ? 'gray' : 'white' }}>
              {operator
                ? operator?.map((i) => (
                    <Tag
                      color="magenta"
                      onClick={() => {
                        onChange((val || []).concat(i));
                      }}
                    >
                      {i}
                    </Tag>
                  ))
                : 'no-data'}
            </div>
          );
        }}
        onChange={(_val) => {
          setVal({ ..._val });
        }}
      />
    </div>
  );
};
```

### 不同尺寸

```tsx
import { Condition } from '@vis/components';
import { useState } from 'react';
export default () => {
  const [val, setVal] = useState({
    connect: 'OR',
    exprs: [
      {
        connect: 'AND',
        column: 'age',
        operator: '>',
        value: '50',
      },
      {
        connect: 'AND',
        column: 'age',
        operator: '>',
        value: '50',
      },
    ],
  });
  return (
    <div>
      <span>{JSON.stringify(val)}</span>
      <h2>large</h2>
      <Condition initValue={val} size={'large'} />
      <h2>middle</h2>
      <Condition initValue={val} size={'middle'} />
      <h2>small</h2>
      <Condition initValue={val} size={'small'} />
    </div>
  );
};
```

<API id="ConditionProps"></API>
