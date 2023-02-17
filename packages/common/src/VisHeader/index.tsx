import {
  BetaSchemaForm,
  ProFormColumnsType,
  ProFormInstance,
} from '@ant-design/pro-components';
import { CSSProperties, MutableRefObject, useEffect, useState } from 'react';
import React from 'react';
import './index.less';
import { Tabs } from 'antd';

declare interface TabItem {
  /** 标题 */
  title: string;
  /**  内容区 */
  content: React.ReactNode;
  /**  唯一标识 */
  key: string;
}

declare interface VisHeaderProps {
  /** tabs内容， 使用固定数据结构有利于优化，而不是VisHeader.Item传递单项内容  */
  tabs: TabItem[];
  /** 内容区自定义样式, 自定义布局时会失效 */
  contentStyle?: CSSProperties;
  /** 外层div样式 */
  style?: CSSProperties;
  /** tab切换回调，传递当前的TabItem */
  onChange?: (i: TabItem) => void;
  /** 初始化title值 */
  initValue?: string;
  /** 自定义布局渲染 */
  children?: (i: TabItem | undefined) => React.ReactNode;
  /** JSON From 项配置， 参考proFrom官方 , https://procomponents.ant.design/components/schema-form  */
  formColumns?: ProFormColumnsType[];
  /** BetaSchemaForm 自定义配置  https://procomponents.ant.design/components/form */
  formProps?: any;
  /**  操作右上方表单实例，如清空，设置值等 */
  formRef?: MutableRefObject<ProFormInstance<any> | undefined>;
  /** 右上角form 自定义render方法 */
  formRender?: (i: TabItem | undefined) => React.ReactNode;
  /** 受控模式value值 */
  value?: string;
  /** 多tabs时右侧渲染使用tabBarExtraContent渲染，而不是formRender */
  tabBarExtraContent?: React.ReactNode;
}

const prefix = 'vis-comp-header';
function VisHeader({
  formRef = undefined,
  tabs,
  initValue,
  value,
  tabBarExtraContent,
  children,
  onChange,
  formColumns,
  formProps = {},
  contentStyle,
  style,
  formRender,
}: VisHeaderProps) {
  const _initVal = initValue || value || tabs[0].key;
  const [active, setActive] = useState<string | undefined>(_initVal);
  const curItem = tabs.find((i) => i.key === active) || tabs[0];
  useEffect(() => {
    value && setActive(value);
  }, [value]);
  return (
    <div className={`${prefix}-wrap`} style={style}>
      <div className={`${prefix}-header ${tabs.length !== 1 && 'tabs'}`}>
        <div className={`${prefix}-title`}>
          {tabs.length === 1 ? (
            <div className={`${prefix}-label`}>{tabs[0].title}</div>
          ) : (
            <Tabs
              className={`${prefix}-tabs`}
              activeKey={active}
              tabBarExtraContent={tabBarExtraContent as any}
              onChange={(key) => {
                const curItem = tabs.find((i) => i.key === key);
                onChange && curItem && onChange(curItem);
                setActive(key);
              }}
              size="small"
              items={tabs?.map((i) => ({
                label: i.title,
                children: undefined,
                ...i,
              }))}
              // {...tabProps}
            />
          )}
        </div>
        <div className={`${prefix}-form`}>
          {formRender ? (
            formRender(curItem)
          ) : (
            <BetaSchemaForm
              formRef={formRef}
              columns={formColumns || []}
              submitter={false}
              layout="inline"
              {...formProps}
            />
          )}
        </div>
      </div>
      {children ? (
        children(curItem)
      ) : (
        <div className={`${prefix}-content-wrap`} style={contentStyle}>
          {curItem?.content}
        </div>
      )}
    </div>
  );
}

export default VisHeader;
