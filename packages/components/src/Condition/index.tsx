import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  TreeSelect,
  TreeSelectProps,
} from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import './index.less';
import { CloseOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';

declare type onSearchChange = (value: any) => void;

export type CondRef = React.RefObject<{
  /** 校验函数，返回value和err */
  validate?: () => { value: StandardValue | undefined; err: string };
  /** 重置校验状态 */
  resetValidate?: () => void;
}>;

export type ConditionProps = {
  /** 初始值 */
  initValue?: StandardValue;
  /** 转换的key，标准数据格式下配置需要转换的value { connect: 'connect1' } */
  transformKey?: Record<keyof StandardValue, string>;
  /** 受控模式 */
  value?: StandardValue;
  /** 每次内容改变触发 */
  onChange?: (_: StandardValue) => void;
  /** 左侧字段选择区自定义渲染方法 */
  columnRender?: (
    val: any,
    onChange: onSearchChange,
    item: StandardValue,
  ) => React.ReactNode;
  /** 中间操作符选择空间自定义选择方法 */
  operatorRender?: (
    val: any,
    onChange: onSearchChange,
    item: StandardValue,
    disabled: boolean,
  ) => React.ReactNode;
  /** 右侧条件值自定义渲染方法 */
  valueRender?: (
    val: any,
    onChange: onSearchChange,
    item: StandardValue,
    disabled: boolean,
  ) => React.ReactNode;
  /**
   * @default 3
   * @description 条件选择最高支持层数
   */
  depth?: number;
  /**
   * @default {treeData: []}
   * @description 左侧字段选择TreeSelect组件对应的参数Props
   */
  treeProps?: TreeSelectProps;
  /** 是否开启校验 */
  required?: boolean;
  /** 自定义中间操作符下拉 */
  operatorOptions?: { label: string; value: string }[];
  /** 组件ref， 可用来做校验等操作 */
  condRef?: CondRef;
  /** 开启条件语句按照从做到右的顺序输入，前项没输入禁用后项 */
  isSequenceInput?: boolean;
  /**
   * @description 统一size属性
   * @default middle
   */
  size?: 'large' | 'middle' | 'small';
  /**
   * @description 默认链接方式
   * @default AND
   */
  defaultConnect?: string;
  /**
   * 最终校验通过时会调用此方法做一次转换，可做其它事情
   */
  transformData?: (val: StandardValue) => StandardValue;
  /**
   *
   * @description 自定义链接方式下拉对象
   * @default [{ label: 'AND', value: 'AND' },{ label: 'OR', value: 'OR' }]
   */
  connectOptions?: { label: string; value: string }[];
};
declare type StandardValue = {
  /** 连接方式 */
  connect?: 'AND' | 'OR' | string;
  /** 有没有子项的表达式, 类似children */
  exprs?: Array<StandardValue>;
  /** 单项表达式左侧的字段 */
  column?: any;
  /** 单项表达式中间的操作符 */
  operator?: string;
  /** 单项表达式右侧的值 */
  value?: any;

  /** 其他任意值 */
  [key: string]: any;
};

const treeData = [
  {
    title: '度量',
    value: '0-0',
    children: [
      {
        title: '年龄',
        value: '0-0-1',
      },
      {
        title: '出生日期',
        value: '0-0-2',
      },
    ],
  },
  {
    title: '维度',
    value: '0-1',
    children: [
      {
        title: '性别',
        value: '0-1-1',
      },
    ],
  },
];

const defaultOptions = [
  {
    label: '列表选择',
    value: 'listChoose',
  },
  {
    label: '开头是',
    value: 'start',
  },
  {
    label: '包含',
    value: 'include',
  },
  {
    label: '结尾是',
    value: 'end',
  },
  {
    label: '不包含',
    value: 'notInclude',
  },
  {
    label: '等于',
    value: 'equals',
  },
  {
    label: '不等于',
    value: 'unEquals',
  },
  {
    label: '等于空',
    value: 'equalsNull',
  },
  {
    label: '不等于空',
    value: 'unEqualsNull',
  },
];

const prefixClass = 'vis-comp-condition-';

const sizeMb = {
  middle: '10px',
  large: '15px',
  small: '0px',
};

export default ({
  initValue = {},
  transformKey = {},
  depth = 3,
  value,
  treeProps = { treeData },
  columnRender,
  operatorRender,
  valueRender,
  operatorOptions = defaultOptions,
  onChange,
  required,
  condRef,
  isSequenceInput,
  size = 'middle',
  defaultConnect = 'AND',
  transformData,
  connectOptions = [
    { label: 'AND', value: 'AND' },
    { label: 'OR', value: 'OR' },
  ],
}: ConditionProps) => {
  const isCheckPass = useRef(true);
  const [isShowErr, setShowErr] = useState(false);
  const [_value, setValues] = useState<StandardValue>(value || initValue);
  const [, set] = useState({});
  isCheckPass.current = true;
  useEffect(() => {
    value && setValues(value);
  }, [value]);
  useEffect(() => {
    condRef?.current &&
      ((condRef.current.validate = () => {
        setShowErr(true);
        return {
          value: isCheckPass.current
            ? transformData
              ? transformData(_value)
              : _value
            : undefined,
          err: '',
        };
      }),
      (condRef.current.resetValidate = () => {
        setShowErr(false);
      }));
  }, []);

  const refresh = function () {
    set({}); // 不能使用setValues 去触发更新，会丢失内存引用
    onChange && onChange(_value);
  };

  const genOnChange = useCallback(
    function (curItem: StandardValue, key: keyof StandardValue) {
      const transformedKey = transformKey[key] ? transformKey[key] : key;
      return function (val: any) {
        curItem[transformedKey] = val;
        refresh();
      };
    },
    [transformKey],
  );

  const getValue = useCallback(
    (curItem: StandardValue, key: keyof StandardValue) => {
      const transformedKey = transformKey[key] ? transformKey[key] : key;
      return curItem[transformedKey];
    },
    [transformKey],
  );

  const renderItem = function (curItem: StandardValue, delFn: () => void) {
    let stepIndex = 0;
    const __column = getValue(curItem, 'column');
    const __oper = getValue(curItem, 'operator');
    const __value = getValue(curItem, 'value');
    !isEmpty(__column) && stepIndex++;
    !isEmpty(__oper) && stepIndex++;
    !isEmpty(__value) && stepIndex++;
    stepIndex < 3 && (isCheckPass.current = false);
    return (
      <div className={prefixClass + 'sub-item'}>
        <Form.Item
          help={isEmpty(__column) && isShowErr ? '字段名不能为空' : undefined}
          validateStatus={isEmpty(__column) && isShowErr ? 'error' : undefined}
        >
          {columnRender ? (
            columnRender(__column, genOnChange(curItem, 'column'), curItem)
          ) : (
            <TreeSelect
              size={size}
              {...treeProps}
              value={__column}
              onChange={genOnChange(curItem, 'column')}
            />
          )}
        </Form.Item>
        <Form.Item
          help={isEmpty(__oper) && isShowErr ? '操作符不能为空' : undefined}
          validateStatus={isEmpty(__oper) && isShowErr ? 'error' : undefined}
        >
          {operatorRender ? (
            operatorRender(
              __oper,
              genOnChange(curItem, 'operator'),
              curItem,
              stepIndex < 1,
            )
          ) : (
            <div style={{ margin: '0 5px' }}>
              <Select
                placeholder="请选择操作符"
                size={size}
                disabled={isSequenceInput && stepIndex < 1}
                value={__oper}
                onChange={genOnChange(curItem, 'operator')}
                options={operatorOptions}
                style={{ width: '100%' }}
              />
            </div>
          )}
        </Form.Item>
        <Form.Item
          help={isEmpty(__value) && isShowErr ? '值不能为空' : undefined}
          validateStatus={isEmpty(__value) && isShowErr ? 'error' : undefined}
        >
          {valueRender ? (
            valueRender(
              __value,
              genOnChange(curItem, 'value'),
              curItem,
              stepIndex < 2,
            )
          ) : (
            <Input
              placeholder="多个请用英文下的,隔开"
              style={{ flex: 1 }}
              size={size}
              disabled={isSequenceInput && stepIndex < 2}
              value={__value}
              onChange={(e) => genOnChange(curItem, 'value')(e.target.value)}
            />
          )}
        </Form.Item>
        <CloseOutlined
          style={{ margin: '10px 5px', cursor: 'pointer' }}
          onClick={() => {
            Modal.confirm({
              title: '提示',
              content: '该操作会删除该条件，是否继续？',
              onOk: delFn,
            });
          }}
        />
      </div>
    );
  };

  const renderWrap = function (
    curItem: StandardValue,
    isWrap: boolean,
    curDepth: number = 0,
    delFn?: () => void,
  ) {
    return (
      <div
        style={{ ['--vis-size' as string]: sizeMb[size] }}
        className={
          isWrap ? prefixClass + 'item-wrap-child' : prefixClass + 'item-wrap'
        }
      >
        <div className={prefixClass + 'header-filter'}>
          {isWrap && (
            <CloseOutlined
              className={prefixClass + 'icon-close'}
              onClick={() => {
                Modal.confirm({
                  title: '提示',
                  content: '该操作会删除该分组，是否继续？',
                  onOk: delFn,
                });
              }}
            />
          )}
          <Select
            placeholder="请选择"
            defaultValue={defaultConnect}
            value={getValue(curItem, 'connect')}
            className={prefixClass + 'condition-select'}
            options={connectOptions}
            onChange={genOnChange(curItem, 'connect')}
            size={size}
          />
          <span className={prefixClass + 'rg-btn-wrap'}>
            <Button
              type="link"
              size={size}
              onClick={() => {
                if (required && !isCheckPass.current) {
                  message.info('请先输入相关参数后再试!');
                  setShowErr(true);
                  return;
                }
                if (!getValue(curItem, 'exprs')) {
                  genOnChange(curItem, 'exprs')([]);
                }
                getValue(curItem, 'exprs')?.push({});
                refresh();
              }}
            >
              +字段条件
            </Button>
            {curDepth < depth && (
              <Button
                type="link"
                size={size}
                onClick={() => {
                  if (required && !isCheckPass.current) {
                    message.info('请先输入相关参数后再试!');
                    setShowErr(true);
                    return;
                  }
                  let _item: StandardValue = {
                    connect: 'AND',
                  };
                  genOnChange(_item, 'exprs')([]);
                  if (!getValue(curItem, 'exprs')) {
                    genOnChange(curItem, 'exprs')([]);
                  }
                  getValue(curItem, 'exprs')?.push(_item);
                  refresh();
                }}
              >
                +逻辑组
              </Button>
            )}
          </span>
        </div>
        {getValue(curItem, 'exprs')?.map((i: StandardValue, idx: number) => {
          const del = () => {
            getValue(curItem, 'exprs')?.splice(idx, 1);
            refresh();
          };
          return getValue(i, 'exprs') ? (
            renderWrap(i, true, curDepth + 1, del)
          ) : (
            <div className={prefixClass + 'body-filter'}>
              {renderItem(i, del)}
            </div>
          );
        })}
      </div>
    );
  };
  return renderWrap(_value, false, 1);
};

export const StandardValue = (_: StandardValue) => <></>;
export const CondRef = (_: CondRef['current']) => <></>;
