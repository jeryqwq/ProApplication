import type { NamePath } from 'antd/lib/form/interface';
import type { ReactNode } from 'react';

export type PageInfo = {
  pageSize: number;
  total: number;
  current: number;
};

export type RequestOptionsType = {
  label?: React.ReactNode;
  value?: React.ReactText;
  /** 渲染的节点类型 */
  optionType?: 'optGroup' | 'option';
  options?: Omit<RequestOptionsType, 'children' | 'optionType'>[];
  [key: string]: any;
};

export type ProFieldRequestData<U = any> = (params: U, props: any) => Promise<RequestOptionsType[]>;

export type ProFieldValueEnumType = ProSchemaValueEnumMap | ProSchemaValueEnumObj;

export type ProFieldValueObjectType = {
  type: 'progress' | 'money' | 'percent' | 'image';
  status?: 'normal' | 'active' | 'success' | 'exception' | undefined;
  locale?: string;
  /** Percent */
  showSymbol?: ((value: any) => boolean) | boolean;
  showColor?: boolean;
  precision?: number;
  moneySymbol?: boolean;
  request?: ProFieldRequestData;
  /** Image */
  width?: number;
};

export type ProSchemaValueEnumType = {
  /** @name 演示的文案 */
  text: ReactNode;

  /** @name 预定的颜色 */
  status?: string;
  /** @name 自定义的颜色 */
  color?: string;
  /** @name 是否禁用 */
  disabled?: boolean;
};

/**
 * 支持 Map 和 Record<string,any>
 *
 * @name ValueEnum 的类型
 */
export type ProSchemaValueEnumMap = Map<React.ReactText, ProSchemaValueEnumType | ReactNode>;

export type ProSchemaValueEnumObj = Record<string, ProSchemaValueEnumType | ReactNode>;

export type ProFieldTextType =
  | React.ReactNode
  | React.ReactNode[]
  | Record<string, any>
  | Record<string, any>[];

export type SearchTransformKeyFn = (
  value: any,
  namePath: string,
  allValues: any,
) => string | Record<string, any>;
export type SearchConvertKeyFn = (value: any, field: NamePath) => string | Record<string, any>;

export type ProTableEditableFnType<T> = (value: any, record: T, index: number) => boolean;

// 支持的变形，还未完全支持完毕
/** 支持的变形，还未完全支持完毕 */
export type ProSchemaComponentTypes =
  | 'form'
  | 'list'
  | 'descriptions'
  | 'table'
  | 'cardList'
  | undefined;

export interface ProFieldProps {
  light?: boolean;
  emptyText?: ReactNode;
  label?: React.ReactNode;
  mode?: 'read' | 'edit';
  /** 这个属性可以设置useSwr的key */
  proFieldKey?: string;
  render?: any;
  readonly?: boolean;
}
