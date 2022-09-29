import { useMemo, forwardRef, CSSProperties } from 'react';


import classnames from 'classnames';

import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import { useAutoResize } from '@vis/utils';
import './style.less';

const defaultColor = ['#3f96a5', '#3f96a5'];
const _toConsumableArray2 = require('@babel/runtime/helpers/toConsumableArray');

function filterNonNumber(array: number[]) {
  return array.filter((n) => {
    return typeof n === 'number';
  });
}
function mulAdd(nums: number[]) {
  nums = filterNonNumber(nums);
  return nums.reduce((all, num) => {
    return all + num;
  }, 0);
}
function getPolylineLength(points: any[]): number {
  const lineSegments = new Array(points.length - 1).fill(0).map((_foo, i) => {
    return [points[i], points[i + 1]];
  });
  const lengths = lineSegments.map((item) => {
    // eslint-disable-next-line no-void
    return getTwoPointDistance.apply(void 0, (void 0, _toConsumableArray2['default'])(item));
  });
  return mulAdd(lengths);
}
function getTwoPointDistance(pointOne: [number, number], pointTwo: [number, number]) {
  const minusX = Math.abs(pointOne[0] - pointTwo[0]);
  const minusY = Math.abs(pointOne[1] - pointTwo[1]);
  return Math.sqrt(minusX * minusX + minusY * minusY);
}
const Decoration = forwardRef(({ className, dur = 1.2, style, color = [] }: {
  /** 自定义类名  */
  className: string;
  /** 自定义css属性  */
  style: CSSProperties;
  /**  颜色  */
  color: string[];
  /** 动画执行周期  */
  dur: number;
}, ref) => {
  const { width, height, domRef } = useAutoResize(ref);

  function calcSVGData() {
    const line1Points = [
      [0, height * 0.2],
      [width * 0.18, height * 0.2],
      [width * 0.2, height * 0.4],
      [width * 0.25, height * 0.4],
      [width * 0.27, height * 0.6],
      [width * 0.72, height * 0.6],
      [width * 0.75, height * 0.4],
      [width * 0.8, height * 0.4],
      [width * 0.82, height * 0.2],
      [width, height * 0.2],
    ];

    const line2Points = [[width * 0.3, height * 0.8], [width * 0.7, height * 0.8]];

    const line1Length = getPolylineLength(line1Points);
    const line2Length = getPolylineLength(line2Points);


    // eslint-disable-next-line max-len
    return { line1Points: line1Points.map((point) => point.join(',')).join(' '), line2Points: line2Points.map((point) => point.join(',')).join(' '), line1Length, line2Length };
  }

  const mergedColor = useMemo(() => merge(cloneDeep(defaultColor), color || []), [color]);

  const { line1Points, line2Points, line1Length, line2Length } = useMemo(
    calcSVGData,
    [width, height],
  );

  const classNames = useMemo(() => classnames('dv-decoration-5', className), [
    className,
  ]);
  return (
    <div className={classNames} style={style} ref={domRef}>
      <svg width={width} height={height}>
        <polyline
          fill="transparent"
          stroke={mergedColor[0]}
          strokeWidth="3"
          points={line1Points}
        >
          <animate
            attributeName="stroke-dasharray"
            attributeType="XML"
            from={`0, ${line1Length / 2}, 0, ${line1Length / 2}`}
            to={`0, 0, ${line1Length}, 0`}
            dur={`${dur}s`}
            begin="0s"
            calcMode="spline"
            keyTimes="0;1"
            keySplines="0.4,1,0.49,0.98"
            repeatCount="indefinite"
          />
        </polyline>
        <polyline
          fill="transparent"
          stroke={mergedColor[1]}
          strokeWidth="2"
          points={line2Points}
        >
          <animate
            attributeName="stroke-dasharray"
            attributeType="XML"
            from={`0, ${line2Length / 2}, 0, ${line2Length / 2}`}
            to={`0, 0, ${line2Length}, 0`}
            dur={`${dur}s`}
            begin="0s"
            calcMode="spline"
            keyTimes="0;1"
            keySplines=".4,1,.49,.98"
            repeatCount="indefinite"
          />
        </polyline>
      </svg>
    </div>
  );
});

export default Decoration;
