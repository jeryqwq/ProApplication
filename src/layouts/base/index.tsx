import React, { useEffect, useState } from 'react';
import { ProLayout, ProSettings, SettingDrawer } from '@ant-design/pro-components';
import routes from '@/routes'
import { history } from '@umijs/max';
import { Avatar, Button, Dropdown, Menu, Tabs } from 'antd';
import { SkinOutlined } from '@ant-design/icons';
import { useOutlet, matchPath, useModel } from '@umijs/max';
import styles from './index.module.less'

declare type RoutersType = { //  router & menu
  name?: string;
  path?: string;
  key?: string;
  routes?: RoutersType[];
  label?: string;
  children?: React.ReactNode;
  component?: string;
}
// 匹配当前路由与配置的path是否匹配
function findRouterItem (key: string, _router: RoutersType[] = routes): RoutersType | undefined {
let ret: RoutersType | undefined = undefined;
    for(let i = 0; i < _router.length; i++) {
      const item = _router[i]
      if(item.path && matchPath({ path: item.path }, key)) {
        ret = item
        return ret
      }else if(item.routes) {
        const res = findRouterItem(key, item.routes)
        if(res) { // 未找到继续向下便利, 找到返回
          return res
        }
      }
    }
  return ret
}

function Layouts() {
  const pathname = history.location?.pathname;
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({});
  const [collapse, setCollapse] = useState(false)
  const curRouter = findRouterItem(pathname, routes)
  const outlet = useOutlet()
  const [ curPath, setCurPath ] = useState(curRouter?.path || pathname) // 存储菜单的当前项path， 防止路由有通配符等情况还要再做匹配，浪费
  let curTab: RoutersType | undefined = undefined;

  curRouter && (
    curTab = {
      label: curRouter.name || '',
      key: curPath,
      children: outlet
    }
  )
  // const [memoHistory, setMemoHistory] = useState<RoutersType[]>(curTab ? [curTab] : [])
  const { memoHistory, push, remove } = useModel('memoHistory');
  useEffect(() => { // 除去第一次渲染，其余每次改动均由curPath改变触发
    if(!memoHistory.find(i => i.key && matchPath({ path: curPath }, i.key)) && curRouter) { // 没有命中已缓存路由时缓存一次
      curTab && push(curTab)
    }
  }, [curPath])
  
  return (
    <ProLayout
      {...settings}
      contentStyle={{ margin: '0' }}
      location={{
        pathname: curPath
      }}
      title="yourname"
      logo="/icon.png"
      route={{
        routes: routes[1].routes
      }}
      className={styles['base-layout-wrap']}
      rightContentRender={() => {
        return <div  onClick={() => setCollapse(false)}>
          <SettingDrawer
            enableDarkTheme
            settings={settings}
            collapse={collapse}
            onSettingChange={(changeSetting) => {
              setSetting(changeSetting);
            }}
            disableUrlParams
          />
        <Button size='small' shape="circle" icon={<SkinOutlined />} style={{margin: '0 10px'}} onClick={(e) => {
          e.stopPropagation()
          setCollapse(true)
        }}/>
        <Dropdown
        overlay={<Menu
          items={[
            {
              label: <a href="https://www.antgroup.com">1st menu item</a>,
              key: '0',
            },
            {
              label: <a href="https://www.aliyun.com">2nd menu item</a>,
              key: '1',
            },
            {
              type: 'divider',
            },
            {
              label: '3rd menu item',
              key: '3',
            },
          ]}
        />} trigger={['hover']}>
          <span className='header-icon-wrap'>
            <span className='anticon'>{ 'Chencc' }</span><Avatar src="https://joeschmoe.io/api/v1/random" /> 
          </span>
        </Dropdown>
      </div>
      }
    }
      menuProps={{
        onClick(e){
          const { key } = e
          setCurPath(key)
          history.push(key.replaceAll('*', ''))
        },
        selectedKeys: [curPath]
      }}
    >
      <Tabs
        type="editable-card"
        hideAdd
        activeKey={curPath}
        onChange={(key) => {
          setCurPath(key)
          key && history.replace(key.replaceAll('*', ''))
        }}
        onEdit={(targetKey, action: 'add' | 'remove') => {
          if(action === 'remove' && memoHistory.length > 1) {
            if(curPath === targetKey) { // 如果删除了当前激活的菜单项，激活上一个或者下一个
              const curIndex = memoHistory.findIndex((i => i.key === targetKey))
              setCurPath((memoHistory[curIndex + 1] || memoHistory[curIndex - 1])?.key as '')
            }
            remove(targetKey as string);
          }
        }}
        items={memoHistory as any}
      />
    </ProLayout>
  );
}

export default Layouts;
export  type { RoutersType }
