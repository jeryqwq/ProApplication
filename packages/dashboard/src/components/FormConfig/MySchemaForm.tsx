/* eslint-disable max-len */
import { ProFormColumnsType, ProFormSelect,
  BetaSchemaForm,
  ProProvider,
} from '@ant-design/pro-components';
import React, { useContext, useRef, useState } from 'react';

export interface TableListItem {
  key: number;
  name: string;
  status: Array<{
    label: string | number;
    value: number;
  }>;
}
interface MySchemaFormProps {
  formProps:
  {
    initialValue?: any;
    columns: Array<ProFormColumnsType<TableListItem, 'refresh' >>;
    [_: string]: any;
  };
}
export default ({ formProps: { initialValue, columns, layout, ...other } }: MySchemaFormProps) => {
  const values = useContext(ProProvider);
  return (
    <ProProvider.Provider
      value={{
        ...values,
        valueTypeMap: {
          refresh: {
            render: (text) => <a>{text}</a>,
            renderFormItem: (text, props) => {
              console.log(text, props);
              return (
                <ProFormSelect
                  options={[
                    { label: '自动刷新关闭', value: 'close' },
                    { label: '15秒', value: '15' },
                    { label: '1分钟', value: '60' },
                    { label: '5分钟', value: '300' },
                    { label: '15分钟', value: '900' },
                  ]}
                  {...props?.fieldProps}
                />
              );
            },
          },
        },
      }}
    >
      <BetaSchemaForm<TableListItem, 'refresh'>
        initialValues={initialValue}
        layoutType={other?.layoutType}
        columns={columns}
        layout={layout}
        autoFocusFirstInput={false}
        {...other}
      />
    </ProProvider.Provider>
  );
};
