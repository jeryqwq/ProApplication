import { useMemo, forwardRef, CSSProperties } from 'react';


import classnames from 'classnames';

import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { useAutoResize } from '@vis/utils';
import './style.less';

const defaultColor = ['#7acaec', 'transparent'];

const pointSideLength = 7;

const svgWH = [300, 35];

const rowNum = 2;

const rowPoints = 25;

const halfPointSideLength = pointSideLength / 2;

function getPoints() {
  const [w, h] = svgWH;

  const horizontalGap = w / (rowPoints + 1);
  const verticalGap = h / (rowNum + 1);

  const points = new Array(rowNum)
    .fill(0)
    .map((_foo, i) =>
      new Array(rowPoints)
        .fill(0)
        // eslint-disable-next-line @typescript-eslint/no-shadow
        .map((_foo, j) => [horizontalGap * (j + 1), verticalGap * (i + 1)]));

  return points.reduce((all, item) => [...all, ...item], []);
}

const Decoration = forwardRef(({ className, style, color = [] }: {
  /** 自定义类名 */
  className: string;
  /** 自定义css属性 */
  style: CSSProperties;
  /**  颜色 */
  color: string[];

}, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  function calcSVGData() {
    return {
      points: getPoints(),
      svgScale: [width / svgWH[0], height / svgWH[1]],
    };
  }

  const mergedColor = useMemo(() => merge(cloneDeep(defaultColor), color || []), [color]);

  const { svgScale, points } = useMemo(calcSVGData, [width, height]);

  const classNames = useMemo(() => classnames('dv-decoration-3', className), [
    className,
  ]);

  return (
    <div className={classNames} style={style} ref={domRef}>
      <svg
        width={`${svgWH[0]}px`}
        height={`${svgWH[1]}px`}
        style={{ transform: `scale(${svgScale[0]},${svgScale[1]})` }}
      >
        {points.map((point, i) => (
          <rect
            key={i}
            fill={mergedColor[0]}
            x={point[0] - halfPointSideLength}
            y={point[1] - halfPointSideLength}
            width={pointSideLength}
            height={pointSideLength}
          >
            {Math.random() > 0.6 && (
              <animate
                attributeName="fill"
                values={`${mergedColor.join(';')}`}
                dur={`${Math.random() + 1}s`}
                begin={Math.random() * 2}
                repeatCount="indefinite"
              />
            )}
          </rect>
        ))}
      </svg>
    </div>
  );
});

export default Decoration;
