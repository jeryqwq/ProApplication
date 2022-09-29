import { DRAG_DIRECTION } from '@/constants/other';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import styles from './index.module.less';

const EL_ATTRS = {
  [DRAG_DIRECTION.LEFT_RIGHT]: {
    width: '5px',
    height: '100%',
    left: '0px',
    top: '0px',
    cursor: 'ew-resize',
  },
  [DRAG_DIRECTION.RIGHT_LEFT]: {
    width: '5px',
    height: '100%',
    right: '0px',
    top: '0px',
    cursor: 'ew-resize',
  },
  [DRAG_DIRECTION.TOP_BUTTOM]: {
    width: '100%',
    height: '5px',
    left: '0px',
    bottom: '0px',
    cursor: 'row-resize',
  },
  [DRAG_DIRECTION.BUTTOM_TOP]: {
    width: '100%',
    height: '5px',
    left: '0px',
    bottom: '0px',
    cursor: 'row-resize',
  },
};

export default function (props: {
  direction: string;
  min: number;
  max: number;
  children: React.ReactNode;
  style: Record<string, any>;
  domId?: string;
}) {
  let isStartMove = false;
  let closeMove: () => void; let
    mouseMoveFn: (e: MouseEvent) => void;
  const elWrap = useRef<HTMLDivElement>(null);
  const elLine = useRef<HTMLDivElement>(null);
  const { direction, min, children, style, max } = props;
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
      style={{ position: 'relative', ...style }}
      ref={elWrap}
      id={props?.domId}
      onScroll={scrollBottom}
    >
      <div
        style={{ ...EL_ATTRS[direction] }}
        className={styles['drag-line']}
        onMouseDown={() => {
          isStartMove = true;
        }}
        ref={elLine}
      />
      {children}
    </div>
  );
}
