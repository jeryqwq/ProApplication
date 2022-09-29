import { dataModelData } from './dataModel';

export const defaultPanel: MyGridItem = {
  config: {
    background: {
      bgColor: '',
      bgMode: '',
      url: undefined,
    },
    base: {
      description: '',
      name: '',
      show: true,
      template: '',
    },
    headerShow: true,
    more: {
      query: {},
      time: true,
      url: '',
    },
    paddingLeft: 20,
    paddingRight: 20,
    panelList: [],
  },
  i: '',
  x: 0,
  y: Infinity,
  w: 6,
  h: 30,
};

export const defaultConfig: CompItem = { // 默认的组件配置项
  uuid: '',
  mode: 'api',
  data: {
    columnList: [],
    data: [],
  },
  static: {},
  api: '',
  query: {},
  layout: 24,
  height: 200,
  noData: false,
  transferConfig: {},
  type: '',
  content: {},
  chartClick: [],
  useEmpty: true,
  padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  borderTop: {
    show: false,
    color: '#ecf0f6',
    width: 1,
  },
  borderRight: {
    show: false,
    color: '#ecf0f6',
    width: 1,
  },
  borderBottom: {
    show: false,
    color: '#ecf0f6',
    width: 1,
  },
  borderLeft: {
    show: false,
    color: '#ecf0f6',
    width: 1,
  },
  background: {
    bgMode: 'color',
    bgColor: '#fff',
    url: '',
  },
  dataModel: dataModelData,
  operationModel: {
    id: '',
    dataModel: {},
    transferConfig: {},
  },
};
