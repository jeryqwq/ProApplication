/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BetaSchemaForm,
  ProBreadcrumb,
  ProFormColumnsType,
  ProFormInstance,
} from '@ant-design/pro-components';
import { CSSProperties, MutableRefObject, useEffect, useState } from 'react';
import useUrlState from '@ahooksjs/use-url-state';
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

declare interface BreadCrumbProps {
  routes: {
    path: string;
    breadcrumbName: string;
    children: BreadCrumbProps['routes'][];
  }[];
}

declare interface WorksapceProps {
  /** tabs内容， 使用固定数据结构有利于优化，而不是Worksapce.Item传递单项内容  */
  tabs: TabItem[];
  /** 工作空间描述 */
  desc?: React.ReactNode;
  /** 内容区自定义样式 ,自定义布局时会失效*/
  contentStyle?: CSSProperties;
  /** tab切换回调，传递当前的TabItem */
  onChange?: (i: TabItem) => void;
  /** 初始化key值 */
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
  /** 开启active状态合并到url中同步，适用于多个tab时其他页面可直接跳转到指定的tab项 */
  isUrlState?: boolean;
  /**
   * @description isUrlState开启时绑定到路由的key值
   * @default type
   */
  urlKey?: string;
  /** 自定义展示的面包屑 */
  breadcrumb?: BreadCrumbProps;
  /** 是否展示面包屑。为true自动渲染，优先breadcrumb参数 */
  showBread?: boolean;
  /** 底部的操作栏 */
  footer?: React.ReactNode;
  /** 固定表头 */
  fixHeader?: boolean;
}

const prefix = 'vis-comp-wrokspace';
function WorkSpace({
  formRef = undefined,
  showBread,
  breadcrumb = {} as any,
  footer,
  tabs,
  desc,
  initValue,
  value,
  children,
  onChange,
  formColumns,
  formProps = {},
  isUrlState,
  urlKey = 'type',
  contentStyle,
  fixHeader,
  formRender,
}: WorksapceProps) {
  const _initVal = initValue || value || tabs[0].key;
  const [urlState, setUrlState] = useUrlState();
  const [active, setActive] = useState<string | undefined>(
    isUrlState ? urlState[urlKey] || _initVal : _initVal,
  );
  const curItem = tabs.find((i) => i.key === active) || tabs[0];

  useEffect(() => {
    value && setActive(value);
  }, [value]);
  return (
    <div className={`${prefix}-wrap`}>
      <div className={`${prefix}-header`}>
        {showBread && (
          <div style={{ height: '30px' }}>
            <ProBreadcrumb {...(breadcrumb as any)} />
          </div>
        )}
        <div className={`${prefix}-title`}>
          {tabs.length === 1 ? (
            <div className={`${prefix}-label`}>{tabs[0].title}</div>
          ) : (
            <Tabs
              className={`${prefix}-tabs`}
              activeKey={active}
              onChange={(key) => {
                const curItem = tabs.find((i) => i.key === key);
                onChange && curItem && onChange(curItem);
                setActive(key);
                if (isUrlState) {
                  setUrlState({ [urlKey]: key });
                }
              }}
              size="small"
              items={tabs.map((i) => ({
                label: i.title,
                key: i.key,
                children: undefined,
              }))}
              // tabBarExtraContent={tabBarExtraContent}
              // {...tabProps}
            >
              {/* {tabs?.map((item) => {
              return <Tabs.TabPane  {...item} key={item.key} tab={item.title} />;
            })} */}
            </Tabs>
          )}
        </div>
        {desc && <div className={`${prefix}-desc`}>{desc}</div>}
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
        <div
          className={`${prefix}-content-wrap`}
          style={{ ...contentStyle, flex: fixHeader ? '1' : 'none' }}
        >
          {curItem?.content}
        </div>
      )}
      {footer && <div className={`${prefix}-content-footer`}>{footer}</div>}
    </div>
  );
}

export default WorkSpace;
export const TabItem_Type = (_: TabItem) => <div />;
export const ProFormColumnsType_Type = (_: ProFormColumnsType) => <div />;
export const ProFormInstance_Type = (_: ProFormInstance) => <div />;
