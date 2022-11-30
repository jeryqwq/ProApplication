import styles from './index.module.less';
import { VisHeader } from '@vis/components'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default () => {
  return <div className={styles.tableWrap}>
    <VisHeader
      tabs={[{
        title: '表视图',
        key: '1',
        content: <div className='content-wrap'>
          <Input allowClear placeholder='请输入表名搜索' size='small' prefix={<SearchOutlined />} style={{marginBottom: '10px'}}/>
          {
            [1,11,1,1,1,1].map(i => <div className="item">
               <div><span className='point'></span> COV 19</div>
               <div className='icon'>E</div>
            </div>)
          }
        
        </div>
      }]}
    />
  </div>
}
