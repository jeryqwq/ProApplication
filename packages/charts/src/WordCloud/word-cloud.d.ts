export interface DIRECTION {
  RIGHT2LEFT: 1;
  LEFT2RIGHT: -1;
  TOP2BOTTOM: 2;
  BOTTOM2TOP: -2;
}

export declare const TEXT_ORIENTATION: {
  HORIZONTAL: 0; // 横向
  VERTICAL: 1; // 竖
  RANDOM: 2; // 随机
};
export declare const RENDER_MODE: {
  SCROLL: 1;
  NORMAL: 2;
};
declare interface Options {
  el: HTMLElement;
  data: OptionData;
  config: Config;
  hooks?: Hooks;
}

declare type OptionData = DataItem[];

declare interface Config {
  /**  RENDER_MODE.SCROLL | NORMAL 渲染模式 滚动模式 ｜ 普通模式 */
  mode: number,
  /**  TEXT_ORIENTATION.HORIZONTAL | VERTICAL 文字方向 */
  orientation?: 0 | 1 | number;
  /**  单项间隔 */
  spiralLimit?: number;
  /**  字体 */
  font?: string;
  /**  文字fontSize的范围， 12 - xx */
  sizeRange?: Record<0 | 1, number>;
  sizeMax?: number;
  sizeMin?: number;
  /**  单项的渲染函数，可以自定义渲染，返回dom */
  renderFn?: (item: any) => HTMLElement;
  /**  滚动速度 */
  speed?: number;
  /**  颜色，仅在普通模式 => 颜色模式为范围模式下生效 */
  color?: any[string];
  /**  颜色，仅在普通模式 => 颜色模式为索引模式下生效， 给每个分段的值确定一个颜色 */
  colors?: Array<{ from: number; to: number; color: string; name: string }>;
  gridSize?: 27; // 字符间隔
  /** 边框色 */
  borderColor?: 'rgba(105,207,255)';
  /** 边框宽度 */
  borderWidth?: 2;
  /** 背景色 */
  backgroundColor?: 'rgba(16,22,24)';
  /** 是否开启动画 */
  animate?: boolean;
  /** 文字padding，[左右，上下] */
  padding?: [10, 17];
  /** 事件，传递当前项, 如{ click: (item) => {} } */
  events?: Record<string, (item: any, e: Event) => void>;
  tooltip?: {
    /** 是否展示tooltip */
    show: boolean;
    /** 渲染函数 */
    render: (item: any, elWrap: HTMLElement) => string | HTMLElement;
    /** 与上级padding同理 */
    padding: [15, 35];
    /** 背景色 */
    backgroundColor: 'rgba(50,50,50,0.7)';
    /** 边框 */
    borderRadius: 0;
    /** 文字样式 */
    textStyle: {
      color: '#fff';
      fontFamily: 'Microsoft YaHei';
      fontSize: 14;
      // eslint-disable-next-line @iceworks/best-practices/recommend-add-line-height-unit
      lineHeight: 30;
    };
    /** 背景样式 */
    bgStyle?: {
      width: 0;
      height: 0;
      url: '';
    };
    /** 自定义innerHtml */
    extraCssText?: '';
    /**  */
    tooltipEditor?: '';
  };
  [key: string]: any;
}
declare interface DataItem {
  value: number;
  name: string;
  x?: number;
  y?: number;
  z?: number;
  el?: HTMLElement;
  direction?: boolean;
}
interface WordChartBase {
  getValue: (_: number) => number;
  elMap: WeakMap<HTMLElement, DataItem>;
  el: HTMLElement;
  value: OptionData;
  sortValue: OptionData;
  maxValue: number;
  elRect: DOMRect;
  RADIUSX: number;
  RADIUSY: number;
  DIRECTION: DIRECTION;
  speed: number;
  getSpiral: (_: number) => [number, number];
  config: Config;
  elWrap: HTMLElement;
  layout: any;
  setActive: (item: any, el: HTMLElement, e: MouseEvent) => void;
  clearActive: Function;
  active?: any;
  destory: Function;
  domLocations: DOMRect[];
}
declare interface Hooks {
  scan?: (...args: [DataItem, number, WordChartBase]) => typeof args;
  animate?: (_: OptionData) => void;
  effect?: (_: any) => void;
  finally?: (_: WordChartBase) => void;
}

export declare const COLOR_MODE: {
  RANGE: 'RANGE'; // 根据值范围渲染颜色
  INDEX: 'INDEX'; // 根据下标索引渲染颜色
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function init(_: Options): {};
