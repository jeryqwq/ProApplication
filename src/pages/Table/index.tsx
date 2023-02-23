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
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: '此项为必填项',
                },
              ],
            },
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
        request={async (url: string, requestOpt: any) => {
          // 编辑,删除调用
          console.log(url, requestOpt);
        }}
        tableRequest={async (pageInfo, sort, filter) => {
          // 表格查询
          console.log(pageInfo, sort, filter);
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
      <pre className="bg-white">{`<VisCRUD<{ name: string; type: 'a' | 'b' }>
        prefixApi="/a/b"
        columns={[
          {
            title: '名称',
            dataIndex: 'name',
            valueType: 'text',
            formItemProps: {
              rules: [
                {
                  required: true,
                  message: '此项为必填项',
                },
              ],
            },
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
        request={async (url: string, requestOpt: any) => {
          // 编辑,删除调用
          console.log(url, requestOpt);
        }}
        tableRequest={async (pageInfo, sort, filter) => {
          // 表格查询
          console.log(pageInfo, sort, filter);
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
      />`}</pre>
    </div>
  );
};
