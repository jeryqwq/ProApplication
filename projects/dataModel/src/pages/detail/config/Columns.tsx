import { Button, Collapse } from "antd"
import { SettingOutlined, DragOutlined } from '@ant-design/icons'
const { Panel } = Collapse;

export default () => {
  return <div className="dismen-wrap">
    <div className="action-wrap">
      <Button size='small'>数据筛选器(2)</Button>
      <Button size='small' style={{margin: '0 5px'}}>数据行权限(1)</Button>
      <Button size='small'>同步表结构</Button>
    </div>
    <div className="content-menu-wrap">
      <div className="dis item">
        <div className="header">
          纬度
          <div className="btns">
            <Button type='link'>新增维度</Button>
            <Button type='link'>创建文件夹</Button>
          </div>
        </div>
        <Collapse defaultActiveKey={['1']} ghost className="collapse-dis-mea">
          <Panel header="ThisACT" key="1">
            {
              [1,1,1,1,1].map(i => <div className="dis-mea-item">123 <a><SettingOutlined /></a> <a className="drag"><DragOutlined /></a></div>)
            }
          </Panel>
          <Panel header="This " key="2">
          {
              [1,1,1,1,1].map(i => <div className="dis-mea-item">123 <a><SettingOutlined /></a> <a className="drag"><DragOutlined /></a></div>)
            }
          </Panel>
          <Panel header="panel header 3" key="3">
          {
            [1,1,1,1,1].map(i => <div className="dis-mea-item">123 <a><SettingOutlined /></a> <a className="drag"><DragOutlined /></a></div>)
          }
          {
            [1,1,1,1,1].map(i => <div className="dis-mea-item">123 <a><SettingOutlined /></a> <a className="drag"><DragOutlined /></a></div>)
          }
          </Panel>
        </Collapse>
      </div>
      <div className="mea item">
        <div className="header">
            度量
            <div className="btns">
              <Button type='link'>新增度量</Button>
              <Button type='link'>创建文件夹</Button>
            </div>
        </div>
        <Collapse defaultActiveKey={['1']} ghost className="collapse-dis-mea">
          <Panel header="ThisACT" key="1">
            {
              [1,1,1,1,1].map(i => <div className="dis-mea-item">123 <a><SettingOutlined /></a> <a className="drag"><DragOutlined /></a></div>)
            }
          </Panel>
          <Panel header="This " key="2">
          {
              [1,1,1,1,1].map(i => <div className="dis-mea-item">123 <a><SettingOutlined /></a> <a className="drag"><DragOutlined /></a></div>)
            }
          </Panel>
          <Panel header="panel header 3" key="3">
          {
              [1,1,1,1,1].map(i => <div className="dis-mea-item">123 <a><SettingOutlined /></a> <a className="drag"><DragOutlined /></a></div>)
            }
          </Panel>
        </Collapse>
      </div>
    </div>
  </div>
}
