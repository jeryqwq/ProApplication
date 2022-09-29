import React, { useMemo, forwardRef, CSSProperties } from 'react';


import classnames from 'classnames';

import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { useAutoResize } from '@vis/utils';

import './style.less';

const defaultColor = ['red', 'rgba(0,0,255,0.8)'];

interface PropsTypes {
  children: React.ReactNode;
  className: string;
  style: CSSProperties;
  color: string[];
  backgroundColor: string;
}

const BorderBox = forwardRef(({ children, className, style, color = [], backgroundColor = 'transparent' }: PropsTypes, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  const mergedColor = useMemo(() => merge(cloneDeep(defaultColor), color || []), [color]);

  const classNames = useMemo(() => classnames('dv-border-box-4', className), [
    className,
  ]);

  return (
    <div className={classNames} style={style} ref={domRef}>
      <svg className="dv-border-svg-container" width={width} height={height}>
        <polygon
          fill={backgroundColor}
          points={`
          9, 7 ${width - 9}, 7 ${width - 9}, ${height - 7} 9, ${height - 7}
        `}
        />
        <circle fill={mergedColor[1]} cx="5" cy="5" r="2" />
        <circle fill={mergedColor[1]} cx={width - 5} cy="5" r="2" />
        <circle fill={mergedColor[1]} cx={width - 5} cy={height - 5} r="2" />
        <circle fill={mergedColor[1]} cx="5" cy={height - 5} r="2" />
        <polyline stroke={mergedColor[0]} points={`10, 4 ${width - 10}, 4`} />
        <polyline stroke={mergedColor[0]} points={`10, ${height - 4} ${width - 10}, ${height - 4}`} />
        <polyline stroke={mergedColor[0]} points={`5, 70 5, ${height - 70}`} />
        <polyline stroke={mergedColor[0]} points={`${width - 5}, 70 ${width - 5}, ${height - 70}`} />
        <polyline stroke={mergedColor[0]} points={'3, 10, 3, 50'} />
        <polyline stroke={mergedColor[0]} points={'7, 30 7, 80'} />
        <polyline stroke={mergedColor[0]} points={`${width - 3}, 10 ${width - 3}, 50`} />
        <polyline stroke={mergedColor[0]} points={`${width - 7}, 30 ${width - 7}, 80`} />
        <polyline stroke={mergedColor[0]} points={`3, ${height - 10} 3, ${height - 50}`} />
        <polyline stroke={mergedColor[0]} points={`7, ${height - 30} 7, ${height - 80}`} />
        <polyline
          stroke={mergedColor[0]}
          points={`${width - 3}, ${height - 10} ${width - 3}, ${height - 50}`}
        />
        <polyline
          stroke={mergedColor[0]}
          points={`${width - 7}, ${height - 30} ${width - 7}, ${height - 80}`}
        />
      </svg>

      <div className="border-box-content">{children}</div>
    </div>
  );
});


// 指定 props 的默认值：
BorderBox.defaultProps = {
  backgroundColor: 'transparent',
};

export default BorderBox;
