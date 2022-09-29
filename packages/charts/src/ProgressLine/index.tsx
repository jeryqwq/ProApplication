import { ConfigProvider } from 'antd';
import { useContext } from 'react';
import './index.less';
export default () => {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefix = getPrefixCls('vis-progress-line');
  return <div className={prefix}> 200 11</div>;
};
