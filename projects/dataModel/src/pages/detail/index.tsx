import styles from './index.module.less';
import { Workspace, VisHeader } from '@vis/components'
import TableView from './TableView';
import SqlView from './SqlView';
import { Button } from 'antd';
import TableGraph from './tableGraph/index';
import Config from './config';
export default () => {
  return <Workspace
      footer={[
        <Button>保存</Button>
      ]}
      desc="数据视图可以将需要的多张表视图、SQL视图关联成一张宽表，并进行需要的数据处理，以便于进行后续的数据可视化分析工作。"
      tabs={[
        {
          title: "安全告警可视化数据",
          key: 'index',
          content: <div className={styles.contentWrap}>
            <div className='lf'>
              <VisHeader
                tabs={[{
                  title: '数据源',
                  key: '1',
                  content: <div style={{ background:'white', padding: '10px', color: '#666666', fontSize: '12px' }}>
                    安全告警事件统计数据源Mysql3.0
                  </div>
                }]}
              />
              <TableView />
              <SqlView />
            </div>
            <div className="rg">
              <TableGraph />
              <Config />
            </div>
          </div>
        }
      ]}
    />
}
