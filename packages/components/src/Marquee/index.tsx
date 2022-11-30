
import './index.less'
import React, { Fragment, useEffect, useRef, useState } from 'react';

const prefixClass = 'vis-comp-word-view';

declare interface MarqueeProps {
   /**
   * @description 滚动速度
   * @default 20
   */
  speed?: number;
  /** 滚动的子节点 */
  children: React.ReactNode;
   /**
   * @description 滚动方向
   * @default left
   */
  direction?: 'left' | 'right';
   /**
   * @description 是否滚动
   * @default true
   */
  play?: boolean;
   /**
   * @description 鼠标滑过暂停
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * @description 循环次数，0 ： 无限循环
   * @default 0
   */
  loop?: number;
   /**
   * @description 点击暂停
   * @default false
   */
  pauseOnClick?: boolean;
  /** 开启双边渐变 */
  gradient?: boolean;
  /**
   * @description 渐变宽度
   * @default 200
   */
  gradientWidth?: number | string;
   /**
   * @description 渐变颜色
   * @default [255,255,255]
   */
  gradientColor?: [number, number, number];
     /** 包裹层自定义样式 */
  style?: React.CSSProperties;
  /**
   * @description 延迟触发, 单位ms
   * @default 0
  */
  delay?: number;
  /** 运动到最后一帧时触发 */
  onCycleComplete?:() => void;
  /**  CSS 动画到达其活动期的结束时发送此事件 */
  onFinish?:() => void;
}

export default ({
  gradientColor = [255, 255, 255],
  children,
  direction = "left",
  play = true,
  gradient,
  gradientWidth = 200,
  style = {},
  speed = 20,
  delay = 0,
  loop = 0,
  pauseOnHover = false,
  pauseOnClick = false,
  onCycleComplete,
  onFinish,
}: MarqueeProps ) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [marqueeWidth, setMarqueeWidth] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMounted) return;

    const calculateWidth = () => {
      if (marqueeRef.current && containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
        setMarqueeWidth(marqueeRef.current.getBoundingClientRect().width);
      }
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => {
      window.removeEventListener("resize", calculateWidth);
    };
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const rgbaGradientColor = `rgba(${gradientColor[0]}, ${gradientColor[1]}, ${gradientColor[2]}`;

  const duration =
    marqueeWidth < containerWidth
      ? containerWidth / speed
      : marqueeWidth / speed;

  return (
    <Fragment>
      {!isMounted ? null : (
        <div
          ref={containerRef}
          style={{
            ...style,
            ["--pause-on-hover" as string]: !play || pauseOnHover ? "paused" : "running",
            ["--pause-on-click" as string]: !play || (pauseOnHover && !pauseOnClick) || pauseOnClick ? "paused" : "running",
          }}
          className={prefixClass + "-marquee-container"}
        >
          {gradient && (
            <div
              style={{
                ["--gradient-color" as string]: `${rgbaGradientColor}, 1), ${rgbaGradientColor}, 0)`,
                ["--gradient-width" as string]:
                  typeof gradientWidth === "number"
                    ? `${gradientWidth}px`
                    : gradientWidth,
              }}
              className={prefixClass + "-overlay"}
            />
          )}
          <div
            ref={marqueeRef}
            style={{
              ["--play" as string]: play ? "running" : "paused",
              ["--direction" as string]:
                direction === "left" ? "normal" : "reverse",
              ["--duration" as string]: `${duration}s`,
              ["--delay" as string]: `${delay}s`,
              ["--iteration-count" as string]: !!loop ? `${loop}` : "infinite",
            }}
            className={prefixClass + "-marquee"}
            onAnimationIteration={onCycleComplete}
            onAnimationEnd={onFinish}
          >
            {children}
          </div>
          <div
            style={{
              ["--play" as string]: play ? "running" : "paused",
              ["--direction" as string]:
                direction === "left" ? "normal" : "reverse",
              ["--duration" as string]: `${duration}s`,
              ["--delay" as string]: `${delay}s`,
              ["--iteration-count" as string]: !!loop ? `${loop}` : "infinite",
            }}
            className={prefixClass + "-marquee"}
            aria-hidden="true"
          >
            {children}
          </div>
        </div>
      )}
    </Fragment>
  );
}
