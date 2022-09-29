import { ProForm, ProFormDependency, ProFormDigit, ProFormGroup, ProFormSelect, ProFormSwitch, ProFormText } from '@ant-design/pro-components';
import React from 'react';
import QueryUi from '../QueryUI';

declare interface ConfigProps { type: string; value?: any; onChange: (_: any) => void; others?: Record<string, React.ReactNode>}
const timeOptions = [
  {
    value: 'date',
    label: '日期',
  },
  {
    value: 'week',
    label: '周',
  },
  {
    value: 'month',
    label: '月',
  },
  {
    value: 'quarter',
    label: '季度',
  },
  {
    value: 'year',
    label: '年份输入',
  }];
function FormConfig({ type, value, onChange, others }: ConfigProps) {
  console.log(type);
  return (
    <ProForm initialValues={value} submitter={false} autoFocusFirstInput={false} grid onValuesChange={onChange} omitNil={false} >
      {
        {
          refresh: null,
          dateRange: (
            <>
              <ProFormSelect
                options={timeOptions}
                label="日期范围类型"
                placeholder={'年份，月份，周，日期'}
                name={['fieldProps', 'picker']}
                colProps={{ span: 12 }}
              />
              <ProFormSwitch name={['fieldProps', 'bordered']} label="是否展示边框" initialValue colProps={{ span: 12 }} />
              <ProFormSwitch name={['fieldProps', 'showTime']} label="日期时间" colProps={{ span: 12 }} />
            </>
          ),
          date: (
            <>
              <ProFormSelect
                options={timeOptions}
                label="日期类型"
                placeholder={'年份，月份，周，日期'}
                name={['fieldProps', 'picker']}
                colProps={{ span: 12 }}
              />
              <ProFormSwitch name={['fieldProps', 'bordered']} label="是否展示边框" initialValue colProps={{ span: 12 }} />
              <ProFormSwitch name={['fieldProps', 'showTime']} label="日期时间" colProps={{ span: 12 }} />
            </>
          ),
          textarea: (
            <>
              <ProFormDigit name={['fieldProps', 'rows']} label="行数" colProps={{ span: 12 }} />
              <ProFormDigit name={['fieldProps', 'maxLength']} label="文字最大长度" colProps={{ span: 12 }} />
            </>
          ),
          money: (
            <>
              <ProFormDigit name={['fieldProps', 'max']} label="最大值" colProps={{ span: 12 }} />
              <ProFormDigit name={['fieldProps', 'min']} label="最小值" colProps={{ span: 12 }} />
              <ProFormDigit name={['fieldProps', 'decimalSeparator']} label="小数点" colProps={{ span: 12 }} />
              <ProFormDigit name={['fieldProps', 'defaultValue']} label="初始值" colProps={{ span: 12 }} />
            </>
          ),
          select: (
            <>
              <ProFormSwitch name={['fieldProps', 'autoClearSearchValue']} label="选中后清空" colProps={{ span: 12 }} />
              <ProFormSwitch name={['fieldProps', 'showSearch']} label="可搜索选项" colProps={{ span: 12 }} />
              <ProFormSelect
                name={['fieldProps', 'mode']}
                label="选择模式"
                colProps={{ span: 12 }}
                options={[
                  {
                    label: '多选模式',
                    value: 'mutiple',
                  }, {
                    label: '标签',
                    value: 'tag',
                  },
                ]}
              />
              <ProFormText label="选项来源接口" name="api" colProps={{ span: 12 }} />
              <ProFormDependency name={[['api']]}>
                {({ api }) => {
                  return !api &&
                  <ProFormGroup label="配置枚举">
                    <QueryUi
                      value={value.valueEnum}
                      onChange={(val) => {
                        onChange({ valueEnum: val });
                      }}
                    />
                  </ProFormGroup>;
                }}
              </ProFormDependency>
            </>
          ),
          checkbox: (
            <>
              <ProFormGroup label="配置枚举">
                <QueryUi
                  value={value.valueEnum}
                  onChange={(val) => {
                    onChange({ valueEnum: val });
                  }}
                />
              </ProFormGroup>
            </>
          ),
          cascader: (
            <>
              <ProFormText name="placeholder" label="提示文本" />
              <ProFormText name="cascaderPidKey" label="父级ID" colProps={{ span: 12 }} />
              <ProFormText name="cascaderValueKey" label="值" colProps={{ span: 12 }} />
              <ProFormText name="cascaderLabelKey" label="标签" colProps={{ span: 12 }} />
              <ProFormText name="cascaderChildrenKey" label="子选项" colProps={{ span: 12 }} />
              <ProFormSwitch name="cascaderCheckStrictly" label="选择任意一级选项" colProps={{ span: 12 }} />
              <ProFormSwitch name="cascaderIsLazyload" label="数据懒加载" colProps={{ span: 12 }} />
              <ProFormSwitch name="cascaderClearable" label="支持清空选项" colProps={{ span: 12 }} />
              <ProFormSwitch name="cascaderFilterable" label="可搜索选项" colProps={{ span: 12 }} />
              <ProFormSwitch name="cascaderMultiple" label="多选模式" colProps={{ span: 12 }} />
              <ProFormSwitch name="cascaderShowAllLevels" label="显示完整的路径" colProps={{ span: 12 }} />
              <ProFormText label="选项来源接口" name="cascaderApi" colProps={{ span: 12 }} />
            </>
          ),
          radio: (
            <>
              <ProFormGroup label="配置枚举">
                <QueryUi
                  value={value.valueEnum}
                  onChange={(val) => {
                    onChange({ valueEnum: val });
                  }}
                />
              </ProFormGroup>
            </>
          ),
          radioButton: (
            <>
              <ProFormGroup label="配置枚举">
                <QueryUi
                  value={value.valueEnum}
                  onChange={(val) => {
                    onChange({ valueEnum: val });
                  }}
                />
              </ProFormGroup>
            </>
          ),
          treeSelect: (
            <>
              <ProFormSwitch name={['fieldProps', 'autoClearSearchValue']} label="选中后清空" colProps={{ span: 12 }} />
              <ProFormSwitch name={['fieldProps', 'showSearch']} label="可搜索选项" colProps={{ span: 12 }} />
              <ProFormSwitch name={['fieldProps', 'treeCheckable']} label="开启选择" colProps={{ span: 12 }} />
              <ProFormSwitch name={['fieldProps', 'multiple']} label="多选" colProps={{ span: 12 }} />
              <ProFormText tooltip="接口数据格式参考TreeSelect treeData 格式{ value, label, children }" label="选项来源接口" name="api" colProps={{ span: 12 }} />
            </>
          ),
          rate: (
            <>
              <ProFormSwitch name={['fieldProps', 'allowHalf']} label="是否允许半选" colProps={{ span: 12 }} />
              <ProFormDigit name={['fieldProps', 'count']} label="start总数" colProps={{ span: 12 }} />
            </>
          ),
          digit: (
            <>
              <ProFormDigit name={['fieldProps', 'max']} label="最大值" colProps={{ span: 12 }} />
              <ProFormDigit name={['fieldProps', 'min']} label="最小值" colProps={{ span: 12 }} />
              <ProFormDigit name={['fieldProps', 'decimalSeparator']} label="小数点" colProps={{ span: 12 }} />
              <ProFormDigit name={['fieldProps', 'defaultValue']} label="初始值" colProps={{ span: 12 }} />
              <ProFormSwitch name={['fieldProps', 'keyboard']} label="启用键盘快捷行为" colProps={{ span: 12 }} />
              <ProFormSwitch name={['fieldProps', 'controls']} label="是否显示增减" colProps={{ span: 12 }} />
            </>
          ),
          ...others,
        }[type]
      }
    </ProForm>
  );
}

export default FormConfig;
