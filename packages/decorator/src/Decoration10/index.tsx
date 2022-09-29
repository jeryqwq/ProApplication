import React, { useMemo, forwardRef, CSSProperties } from 'react';


import classnames from 'classnames';
import { useAutoResize } from '@vis/utils';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import './style.less';

const defaultColor = ['#1a98fc', '#2cf7fe'];

const Decoration = forwardRef(({ children, className, style, color = [] }: {
  /** 自定义类名  */
  className: string;
  /** 自定义css属性  */
  style: CSSProperties;
  /**  颜色  */
  color: string[];
  children: React.ReactNode;
}, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  const mergedColor = useMemo(() => merge(cloneDeep(defaultColor), color || []), [color]);

  const classNames = useMemo(() => classnames('dv-decoration-11', className), [
    className,
  ]);
  return (
    <div className={classNames} style={style} ref={domRef}>
      <svg width={width} height={height}>
        <polygon
          fill={`${mergedColor[1] || defaultColor[1]} , 10`}
          stroke={mergedColor[1]}
          points={'20 10, 25 4, 55 4 60 10'}
        />

        <polygon
          fill={`${mergedColor[1] || defaultColor[1]} , 10`}
          stroke={mergedColor[1]}
          points={`20 ${height - 10}, 25 ${height - 4}, 55 ${height - 4} 60 ${height - 10}`}
        />

        <polygon
          fill={`${mergedColor[1] || defaultColor[1]} , 10`}
          stroke={mergedColor[1]}
          points={`${width - 20} 10, ${width - 25} 4, ${width - 55} 4 ${width - 60} 10`}
        />

        <polygon
          fill={`${mergedColor[1] || defaultColor[1]} , 10`}
          stroke={mergedColor[1]}
          points={`${width - 20} ${height - 10}, ${width - 25} ${height - 4}, ${width - 55} ${height - 4} ${width - 60} ${height - 10}`}
        />

        <polygon
          fill={`${mergedColor[0] || defaultColor[0]}, 20`}
          stroke={mergedColor[0]}
          points={`
          20 10, 5 ${height / 2} 20 ${height - 10}
          ${width - 20} ${height - 10} ${width - 5} ${height / 2} ${width - 20} 10
        `}
        />

        <polyline
          fill="transparent"
          stroke={`${mergedColor[0] || defaultColor[0]}, 70`}
          points={`25 18, 15 ${height / 2} 25 ${height - 18}`}
        />

        <polyline
          fill="transparent"
          stroke={`${mergedColor[0] || defaultColor[0]}, 70`}
          points={`${width - 25} 18, ${width - 15} ${height / 2} ${width - 25} ${height - 18}`}
        />
      </svg>

      <div className="decoration-content">
        {children}
      </div>
    </div>
  );
});

export default Decoration;
