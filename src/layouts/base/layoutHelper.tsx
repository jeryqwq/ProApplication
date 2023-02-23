import routes from './../../../config/routes';
import { matchPath } from '@umijs/max';
import { cloneDeep } from 'lodash';
import pinyin from 'pinyin';
import { similarity } from '@vis/utils';

export enum HitType {
  FirstWord = 'FIRST_WORD', // 首个单词匹配
  Desc = 'DESC', // 描述包含
  Global = 'GLOBAL', // 所有的拼音
  EveryFirstWord = 'EVERY_FIRST_WORD', // 每个单词的首字母
  SingleWord = 'SINGLE_WORD', // 单个文字命中
}
export type RoutersType = {
  //  router & menu
  name?: string;
  path?: string;
  key?: string;
  routes?: RoutersType[];
  label?: string;
  children?: React.ReactNode;
  component?: string;
  _pinyin?: string[];
  _val?: string;
  firstWordConnect?: string;
  meta?: {
    desc?: string;
    keepAlive?: boolean;
  };
  hitType?: HitType;
  _pinyinStr?: string;
};

// 匹配当前路由与配置的path是否匹配
export const findRouterItem = function (
  key: string,
  _router: RoutersType[] = routes,
): RoutersType | undefined {
  let ret: RoutersType | undefined = undefined;
  for (let i = 0; i < _router.length; i++) {
    const item = _router[i];
    if (item.path && matchPath({ path: item.path }, key)) {
      ret = item;
      return ret;
    } else if (item.routes) {
      const res = findRouterItem(key, item.routes);
      if (res) {
        // 未找到继续向下便利, 找到返回
        return res;
      }
    }
  }
  return ret;
};

let _routers = [];

function forEachRouteItems(
  items: RoutersType[],
  cb: (item: RoutersType) => void,
) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    cb(item);
    item.routes && forEachRouteItems(item.routes, cb);
  }
  return items;
}

function initRouterInfo(item: RoutersType) {
  if (item.name) {
    const res = pinyin(item.name, {
      heteronym: false, // 启用多音字模式
      segment: true, // 启用分词，以解决多音字问题。默认不开启，使用 true 开启使用 nodejieba 分词库。
      style: 'normal',
      compact: true,
    });
    if (res) {
      item._pinyin = res.flat(Infinity) as string[];
      item._val = item._pinyin.join('');
      item._pinyinStr = item._pinyin.join('');
      item.firstWordConnect = item._pinyin
        .map((i) => (!Array.isArray(i) ? (i as string).charAt(0) : ''))
        .join('');
    }
  }
  return undefined;
}

const hitRate = 0.75;
export const searchRouterInfo = (str: string) => {
  if (!_routers.length) {
    _routers = cloneDeep(routes);
    forEachRouteItems(routes, initRouterInfo); // 为路由写入拼音相关参数
  }
  let hitSets: Set<RoutersType> = new Set();
  if (str) {
    // todo： 分词优化， 拼音首字母检索还是文字检索做分支匹配， 优化效率&兼容命中的样式

    forEachRouteItems(routes[1].routes as RoutersType[], (item) => {
      if (item.name) {
        // let isSuspend = false;
        // 开始匹配,命中任何一个情况退出
        if (item._pinyin?.length) {
          if (str.length >= 2 && item._pinyinStr?.includes(str)) {
            hitSets.add(item);
            return;
          }
          const wordDistances = item._pinyin?.map((i) => similarity(str, i)); // 优先单个匹配, 输入从少到多 某个拼音 > 0.8
          if (wordDistances?.some((i) => i >= hitRate)) {
            item.hitType = HitType.SingleWord;
            hitSets.add(item);
            return;
          }
        }
        if (item._val) {
          const totalDistance = similarity(str, item._val); // 其次全参数拼音匹配 > 0.8
          if (totalDistance >= hitRate) {
            item.hitType = HitType.Global;
            hitSets.add(item);
            return;
          }
        }
        if (item.firstWordConnect) {
          const firstWordDistance = similarity(str, item.firstWordConnect);
          // 首字母匹配 > 0.8
          if (
            firstWordDistance >= hitRate ||
            item.firstWordConnect?.includes(str)
          ) {
            item.hitType = HitType.EveryFirstWord;
            hitSets.add(item);
            return;
          }
        }
        if (item.name.includes(str)) {
          // 全匹配
          item.hitType = HitType.Global;
          hitSets.add(item);
          return;
        }
        if (item.meta?.desc?.includes(str)) {
          item.hitType = HitType.Desc;
          hitSets.add(item);
        }
      }
    });
    console.log(routes, hitSets);
    return hitSets;
  }
};

// 给命中的关键词标红
export const renderSearchKeywordNode = function (
  key: string,
  title?: string,
): React.ReactNode {
  if (!title) return '';
  const startIndex = title.indexOf(key);
  if (startIndex > -1) {
    const beforeStr = title.substr(0, startIndex);
    const afterStr = title.substr(startIndex + key.length);
    return (
      <span>
        {beforeStr}
        <a>{key}</a>
        {afterStr}
      </span>
    );
  } else {
    return title;
  }
};
