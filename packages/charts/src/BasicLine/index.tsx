// @ts-nocheck
import { Line, LineConfig as _LineConfig } from '@ant-design/plots';
import React from 'react';
interface BasicLineProps {
  config?: _LineConfig;
  data?: Array<{ name: string; value: number }>;
}
export const LineConfig: React.FC<_LineConfig> = () => <></>;

export default (props: BasicLineProps) => {
  const { config, data } = props;
  const tempData = [
    {
      name: '分类一',
      value: 27,
      category: '1',
    },
    {
      name: '分类二',
      value: 25,
      category: '1',
    },
    {
      name: '分类三',
      value: 18,
      category: '1',
    },
    {
      name: '分类一',
      value: 15,
      category: '2',
    },
    {
      name: '分类二',
      value: 10,
      category: '2',
    },
    {
      name: '分类三',
      value: 5,
      category: '2',
    },
  ];

  const renderData = data || tempData;

  const renderConfig: _LineConfig = {
    // 图表容器
    autoFit: true,
    padding: 'auto',
    renderer: 'canvas',
    limitInPlot: false,
    // 数据映射
    data: renderData,
    xField: 'name',
    yField: 'value',
    xAxis: {
      tickCount: 5,
    },
    // 图形样式
    smooth: true,
    connectNulls: true,
    isStack: false,
    color: 'pink',
    seriesField: 'category',
    lineStyle: {
      // style: {
      //   fill: 'red',
      //   fillOpacity: 0.5,
      //   stroke: 'black',
      //   lineWidth: 1,
      //   lineDash: [4, 5],
      //   strokeOpacity: 0.7,
      //   shadowColor: 'black',
      //   shadowBlur: 10,
      //   shadowOffsetX: 5,
      //   shadowOffsetY: 5,
      //   cursor: 'pointer'
      // }
    },
    ...config,
  };

  // 折线图单系列、多系列时颜色配置处理
  renderConfig.color =
    renderData[0][renderConfig.seriesField] !== undefined &&
    renderConfig.seriesField !== undefined
      ? ['red', 'yellow']
      : 'blue';
  renderConfig.seriesField &&
    !renderData[0][renderConfig.seriesField] &&
    delete renderConfig.seriesField;

  return <Line {...renderConfig} />;
};
