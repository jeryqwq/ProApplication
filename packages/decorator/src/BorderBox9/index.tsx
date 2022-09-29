import React, { useMemo, forwardRef, CSSProperties } from 'react';


import classnames from 'classnames';

import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { useAutoResize } from '@vis/utils';
import './style.less';

const defaultColor = ['#235fa7', '#4fd2dd'];

interface PropsTypes {
  children: React.ReactNode;
  className: string;
  style: CSSProperties;
  color: string[];
  backgroundColor: string;
}
const border = ['left-top', 'right-top', 'left-bottom', 'right-bottom'];

const BorderBox = forwardRef(({ children, className, style, color = [], backgroundColor = 'transparent' }: PropsTypes, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  const mergedColor = useMemo(() => merge(cloneDeep(defaultColor), color || []), [color]);

  const classNames = useMemo(() => classnames('dv-border-box-10', className), [
    className,
  ]);

  const styles = useMemo(() => ({
    boxShadow: `inset 0 0 25px 3px ${mergedColor[0]}`,
    ...style,
  }), [style, mergedColor]);


  return (
    <div className={classNames} style={styles} ref={domRef}>
      <svg className="dv-border-svg-container" width={width} height={height}>
        <polygon
          fill={backgroundColor}
          points={`
          4, 0 ${width - 4}, 0 ${width}, 4 ${width}, ${height - 4} ${width - 4}, ${height}
          4, ${height} 0, ${height - 4} 0, 4
        `}
        />
      </svg>

      {border.map((borderName) => (
        <svg
          width="150px"
          height="150px"
          key={borderName}
          className={`${borderName} dv-border-svg-container`}
        >
          <polygon
            fill={mergedColor[1]}
            points="40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3"
          />
        </svg>
      ))}
      <div className="border-box-content">{children}</div>
    </div>
  );
});

export default BorderBox;
