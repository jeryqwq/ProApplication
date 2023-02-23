import { VisHeader } from '@vis/common';
import React from 'react';
import { history } from '@umijs/max';

function Space1() {
  return (
    <div style={{ display: 'flex', height: 2000 }}>
      <VisHeader
        style={{ width: 200, marginRight: '10px' }}
        tabs={[
          {
            title: 'SQL视图',
            key: '1',
            content: <div style={{ height: 200, background: 'white' }}></div>,
          },
        ]}
      />
      <VisHeader
        tabs={[
          {
            title: '表视图',
            key: '1',
            content: (
              <div style={{ height: 400, background: 'white' }}>
                <div>Table View</div>
              </div>
            ),
          },
          {
            title: 'SQL视图',
            key: '2',
            content: (
              <div style={{ height: 400, background: 'white' }}>
                <div>SQL View</div>
              </div>
            ),
          },
        ]}
        tabBarExtraContent={
          <span onClick={() => history.push('/test')}>🫱点我跳转</span>
        }
      >
        {(item) => {
          return <div>{item?.content}</div>;
        }}
      </VisHeader>
    </div>
  );
}

export default Space1;
