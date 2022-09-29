/* eslint-disable max-len */
import { BetaSchemaForm, ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import { CSSProperties, MutableRefObject, useEffect, useState } from 'react';
import useUrlState from '@ahooksjs/use-url-state';

import './index.less';

declare interface TabItem {
  /** 标题 */
  title: string;
  /**  内容区 */
  content: React.ReactNode;
  /**  唯一标识 */
  key: string;
}

declare interface WorksapceProps {
  /** tabs内容， 使用固定数据结构有利于优化，而不是Worksapce.Item传递单项内容  */
  tabs: TabItem[];
  /** 工作空间描述 */
  desc?: React.ReactNode;
  /** 头部自定义样式 */
  headerStyle?: CSSProperties;
  /** 内容区自定义样式 */
  contentStyle?: CSSProperties;
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
  /** 开启active状态合并到url中同步，适用于多个tab时其他页面可直接跳转到指定的tab项 */
  isUrlState?: boolean;
  /**
   * @description isUrlState开启时绑定到路由的key值
   * @default type
   */
  urlKey?: string;
}

const prefix = 'vis-comp-wrokspace';

function WorkSpace({ formRef = undefined, tabs, desc, initValue, value,
  children, onChange, formColumns, formProps = {}, isUrlState, urlKey = 'type',
  formRender }: WorksapceProps) {
  const _initVal = initValue || value || tabs[0].key;
  const [urlState, setUrlState] = useUrlState();
  const [active, setActive] = useState<string | undefined>(isUrlState ? urlState[urlKey] || _initVal : _initVal);
  const curItem = tabs.find(i => i.key === active) || tabs[0];
  useEffect(() => {
    value && setActive(value);
  }, [value]);
  return (
    <div className={`${prefix}-wrap`}>
      <div className={`${prefix}-header`}>
        <div className={`${prefix}-title`}>
          {
            tabs.length === 1 ? (
              <div className={`${prefix}-label`}>
                { tabs[0].title }
              </div>
            ) : tabs.map(i => (
              <div
                className={`${`${prefix}-item`} ${active === i.key ? 'cur' : ''} `}
                key={i.key}
                onClick={() => {
                  if (active !== i.key) {
                    onChange && onChange(i);
                    setActive(i.key);
                    if (isUrlState) {
                      setUrlState({ [urlKey]: i.key });
                    }
                  }
                }}
              >
                { i.title }
              </div>))
          }
        </div>
        <div className={`${prefix}-desc`}>{ desc }</div>
        <div className={`${prefix}-form`}>
          { formRender ? formRender(curItem) : <BetaSchemaForm formRef={formRef} columns={formColumns || []} submitter={false} layout="inline" {...formProps} /> }
        </div>
      </div>
      {
        children ? children(curItem) : <div className={`${prefix}-content-wrap`}>{ (curItem)?.content }</div>
      }
    </div>
  );
}

export default WorkSpace;
export const TabItem_Type = (_: TabItem) => <div />;
export const ProFormColumnsType_Type = (_: ProFormColumnsType) => <div />;
export const ProFormInstance_Type = (_: ProFormInstance) => <div />;
