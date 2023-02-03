import { useState } from 'react';

// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<any> {
  // 获取用户信息， 权限
  return { name: '@umijs/max', username: 'Chencc' };
}

export function useQiankunStateForSlave() {
  const [globalState, setGlobalState] = useState<any>({
    slogan: 'Hello MicroFrontend',
    isMicroApp: true,
  });

  return {
    globalState,
    setGlobalState,
  };
}
