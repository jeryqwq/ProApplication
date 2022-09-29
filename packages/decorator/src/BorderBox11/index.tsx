import React, { useMemo, forwardRef, CSSProperties } from 'react';


import classnames from 'classnames';

import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { useAutoResize } from '@vis/utils';
import './style.less';

const defaultColor = ['#6586ec', '#2cf7fe'];


const BorderBox = forwardRef(({ children, className, style, color = [], backgroundColor = 'transparent' }: {
  /** 子节点 */
  children: React.ReactNode;
  /** 自定义类名 */
  className: string;
  /** 自定义css属性 */
  style: CSSProperties;
  /**  */
  color: string[];
  backgroundColor: string;
}, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  const mergedColor = useMemo(() => merge(cloneDeep(defaultColor), color || []), [color]);

  const classNames = useMemo(() => classnames('dv-border-box-13', className), [
    className,
  ]);


  return (
    <div className={classNames} style={style} ref={domRef}>
      <svg className="dv-border-svg-container" width={width} height={height}>
        <path
          fill={backgroundColor}
          stroke={mergedColor[0]}
          d={`
          M 5 20 L 5 10 L 12 3  L 60 3 L 68 10
          L ${width - 20} 10 L ${width - 5} 25
          L ${width - 5} ${height - 5} L 20 ${height - 5}
          L 5 ${height - 20} L 5 20
        `}
        />

        <path
          fill="transparent"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="10, 5"
          stroke={mergedColor[0]}
          d="M 16 9 L 61 9"
        />

        <path
          fill="transparent"
          stroke={mergedColor[1]}
          d="M 5 20 L 5 10 L 12 3  L 60 3 L 68 10"
        />

        <path
          fill="transparent"
          stroke={mergedColor[1]}
          d={`M ${width - 5} ${height - 30} L ${width - 5} ${height - 5} L ${width - 30} ${height - 5}`}
        />
      </svg>
      <div className="border-box-content">
        {children}
      </div>
    </div>
  );
});

export default BorderBox;
