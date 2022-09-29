import '@testing-library/jest-dom';
import { render as reactRender, fireEvent } from '@testing-library/react';
import { WordCloud } from '@vis/charts';
import React, { useRef } from 'react';
import { waitForComponentToPaint, waitTime } from '../util';
describe('wordcloud test', () => {
  it('wordcloud items number should fllower the data length & onClick & textContent', async () => {
    const { RENDER_MODE, TEXT_ORIENTATION } = WordCloud;
    let _temp = 1
    const config = {
      mode: RENDER_MODE.NORMAL,
      animate: true,
      events: {
        click(){
          _temp++
        }
      }
    };
    const data = [{
        name: 'test1',
        value: 20
      },
      {
        name: 'test2',
        value: 100
      }
    ]
    const html = reactRender(<div id="wordcloud" style={{height: 400}}>
      <WordCloud data={data}
        config={config}
      />
    </div>);
    await waitForComponentToPaint(html, 200);
    fireEvent.click(html.getByText(/test1/)); // 模拟点击，触发事件
    expect(html.baseElement.querySelectorAll('#wordcloud .word-cloud-item-chencc')?.length).toBe(data.length);
    expect(html.asFragment().textContent).toBe(data.map(i => i.name).join(''));
    expect(_temp).toBe(2);
  })
})


