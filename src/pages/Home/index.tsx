import { Workspace } from '@vis/common';
import { Button } from 'antd';
import styles from './index.module.less';
import Space1 from './Space1';
import Space2 from './Space2';
const HomePage: React.FC = (props) => {
  return (
    <div className={styles.container}>
      <Workspace
        isUrlState
        showBread
        fixHeader
        footer={
          <Button.Group>
            <Button type="primary" style={{ marginRight: 10 }}>
              保存
            </Button>
            <Button type="primary">返回</Button>
          </Button.Group>
        }
        breadcrumb={{
          routes: [
            { path: '/home', breadcrumbName: '主页面包屑', children: [] },
          ],
        }}
        desc="初始化demo，用来展示workSpace的基本用法, 面包屑只在多层开启，单层需要手动配置"
        formProps={{
          size: 'small',
        }}
        formColumns={[
          {
            title: '标题',
            dataIndex: 'title',
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: '此项为必填项',
                },
              ],
            },
            width: 's',
            colProps: {
              xs: 24,
              md: 12,
            },
          },
          {
            title: '状态',
            dataIndex: 'state',
            valueType: 'select',
            valueEnum: { a: 1, b: 2 },
            width: 's',
            colProps: {
              xs: 24,
              md: 12,
            },
          },
        ]}
        tabs={[
          {
            key: '1',
            title: '工作区1',
            content: <Space1 />,
          },
          {
            key: '2',
            title: '工作区2',
            content: <Space2 />,
          },
        ]}
      />
    </div>
  );
};

export default HomePage;
