export const valueTypeArray = [
  {
    value: 'digit',
    label: '数字输入框',
  },
  {
    value: 'password',
    label: '密码输入框',
  }, {
    value: 'money',
    label: '金额输入框',
  },
  {
    value: 'textarea',
    label: '文本域',
  },
  {
    value: 'time',
    label: '时间',
  },
  {
    value: 'timeRange',
    label: '时间区间',
  },
  {
    value: 'date',
    label: '日期(统称)',
  },
  {
    value: 'dateRange',
    label: '日期区间',
  },
  {
    value: 'text',
    label: '文本框',
  },
  {
    value: 'select',
    label: '下拉框',
  },
  {
    value: 'color',
    label: '颜色选择器',
  },
  {
    value: 'treeSelect',
    label: '树形下拉框',
  },
  {
    value: 'switch',
    label: '开关',
  },
  {
    value: 'checkbox',
    label: '多选框',
  },
  {
    value: 'radio',
    label: '单选框',
  },
  {
    value: 'radioButton',
    label: '单选按钮',
  },
  {
    value: 'rate',
    label: '星级组件',
  },
  {
    value: 'indexBorder',
    label: '边框索引',
  },
  {
    value: 'progress',
    label: '进度(仅展示)',
  },
  {
    value: 'second',
    label: '秒格式化',
  }, {
    value: 'avatar',
    label: '头像',
  }, {
    value: 'code',
    label: '代码框',
  },
  {
    value: 'fromNow',
    label: '相对于当前时间',
  },
  {
    value: 'image',
    label: '图片',
  }, {
    value: 'jsonCode',
    label: 'JSON',
  },

];
export const initData = {
  bordered: true,
  loading: false,
  pagination: {
    show: true,
    pageSize: 5,
    current: 1,
    total: 100,
  },
  size: 'small',
  expandable: false,
  headerTitle: '高级表格',
  tooltip: '高级表格 tooltip',
  showHeader: true,
  footer: true,
  rowSelection: {},
  scroll: false,
  hasData: true,
  tableLayout: undefined,
  toolBarRender: true,
  search: {
    show: true,
    span: 12,
    collapseRender: true,
    labelWidth: 80,
    filterType: 'query',
    layout: 'horizontal',
  },
  options: {
    show: true,
    density: true,
    fullScreen: true,
    setting: true,
  },
};
