// @ts-nocheck
import { Unit } from '@vis/common';
import { transformList2Standard } from '@vis/utils';
import { Progress } from 'antd';
import './index.less';
const prefix = 'vis-progress-line-';
export const progressLineDefaultConfig = {
  alias: '基础图表-条形进度条',
  color: ['#03b47b'],
  showIndex: true,
  showImg: true,
  showPercent: false,
  column: 1,
  // isFixedHeight: false,
  rowProgressHeight: 70,
  barWidth: 8,
  type: 'line',
  percentDecimal: 0,
  indexStyle: {
    width: 16,
    height: 16,
    backgroundColor: '#333333',
    color: '#ffffff',
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 8,
  },
  percentStyle: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'MicrosoftYaHeiUI',
    fontWeight: 'normal',
    marginRight: 3,
  },
  nameStyle: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'MicrosoftYaHeiUI',
    fontWeight: 'normal',
    marginRight: 3,
  },
  valueStyle: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Oswald-Regular',
    fontWeight: 'bold',
    marginLeft: 0,
    pointLength: 0,
    numberConversion: true,
  },
  unitStyle: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Oswald-Regular',
    fontWeight: 'bold',
    marginLeft: 0,
  },
  imgStyle: {
    width: 36,
    height: 24,
    borderWidth: 1,
    borderColor: '#dae3ee',
    padding: 3,
    marginRight: 11,
  },
};
export const progressLineDefaultData = {
  columnList: [
    {
      alias: 'name',
      name: 'name',
    },
    {
      alias: 'value',
      name: 'value',
    },
    {
      alias: 'percent',
      name: 'percent',
    },
    {
      alias: 'country',
      name: 'country',
    },
  ],
  data: [
    ['马提尼克岛', 3107, 4000, ''],
    ['利比里亚', 2074, 4000, ''],
    ['几内亚', 1068, 4000, ''],
    ['危地马拉', 931, 4000, ''],
    ['哥斯达黎加', 238, 4000, ''],
  ],
};
export default ({
  comp,
}: {
  comp: {
    content: typeof progressLineDefaultConfig;
    data: typeof progressLineDefaultData;
  };
}) => {
  const {
    content = progressLineDefaultConfig,
    data = progressLineDefaultData,
  } = comp || {};
  const renderData = transformList2Standard(data);
  const nums = renderData.map((i) => i.value as number);
  const total: number = nums.reduce((a, b) => a + b, 0);
  const max = Math.max(...nums);
  const perForAppend = ((1 - max / total) / 3) * 2;
  return (
    <div style={{ padding: 20 }}>
      <ul className={prefix + 'progress-box'}>
        {renderData.map((i, idx) => (
          <li className={prefix + 'vl-pointer-handler'} key={i.name}>
            <div className={prefix + 'line'}>
              <div className={prefix + 'item'}>
                <span className={prefix + 'number'} style={content.indexStyle}>
                  {idx + 1}
                </span>
                <img src="" alt="" style={{ width: 50, height: 40 }} />
                <span className={prefix + 'name'} style={content.nameStyle}>
                  {i.name}
                </span>
              </div>
              <div className={prefix + 'item'}>
                <span className={prefix + 'number'}>
                  <Unit
                    data={i.value}
                    show
                    numberConversion={content.valueStyle.numberConversion}
                    pointLength={content.valueStyle.pointLength}
                    numStyle={content.valueStyle}
                    unitStyle={content.unitStyle}
                  />
                </span>
              </div>
            </div>
            <div className={prefix + 'progress'}>
              <Progress
                percent={Number(
                  Number.prototype.toFixed.call(
                    (i.value / total + perForAppend) * 100,
                    1,
                  ),
                )}
                type={content.type}
                strokeWidth={content.barWidth}
                showInfo={content.showPercent}
                strokeColor={
                  content.color[idx] || content.color[content.color.length - 1]
                }
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
