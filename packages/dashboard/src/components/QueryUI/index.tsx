import React, { useEffect, useRef, useState } from 'react';
import { ProForm, ProFormGroup, ProFormInstance, ProFormList, ProFormText } from '@ant-design/pro-components';

function QueryUi({ value = {}, onChange }: { value: Record<string, any>; onChange: (_: Record< string, any>) => void }) {
  const actionRef = useRef<ProFormInstance>();
  useEffect(() => {
    const temp = Object.keys(value || {}).map((i, idx) => ({
      value: value[i],
      label: i,
    }));
    actionRef.current?.setFieldsValue({ querys: temp });
  }, [value]);
  return (
    <div style={{ width: '100%' }}>
      <ProForm
        formRef={actionRef}
        omitNil={false}
        onValuesChange={(_, values) => {
          const { querys } = _;
          const temp = {};
          values.querys?.forEach((i) => {
            i.label && (temp[i.label] = i.value);
          });
          const item = querys[querys.length - 1] || {};
          item.label !== '' && item.value !== '' && onChange(temp);
        }}
        submitter={false}
        grid
        autoFocusFirstInput={false}
      >
        <ProFormList
          name="querys"
          initialValue={Object.keys(value || {}).map((i, idx) => ({
            value: value[i],
            label: i,
          }))}
          creatorButtonProps={{
            creatorButtonText: '新增',
          }}
          creatorRecord={{
            lable: '',
            value: '',
          }}
        >
          <ProFormGroup colProps={{ span: 24 }}>
            <ProFormText
              name={'label'}
              label="key"
              colProps={{ span: 12 }}
            />
            <ProFormText
              name={'value'}
              label="value"
              colProps={{ span: 12 }}
            />
          </ProFormGroup>
        </ProFormList>
      </ProForm>
    </div>
  );
}

export default QueryUi;
