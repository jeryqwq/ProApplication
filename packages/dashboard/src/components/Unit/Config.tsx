import { FormInstance, ProForm, ProFormDigit, ProFormSwitch } from '@ant-design/pro-components';
import React, { useRef } from 'react';
import FontSetting from '../FontSetting';


declare interface UnitType {
  color: string;
  fontFamily: string;
  fontSize: number;
  fontWeight?: string;
  marginLeft: number;
}
function Config({ value, onChange }: { value: UnitType; onChange: (_: UnitType) => void }) {
  const formRef = useRef<FormInstance>();
  return (
    <ProForm<UnitType>
      formRef={formRef}
      initialValues={value}
      grid
      omitNil={false}
      submitter={false}
      autoFocusFirstInput={false}
      onValuesChange={(values) => {
        onChange(values);
      }}
    >
      <ProFormSwitch name="numberConversion" label="单位转换" colProps={{ span: 24 }} />
      <ProFormDigit name="pointLength" label="保留小数位数" colProps={{ span: 12 }} />
      <FontSetting
        style={value}
        onChange={(val) => {
          const values = formRef.current?.getFieldsValue();
          onChange({ ...values, ...val });
        }}
      />
    </ProForm>
  );
}

export default Config;
