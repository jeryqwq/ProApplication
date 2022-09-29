import React, { useMemo, forwardRef, CSSProperties } from 'react';


import classnames from 'classnames';

import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { useAutoResize } from '@vis/utils';

import './style.less';

const defaultColor = ['rgba(128,128,128,0.3)', 'rgba(128,128,128,0.5)'];

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
  const classNames = useMemo(() => classnames('dv-border-box-7', className), [
    className,
  ]);
  const styles = useMemo(() => ({
    boxShadow: `inset 0 0 40px ${mergedColor[0]}`,
    border: `1px solid ${mergedColor[0]}`,
    backgroundColor,
    ...style,
  }), [style, mergedColor, backgroundColor]);

  return (
    <div className={classNames} style={styles} ref={domRef}>
      <svg className="dv-border-svg-container" width={width} height={height}>
        <polyline className="dv-bb7-line-width-2" stroke={mergedColor[0]} points={'0, 25 0, 0 25, 0'} />
        <polyline
          className="dv-bb7-line-width-2"
          stroke={mergedColor[0]}
          points={`${width - 25}, 0 ${width}, 0 ${width}, 25`}
        />
        <polyline
          className="dv-bb7-line-width-2"
          stroke={mergedColor[0]}
          points={`${width -
            25}, ${height} ${width}, ${height} ${width}, ${height - 25}`}
        />
        <polyline
          className="dv-bb7-line-width-2"
          stroke={mergedColor[0]}
          points={`0, ${height - 25} 0, ${height} 25, ${height}`}
        />
        <polyline className="dv-bb7-line-width-5" stroke={mergedColor[1]} points={'0, 10 0, 0 10, 0'} />
        <polyline
          className="dv-bb7-line-width-5"
          stroke={mergedColor[1]}
          points={`${width - 10}, 0 ${width}, 0 ${width}, 10`}
        />
        <polyline
          className="dv-bb7-line-width-5"
          stroke={mergedColor[1]}
          points={`${width -
            10}, ${height} ${width}, ${height} ${width}, ${height - 10}`}
        />
        <polyline
          className="dv-bb7-line-width-5"
          stroke={mergedColor[1]}
          points={`0, ${height - 10} 0, ${height} 10, ${height}`}
        />
      </svg>

      <div className="border-box-content">{children}</div>
    </div>
  );
});


BorderBox.defaultProps = {
  backgroundColor: 'transparent',
};

export default BorderBox;
