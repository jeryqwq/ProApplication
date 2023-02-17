import { MouseEvent, useMemo } from 'react';
import './index.less';
import Item from './Item';
import SubMenu from './SubMenu';
export type ContextMenuItem = {
  /** 唯一值 */
  value: string;
  /** 展示的名称或者自定义jsx */
  label: React.ReactNode;
  /** 子节点加载方法或者子节点数组 */
  children?:
    | ContextMenuItem[]
    | ((item: ContextMenuItem, data: any) => ContextMenuItem[]);
  /** 图表 */
  icon?: React.ReactNode;
  /** 是否禁用，禁用后不会处罚单击函数 */
  disabled?: boolean;
  /** 自定义渲染 */
  render?: (_: ContextMenuItem) => React.ReactNode;
  /** 自定义加载图表 */
  loadding?: React.ReactNode;
  /** 自定义单独处理函数 */
  onClick?: (e: MouseEvent, item: ContextMenuItem, data: any) => void;
  [key: string]: any;
};

export type HandleClick = (
  e: MouseEvent<HTMLLIElement, any>,
  item: any,
  menu: ContextMenuItem,
) => void;

export type ContextMenuProps = {
  /** 菜单数据 */
  menus: Array<ContextMenuItem>;
  /** 点击处理函数，传递e, 当前数据项， menu 菜单项 */
  onClick: HandleClick;
  /** 当前Trigger触发的数据项 */
  curItem: React.MutableRefObject<ContextMenuItem | undefined>;
  /** 递归深度 */
  depth?: number;
  /**
   * Save the parameter layout of each item,
   * When rendering to the next layer, check whether it can be expanded
   * */
  prevRects?: Array<() => HTMLUListElement>;
  /** 自定义加载图表 */
  loadding?: React.ReactNode;
  /** 设置菜单显示隐藏 */
  setMenuVisible: (visible: boolean) => void;
};

export const prefixCls = 'vis-comp-context-menu-';

const ContextMenu = function (props: ContextMenuProps) {
  const {
    onClick,
    menus,
    curItem,
    prevRects = [],
    depth = 0,
    loadding,
    setMenuVisible,
  } = props;
  return useMemo(
    () => (
      <SubMenu {...props} depth={depth} prevRects={prevRects}>
        {menus.map((i) => (
          <Item
            key={i.value}
            loadding={loadding}
            item={i}
            curData={curItem}
            onClick={onClick}
            prevRects={prevRects}
            depth={depth + 1}
            setMenuVisible={setMenuVisible}
          />
        ))}
      </SubMenu>
    ),
    [onClick, menus, loadding],
  );
};

ContextMenu.Item = Item;

export default ContextMenu;
