import { useState, useEffect } from 'react';
import { Line, LineConfig as _LineConfig } from '@ant-design/plots';
import React from 'react';
interface BasicLineProps {
    config?: _LineConfig
}
export const LineConfig : React.FC<_LineConfig> = () => <></>;

export default (props: BasicLineProps) => {
  const { config } = props
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const renderConfig: _LineConfig = {
    // 图表容器
    autoFit: true,
    // width: 200,
    // height: 100,
    padding: 'auto',
    // appendPadding: [16, 8, 16, 18],
    renderer: 'canvas',
    // pixelRatio: window.devicePixelRatio,
    limitInPlot: false,
    // locale: 'zh-CN',
    // 数据映射
    data,
    xField: 'Date',
    yField: 'scales',
    xAxis: {
      // type: 'timeCat',
      tickCount: 5,
    },
    // seriesField: '',
    // meta: {},
    // 图形样式
    smooth: true,
    // stepType: 
    connectNulls: true,
    isStack: false,
    // color: ['#d62728', '#2ca02c', '#000000'],
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
    // point: {},
    // state: {},
    // 图表组件
    ...config

  };

  // plot.on('element:click', (...args) => {
  //   console.log(...args);
  // });
  

  return <Line {...renderConfig} />;
}
