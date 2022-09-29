
import React from 'react';
import deepClone from 'lodash/cloneDeep';
import { checkRepeat } from '@/utils';
import { nanoid } from '@vis/utils';

export enum ActionType {
  'push',
  'replace',
  'reset',
  'delete'
}

export default function (state: MyGridItem[], action: { data: MyGridItem | MyGridItem[]; type: ActionType }): MyGridItem[] {
  const { type, data } = action;
  switch (type) {
    case ActionType.push:
      if (!Array.isArray(data)) {
        if (!data.i) {
          let _x = 0;
          let _y = Infinity;
          const curComp = { ...data, i: nanoid() };
          const tempRes: number[] = new Array(state.length).fill(0);
          console.time('loc');
          // 使用词云图冲突检测方案，不需要画布点阵内一个一个点的去尝试能不能放下，即使缓存也很浪费内存空间
          // 只需要尝试一个组件的左边， 右边，下边即可，即能做到最大的空间利用率，也能适配组件上升布局太大时算法复杂度过高带来的性能指数级上升造成的卡顿
          // 算法复杂度降到O(n方), 这里的n值的是组件的数量，与布局宽高没有任何关系,能适配上千项的位置空闲检测, 目前100项左右的数据计算时间仅需要0.5ms左右
          const curLayout = state.sort((a, b) => (a.y + a.h > b.y + b.h ? 1 : -1)); // 从上到下 layout排序
          for (let idx = 0; idx < curLayout.length; idx++) {
            if (tempRes[curComp.h] < idx) { // 已经计算过了，没戏，直接跳过
              // 还有优化空间，curCOmp.h 如果没计算过，我们可以使用h比他小的值，思路： 如果高度10能放下，那小于10的都能放下
              // 相反，如果10放不下，12，11，15等大于10高度的也都放不下
              // 暂不考虑， 数据量没达到那个级别,也不可能达到
              continue;
            }
            const i = curLayout[idx];
            const { x, y, w, h } = i;
            const curLoc = { x, y, w: curComp.w, h: curComp.h };
            const curLocR = { ...curLoc, x: x + w }; // 右
            const curLocL = { ...curLoc, x: x - curComp.w }; // 左
            const curLocB = { ...curLoc, y: y + h }; // 下
            if (x - curComp.w < 0) { // 左边不能放的时候只放右边
              if (!checkRepeat(curLocR, curLayout)) { // 都没有重叠
                _x = x + w;
                _y = y;
                tempRes[curComp.h] = idx; // 记录下当前高度能走到的位置，后面大于这个数的直接不用比了
                break;
              }
              continue;
            }
            if (curComp.w + x + w > 24) { // 右边不能放的时候只放左边
              if (!checkRepeat(curLocL, curLayout)) {
                _x = x - curComp.w;
                _y = y;
                tempRes[curComp.h] = idx;
                break;
              }
              continue;
            }
            if (!checkRepeat(curLocL, curLayout)) { // 检测左边
              _x = x - curComp.w;
              _y = y;
              tempRes[curComp.h] = idx;
              break;
            }
            if (!checkRepeat(curLocR, curLayout)) { // 检测右边
              _x = x + w;
              _y = y;
              tempRes[curComp.h] = idx;
              break;
            }
            if (!checkRepeat(curLocB, curLayout)) { // 检测下方
              _x = x;
              _y = y + h;
              tempRes[curComp.h] = idx;
              break;
            }
          }
          console.timeEnd('loc');
          return state.concat({ ...curComp, x: _x, y: _y });
        }
      }
      return state;
    case ActionType.replace:
      if (!Array.isArray(data)) {
        const curIndex = state.findIndex((i) => i.i === data.i);
        if (curIndex !== -1) {
          state.splice(curIndex, 1, data);
        }
        return deepClone(state);
      }
      return [];
    case ActionType.reset:
      if (Array.isArray(data)) {
        return [...data];
      }
      return [];
    case ActionType.delete:
      if (!Array.isArray(data)) {
        const curIndex = state.findIndex((i) => i.i === data.i);
        state.splice(curIndex, 1);
        return [...state];
      }
      return [];
    default:
      throw new Error();
  }
}

export const LayoutContext = React.createContext<{ layout: MyGridItem[]; dispatch: React.Dispatch<{
  type: ActionType;
  data: MyGridItem | MyGridItem[];
}>;}>({} as any);
