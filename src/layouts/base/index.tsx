import { ProConfigProvider, SettingDrawer } from '@ant-design/pro-components';
import { history, matchPath, useModel, useOutlet } from '@umijs/max';
import { Tabs, theme } from 'antd';
import routes from './../../../config/routes';
import AvatarDropDown from './AvatarDropDown';
import ContentSearch from './ContentSearch';
import styles from './index.module.less';
import { findRouterItem, RoutersType } from './layoutHelper';
function Layouts() {
  const pathname = history.location?.pathname;
  const { useToken } = theme;
  const { token } = useToken();
  const [settings, setSetting] = useState<any>({
    layout: 'mix',
    colorPrimary: token.colorPrimary,
  });
  const [collapse, setCollapse] = useState(false);
  const curRouter = findRouterItem(pathname, routes);
  const outlet = useOutlet();
  const [curPath, setCurPath] = useState(curRouter?.path || pathname); // 存储菜单的当前项path， 防止路由有通配符等情况还要再做匹配，浪费
  let curTab: RoutersType | undefined = undefined;
  curRouter &&
    (curTab = {
      label: curRouter.name || '',
      key: pathname,
      children: <div className={`vis__fadeIn`}>{outlet}</div>,
    });
  const { memoHistory, push, remove } = useModel('memoHistory');
  const curRouterItem = memoHistory.find(
    (i) => i.key && matchPath({ path: pathname }, i.key),
  );
  useEffect(() => {
    // 监听pathname属性改变自动push State
    if (!curRouterItem && curRouter) {
      // 没有命中已缓存路由时缓存一次
      curTab && push(curTab);
      setCurPath(pathname);
    } else {
      setCurPath(pathname);
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
          contentStyle={{ margin: '0' }}
          location={{
            pathname: curPath,
          }}
          waterMarkProps={{
            content: 'your username',
          }}
          title="yourname"
          logo="/icon.png"
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
                onClick={() => setCollapse(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'nowrap',
                  whiteSpace: 'nowrap',
                }}
              >
                <ContentSearch />

                <AvatarDropDown />
              </div>
            );
          }}
          menuProps={{
            onClick(e) {
              const { key } = e;
              setCurPath(key);
              history.push(key.replaceAll('*', ''));
            },
            selectedKeys: [curPath],
          }}
          {...settings}
        >
          <Tabs
            type="editable-card"
            hideAdd
            activeKey={curPath}
            onChange={(key) => {
              setCurPath(key);
              key && history.replace(key.replaceAll('*', ''));
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
                      ?.key as '',
                  );
                }
                remove(targetKey as string);
              }
            }}
            items={memoHistory as any}
          />
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
          />
        </ProLayout>
      </ConfigProvider>
    </ProConfigProvider>
  );
}

export default Layouts;
export type { RoutersType };
