import { ConfigProvider } from 'antd';
import {
  VerticalLeftOutlined,
  VerticalAlignMiddleOutlined,
} from '@ant-design/icons';

import {
  CSSProperties,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
} from 'react';
import './index.less';

const DRAG_DIRECTION = {
  LEFT_RIGHT: 'LEFT_RIGHT',
  TOP_BUTTOM: 'TOP_BUTTOM',
  RIGHT_LEFT: 'RIGHT_LEFT',
  BUTTOM_TOP: 'BUTTOM_TOP',
};
const WRAP_STYLES = {
  [DRAG_DIRECTION.LEFT_RIGHT]: {
    marginLeft: 10,
  },
  [DRAG_DIRECTION.RIGHT_LEFT]: {
    marginRight: 10,
  },
  [DRAG_DIRECTION.TOP_BUTTOM]: {
    marginBottom: 10,
  },
  [DRAG_DIRECTION.BUTTOM_TOP]: {
    marginBottom: 10,
  },
};
const EL_ATTRS = {
  [DRAG_DIRECTION.LEFT_RIGHT]: {
    width: '7px',
    height: '100%',
    left: '-7px',
    top: '0px',
    cursor: 'ew-resize',
  },
  [DRAG_DIRECTION.RIGHT_LEFT]: {
    width: '7px',
    height: '100%',
    right: '0px',
    top: '0px',
    cursor: 'ew-resize',
  },
  [DRAG_DIRECTION.TOP_BUTTOM]: {
    width: '100%',
    height: '10px',
    left: '0px',
    bottom: '-10px',
    cursor: 'row-resize',
  },
  [DRAG_DIRECTION.BUTTOM_TOP]: {
    width: '100%',
    height: '10px',
    left: '0px',
    top: '0px',
    cursor: 'row-resize',
  },
};

function DragLayoutResize(props: {
  /** 方向 */
  direction: string;
  // min?: number;
  // max?: number;
  children: React.ReactNode;
  /** 外层包裹层的样式属性 */
  style: CSSProperties;
  /** 外层包裹层绑定的DOM， 用来跨多组件查找属性样式 */
  domId?: string;
}) {
  let isStartMove = false;
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefix = getPrefixCls('vis-drag-layout-resize');
  let closeMove: () => void;
  let mouseMoveFn: (e: MouseEvent) => void;
  const elWrap = useRef<HTMLDivElement>(null);
  const elLine = useRef<HTMLDivElement>(null);
  const { direction, children, style } = props;

  useLayoutEffect(() => {
    let prevX: number;
    let prevY: number;
    const { current: el } = elWrap;
    closeMove = () => {
      isStartMove = false;
    };
    mouseMoveFn = (e) => {
      if (isStartMove && el) {
        e.stopPropagation();
        const { x, y } = e;
        const deviationX = x - (prevX || x);
        const deviationY = y - (prevY || y);
        const { left, top, width } = el.getBoundingClientRect();
        if (deviationX && direction === DRAG_DIRECTION.RIGHT_LEFT) {
          el.style.width = `${x - left}px`;
        }
        if (deviationX && direction === DRAG_DIRECTION.LEFT_RIGHT) {
          el.style.width = `${width + -(x - left)}px`;
        }
        if (
          deviationY &&
          (direction === DRAG_DIRECTION.BUTTOM_TOP ||
            direction === DRAG_DIRECTION.TOP_BUTTOM)
        ) {
          el.style.height = `${y - top}px`;
        }
        prevX = x;
        prevY = y;
      }
    };
    document.body.addEventListener('mouseup', closeMove);
    document.body.addEventListener('mousemove', mouseMoveFn);
    return function () {
      document.body.removeEventListener('mouseup', closeMove);
      document.body.removeEventListener('mousemove', mouseMoveFn);
    };
  });
  const scrollBottom = useCallback((e: React.UIEvent<HTMLElement>) => {
    // 适配滚动条情况
    elLine.current &&
      (elLine.current.style.bottom = `${-e?.currentTarget.scrollTop}px`);
  }, []);
  return (
    <div
      style={{
        position: 'relative',
        ...WRAP_STYLES[direction],
        ...style,
        userSelect: 'none',
      }}
      ref={elWrap}
      id={props?.domId}
      onScroll={scrollBottom}
    >
      <div
        style={{ ...EL_ATTRS[direction] }}
        className={`${prefix}-drag-line`}
        onMouseDown={() => {
          isStartMove = true;
        }}
        ref={elLine}
      >
        {direction === DRAG_DIRECTION.LEFT_RIGHT ||
        direction === DRAG_DIRECTION.RIGHT_LEFT ? (
          <VerticalLeftOutlined
            style={{
              position: 'absolute',
              top: 'calc( 50% - 5px )',
              left: '-3px',
              fontSize: '10px',
            }}
          />
        ) : (
          <VerticalAlignMiddleOutlined
            style={{
              position: 'absolute',
              left: 'calc( 50% - 5px )',
              top: '0px',
              fontSize: '10px',
            }}
          />
        )}
      </div>
      {children}
    </div>
  );
}
DragLayoutResize.DRAG_DIRECTION = DRAG_DIRECTION;
export default DragLayoutResize;
