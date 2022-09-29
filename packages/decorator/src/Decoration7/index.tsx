import { useMemo, forwardRef, CSSProperties } from 'react';


import classnames from 'classnames';
import { useAutoResize } from '@vis/utils';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import './style.less';

const defaultColor = ['#1dc1f5', '#1dc1f5'];


const Decoration = forwardRef(({ reverse = false, className, style, color = [] }: {
  /** 自定义类名  */
  className: string;
  /** 自定义css属性  */
  style: CSSProperties;
  /**  颜色  */
  color: string[];
  /**  方向 */
  reverse: boolean;
}, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  const xPos = (pos: any) => (!reverse ? pos : width - pos);

  const mergedColor = useMemo(() => merge(cloneDeep(defaultColor), color || []), [color]);

  const [pointsOne, pointsTwo, pointsThree] = useMemo(
    () => [
      `${xPos(0)}, 0 ${xPos(30)}, ${height / 2}`,
      `${xPos(20)}, 0 ${xPos(50)}, ${height / 2} ${xPos(width)}, ${height / 2}`,
      `${xPos(0)}, ${height - 3}, ${xPos(200)}, ${height - 3}`,
    ],
    [reverse, width, height],
  );

  const classNames = useMemo(() => classnames('dv-decoration-8', className), [
    className,
  ]);

  return (
    <div className={classNames} style={style} ref={domRef}>
      <svg width={width} height={height}>
        <polyline
          stroke={mergedColor[0]}
          strokeWidth="2"
          fill="transparent"
          points={pointsOne}
        />

        <polyline
          stroke={mergedColor[0]}
          strokeWidth="2"
          fill="transparent"
          points={pointsTwo}
        />

        <polyline
          stroke={mergedColor[1]}
          fill="transparent"
          strokeWidth="3"
          points={pointsThree}
        />
      </svg>
    </div>
  );
});

export default Decoration;
