import React, { useMemo, CSSProperties } from 'react';


import classnames from 'classnames';

import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import './style.less';

const defaultColor = ['#1dc1f5', '#1dc1f5'];


const Decoration = ({ children, className, style, color = [] }: {
  /** 自定义类名  */
  className: string;
  /** 自定义css属性  */
  style: CSSProperties;
  /**  颜色  */
  color: string[];
  /**  */
  children: React.ReactNode;
}) => {
  const mergedColor = useMemo(() => merge(cloneDeep(defaultColor), color || []), [color]);


  const classNames = useMemo(() => classnames('dv-decoration-6', className), [
    [className],
  ]);

  return (
    <div className={classNames} style={style}>
      <svg width="21px" height="20px">
        <polyline
          strokeWidth="4"
          fill="transparent"
          stroke={mergedColor[0]}
          points="10, 0 19, 10 10, 20"
        />
        <polyline
          strokeWidth="2"
          fill="transparent"
          stroke={mergedColor[1]}
          points="2, 0 11, 10 2, 20"
        />
      </svg>
      {children}
      <svg width="21px" height="20px">
        <polyline
          strokeWidth="4"
          fill="transparent"
          stroke={mergedColor[0]}
          points="11, 0 2, 10 11, 20"
        />
        <polyline
          strokeWidth="2"
          fill="transparent"
          stroke={mergedColor[1]}
          points="19, 0 10, 10 19, 20"
        />
      </svg>
    </div>
  );
};

export default Decoration;
