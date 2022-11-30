import React from 'react';
import { Pie, PieConfig as _PieConfig } from '@ant-design/plots';

interface BasicPieConfig {
  config?: _PieConfig,
  data?: Array<{name: string, value: number}>
}

export const PieConfig: React.FC<_PieConfig> = () => <></>;

export default (props: BasicPieConfig) => {
  const { config, data } = props
  const tempData = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  const renderData = data || tempData
  const renderConfig: _PieConfig = {
    color: ["#4f8cbf", "#2ecc71", "#0065ba", "#FF0000", "#FFFF00 ", "#FF00FF "],
    appendPadding: 10,
    data: renderData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
    ...config
  };
  return <Pie {...renderConfig} />;
}