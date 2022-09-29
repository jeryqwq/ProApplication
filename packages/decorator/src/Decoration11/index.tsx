import React, { useMemo, forwardRef, CSSProperties, useRef } from 'react';


import classnames from 'classnames';
import { useAutoResize, nanoid } from '@vis/utils';
import cloneDeep from 'lodash/cloneDeep';
import merge from 'lodash/merge';
import './style.less';

const defaultColor = ['#2783ce', '#2cf7fe'];

const segment = 30;

const sectorAngle = Math.PI / 3;

const ringNum = 3;

const ringWidth = 1;

const showSplitLine = true;
function getCircleRadianPoint(x: number, y: number, radius: number, radian: number): [number, number] {
  return [x + Math.cos(radian) * radius, y + Math.sin(radian) * radius];
}
const Decoration = forwardRef(({ children, className, style, color = [], scanDur = 3, haloDur = 2 }: {
  /** 自定义类名  */
  className: string;
  /** 自定义css属性  */
  style: CSSProperties;
  /**  颜色  */
  color: string[];
  scanDur: number;
  haloDur: number;
  children: React.ReactNode;

}, ref) => {
  const { width, height, domRef } = useAutoResize(ref);
  const x = width / 2;

  const y = height / 2;
  const mergedColor = useMemo(() => merge(cloneDeep(defaultColor), color || []), [color]);
  const pathD = useMemo(() => {
    const startAngle = -Math.PI / 2;
    const angleGap = sectorAngle / segment;
    const r = width / 4;
    let lastEndPoints: any = getCircleRadianPoint(x, y, r, startAngle);

    return new Array(segment)
      .fill('')
      .map((_, i) => {
        const endPoints = getCircleRadianPoint(x, y, r, startAngle - (i + 1) * angleGap).map((_1) => _1.toFixed(5));
        const d = `M${lastEndPoints.join(',')} A${r}, ${r} 0 0 0 ${endPoints.join(',')}`;
        lastEndPoints = endPoints;
        return d;
      });
  }, [x, y, width]);

  const pathColor = useMemo(() => {
    const _color = mergedColor[0];
    // const colorGap = 100 / (segment - 1)

    return new Array(segment)
      .fill(_color);
    // .map((_, i) => fade(color, 100 - i * colorGap))
  }, [mergedColor]);

  const circleR = useMemo(() => {
    const radiusGap = (width / 2 - ringWidth / 2) / ringNum;

    return new Array(ringNum)
      .fill(0)
      .map((_, i) => radiusGap * (i + 1));
  }, [width]);

  const splitLinePoints = useMemo(() => {
    const angleGap = Math.PI / 6;
    const r = width / 2;
    return new Array(6)
      .fill('')
      .map((_, i) => {
        const startAngle = angleGap * (i + 1);
        const endAngle = startAngle + Math.PI;
        const startPoint = getCircleRadianPoint(x, y, r, startAngle);
        const endPoint = getCircleRadianPoint(x, y, r, endAngle);
        return `${startPoint.join(',')} ${endPoint.join(',')}`;
      });
  }, [x, y, width]);

  const arcD = useMemo(() => {
    const angleGap = Math.PI / 6;
    const r = width / 2 - 1;

    return new Array(4)
      .fill('')
      .map((_, i) => {
        const startAngle = angleGap * (3 * i + 1);
        const endAngle = startAngle + angleGap;
        const startPoint = getCircleRadianPoint(x, y, r, startAngle);
        const endPoint = getCircleRadianPoint(x, y, r, endAngle);
        return `M${startPoint.join(',')} A${x}, ${y} 0 0 1 ${endPoint.join(',')}`;
      });
  }, [x, y, width]);

  const idRef = useRef({
    gId: `decoration-12-g-${nanoid()}`,
    gradientId: `decoration-12-gradient-${nanoid()}`,
  });
  const classNames = useMemo(() => classnames('dv-decoration-11', className), [
    className,
  ]);
  return (
    <div className={classNames} style={style} ref={domRef}>
      <svg width={width} height={height}>
        <defs>
          <g id={idRef.current.gId}>
            {
              pathD.map((d, i) => (<path
                stroke={pathColor[i]}
                strokeWidth={width / 2}
                fill="transparent"
                key={d}
                d={d}
              />))
            }
          </g>

          <radialGradient
            id={idRef.current.gradientId}
            cx="50%"
            cy="50%"
            r="50%"
          >
            <stop offset="0%" stopColor="transparent" stopOpacity="1" />
            <stop offset="100%" stopColor={`${mergedColor[1] || defaultColor[1]} , 30`} stopOpacity="1" />
          </radialGradient>
        </defs>

        {
          circleR.map((r) => (<circle
            key={r}
            r={r}
            cx={x}
            cy={y}
            stroke={mergedColor[1]}
            strokeWidth={0.5}
            fill="transparent"
          />))
        }

        <circle
          r="1"
          cx={x}
          cy={y}
          stroke="transparent"
          fill={`url(#${idRef.current.gradientId})`}
        >
          <animate
            attributeName="r"
            values={`1;${width / 2}`}
            dur={`${haloDur}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="1;0"
            dur={`${haloDur}s`}
            repeatCount="indefinite"
          />
        </circle>

        <circle
          r="2"
          cx={x}
          cy={y}
          fill={mergedColor[1]}
        />

        {
          showSplitLine &&
          <g>
            {
              splitLinePoints.map((p) => (<polyline
                key={p}
                points={p}
                stroke={mergedColor[1]}
                strokeWidth={0.5}
                opacity="0.5"
              />))
            }

          </g>
        }

        {
          arcD.map((d) => (<path
            key={d}
            d={d}
            stroke={mergedColor[1]}
            strokeWidth="2"
            fill="transparent"
          />))
        }

        <use href={`#${idRef.current.gId}`}>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values={`0, ${x} ${y};360, ${x} ${y}`}
            dur={`${scanDur}s`}
            repeatCount="indefinite"
          />
        </use>
      </svg>

      <div className="decoration-content">
        {children}
      </div>
    </div>
  );
});

export default Decoration;
