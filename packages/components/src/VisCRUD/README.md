---
title: VisCRUD-页面组件
group:
  path: /
nav:
  title:
  path: /components
---

## VisPage 组件描述

仅通过配置Column产出CRUD一整个页面， TableList + Add Form + DELForm + EditForm + Search ;
表单中所有的配置与ProComponents SchemaFrom 一致，所以正常能满足大部分场景业务，仅需动态修改表单配置即可。
其它没有的功能也可以通过ProTable ProForm自定义传参数来实现。

## Demo

业务中进通过配置api前缀和字段的配置即可产出CRUD业务，下面是一个demo，由于没有业务接口，所以我们这里自定义request去模拟下数据返回

```tsx
import React from 'react';
import { VisCRUD } from '@vis/components'
export default () => {

  return <div>
    <VisCRUD<{ name: string; type: 'a'| 'b' }>
      prefixApi="/a/b"
      columns={[{
        title: '名称',
        dataIndex: 'name',
        valueType: 'text',
      },{
        title: '类型',
        dataIndex: 'type',
        valueType: 'select',
        valueEnum: {
          a: '选项1',
          b: '选项2'
        }
      }]}
      tableRequest={async() => {
        return {
         total: 30,
          data: [{
            name: 'name1',
            id: 1
          },{
            name: 'name2',
            id: 2
          }],
          success: true,
      }}}
    />
  </div>
}
```
## 独立Column配置

使用`editColumns` 和`addColumns` 对编辑或者新增时进行其它表单配置，优选使用对应的column， 否则使用全局columns渲染，用来在一些业务场景中，某些字段需要一些单独的配置。

```tsx
import React from 'react';
import { VisCRUD } from '@vis/components'
export default () => {

  return <div>
    <VisCRUD<{ name: string; type: 'a'| 'b' }>
      prefixApi="/a/b"
      editColumns={[{
        title: 'edit:名称',
        dataIndex: 'name',
        valueType: 'text',
      },{
        title: 'edit:类型',
        dataIndex: 'type',
        valueType: 'select',
        valueEnum: {
          a: '选项1',
          b: '选项2'
        }
      }]}
      columns={[{
        title: '名称',
        dataIndex: 'name',
        valueType: 'text',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '此项为必填项',
            },
          ],
        },
      },{
        title: '类型',
        dataIndex: 'type',
        valueType: 'select',
        valueEnum: {
          a: '选项1',
          b: '选项2'
        }
      }]}
      tableRequest={async() => {
        return {
         total: 30,
          data: [{
            name: 'name1',
            id: 1
          },{
            name: 'name2',
            id: 2
          }],
          success: true,
      }}}
    />
  </div>
}
```


## 自定义列表操作

可用 `columnActions`在表格操作处增加其它操作, 渲染函数会传递当前项

```tsx
import React from 'react';
import { VisCRUD } from '@vis/components'
import { Button } from 'antd'
export default () => {

  return <div>
    <VisCRUD
      prefixApi="/a/b"
      columns={[{
        title: '名称',
        dataIndex: 'name',
        valueType: 'text',
      },{
        title: '类型',
        dataIndex: 'type',
        valueType: 'select',
        valueEnum: {
          a: '选项1',
          b: '选项2'
        }
      }]}
      tableRequest={async() => {
        return {
         total: 30,
          data: [{
            name: 'name1',
            id: 1
          },{
            name: 'name2',
            id: 2
          }],
          success: true,
      }}}
      columnActions={(item) => {
        return [
            <Button type="link" onClick={() => {
                console.log(item)
             }}>是个多余的按钮</Button>
        ]
     } }
    />
  </div>
}
```

## 自定义弹框操作

可用`modalFooterAction`在新增或者编辑时在对话框下方的自定义添加其它按钮， 渲染函数传递获取当前值的方法，用来做其它操作
```tsx
import React from 'react';
import { VisCRUD } from '@vis/components'
export default () => {

  return <div>
    <VisCRUD<{ name: string; type: 'a'| 'b' }>
      prefixApi="/a/b"
      columns={[{
        title: '名称',
        dataIndex: 'name',
        valueType: 'text',
      },{
        title: '类型',
        dataIndex: 'type',
        valueType: 'select',
        valueEnum: {
          a: '选项1',
          b: '选项2'
        }
      }]}
      tableRequest={async() => {
        return {
         total: 30,
          data: [{
            name: 'name1',
            id: 1
          },{
            name: 'name2',
            id: 2
          }],
          success: true,
      }}}
      modalFooterAction={(getVal) => {
        
        return <span onClick={() => {
          console.log(getVal())
        }}>
          点我获取当前表单的值
        </span>
      }}
    />
  </div>
}
```

## 自定义ProTable ProForm 参数

使用`tableProps` `addFormProps` 新增ProForm其它props， `editFormProps`编辑表单的其它props，用来支撑复杂的业务场景。

新增时给名称一个默认值

```tsx
import React from 'react';
import { VisCRUD } from '@vis/components'
export default () => {

  return <div>
    <VisCRUD<{ name: string; type: 'a'| 'b' }>
      prefixApi="/a/b"
      addFormProps={{
        initialValues: {name: '自定义穿惨的默认值'}
      }}
      columns={[{
        title: '名称',
        dataIndex: 'name',
        valueType: 'text',
      },{
        title: '类型',
        dataIndex: 'type',
        valueType: 'select',
        valueEnum: {
          a: '选项1',
          b: '选项2'
        }
      }]}
      tableRequest={async() => {
        return {
         total: 30,
          data: [{
            name: 'name1',
            id: 1
          },{
            name: 'name2',
            id: 2
          }],
          success: true,
      }}}
    />
  </div>
}
```

## FormRef 获取当前状态表单的值

可以使用formRef来获取当前正在进行编辑或者新增状态的属性值,或者触发校验属性

```tsx
import React, { useRef } from 'react';
import { VisCRUD } from '@vis/components'
import { ProFormInstance } from '@ant-design/pro-components';
import { Button } from 'antd'
export default () => {
  const formRef = useRef<ProFormInstance>()
  return <div>
    <VisCRUD<{ name: string; type: 'a'| 'b' }>
      prefixApi="/a/b"
      formRef={formRef}
      columns={[{
        title: '名称',
        dataIndex: 'name',
        valueType: 'text',
        formItemProps: {
          rules: [
            {
              required: true,
              message: '此项为必填项',
            },
          ],
        },
      },{
        title: '类型',
        dataIndex: 'type',
        valueType: 'select',
        valueEnum: {
          a: '选项1',
          b: '选项2'
        }
      }]}
      modalFooterAction={() => {
        return <Button
          onClick={() => {
            formRef.current.validateFields()
          }}
        >点我触发校验</Button>
      }}
      tableRequest={async() => {
        return {
         total: 30,
          data: [{
            name: 'name1',
            id: 1
          },{
            name: 'name2',
            id: 2
          }],
          success: true,
      }}}
    />
  </div>
}
```

## 自定义新建 ｜ 编辑处理函数

可用`editHandle` `addHandle`来处理非常用逻辑意外的操作，如页面跳转，打开其它对话框等。

```tsx
import React from 'react';
import { VisCRUD } from '@vis/components'
export default () => {

  return <div>
    <VisCRUD<{ name: string; type: 'a'| 'b' }>
      prefixApi="/a/b"
      editHandle={(item) => {
        alert(1)
        console.log(item)
      }}
      addHandle={() => {
        alert('add')
      }}
      columns={[{
        title: '名称',
        dataIndex: 'name',
        valueType: 'text',
      },{
        title: '类型',
        dataIndex: 'type',
        valueType: 'select',
        valueEnum: {
          a: '选项1',
          b: '选项2'
        }
      }]}
      tableRequest={async() => {
        return {
         total: 30,
          data: [{
            name: 'name1',
            id: 1
          },{
            name: 'name2',
            id: 2
          }],
          success: true,
      }}}
    />
  </div>
}
```


## 自定义添加toolBar

使用`toolBars`传入其它ReactNode节点进行渲染并隐藏自带的新增按钮

```tsx
import React from 'react';
import { VisCRUD } from '@vis/components'
import { Button } from 'antd'
export default () => {

  return <div>
    <VisCRUD<{ name: string; type: 'a'| 'b' }>
      prefixApi="/a/b"
      toolBars={[<Button>1</Button>, <Button>1</Button>]}
      showAddToolbar={false}
      columns={[{
        title: '名称',
        dataIndex: 'name',
        valueType: 'text',
      },{
        title: '类型',
        dataIndex: 'type',
        valueType: 'select',
        valueEnum: {
          a: '选项1',
          b: '选项2'
        }
      }]}
      tableRequest={async() => {
        return {
         total: 30,
          data: [{
            name: 'name1',
            id: 1
          },{
            name: 'name2',
            id: 2
          }],
          success: true,
      }}}
    />
  </div>
}
```

## 自定义列表项

```tsx
import React from 'react';
import { VisCRUD } from '@vis/components'
export default () => {

  return <div>
    <VisCRUD<{ name: string; type: 'a'| 'b' }>
      prefixApi="/a/b"
      columns={[{
        title: '名称',
        dataIndex: 'name',
        valueType: 'text',
      },{
        title: '类型',
        dataIndex: 'type',
        valueType: 'select',
        valueEnum: {
          a: '选项1',
          b: '选项2'
        }
      }]}
      tableRequest={async() => {
        return {
         total: 30,
          data: [{
            name: 'name1',
            id: 1
          },{
            name: 'name2',
            id: 2
          }],
          success: true,
      }}}
      tableProps={
      {
        components:{
        body: { 
          row: (item) => {
            const { index,
            moveRow,
            className,
            style,
            children,
            ...restProps} = item;
            return <div
              style={{ display: 'flex' }}
              >
              name:  {
                children[0]
              }
            </div>
          }
         }
      }
      }
      }
    />
  </div>
}
```

<API src="./index.tsx"></API>
