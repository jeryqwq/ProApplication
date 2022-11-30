import styles from './index.module.less';
import { VisHeader } from '@vis/components'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Columns from './Columns';
import DataResult from './DataResult';

export default () => {
  return <div className={styles.tableWrap}>
    <VisHeader
    tabBarExtraContent={ <div style={{marginRight: 10}}>1</div>}
      tabs={[{
        title: '数据模型设置',
        key: '1',
        content: <Columns />
      },
      {
        title: '查看数据',
        key: '2',
        content: <DataResult />
      }]}
    />
  </div>
}
