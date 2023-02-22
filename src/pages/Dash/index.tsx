import { StatisticCard } from '@ant-design/pro-components';
import { BasicColumn, BasicLine, ProgressLine, WordCloud } from '@vis/charts';
import { VisHeader } from '@vis/common';
import { Statistic } from 'antd';
const { Countdown } = Statistic;
const { RENDER_MODE } = WordCloud;
const config = {
  mode: RENDER_MODE.SCROLL,
  animate: true,
};
let temp: any[] = [];
const words = [
  '这根本就不好玩',
  '再见',
  'MDML在线测试',
  '深入浅出CSS3',
  'React测试',
  '这就是个文字内容',
  '高刷屏',
  '默认触发间隔',
  '假如我说假如',
  '发现越来越多的美好',
  '小惊喜',
  '不会只有我',
  '哦次打次',
  '客气客气',
];
for (let index = 0; index < words.length; index++) {
  const item = words[index];
  temp.push({
    value: Math.floor(Math.random() * 1000),
    name: item || `test-${index}`,
  });
}
export default () => {
  const [responsive, setResponsive] = useState(false);

  return (
    <div className="h-full overflow-auto">
      <Row gutter={16} className="m-t-20px">
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Active"
              value={11.28}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Idle"
              value={9.3}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Countdown
              title="Million Seconds"
              value={Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30}
              format="HH:mm:ss:SSS"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered={false}>
            <Statistic
              title="Feedback"
              value={1128}
              prefix={<LikeOutlined />}
            />
          </Card>
        </Col>
        <Col span={24} className="m-t-20px ">
          <ProCard split={responsive ? 'horizontal' : 'vertical'}>
            <StatisticCard
              colSpan={responsive ? 24 : 6}
              title="财年业绩目标"
              statistic={{
                value: 82.6,
                suffix: '亿',
                description: (
                  <Statistic title="日同比" value="6.47%" trend="up" />
                ),
              }}
              chart={
                <img
                  src="https://gw.alipayobjects.com/zos/alicdn/PmKfn4qvD/mubiaowancheng-lan.svg"
                  alt="进度条"
                  width="100%"
                />
              }
              footer={
                <Row>
                  <Col span="8">
                    <Statistic value="70.98%" title="财年业绩完成率" />
                  </Col>
                  <Col span="8">
                    <Statistic value="70.98%" title="财年业绩完成率" />
                  </Col>
                  <Col span="8">
                    <Statistic value="70.98%" title="财年业绩完成率" />
                  </Col>
                </Row>
              }
            />
            <StatisticCard.Group
              colSpan={responsive ? 24 : 18}
              direction={responsive ? 'column' : undefined}
            >
              <StatisticCard
                statistic={{
                  title: '财年总收入',
                  value: 601987768,
                  description: (
                    <Statistic title="日同比" value="6.15%" trend="up" />
                  ),
                }}
                chart={
                  <img
                    src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                    alt="折线图"
                    width="100%"
                  />
                }
              >
                <Statistic
                  title="大盘总收入"
                  value={1982312}
                  layout="vertical"
                  description={
                    <Statistic title="日同比" value="6.15%" trend="down" />
                  }
                />
              </StatisticCard>
              <StatisticCard
                statistic={{
                  title: '当日排名',
                  value: 6,
                  description: (
                    <Statistic title="日同比" value="3.85%" trend="down" />
                  ),
                }}
                chart={
                  <img
                    src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                    alt="折线图"
                    width="100%"
                  />
                }
              >
                <Statistic
                  title="近7日收入"
                  value={17458}
                  layout="vertical"
                  description={
                    <Statistic title="日同比" value="6.47%" trend="up" />
                  }
                />
              </StatisticCard>
              <StatisticCard
                statistic={{
                  title: '财年业绩收入排名',
                  value: 2,
                  description: (
                    <Statistic title="日同比" value="6.47%" trend="up" />
                  ),
                }}
                chart={
                  <img
                    src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                    alt="折线图"
                    width="100%"
                  />
                }
              >
                <Statistic
                  title="月付费个数"
                  value={601}
                  layout="vertical"
                  description={
                    <Statistic title="日同比" value="6.47%" trend="down" />
                  }
                />
              </StatisticCard>
            </StatisticCard.Group>
          </ProCard>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12} className="m-t-20px p-b-20px b-rd-10px">
          <VisHeader
            style={{ padding: 10, background: 'white', borderRadius: 10 }}
            tabs={[
              {
                title: '图表1',
                key: '1',
                content: (
                  <div className=" h-200px bg-white">
                    <BasicColumn />
                  </div>
                ),
              },
              {
                title: '图表1-1',
                key: '1-1',
                content: (
                  <div className="  h-200px bg-white">
                    <BasicLine />
                  </div>
                ),
              },
            ]}
          />
        </Col>
        <Col span={12} className="m-t-20px p-b-20px ">
          <VisHeader
            style={{ padding: 10, background: 'white', borderRadius: 10 }}
            tabs={[
              {
                title: '图表2',
                key: '1',
                content: (
                  <div className="  h-200px bg-white">
                    <BasicLine />
                  </div>
                ),
              },
              {
                title: '图表1-1',
                key: '1-1',
                content: (
                  <div className="bg-white h-200px">
                    <BasicColumn />
                  </div>
                ),
              },
            ]}
          />
        </Col>
        <Col span={12} className="b-rd-10px p-b-20px b-rd-10px">
          <VisHeader
            tabs={[
              {
                title: '3D滚动词云图',
                key: '1',
                content: (
                  <div className="h-300px bg-white p-10px">
                    <WordCloud config={config} data={temp} />
                  </div>
                ),
              },
              {
                title: '平铺词云图',
                key: '21',
                content: (
                  <div className="h-300px bg-white p-10px">
                    <WordCloud
                      config={{ ...config, mode: RENDER_MODE.NORMAL }}
                      data={temp}
                    />
                  </div>
                ),
              },
            ]}
          />
        </Col>
        <Col span={12} className="b-rd-10px p-b-20px b-rd-10px">
          <div className="bg-white">
            <VisHeader
              tabs={[
                {
                  title: '排名情况',
                  key: '1',
                  content: (
                    <div className="h-300px  p-10px">
                      <ProgressLine />
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};
