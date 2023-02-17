// @ts-nocheck
import {
  ActionType,
  BetaSchemaForm,
  ModalForm,
  ProColumns,
  ProFormColumnsType,
  ProFormInstance,
  ProFormProps,
  ProTable,
  ProTableProps,
} from '@ant-design/pro-components';
import React, { useCallback, useRef, useState } from 'react';
import { Button, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';

declare type VisPageProps<T> = {
  /** 新增， 编辑， 查询，表格列表, 默认表格使用该配置 */
  columns?: Array<ProColumns & ProFormColumnsType>;
  /** 单项数据编辑column */
  editColumns?: Array<ProColumns & ProFormColumnsType>;
  /** 自定义编辑处理函数 */
  editHandle?: (item: T) => void;
  /** 新增数据编辑column */
  addColumns?: Array<ProColumns & ProFormColumnsType>;
  /** 自定义新增处理函数 */
  addHandle?: () => void;
  /** table request 函数 */
  tableRequest?: ProTableProps<T, any>['request'];
  /** 项目的 axios request */
  request?: any;
  /** 统一url，/vis/dm/ 传入url前缀， 调用时自定追加 /query/page /delete /add */
  prefixApi?: string;
  /** 其它ProTable 的参数 */
  tableProps?: ProTableProps<T, any>;
  /** 新增表单的Props */
  addFormProps?: ProFormProps;
  /** 编辑表单的Props */
  editFormProps?: ProFormProps;
  /** 表格操作， 默认从左侧添加 */
  columnActions?: (item: T) => React.ReactNode;
  /** 新增表单底部操作按钮, getValue获取当前编辑表单的内容(不触发校验) */
  modalFooterAction?: (getValues: () => Partial<T>) => React.ReactNode;
  /** 当前编辑或者新增表单的ref，可以访问表单下的所有方法，取决于现在的状态是新增还是编辑 */
  formRef?: React.MutableRefObject<ActionType>;
  /**
   * @description key, 编辑时会从当前项key增加到参数内，也是table的rowKey
   * @default id
   */
  primaryKey?: string;
  /**
   * @description 展示表格删除按钮
   * @default true
   */
  showDeleteAction?: boolean;
  /**
   * @description 展示表格编辑按钮
   * @default true
   */
  showEditAction?: boolean;
  /**
   * @description 展示新增toolbar按钮
   * @default true
   */
  showAddToolbar?: boolean;
  /** 自定义toolbar操作 */
  toolBars?: React.ReactNode;
  /**
   * @description tableRef, 用来支持主动调用表格相关功能，如刷新，清空输入状态...
   */
  tableRef?: React.MutableRefObject<ActionType | undefined>;
  /**
   * @description 为所有CRUD接口添加自定义传参, 权重会大于其他参数，如表单填写
   * @default {}
   */
  requestParams?: Record<string, any>;
  /**
   * @description 为表格接口添加自定义传参, 权重会大于其他参数，如表单填写
   * @default {}
   */
  tableRequestParams?: Record<string, any>;
};

export const prefixCls = 'vis-comp-page';

const defaultColumns: Array<ProColumns & ProFormColumnsType> = [
  {
    title: '名称',
    dataIndex: 'name',
    valueType: 'text',
  },
  {
    title: '类型',
    dataIndex: 'type',
    valueType: 'text',
  },
];

function VisCRUD<T>({
  columns = defaultColumns,
  tableRequest,
  prefixApi = '/api/table',
  addFormProps = {},
  editFormProps = {},
  addColumns,
  editColumns,
  editHandle,
  addHandle,
  request = fetch,
  tableProps = {},
  columnActions,
  modalFooterAction,
  primaryKey = 'id',
  formRef,
  showDeleteAction = true,
  showEditAction = true,
  showAddToolbar = true,
  toolBars = [],
  tableRef,
  requestParams = {},
  tableRequestParams = {},
}: VisPageProps<T>) {
  const _formRef = useRef<ProFormInstance<T>>();
  const _tableRef = useRef<ActionType>();
  const [curEditItem, setCurEditItem] = useState<T>();
  const defaultRequest: ProTableProps<T, any>['request'] = useCallback(
    async (_props: T & { pageSize: number; current: number }) => {
      const { pageSize, current, ...query } = _props;
      const res = await request(prefixApi + '/query/page', {
        method: 'post',
        data: {
          pageIndex: current,
          pageSize,
          ...query,
          ...requestParams,
          ...tableRequestParams,
        },
      });
      return {
        total: res.total,
        data: res.records,
        success: true,
      };
    },
    [prefixApi, requestParams],
  );

  const actionColumn = {
    title: '操作',
    hideInSearch: true,
    render: (_text: any, item: T & { id: string }) => [
      columnActions?.(item),
      showEditAction &&
        (editHandle ? (
          <Button onClick={() => editHandle(item)} type="link">
            编辑
          </Button>
        ) : (
          <Button
            type="link"
            onClick={() => {
              setCurEditItem(item);
            }}
          >
            编辑
          </Button>
        )),
      showDeleteAction && (
        <Button
          danger
          type="text"
          onClick={() => {
            Modal.confirm({
              title: '提示',
              content: '该操作会删除该项数据，是否继续？',
              async onOk() {
                await request(prefixApi + '/delete', {
                  method: 'post',
                  data: {
                    ids: [item[primaryKey as 'id']],
                    ...requestParams,
                  },
                });
                message.success('删除成功!');
                (tableRef || _tableRef)?.current?.reloadAndRest?.();
              },
            });
          }}
        >
          删除
        </Button>
      ),
    ],
  };
  return (
    <div>
      <Modal
        title="编辑表单"
        open={!!curEditItem}
        onCancel={() => {
          setCurEditItem(undefined);
        }}
        destroyOnClose
        footer={[
          <span key={0}>
            {modalFooterAction?.(() =>
              (formRef || _formRef).current?.getFieldsValue(),
            )}
          </span>,
          <Button
            key={1}
            type="default"
            onClick={() => setCurEditItem(undefined)}
          >
            取消
          </Button>,
          <Button
            key={2}
            type="primary"
            onClick={async () => {
              const values = await (
                formRef || _formRef
              ).current?.validateFields();
              if (values) {
                await request(prefixApi + '/update', {
                  method: 'post',
                  data: {
                    ...values,
                    id: curEditItem.id,
                    ...requestParams,
                  },
                });
                message.success('编辑成功!');
                (tableRef || _tableRef)?.current?.reloadAndRest?.();
                setCurEditItem(undefined);
              }
            }}
          >
            确定
          </Button>,
        ]}
        width={800}
      >
        <BetaSchemaForm<T>
          columns={editColumns || columns}
          {...editFormProps}
          initialValues={curEditItem}
          formRef={formRef || _formRef}
          submitter={false}
        />
      </Modal>
      <ProTable
        columns={columns.concat(actionColumn)}
        request={tableRequest || defaultRequest}
        actionRef={tableRef || _tableRef}
        rowKey={primaryKey}
        toolBarRender={() => {
          return [
            ...toolBars,
            showAddToolbar &&
              (addHandle ? (
                <Button type="primary" onClick={addHandle}>
                  新增
                </Button>
              ) : (
                <ModalForm
                  title="新建表单"
                  modalProps={{
                    destroyOnClose: true,
                  }}
                  onFinish={async () => {
                    const values = await (
                      formRef || _formRef
                    ).current?.validateFields();
                    if (!isEmpty(values)) {
                      await request(prefixApi + '/add', {
                        method: 'post',
                        data: {
                          ...values,
                          ...requestParams,
                        },
                      });
                      message.success('新增成功!');
                      (tableRef || _tableRef)?.current?.reloadAndRest?.();
                      return true;
                    }
                  }}
                  trigger={
                    <Button
                      key="button"
                      onClick={() => {
                        formRef?.current &&
                          (formRef.current = (formRef || _formRef).current);
                      }}
                      icon={<PlusOutlined />}
                      type="primary"
                    >
                      新建
                    </Button>
                  }
                  submitter={{
                    render: (props, defaultDoms) => {
                      return [
                        modalFooterAction?.(() =>
                          (formRef || _formRef)?.current?.getFieldsValue(),
                        ),
                        ...defaultDoms,
                      ];
                    },
                  }}
                >
                  <BetaSchemaForm<T>
                    columns={addColumns || columns}
                    {...addFormProps}
                    submitter={false}
                    formRef={formRef || _formRef}
                  />
                </ModalForm>
              )),
          ];
        }}
        {...tableProps}
      />
    </div>
  );
}
export default VisCRUD;
