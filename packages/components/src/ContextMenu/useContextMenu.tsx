import React from 'react';
import { createRef, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ContextMenu, { ContextMenuItem, HandleClick } from './index';

export type TriggerProps = {
  /** 该属性的子节点 */
  children: React.ReactNode;
  /** 需要传递给菜单的数据 */
  data: any;
  /** 如果是其它元素，可用此方法绑定任意触发DOM */
  getEl?: () => HTMLDivElement;
  /** 外层的css样式 */
  style?: React.CSSProperties;
  /**
   * @description 渲染Trigger的标签，用来适配一些其它框架
   * @default div
   *  */
  tag?: string;
  /**
   * @description 可在这里动态触发修改菜单配置实现动态菜单
   */
  handle?: (e: MouseEvent, data: any) => void;
  [key: string]: any;
};

declare type ContextMenuProps = {
  /** 菜单数据 */
  menus: ContextMenuItem[];
  /** 单击处理函数 ，分别是 event, data(触发器数据), node(菜单)*/
  onClick: HandleClick;
  /** 自定义加载图表 */
  loadding?: React.ReactNode;
};

declare type HooksProps = {
  /**
   * @description w3c规范的所有的鼠标事件字符串内容
   * @default contextmenu
   */
  event?: keyof HTMLElementEventMap;
  /**
   * @description 菜单渲染父节点。默认fixed渲染到 父元素内，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位，这是会启用相对定位来适配父元素滚动条。
   */
  getMenuContainer?: () => HTMLDivElement;
};
export default (hooksProps?: HooksProps) => {
  const { event = 'contextmenu', getMenuContainer } = hooksProps || {};
  const curItem = useRef<ContextMenuItem>();
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [menuVisible, setMenuVisible] = useState(false);

  return {
    setMenuVisible,
    Trigger: ({
      children,
      data,
      getEl,
      style,
      tag = 'div',
      handle,
      ...ohters
    }: TriggerProps) => {
      const el = createRef<HTMLDivElement>();
      useLayoutEffect(() => {
        const contextMenuHandle = function (e: MouseEvent) {
          e.stopPropagation();
          e.preventDefault();
          curItem.current = data;
          const elContainer = getMenuContainer?.();
          const { left, top } = elContainer?.getBoundingClientRect() || {
            left: 0,
            top: 0,
          };
          setPosition({
            x: elContainer ? e.clientX - left : e.clientX,
            y: elContainer ? e.clientY - top : e.clientY,
          });
          handle && handle(e, data);
          setMenuVisible(true);
        };
        const trigger = getEl?.() || el.current;
        trigger?.addEventListener(event, contextMenuHandle as any);
        return () => {
          trigger?.removeEventListener(event, contextMenuHandle as any);
        };
      }, []);
      return React.createElement(
        tag,
        {
          ...ohters,
          ref: el,
          style,
        },
        children,
      );
    },
    ContextMenu: ({
      menus,
      onClick = () => {},
      loadding = <span></span>,
    }: ContextMenuProps) => {
      useLayoutEffect(() => {
        const hideMenu = function () {
          setMenuVisible(false);
        };
        document.body.addEventListener('click', hideMenu);
        return () => {
          document.body.removeEventListener('click', hideMenu);
        };
      }, []);
      const _el = (
        <div
          tabIndex={0}
          style={{
            left: position.x ?? 0,
            top: position.y ?? 0,
            display: menuVisible ? 'block' : 'none',
            position: getMenuContainer ? 'absolute' : 'fixed',
            zIndex: '999',
          }}
        >
          <ContextMenu
            menus={menus}
            onClick={onClick}
            curItem={curItem}
            loadding={loadding}
            setMenuVisible={setMenuVisible}
          />
        </div>
      );
      return getMenuContainer?.() ? createPortal(_el, getMenuContainer()) : _el;
    },
  };
};

export const ContextMenuProps = (_: ContextMenuProps) => <></>;

export const TriggerProps = (_: TriggerProps) => <></>;

export const HooksProps = (_: HooksProps) => <></>;
