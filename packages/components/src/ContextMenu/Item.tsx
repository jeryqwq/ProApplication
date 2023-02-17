import { cloneElement, memo, useState, startTransition } from 'react';
import { ContextMenuItem, HandleClick, prefixCls } from './index';
import SubMenu from './SubMenu';
import { RightOutlined } from '@ant-design/icons';

export type ContextMenuItemProps = {
  onClick: HandleClick;
  item: ContextMenuItem;
  curData: React.MutableRefObject<ContextMenuItem | undefined>;
  depth: number;
  prevRects: Array<() => HTMLUListElement>;
  loadding: React.ReactNode;
  setMenuVisible: (visible: boolean) => void;
};

const Item = memo(function (props: ContextMenuItemProps) {
  // 渲染单项
  const { item, curData, onClick, prevRects, depth, loadding, setMenuVisible } =
    props;
  const [isLoadding, setLoadding] = useState(false);
  const [showChildren, setShowChildren] = useState(false);
  return (
    <li
      className={item.disabled ? prefixCls + 'disabled' : ''}
      onClick={(e) => {
        item.onClick && item.onClick(e, item, curData.current);
        if (depth >= 1) {
          e.stopPropagation();
        }
        if (item.children) {
          return;
        }
        !item.disabled && onClick(e, curData?.current as any, item);
        setMenuVisible(false);
      }}
      tabIndex={-1}
      onMouseEnter={async (e) => {
        e.stopPropagation();
        setShowChildren(true);
        if (typeof item.children === 'function') {
          setLoadding(true);
          const _children = await item.children(item, curData.current);
          item.children = _children;
          startTransition(() => {
            setLoadding(false);
          });
        }
      }}
      onMouseLeave={() => {
        setShowChildren(false);
      }}
    >
      <div className={prefixCls + 'sitem'}>
        <span className={prefixCls + 'icon'}>{item.icon}</span>
        {item.render?.(item) || item.label}
        {isLoadding
          ? cloneElement(loadding as any, { className: prefixCls + 'arrow' })
          : item.children && <RightOutlined className={prefixCls + 'arrow'} />}
        {!isLoadding &&
          showChildren &&
          item.children &&
          Array.isArray(item.children) &&
          !item.disabled && (
            <SubMenu {...props} prevRects={[...prevRects]}>
              {item.children?.map((i) => (
                <Item {...props} item={i} depth={depth + 1} />
              ))}
            </SubMenu>
          )}
      </div>
    </li>
  );
});

export default Item;
