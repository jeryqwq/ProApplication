import { runApp, IAppConfig } from 'ice';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import ReactDOM from 'react-dom';
import { interceptors } from '@vis/common';
import { useReducer } from 'react';
import frameWorkReducer, { ActionType, FrameWorkContent } from './reducer/framework';
import 'antd/dist/antd.variable.min.css';
declare type FrameWorkReducer = (state: FrameWorkProps, action: { type: ActionType ; data: FrameWorkProps }) => FrameWorkProps;


const appConfig: IAppConfig = {
  app: {
    getInitialData: async (ctx) => {
      return {
      };
    },
  },
  request: {
    withFullResponse: false,
    headers: {
      // eslint-disable-next-line max-len
      nsrl9ut0tftl9nqv: 'SJjpUIrCTJLGwjspQN3pHxjf4ZNRWeD0hCpb_CwCMsqI2swZFShzLNBs1nraA51P-oGP6Yd9iHNbxI2Ly4zfU0zQWCBaC7TANye8ehtYvPM5q6emkpE0rNsYH-TVe-9gtlGWm0ghTk1_mZ-c_-IlHervj0XU-UQkJ2id-D_zHopujG0__27M-RZgqa1IFVdxlDWXSkaYQgmYSqw1ibNgaDKJIWZcbBhKeIigtgTUFYU18zLj',
    },
    // 拦截器
    interceptors,
  },
  router: {
    type: 'hash',
  },
};


const SubappWarp = function ({ children, customProps: initData }: { customProps: FrameWorkProps; children: React.ReactNode }) { // 注入主应用状态， 仅在微前端部署时执行
  // const [, set] = useState({});
  const [data, dispatch] = useReducer<FrameWorkReducer>(frameWorkReducer, initData)
  return (
    <div className="vis-sub-child dashboard" >
      <FrameWorkContent.Provider value={{ data, dispatch }}>
        {/* <Button onClick={() => {
          store.set('test', { count: store.get('test').count + 1 });
          set({});
        }}
        >子应用+1{ store.get('test').count }
        </Button> */}
        { children }
      </FrameWorkContent.Provider>
    </div>
  );
};

// 自定义 mount 生命周期函数
export function mount(props: { customProps: FrameWorkProps; container: HTMLDivElement }) {
  const { container, customProps } = props;
  console.log('microapp mount props', customProps);
  appConfig.app && (appConfig.app.addProvider = ({ children }) => {
    return <SubappWarp customProps={customProps}>{ children }</SubappWarp>;
  });
  // appConfig.app.mountNode = container
  runApp(appConfig);
}
runApp(appConfig);
// 自定义 unmount 生命周期函数
export function unmount({ container }) {
  ReactDOM.unmountComponentAtNode(container);
}

