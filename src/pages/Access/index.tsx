import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Button } from 'antd';
import { useState } from 'react';

const AccessPage: React.FC = () => {
  const access = useAccess();
  const [count, setCount] = useState(0)
  return (
    <Access accessible={access.canSeeAdmin}>
      <Button onClick={() => {
        setCount(count + 1)
      }}>只有 Admin 可以看到这个按钮{ count } </Button>
    </Access>
  );
};

export default AccessPage;
