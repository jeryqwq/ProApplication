import { ConfigProvider } from 'antd';
import type { LegacyRef } from 'react';
import  { useContext, useLayoutEffect, useRef } from 'react';
import './index.less';
import type { Options } from './word-cloud';
import { COLOR_MODE, init, RENDER_MODE, TEXT_ORIENTATION } from './word-cloud.js';

function WordCloud({ config, data }: { 
  /** 渲染的所有配置，参考高级配置	 */
  config: Options['config'];
  /** 渲染源数据	*/
  data: Array<{ name: string; value: number }> }) {
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefix = getPrefixCls('vis-word-cloud');
  const elRef = useRef<HTMLDivElement>();
  useLayoutEffect(() => {
    init({
      el: elRef.current as HTMLElement,
      data,
      config,
    });
  }, [config]);
  return <div ref={elRef as LegacyRef<HTMLDivElement> | undefined} className={prefix} />;
}

WordCloud.RENDER_MODE = RENDER_MODE;
WordCloud.TEXT_ORIENTATION = TEXT_ORIENTATION;
WordCloud.COLOR_MODE = COLOR_MODE;
export default WordCloud;
