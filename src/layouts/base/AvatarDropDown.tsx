import { Avatar, Dropdown } from 'antd';

export default () => {
  return (
    <>
      <Dropdown
        menu={{
          items: [
            {
              label: <a href="https://www.antgroup.com">1st menu item</a>,
              key: '0',
            },
            {
              label: <a href="https://www.aliyun.com">2nd menu item</a>,
              key: '1',
            },
            {
              type: 'divider',
            },
            {
              label: '3rd menu item',
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
