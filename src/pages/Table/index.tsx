import React from 'react';
import { VisCRUD } from '@vis/common';
export default () => {
  return (
    <div>
      <VisCRUD<{ name: string; type: 'a' | 'b' }>
        prefixApi="/a/b"
        columns={[
          {
            title: '名称',
            dataIndex: 'name',
            valueType: 'text',
          },
          {
            title: '类型',
            dataIndex: 'type',
            valueType: 'select',
            valueEnum: {
              a: '选项1',
              b: '选项2',
            },
          },
        ]}
        tableRequest={async () => {
          return Promise.resolve({
            total: 30,
            data: [
              {
                name: 'name1',
                id: 1,
              },
              {
                name: 'name2',
                id: 2,
              },
            ],
            success: true,
          } as any);
        }}
      />
    </div>
  );
};
