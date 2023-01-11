import React, {
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
} from 'react';
import './index.less';

type Props = {
  /** 边框的高度 */
  height: number;
  /**  主题色 */
  lineColor: string;
  /** 标题渲染函数或者字符串，函数应返回你生成的DOM，组件或字符串等 */
  title: string | Function;
  /** 内容区渲染函数或者字符串，函数应返回你生成的DOM，组件或字符串等 */
  content: string | Function;
};
export default function ShowText({ title, content, height, lineColor }: Props) {
  const [width, setWidth] = useState(0);
  const [pContent, setPcontent] = useState('');
  const [animatOver, setAnimatOver] = useState(true);
  const [i, setI] = useState(0);
  const pTitle = typeof title === 'function' ? title() : title;
  let interval: NodeJS.Timer;
  useEffect(() => {
    //执行与渲染无关的副作用操作
    const timeout = setTimeout(() => {
      //内容是自定义渲染的函数时取消打字效果，赋予元素闪烁特效五秒后关闭
      typeof content !== 'string' && setAnimatOver(false);
    }, 5000);
    return () => {
      timeout && clearTimeout(timeout);
    };
  }, []);
  const getContainerWidth = useCallback(
    (node: HTMLDivElement) => {
      //动态计算容器宽度，每次ref发生跳转时将执行callBack，useRef无法通知容器变化
      if (node !== null) {
        setWidth(node.getBoundingClientRect().width * 0.98); //留边，避免样式靠边无法显示边框
      }
    },
    [i],
  );
  useLayoutEffect(() => {
    //渲染完成
    if (typeof content === 'string') {
      //内容文本为字符串执行打字和闪烁动画
      const textArr = (content as string)?.split('');
      interval = setInterval(() => {
        setI(i + 1);
        if (String(pContent).length < textArr.length) {
          animationText(textArr[i]);
        } else {
          clearInterval(interval); //打印完成清楚打印动画
          setAnimatOver(false); //动画降级，速度变慢
        }
      }, 100);
    } else {
      interval = setInterval(() => {
        setI(i + 1); //每50毫秒触发一次视图刷新，视图层使用random函数触发随机动画
      }, 100);
    }
    return () => {
      //组件销毁销毁定时器
      interval && clearInterval(interval);
    };
  });
  const animationText = (val: string) => {
    setPcontent(pContent + val);
  };
  const point = (x: number, y: number, r: number, key: string) => {
    return (
      <circle
        cx={x}
        cy={y}
        r={r}
        className="point"
        key={key}
        fill={lineColor}
      ></circle>
    );
  };
  const renderContent = (
    typeof content === 'function' ? content() : content
  ) as any;

  return (
    <div
      className="wrap-text-as32d1a3ssd"
      style={{ height: `${height}px` }}
      ref={getContainerWidth}
    >
      <div className={animatOver ? 'ptitlecur' : 'ptitle'}>{pTitle}</div>
      {
        //渲染子元素或者自定义渲染，无样式覆盖样式
        typeof content === 'function' ? (
          React.cloneElement(renderContent, {
            className: `${
              renderContent.props.className
                ? renderContent.props.className
                : animatOver
                ? 'pcontentCur'
                : 'pcontent'
            }`,
          })
        ) : (
          <div className={animatOver ? 'pcontentCur' : 'pcontent'}>
            {pContent}
          </div>
        )
      }
      <svg width="100%" height={height} className={'svg'}>
        <path
          className={'path1'}
          d={`M 60 0  ,0 0,0 ${height * 0.8},${height * 0.2} ${height - 50}, ${
            width - 50
          } ${height - 50} ,${width} ${height - 50} ${width} ${height * 0.2} ,${
            width - height * 0.2
          } 0Z`}
          fill="none"
          stroke={lineColor}
        ></path>
        <path
          className={'path2'}
          d={`M 60 0  ,0 0,0 ${height * 0.8},${height * 0.2} ${height - 50}, ${
            width - 50
          } ${height - 50} , ${width} ${height - 50} ${width} ${
            height * 0.2
          } ,${width - height * 0.2} 0Z`}
          fill="none"
          stroke={lineColor}
        ></path>
        {[1, 2, 3].map((item) => (
          <path
            key={`arr${item}`}
            className={`sub-arr${item}`}
            d={`M ${width - 105} ${height - 40},${width - 120} ${
              height - 50
            }, ${width - 105} ${height - 60}`}
            stroke={lineColor}
            fill="none"
            strokeWidth={5}
          ></path>
        ))}

        <text x={width - 230} y={height - 20} stroke={lineColor}>
          {animatOver ? parseInt(Math.random() * 100000 + '') : '000000'}
        </text>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
          //生成矩阵点
          return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item1) =>
            point(item * 150, item1 * 110, 2, `${item}.${item1}`),
          );
        })}
        {
          //生成打气筒
          [3, 4, 5, 6].map((item) => (
            <g
              style={{ transform: `translateX(${item * 14}px)` }}
              key={`rect${item}`}
            >
              <circle
                cx={width - 100}
                cy={height - 178}
                r={5}
                className={'right-btm-circle'}
                stroke={lineColor}
              ></circle>
              <path
                d={`M${width - 100} ${height - 172},${width - 100} ${
                  height - 50
                }`}
                stroke={lineColor}
              ></path>
              <circle
                cx={width - 100}
                cy={
                  height -
                  (animatOver
                    ? parseInt(Math.random() * 20 + 150 + '')
                    : parseInt(Math.random() * 4 + 150 + ''))
                }
                r={2}
                fill={lineColor}
              ></circle>
              <rect
                width="10"
                height={item * 10}
                y={
                  height -
                  (animatOver
                    ? parseInt(Math.random() * (8 - item) * 10 + 120 + '')
                    : parseInt(Math.random() * 10 + 120 + ''))
                }
                x={width - 105}
                fill={lineColor}
              />
            </g>
          ))
        }
        <g>
          <circle
            cx={300}
            cy={10}
            r={3}
            className={'sm-circle'}
            fill={lineColor}
          ></circle>
          <circle
            cx={400}
            cy={10}
            r={3}
            className={'sm-circle1'}
            fill={lineColor}
          ></circle>
          <circle
            cx={500}
            cy={10}
            r={3}
            className={'sm-circle2'}
            fill={lineColor}
          ></circle>
        </g>
      </svg>
    </div>
  );
}

ShowText.defaultProps = {
  title: 'ACCESS POINT 标题很长123',
  content: `1这是内2容问字这4是内容问字这是
    内容问字这5字这5是内字1这是内2容问字这4是内容问字这是内容问字这5是
    1这是内2容问字这4是内容内字1这是内2容问字这4是内容问字这是内容问字这5是1这是内2容问
    字这4是内容内字1这是内2容问字这4是内容问字这是内容问字这5是1这是内2容问字这4是内容问字这是字这
    5是内字1这是内2容问字这4是内容问字这是内容问字这5是1这是内2容问字这4是内容问字这是字
    这5是内字1这是内2容问字这4是内容问字这是内容问字这5是1这是内2容问字这4是内容问字这是是内字
    1这是内2容问字这4是内容问字这是内容问字这5是1这是内2容问字这4是内容问字这是字这5是内字
    1这是内2容问字这4是内容问字这是内容问字这5是1这是内2容问字这4是内容问字这是字这5是内字1这
    是内2容问字这4是内容问字这是内容问字这5是1这是内2容问字这4是内容问字这是内容问字这5是内
    字1这是内2容问字这4是内容问字这是内容问字这5是内字1这是内2容问字这4是内容问字这是内容问
    字这5是内字1这是内2容问字这4是内容问字这是内容问字这5是内字1这是内2容问字这4是内容问字
    这是内容问字这5是内字内字1这是内2容问字这4是内容问字这是内容问字这5是内字1这是内2容问字
    这4是内容问字这是内容问字这5是内字1这是内2容问字这4是内容问字这是内容问字这5是内字`,
  height: 500,
  lineColor: 'white',
};
