import React from 'react';
import { Pie, measureTextWidth, PieConfig as _PieConfig } from '@ant-design/plots';

interface BasicPieProps {
  // 配置
  config?: _PieConfig,
  // 数据
  data?: Array<{name: string, value: number}>
}

export const PieConfig: React.FC<_PieConfig> = () => <></>;

export default (props: BasicPieProps) => {
  const {config, data} = props
  const renderStatistic = (containerWidth: number, text: string, style: React.CSSProperties) => {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
  }
  const tempData = [
    {
      name: '分类一',
      value: 30,
    },
    {
      name: '分类二',
      value: 25,
    },
    {
      name: '分类三',
      value: 15,
    },
    {
      name: '分类四',
      value: 15,
    },
    {
      name: '分类五',
      value: 10,
    },
    {
      name: '其他',
      value: 5,
    },
  ];
  const renderData = data || tempData
  const renderConfig: _PieConfig = {
    appendPadding: 10,
    data: renderData,
    angleField: 'value',
    colorField: 'name',
    radius: 1,
    innerRadius: 0.6,
    label: false,
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    legend: {
      position: 'right',
      offsetX: -108,
      title: {
        text: '',
        spacing: 0,
      },
      itemValue: {
        formatter: (_text, item) => {
          const value = renderData.map(item => item.value)
          const total = value.reduce((a,b) => {return a+b}, 0)
          const items = renderData.filter((d) => d.name === item.value);
          return items.length ? (total ? (items.reduce((a, b) => a + b.value, 0) / items.length) / total * 100  + '%' : 0) : '-';
        },
        style: {
          opacity: 0.65,
        },
      },
    },
    statistic: {
      title: {
        offsetY: 30,
        customHtml: (container, _view, datum) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.name : '总计';
          return renderStatistic(d, text, {
            fontSize: 28,
          });
        },
      },
// @ts-ignore:next-line
      content: {
        offsetY: -30,
        style: {
          fontSize: '32px',
        },
        customHtml: (container, _view, datum, data: { label: string; value: number }[]) => {
          const { width } = container.getBoundingClientRect();
          const text = datum ? `${datum.value}` : `${data.reduce((r, d) => r + d.value, 0)}`;
          return renderStatistic(width, text, {
            fontSize: 32,
          });
        },
      },
    },
    ...config
  };
  return <Pie {...renderConfig} />;
}
