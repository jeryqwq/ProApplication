import React, { useMemo, forwardRef, CSSProperties, useState } from 'react';


import classnames from 'classnames';

import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { useAutoResize, nanoid } from '@vis/utils';
import './style.less';

const defaultColor = ['#235fa7', '#4fd2dd'];

interface PropsTypes {
  children: React.ReactNode;
  className: string;
  style: CSSProperties;
  color: string[];
  backgroundColor: string;
  reverse: boolean;
  dur: number;
}

// eslint-disable-next-line max-len
const BorderBox = forwardRef(({ dur = 3, children, className, style, reverse = false, color = [], backgroundColor = 'transparent' }: PropsTypes, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  const [{ path, gradient, mask }] = useState(() => {
    const id = nanoid();

    return {
      path: `border-box-8-path-${id}`,
      gradient: `border-box-8-gradient-${id}`,
      mask: `border-box-8-mask-${id}`,
    };
  });

  const pathD = useMemo(() =>
    (reverse
      ? `M 2.5, 2.5 L 2.5, ${height - 2.5} L ${width - 2.5}, ${height - 2.5} L ${width - 2.5}, 2.5 L 2.5, 2.5`
      : `M2.5, 2.5 L${width - 2.5}, 2.5 L${width - 2.5}, ${height - 2.5} L2.5, ${height - 2.5} L2.5, 2.5`)
  , [width, height, reverse]);

  const mergedColor = useMemo(() => merge(cloneDeep(defaultColor), color || []), [color]);

  const length = useMemo(() => (width + height - 5) * 2, [width, height]);

  const classNames = useMemo(() => classnames('dv-border-box-8', className), [
    className,
  ]);
  return (
    <div className={classNames} style={style} ref={domRef}>
      <svg className="dv-border-svg-container" width={width} height={height}>
        <defs>
          <path id={path} d={pathD} fill="transparent" />
          <radialGradient id={gradient} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>

          <mask id={mask}>
            <circle cx="0" cy="0" r="150" fill={`url(#${gradient})`}>
              <animateMotion dur={`${dur}s`} path={pathD} rotate="auto" repeatCount="indefinite" />
            </circle>
          </mask>
        </defs>

        <polygon fill={backgroundColor} points={`5, 5 ${width - 5}, 5 ${width - 5} ${height - 5} 5, ${height - 5}`} />

        <use stroke={mergedColor[0]} strokeWidth="1" href={`#${path}`} />

        <use
          stroke={mergedColor[1]}
          strokeWidth="3"
          href={`#${path}`}
          mask={`url(#${mask})`}
        >
          <animate
            attributeName="stroke-dasharray"
            from={`0, ${length}`}
            to={`${length}, 0`}
            dur={`${dur}s`}
            repeatCount="indefinite"
          />
        </use>
      </svg>

      <div className="border-box-content">{children}</div>
    </div>
  );
});

export default BorderBox;
