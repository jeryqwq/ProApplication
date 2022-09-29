/* eslint-disable */
const DIRECTION = {
  RIGHT2LEFT: 1,
  LEFT2RIGHT: -1,
  TOP2BOTTOM: 2,
  BOTTOM2TOP: -2,
};
const COLOR_MODE = {
  RANGE: 'RANGE',
  INDEX: 'INDEX', // 根据下标索引渲染颜色
};
const TEXT_ORIENTATION = {
  HORIZONTAL: 0,
  VERTICAL: 1,
  RANDOM: 2, // 随机
};
const MODE = {
  SCROLL: 1,
  NORMAL: 2,
};
const defaultOptions = {
  mode: MODE.NORMAL,
  orientation: TEXT_ORIENTATION.RANDOM,
  animate: true,
  color: [
    '#ff9ecc',
    '#00b6ff',
    '#f3bd00',
    '#884dff',
    '#d3f0ff ',
    '#5cc4ee',
    '#eadf2b',
    '#e1583e',
    '#05e1b5',
    '#3e61e1',
    '#884dff',
    '#c59eff',
    '#06b8d1',
  ],
  colors: [
    {
      from: 0,
      to: 60,
      name: '差',
      color: 'red',
    },
    {
      from: 61,
      to: 79,
      name: '良',
      color: 'blue',
    },
    {
      from: 80,
      to: 100,
      name: '优秀',
      color: 'green',
    },
  ],
  sizeMin: 12,
  sizeMax: 16,
  gridSize: 0,
  borderColor: 'rgba(105,207,255)',
  borderWidth: 0,
  backgroundColor: 'rgba(16,22,24,0)',
  padding: [0, 0],
  events: {
    // 自定义事件
    // click: (item: MappingDataItem, instance: WordChartBase) => {
    //   console.log(item, '----')
    // }
  },
  tooltip: {
    show: true,
    // render(item: MappingDataItem, el: HTMLElement) {
    //   return `<span style="color: red">${item.name}</span>`
    // },
    tooltipEditor: '',
    padding: [15, 35],
    backgroundColor: 'rgba(50,50,50,0.7)',
    borderRadius: 0,
    textStyle: {
      color: '#fff',
      fontFamily: 'Microsoft YaHei',
      fontSize: 14,
      lineHeight: 30,
    },
    bgStyle: {
      width: 0,
      height: 0,
      url: 'http://10.28.184.189:7000/static/vis_resource/background/bg-tooltip.png',
    },
  },
};

const createTextNode = function (item) {
  const el = document.createElement('div');
  el.setAttribute('iswordcloudnode', 'TRUE');
  el.textContent = item.name;
  el.className = 'word-cloud-item-chencc';
  return el;
};
document.createElement('canvas');

const compos = function (...fns) {
  return function (init) {
    return fns.reduce((a, b) => {
      return b(a || init);
    }, init);
  };
};
const rangMapping = function (from, to) {
  const min = from[0];
  const max = from[1];
  return function (val) {
    if (val < min) return to[0]; // 极限最小
    if (val > max) return to[1]; // 最大
    const interval = from[1] - from[0];
    return ((to[1] - to[0]) / interval) * val + to[0];
  };
};
const throttle = function (fn, ms) {
  let prev = new Date().getTime();
  return function (...args) {
    const cur = new Date().getTime();
    if (cur - prev >= ms) {
      fn && fn(...args);
      prev = new Date().getTime();
    }
  };
};
function archimedeanSpiral(size, { step = 0.1, b = 5, a = 1 } = {}) {
  const e = size[0] / size[1]; // 根据画布长宽比例进行对应缩放
  // 参数t为当前弧度值
  return function (t) {
    return [e * (a + b * (t *= step)) * Math.cos(t), (a + b * t) * Math.sin(t)];
  };
}
const checkRepeat = function (curLoc, wordDown, gridNumber) {
  for (let i = 0; i < wordDown.length; i++) {
    const matchLoc = wordDown[i];
    if (
      !(
        curLoc.right < matchLoc.left - gridNumber ||
        curLoc.left > matchLoc.right + gridNumber ||
        curLoc.bottom < matchLoc.top - gridNumber ||
        curLoc.top > matchLoc.bottom + gridNumber
      )
    ) {
      return true;
    }
  }
  return false;
};
const compareLocation = function (item, layout) {
  let ret = Object.assign({}, layout);
  ret.left = Math.min(item.left, layout.left);
  ret.right = Math.max(item.right, layout.right);
  ret.top = Math.min(item.top, layout.top);
  ret.bottom = Math.max(item.bottom, layout.bottom);
  return ret;
};
const mergeOptions = function (a, b) {
  let ret = {};
  for (const key in b) {
    const element = b[key];
    const con = element.constructor;
    if (con === Number || con === String || con === Boolean) {
      ret[key] = element;
    } else {
      ret[key] = Array.isArray(element) ? new con(...element) : Object.assign({}, element);
    }
  }
  for (const key in a) {
    const element = a[key];
    const con = element.constructor;
    if (con === Number || con === String || con === Boolean) {
      ret[key] = element;
    } else {
      ret[key] = Array.isArray(element) ? new con(...element) : Object.assign({}, element);
    }
  }
  return ret;
};
const setElConfig = function (el, config) {
  config.backgroundColor && (el.style.backgroundColor = config.backgroundColor);
  config.borderColor && (el.style.borderColor = config.borderColor);
  config.borderWidth && (el.style.borderWidth = config.borderWidth + 'px');
  config.font && (el.style.borderWidth = config.font);
  el.style.lineHeight = '1';
  config.padding && (el.style.padding = `${config.padding[0]}px ${config.padding[1]}px`);
  if (config.mode === MODE.NORMAL) {
    const { orientation } = config;
    el.style.writingMode =
      orientation === TEXT_ORIENTATION.HORIZONTAL
        ? 'tb'
        : orientation === TEXT_ORIENTATION.VERTICAL
        ? ''
        : Math.random() > 0.5
        ? 'tb'
        : '';
    config.animate && el.classList.add('word-cloud-animate');
  }
};
const appendCss = function () {
  if (window['content-for-word-cloud']) return;
  const el = document.createElement('style');
  el.id = 'content-for-word-cloud';
  el.innerHTML = `.word-cloud-item-chencc{
    display: block;
    position: absolute;
    left: 0px;
    top: 0px;
    color: white;
    text-decoration: none;
    font-size: 15px;
    font-family: '微软雅黑';
    font-weight: bold;
    cursor: pointer;
    transition:  all .3s;
    border: solid;
    border-width: 0;
  }
  @keyframes word {
    0% {
      opacity: 0.5;
    }
    3% {
      opacity: 1;
    }
    9% {
      opacity: 1;
    }
    12% {
      opacity: 0.5;
    }
    100% {
      opacity: 0.5;
    }
  }
  .word-cloud-animate {
    animation-name: word;
    animation-duration: 10s;
    animation-iteration-count: infinite;
    will-change: opacity;
    opacity: 0.5;
  }

  .word-cloud-animate:nth-child(3n + 1) {
    animation-delay: 0s;
  }
  .word-cloud-animate:nth-child(3n + 2) {
    animation-delay: 3s;
  }
  .word-cloud-animate:nth-child(3n + 3) {
    animation-delay: 6s;
  }`;
  document.body.appendChild(el);
};

const initParams = function (_) {
  const { item, index, instance } = _;
  const {
    value: { length },
    RADIUSX,
    RADIUSY,
  } = instance;
  const itemEl = createTextNode(item);
  instance.elMap.set(itemEl, item);
  const k = -1 + (2 * (index + 1) - 1) / length;
  const a = Math.acos(k);
  const b = a * Math.sqrt(length * Math.PI);
  const x = RADIUSX * Math.sin(a) * Math.cos(b);
  const y = RADIUSY * Math.sin(a) * Math.sin(b);
  const z = RADIUSX * Math.cos(a);
  setElConfig(itemEl, instance.config);
  instance.elWrap.appendChild(itemEl);
  return Object.assign(Object.assign({}, item), { el: itemEl, x, y, z });
};
// let domLocations: Array<DOMRect> = []
let prevIndex = 0;
const findLocation = function (_) {
  const { item, index, instance } = _;
  const {
    value: { length },
    domLocations,
  } = instance;
  const { width, height } = instance.elRect;
  const el = createTextNode(item);
  instance.elMap.set(el, item);
  const per = item.value / instance.maxValue;
  item.per = per;
  item.el = el;
  el.style.fontSize = instance.getValue(per) + 'px';
  if (length >= 50) {
    // 数据量超过50开启时间分片， 仅在CPU空闲之行， 不阻塞浏览器
    el.style.visibility = 'hidden';
    return new Promise((resolve, reject) => {
      let i = prevIndex;
      void (function scheduler() {
        // 优先requestIdleCallback， 其次使用requestAnimationFrame
        (requestIdleCallback || requestAnimationFrame)(() => {
          instance.elWrap.appendChild(el);
          const [x, y] = instance.getSpiral(++i * 5);
          const left = x + width / 2;
          const top = y + height / 2;
          setElConfig(el, instance.config);
          el.style.transform = `translate(${left}px, ${top}px)`;
          const rectObj = el.getBoundingClientRect().toJSON();
          if (
            domLocations.some(
              (i) =>
                Math.abs(i.left - rectObj.left) < i.width / 2 &&
                Math.abs(i.top - rectObj.top) < i.height / 2,
            )
          ) {
            i += 2; // 已经放置过的节点直接忽略之后的五次遍历
            scheduler();
            return;
          } else {
            const res = checkRepeat(rectObj, domLocations, instance.config.gridSize || 0);
            if (!res) {
              domLocations.push(rectObj);
              instance.layout = compareLocation(rectObj, instance.layout);
              prevIndex = i / 1.5; // 已经被算过的点几乎没有概率还能容纳下其他元素了，直接忽略
              item.x = left;
              item.y = top;
              item.elRect = rectObj;
              el.style.visibility = 'visible';
              resolve(Object.assign(Object.assign({}, item), { el }));
            } else {
              scheduler();
            }
          }
        });
      })();
    });
  } else {
    for (let i = prevIndex; i <= (width + height) / 2; i++) {
      const [x, y] = instance.getSpiral(i * 5);
      instance.elWrap.appendChild(el);
      // if(checkedCache[`${x}-${y}`]) {continue} // 跳过已经命中过的坐标的
      const left = x + width / 2;
      const top = y + height / 2;
      setElConfig(el, instance.config);
      // el.style.transform = `translate(${left}px, ${top}px) rotate(${Math.floor(Math.random()*40)}deg)`
      el.style.transform = `translate(${left}px, ${top}px)`;
      const rectObj = el.getBoundingClientRect().toJSON();
      // 检查坐标是否在已布局的元素范围内， 在的话直接跳过
      if (
        domLocations.some(
          (i) =>
            Math.abs(i.left - rectObj.left) < i.width / 2 &&
            Math.abs(i.top - rectObj.top) < i.height / 2,
        )
      ) {
        i += 2;
        continue;
      }
      const res = checkRepeat(rectObj, domLocations, instance.config.gridSize || 0);
      if (!res) {
        domLocations.push(rectObj);
        instance.layout = compareLocation(rectObj, instance.layout);
        prevIndex = i / 1.5; // 已经被算过的点几乎没有概率还能容纳下其他元素了，直接忽略
        item.x = left;
        item.y = top;
        item.elRect = rectObj;
        break;
      }
    }
    // console.timeEnd(`item-${item.name}`)
    return item;
  }
};

// effect
const setColor = function (item, index, instance) {
  const { el } = item;
  const { colors, color, colorMode } = instance.config; // color 旧版数据配置, colors: 新版范围数据配置
  if (colorMode === COLOR_MODE.INDEX) {
    if (color && color.length) {
      el.style.color = color[index % color.length];
    }
    return;
  }
  if (colorMode === COLOR_MODE.RANGE) {
    if (colors && colors.length) {
      const curColorItem = colors.find((i) => i.from <= item.value && i.to >= item.value);
      curColorItem && (el.style.color = curColorItem.color);
    }
    return;
  }
  if (color && color.length) {
    // 适配就数据业务
    el.style.color = color[index % color.length];
    return;
  }
  if (colors && colors.length) {
    const curColorItem = colors.find((i) => i.from <= item.value && i.to >= item.value);
    curColorItem && (el.style.color = curColorItem.color);
    return;
  }
};
const eventHandle = function (item, index, instance) {
  var _a;
  const { el } = item;
  const { config } = instance;
  if (config.events) {
    // 自定义事件
    Object.keys(config.events).forEach((i) => {
      const fn = config.events && config.events[i];
      el.addEventListener(i, (e) => {
        fn && fn(item, e);
      });
    });
  }
  if ((_a = config.tooltip) === null || _a === void 0 ? void 0 : _a.show) {
    // el.addEventListener('mouseenter', (e) => {
    //   instance.setActive(item, el, e)
    // })
    el.addEventListener('mouseleave', () => {
      instance.clearActive();
    });
  }
};

// animate
const rotateX = function (item, instance) {
  const angleX = [DIRECTION.RIGHT2LEFT, DIRECTION.LEFT2RIGHT].includes(instance.DIRECTION)
    ? Math.PI / Infinity
    : Math.PI / ((Number(instance.DIRECTION) / 2) * Number(instance.speed));
  const cos = Math.cos(angleX);
  const sin = Math.sin(angleX);
  item.z = item.z || 1;
  const y1 = item.y * cos - item.z * sin;
  const z1 = item.z * cos + item.y * sin;
  return Object.assign(Object.assign({}, item), { y: y1, z: z1 });
};
const rotateY = function (item, instance) {
  const angleY = [DIRECTION.BOTTOM2TOP, DIRECTION.TOP2BOTTOM].includes(instance.DIRECTION)
    ? Math.PI / Infinity
    : Math.PI / (Number(instance.DIRECTION) * Number(instance.speed));
  const cos = Math.cos(angleY);
  const sin = Math.sin(angleY);
  item.z = item.z || 1;
  const x1 = item.x * cos - item.z * sin;
  const z1 = item.z * cos + item.x * sin;
  return Object.assign(Object.assign({}, item), { x: x1, z: z1 });
};
const move = function (item, instance) {
  const { elRect } = instance;
  const { width, height } = elRect;
  const CX = width / 2;
  const CY = height / 2;
  let { x, y, z } = item;
  z = z || 1;
  const fallLength = 500;
  const RADIUS = (width - 50) / 2;
  const scale = fallLength / (fallLength - z);
  const alpha = (z + RADIUS) / (2 * RADIUS);
  const left = `${x + CX - 15}px`;
  const top = `${y + CY - 15}px`;
  item.x1 = x + CX - 15;
  item.y1 = y + CY - 15;
  const transform = `translate(${left}, ${top}) scale(${scale})`;
  return {
    x,
    y,
    z,
    opacity: alpha + 0.5,
    zIndex: parseInt(scale * 100 + '', 10),
    transform,
  };
};
const move3D = function (tempArr, instance) {
  tempArr.forEach((i) => {
    const { el } = i;
    const { transform, opacity, zIndex } = move(i, instance);
    el.style.transform = transform;
    el.style.opacity = opacity + '';
    el.style.zIndex = zIndex + '';
  });
};
const rotate3D = function (tempArr, instance) {
  tempArr.forEach((item) => {
    const { z, y } = rotateX(item, instance);
    item.z = z;
    item.y = y;
    const { x, z: z1 } = rotateY(item, instance);
    item.z = z1;
    item.x = x;
  });
};

/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P
      ? value
      : new P(function (resolve) {
          resolve(value);
        });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator['throw'](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

class WordChart {
  constructor(options) {
    this.clearActive = () => {
      this.active = undefined;
      this.toolTipEl.style.visibility = 'hidden';
    };
    this.setActive = (item, el) => {
      var _a, _b, _c, _d, _e, _f;
      this.active = {
        item,
        el,
      };
      if (
        (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.tooltip) === null ||
        _b === void 0
          ? void 0
          : _b.render
      ) {
        const context = this.config.tooltip.render(item, this.toolTipEl);
        if (typeof context === 'string') {
          this.toolTipEl.innerHTML = context;
        } else if (context.constructor.toString().includes('Element')) {
          // dom
          this.toolTipEl.appendChild(context);
        } else {
          console.error(
            `the render function should return a HTMLElement or Html String, not a ${context.constructor.toString()}`,
          );
        }
      } else {
        // use setting
        const { tooltip } = this.config;
        const padding = (tooltip === null || tooltip === void 0 ? void 0 : tooltip.padding) || [
          5, 10,
        ];
        const backgroundColor =
          (tooltip === null || tooltip === void 0 ? void 0 : tooltip.backgroundColor) ||
          'rgba(50,50,50,0.7)';
        const borderRadius =
          (tooltip === null || tooltip === void 0 ? void 0 : tooltip.borderRadius) || '5px';
        const color =
          (tooltip === null || tooltip === void 0 ? void 0 : tooltip.textStyle.color) || '#fff';
        const fontFamily =
          (tooltip === null || tooltip === void 0 ? void 0 : tooltip.textStyle.fontFamily) ||
          'Microsoft YaHei';
        const fontSize =
          (tooltip === null || tooltip === void 0 ? void 0 : tooltip.textStyle.fontSize) || 14;
        const lineHeight =
          (tooltip === null || tooltip === void 0 ? void 0 : tooltip.textStyle.lineHeight) || 30;
        const width =
          (_c = tooltip === null || tooltip === void 0 ? void 0 : tooltip.bgStyle) === null ||
          _c === void 0
            ? void 0
            : _c.width;
        const height =
          (_d = tooltip === null || tooltip === void 0 ? void 0 : tooltip.bgStyle) === null ||
          _d === void 0
            ? void 0
            : _d.height;
        this.toolTipEl.style.padding = `${padding[0]}px ${padding[1]}px`;
        this.toolTipEl.style.backgroundColor = backgroundColor;
        this.toolTipEl.style.borderRadius = borderRadius;
        this.toolTipEl.textContent =
          (tooltip === null || tooltip === void 0 ? void 0 : tooltip.tooltipEditor) ||
          `${item.name}: ${item.value}`;
        ((_e = tooltip === null || tooltip === void 0 ? void 0 : tooltip.bgStyle) === null ||
        _e === void 0
          ? void 0
          : _e.url) &&
          (this.toolTipEl.style.background = `url(${
            (_f = tooltip === null || tooltip === void 0 ? void 0 : tooltip.bgStyle) === null ||
            _f === void 0
              ? void 0
              : _f.url
          })`);
        this.toolTipEl.style.backgroundSize = '100% 100%';
        this.toolTipEl.style.color = color;
        this.toolTipEl.style.fontFamily = fontFamily;
        this.toolTipEl.style.fontSize = fontSize + '';
        this.toolTipEl.style.lineHeight = lineHeight + 'px';
        width && (this.toolTipEl.style.width = width + 'px');
        height && (this.toolTipEl.style.height = height + 'px');
      }
      const { x1, y1, x: x2, y: y2 } = item;
      const x = x1 || x2;
      const y = y1 || y2;
      const { offsetWidth, offsetHeight } = this.elWrap;
      this.toolTipEl.style.transform = `translate(${
        x > offsetWidth / 2 ? x - this.toolTipEl.offsetWidth : x + 10
      }px, ${y > offsetHeight / 2 ? y - this.toolTipEl.offsetHeight : y + 10}px)`;
      this.toolTipEl.style.visibility = 'visible';
    };
    this.el = options.el;
    this.elMap = new WeakMap();
    this.isDestory = false;
    this.value = [...options.data]; // clone
    this.sortValue = options.data.sort((a, b) => (a.value - b.value > 0 ? 1 : -1)); // muttable
    this.maxValue = this.sortValue[this.sortValue.length - 1].value;
    this.elRect = this.el.getBoundingClientRect();
    this.domLocations = [];
    const { width, height } = this.elRect;
    this.RADIUSX = (width - 50) / 2;
    this.RADIUSY = (height - 50) / 2;
    this.DIRECTION = DIRECTION.LEFT2RIGHT;
    this.config = mergeOptions(options.config, defaultOptions) || {};
    this.speed = this.config.speed || 200;
    this.getSpiral = archimedeanSpiral([width, height]);
    this.getValue = rangMapping([0, 1], [this.config.sizeMin || 12, this.config.sizeMax || 24]);
    this.elWrap = document.createElement('div');
    this.elWrap.style.width = '100%';
    this.elWrap.style.height = '100%';
    this.el.appendChild(this.elWrap);
    this.el.style.position = 'relative';
    this.toolTipEl = document.createElement('div');
    this.toolTipEl.style.position = 'absolute';
    // this.toolTipEl.style.transition = 'all .4s'
    this.toolTipEl.style.left = 0 + 'px';
    this.toolTipEl.style.top = 0 + 'px';
    this.el.appendChild(this.toolTipEl);
    this.clearActive = throttle(this.clearActive, 300);
    this.setActive = throttle(this.setActive, 100);
    this.el.addEventListener('mouseout', this.clearActive);
    this.layout = {
      left: Infinity,
      top: Infinity,
      bottom: 0,
      right: 0,
    };
  }
  destory() {
    this.isDestory = true; // 停止动画
    this.el.removeEventListener('mouseout', this.clearActive);
    this.el.removeChild(this.elWrap);
    this.el.removeChild(this.toolTipEl);
  }
  trigger() {
    return __awaiter(this, void 0, void 0, function* () {
      // this.value = this.value.map((i, index) => this.composFn ? this.composFn({item: i, index: index, instance: this}) : i)
      for (let i = 0; i < this.value.length; i++) {
        // 处理异步任务
        const item = this.value[i];
        const res = this.composFn && this.composFn({ item, index: i, instance: this });
        if (res instanceof Promise) {
          this.value[i] = yield res;
        } else {
          this.value[i] = res;
        }
        this.effectComposFn &&
          this.effectComposFn({ item: this.value[i], index: i, instance: this });
      }
      // this.value.forEach((i, idx) => {this.effectComposFn && this.effectComposFn({ item:i, index: idx, instance: this })})
      this.animateComposFn && this.animateComposFn(this.value);
      setTimeout(() => {
        this.finallyComposFn && this.finallyComposFn(this);
      }, 0);
      return this;
    });
  }
  animate(fn, ms = 20) {
    const that = this;
    const throttledFn = throttle(fn, ms);
    const wrap = function () {
      void (function run() {
        window.requestAnimationFrame(() => {
          throttledFn(that.value);
          !that.isDestory && run();
        });
      })();
    };
    if (this.animateComposFn) {
      this.animateComposFn = compos(this.animateComposFn, wrap);
    } else {
      this.animateComposFn = wrap;
    }
    return this;
  }
  finally(fn) {
    if (this.finallyComposFn) {
      this.finallyComposFn = compos(this.finallyComposFn, fn);
    } else {
      this.finallyComposFn = fn;
    }
    return this;
  }
  scan(fn) {
    if (this.composFn) {
      this.composFn = compos(this.composFn, fn);
    } else {
      this.composFn = fn;
    }
    return this;
  }
  effect(fn) {
    if (this.effectComposFn) {
      // 多个函数使用compos去组合
      this.effectComposFn = compos(this.effectComposFn, fn);
    } else {
      this.effectComposFn = fn;
    }
    return this;
  }
  static of(config) {
    return new WordChart(config);
  }
}

const suitLayout = function (instance) {
  const { elRect, layout, elWrap, value } = instance;
  const realWidth = layout.right - layout.left;
  const realHeight = layout.bottom - layout.top;
  elRect.width / realWidth;
  elRect.height / realHeight;
  const x = elRect.left - layout.left;
  const y = elRect.top - layout.top;
  const x1 = elRect.right - layout.right;
  const y1 = elRect.bottom - layout.bottom;
  elWrap.style.transformOrigin = 'center';
  const offsetLeft = (x + x1) / 2;
  const offsetTop = (y + y1) / 2;
  value.forEach((i) => {
    i.x = (i.x || 0) + offsetLeft;
    i.y = (i.y || 0) + offsetTop;
    const { el } = i;
    el && (el.style.transform = `translate(${i.x}px, ${i.y}px)`);
  });
  // elWrap.style.transform = `translate(${x / 2}px, ${y / 2}px) scaleX(${widthPer}) scaleY(${heightPer}) `
  // elWrap.style.transform = `translate(${(x + x1) / 2}px, ${(y + y1) / 2}px)`
};
const toolTipHandle = function (instance) {
  var _a;
  const { el, config, value } = instance;
  if ((_a = config.tooltip) === null || _a === void 0 ? void 0 : _a.show) {
    value.forEach((i) => {
      const { el } = i;
      el === null || el === void 0
        ? void 0
        : el.addEventListener('mouseenter', function (e) {
            instance.setActive(i, el, e);
          });
    });
  }
};

let cacheInstance = new WeakMap();
function init(config) {
  var _a, _b;
  const { el } = config;
  (_a = cacheInstance.get(el)) === null || _a === void 0 ? void 0 : _a.destory(); // 与setOption公用一个api， 初始化检查是否有之前的实例， 有的话销毁掉重新实例化
  const instance = WordChart.of(config); // 类实例
  cacheInstance.set(el, instance);
  const mode =
    (_b = instance === null || instance === void 0 ? void 0 : instance.config) === null ||
    _b === void 0
      ? void 0
      : _b.mode;
  const { hooks } = config;
  if (mode === MODE.SCROLL) {
    exec(instance, hooks ? mergeHooks(hooks, forMove) : forMove);
  } else {
    exec(instance, hooks ? mergeHooks(hooks, forStatic) : forStatic);
  }
  appendCss();
  instance.trigger();
  return instance;
}
function mergeHooks(hooks, targetMode) {
  hooks.scan && targetMode.scan.splice(0, 0, hooks.scan); // 数据流向， 必须前置执行
  hooks.animate && targetMode.animate.push(hooks.animate);
  hooks.effect && targetMode.effect.push(hooks.effect);
  hooks.finally && targetMode.finally.push(hooks.finally);
  return targetMode;
}
function exec(instance, target) {
  Object.keys(forStatic).forEach((type) => {
    target[type].forEach((i) => {
      switch (type) {
        case 'scan':
          {
            const fn = instance[type];
            i && fn.bind(instance)(i);
          }
          break;
        case 'animate':
          {
            const fn = instance[type];
            fn.bind(instance)((_) => {
              i(_, instance);
            }, 20);
          }
          break;
        case 'effect':
          {
            const fn = instance[type];
            fn.bind(instance)(({ item, index, instance }) => {
              i(item, index, instance);
            });
          }
          break;
        case 'finally':
          {
            const fn = instance[type];
            fn.bind(instance)((instance) => {
              i(instance);
            });
          }
          break;
      }
    });
  });
}
const forMove = {
  scan: [initParams],
  animate: [move3D, rotate3D],
  effect: [setColor, eventHandle],
  finally: [toolTipHandle],
};
const forStatic = {
  scan: [findLocation],
  effect: [setColor, eventHandle],
  animate: [],
  finally: [suitLayout, toolTipHandle],
};
const RENDER_MODE = MODE;
export  {
  RENDER_MODE,
  TEXT_ORIENTATION,
  init,
  COLOR_MODE
}
