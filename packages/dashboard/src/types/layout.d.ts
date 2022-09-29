
declare interface MyGridItem {
  x: number;
  y: number;
  w: number;
  h: number;
  config: CompConfig;
  marginTop?: number;
  suggestHeight?: number;
  i: string;
  static?: boolean;
  saveTime?: string;
  headerShow?: boolean;
}
declare interface BorderItem {
  color: string;
  show: boolean;
  width: number;
}
declare interface PaddingConfig {
  bottom: number;
  left: number;
  right: number;
  top: number;
}
declare interface MutiComp {
  config: PanelItem[];
  height: number;
  type: 'accordion' | 'tab';
}
declare interface CompConfig {
  config?: PanelItem[];
  background?: {
    bgColor?: string;
    bgMode?: string;
    url?: string | undefined;
  };
  base: {
    description: string;
    name: string;
    show: boolean;
    template: '';
  };
  headerShow: boolean;
  more: {
    query: {};
    time: boolean;
    url: string;
  };
  paddingLeft: 20;
  paddingRight: 20;
  panelList: PanelItem[];
}
declare interface PanelItem {
  api?: '';
  data?: any;
  text: string;
  type: 'accordion' | 'tab';
  config: Array<CompItem | CompConfig>;
}
declare interface ChartClickItem {
  open?: boolean;
  query: Record<string, any>;
  time?: boolean;
  type?: string;
  url?: string;
  key: string;
}
declare interface CompItem {
  borderBottom: BorderItem;
  borderLeft: BorderItem;
  borderRight: BorderItem;
  borderTop: BorderItem;
  useEmpty: boolean;
  uuid: string;
  type: string;
  api: string;
  query: {};
  loadding?: boolean;
  background: {
    bgMode: 'color'|'url';
    bgColor: string;
    url: string;
  };
  transferConfig: {};
  chartClick: ChartClickItem[] | ChartClickItem;
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  content: any; // 高级配置
  data: StandardData; // 数据
  dataModel: any; // 数据模型
  operationModel: any; // 业务模型
  dependence?: {
    links?: string[];
    open: boolean;
  };
  height: number;
  layout: number;
  mode: 'data' | 'api' | 'dataModel';
  noBaseSet?: false;
  noData: false;
  originData?: StandardData; // 数据
  static: any; // 静态数据
  [string]: any;
}

declare interface HeaderConfig { // 头部组件配置
  background?: CompConfig['background'];
  config: CompItem[];
  title: string;
}

declare type EmitFn = (comp: CompItem, item: Record<string, any>, index: number) => void;
