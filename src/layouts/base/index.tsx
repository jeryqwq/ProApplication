import { ProConfigProvider, WaterMark } from '@ant-design/pro-components';
import { history, matchPath, useModel, useOutlet } from '@umijs/max';
import { Marquee } from '@vis/components';
import { Tabs, theme } from 'antd';
// @ts-ignore
import routes from './../../../config/routes';
import AvatarDropDown from './AvatarDropDown';
import ContentSearch from './ContentSearch';
import styles from './index.module.less';
import { findRouterItem, RoutersType } from './layoutHelper';
import NotificatTab from './NotificatTab';
function Layouts() {
  const { pathname, search } = history.location;
  const { useToken } = theme;
  const { token } = useToken();
  const [settings, setSetting] = useState<any>({
    layout: 'mix',
    colorPrimary: token.colorPrimary,
  });
  const curRouter = findRouterItem(pathname, routes);
  const outlet = useOutlet();
  const urlParamsStr = pathname + search;
  const [curPath, setCurPath] = useState(urlParamsStr); // 存储菜单的当前项path， 防止路由有通配符等情况还要再做匹配，浪费
  let curTab: RoutersType | undefined = undefined;
  curRouter &&
    (curTab = {
      label: curRouter.name || '',
      key: urlParamsStr,
      path: urlParamsStr,
      children: <div className={`vis__fadeIn`}>{outlet}</div>,
    });
  const { memoHistory, push, remove } = useModel('memoHistory');
  const curRouterItem = memoHistory.find(
    // 是否已经有缓存
    (i) => i.key && matchPath({ path: urlParamsStr }, i.key),
  );
  const keepAlive = curRouter?.meta?.keepAlive;

  useEffect(() => {
    // 监听pathname属性改变自动push State
    if (!curRouterItem && curRouter) {
      // 没有命中已缓存路由时缓存一次
      curTab && push(curTab);
      curRouter.path && setCurPath(urlParamsStr); // 适配微前端，不能使用pathname
    } else {
      if (keepAlive === false && curRouterItem) {
        // 关闭keepAlive时更新下children，使用最新的渲染， 不加随机key会不更新
        curRouterItem.children = (
          <div key={Math.random()} className={`vis__fadeIn`}>
            {outlet}
          </div>
        );
      }
      setCurPath(urlParamsStr);
    }
  }, [pathname]);

  return (
    // proLayout未适配antd5动态主题，这里手动适配下
    <ProConfigProvider hashed={false}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: settings.colorPrimary,
          },
        }}
      >
        <ProLayout
          appList={[
            {
              icon: 'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
              title: 'Doc-ProApp',
              url: 'https://jeryqwq.github.io/build-docs/#/',
              target: '_blank',
            },
            {
              icon: 'https://github.githubassets.com/images/modules/logos_page/Octocat.png',
              title: 'Github-ProApp',
              url: 'https://github.com/jeryqwq/ProApplication',
              target: '_blank',
            },
            {
              icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
              title: 'Ant Design',
              url: 'https://ant.design',
              target: '_blank',
            },
            {
              icon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
              title: 'AntV',
              url: 'https://antv.vision/',
              target: '_blank',
            },
            {
              icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
              title: 'Pro Components',
              url: 'https://procomponents.ant.design/',
            },
            {
              icon: 'https://img.alicdn.com/tfs/TB1zomHwxv1gK0jSZFFXXb0sXXa-200-200.png',
              title: 'umi',
              url: 'https://umijs.org/zh-CN/docs',
            },

            {
              icon: 'https://gw.alipayobjects.com/zos/bmw-prod/8a74c1d3-16f3-4719-be63-15e467a68a24/km0cv8vn_w500_h500.png',
              title: 'qiankun',
              url: 'https://qiankun.umijs.org/',
            },
            {
              icon: 'https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg',
              title: 'Language Sparrow',
              url: 'https://www.yuque.com/',
            },
            {
              icon: 'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
              title: 'dumi',
              url: 'https://d.umijs.org/zh-CN',
            },
          ]}
          contentStyle={{ margin: '0' }}
          location={{
            pathname: curPath,
          }}
          title="pro-app"
          logo="https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg"
          route={{
            routes: routes[1].routes,
            location: {
              pathname: '/',
            },
          }}
          className={styles['base-layout-wrap']}
          rightContentRender={() => {
            return (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'nowrap',
                  whiteSpace: 'nowrap',
                }}
              >
                <ContentSearch />
                <div className="cursor-pointer hover:bg-colorBgTextHover items-center justify-center text-center flex h-32px w-30px   border-rd-5px transition-all-500">
                  <QuestionCircleOutlined />
                </div>
                <NotificatTab />
                <SettingDrawer
                  hideCopyButton={false}
                  enableDarkTheme
                  settings={settings}
                  onSettingChange={(changeSetting) => {
                    changeSetting.colorPrimary &&
                      document
                        .querySelector('html')
                        ?.style.setProperty(
                          '--colorPrimary',
                          changeSetting.colorPrimary,
                        );
                    setSetting(changeSetting);
                  }}
                  disableUrlParams
                />
                <AvatarDropDown />
              </div>
            );
          }}
          menuProps={{
            onClick(e) {
              const { key } = e;
              setCurPath(key);
              history.push(key);
            },
            selectedKeys: [curPath],
          }}
          {...settings}
        >
          <div
            style={{
              position: 'fixed',
              top: '13px',
              zIndex: 101,
              width: 'calc(100% - 500px)',
              textAlign: 'center',
            }}
          >
            <Marquee>
              <div
                style={{
                  color: 'var(--colorPrimary)',
                  borderColor: 'var(--colorPrimary)',
                }}
                className="inline-block   p-3px b-rd-5px  b-1px b-solid cursor-pointer"
                onClick={() => {
                  window.open('https://github.com/jeryqwq/ProApplication');
                }}
              >
                <Badge dot>
                  <NotificationOutlined
                    style={{
                      fontSize: 16,
                      color: 'var(--colorPrimary)',
                    }}
                  />
                </Badge>
                <span>welcome to pro-app ,您有三条新消息，请注意查看</span>
              </div>
            </Marquee>
          </div>
          <WaterMark content="pro-app">
            <Tabs
              type="editable-card"
              hideAdd
              activeKey={curPath}
              onChange={(key) => {
                const item = memoHistory.find((i) => i.key === key);
                item?.path && setCurPath(item.path);
                item?.path && history.push(item.path);
              }}
              onEdit={(targetKey, action: 'add' | 'remove') => {
                if (action === 'remove' && memoHistory.length > 1) {
                  if (curPath === targetKey) {
                    // 如果删除了当前激活的菜单项，激活上一个或者下一个
                    const curIndex = memoHistory.findIndex(
                      (i) => i.key === targetKey,
                    );
                    setCurPath(
                      (memoHistory[curIndex + 1] || memoHistory[curIndex - 1])
                        ?.path as '',
                    );
                  }
                  remove(targetKey as string);
                }
              }}
              items={memoHistory as any}
            />
          </WaterMark>
        </ProLayout>
      </ConfigProvider>
    </ProConfigProvider>
  );
}

export default Layouts;
export type { RoutersType };
