import { ProForm, ProFormText } from '@ant-design/pro-components';
import { isBrowser, nanoid } from '@vis/utils';
import { ConfigProvider } from 'antd';
import { useContext } from 'react';
import './index.module.less';
export const Test = () => {
  console.log(isBrowser());
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefix = getPrefixCls('vis-test');
  return (
    <h1 className={prefix}>
      {nanoid()}--testComp
      <ProForm>
        <ProFormText name="test" label="editText" />
      </ProForm>
    </h1>
  );
};
export default Test;
