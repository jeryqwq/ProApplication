import { Avatar, Dropdown } from 'antd';

export default () => {
  return (
    <>
      <Dropdown
        menu={{
          items: [
            {
              label: <a>我的部门</a>,
              key: '0',
            },
            {
              label: <a>个人信息</a>,
              key: '0',
            },
            {
              label: <a>设置</a>,
              key: '1',
            },
            {
              type: 'divider',
            },
            {
              label: '退出',
              key: '3',
            },
          ],
        }}
        trigger={['hover']}
      >
        <span className="header-icon-wrap">
          <span className="anticon">{'Chencc'}</span>
          <Avatar src="" />
        </span>
      </Dropdown>
    </>
  );
};
