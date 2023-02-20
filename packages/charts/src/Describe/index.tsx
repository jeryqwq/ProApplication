import { transformList2Standard } from '@vis/utils';

export const describeDefaultData = {
  columnList: [
    { alias: 'pending' },
    { alias: 'reassigned' },
    { alias: 'total' },
  ],
  data: [[12, 56, 100]],
};
export const describeDefaultConfig = {
  alias: '文字-概述',
  height: 30,
  mode: 'data',
  chartClick: [],
  boxStyle: {
    height: 30,
    overflow: 'auto',
  },
  desText:
    '当前待处置告警{pending}条，已处置告警{reassigned}条，共计告警总数{total}条。',
  descStyle: {
    fontSize: 12,
    color: '#666',
    lineHeight: 24,
  },
  unitConvert: false,
  decimalLength: 0,
  numStyle: {
    marginLeft: 6,
    marginRight: 6,
    fontFamily: 'Oswald',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#666',
    pointLength: 0,
    numberConversion: false,
  },
  unitStyle: {
    marginLeft: 5,
    fontFamily: 'Microsoft YaHei UI',
    fontWeight: 'normal',
    fontSize: 12,
    color: '#666',
  },
  customStyle: [],
};

function DescribeView({ comp = {} }: { comp: any }) {
  const { content = describeDefaultConfig, data = describeDefaultData } = comp;
  const { chartClick } = comp;
  const _data = transformList2Standard(data)[0];
  const { customStyle, numStyle, descStyle } = content;

  return (
    <div style={{ ...descStyle, lineHeight: `${descStyle.lineHeight}px` }}>
      {content.desText.split(/{([a-z]+)}/g).map((i: any) => {
        const val = _data?.[i] as any;
        if (val) {
          const curItemConfig = customStyle.find((j: any) => j.key === i);
          const styles =
            curItemConfig?.type === 'custom' ? curItemConfig.style : numStyle;
          return (
            <span
              style={styles}
              onClick={() => {
                const chartItem = chartClick?.find((k: any) => k.key === i);
                if (chartItem && chartItem.open) {
                  let searchStr = '?';
                  for (const key in chartItem.query) {
                    if (
                      Object.prototype.hasOwnProperty.call(chartItem.query, key)
                    ) {
                      const element = chartItem.query[key];
                      searchStr += key;
                      searchStr += '=';
                      searchStr += element;
                      searchStr += '&';
                    }
                  }
                  window.open(chartItem.url + searchStr);
                }
              }}
            >
              {val}
            </span>
          );
        } else {
          return i;
        }
      })}
    </div>
  );
}

export default DescribeView;
