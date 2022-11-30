import { ProForm, ProFormText } from '@ant-design/pro-components';
import { isBrowser, nanoid } from '@vis/utils';
import { ConfigProvider } from 'antd';
import { useContext } from 'react';
import './index.module.less';
import { BasicRingPie } from '@vis/charts'

export const Test = () => {
  console.log(isBrowser());
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefix = getPrefixCls('vis-test');

  // 测试环形饼图配置
  const pieData = [
    {
      name: 'www',
      value: 20
    },{
      name: 'eee',
      value: 30
    }
  ]
  const pieConfig = {
    data: pieData
  }

  return (
    <h1 className={prefix}>
      {nanoid()}--testComp
      <ProForm>
        <ProFormText name="test" label="editText" />
      </ProForm>
      {/* 环形饼图 */}
      <BasicRingPie {...pieConfig}/>
    </h1>
  );
};
export default Test;
