import { RequestConfig } from '@umijs/max';
import { notification } from 'antd';

// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<any> {
  // 获取用户信息， 权限
  return { name: '@umijs/max', username: 'Chencc' };
}
export const request: RequestConfig = {
  timeout: 1000,
  requestInterceptors: [],
  responseInterceptors: [
    (response) => {
      const { data = {} as any } = response;
      if (data.code === 200) {
        return data;
      }
      notification.error({
        message: data.message || '请求失败',
      });
      return data;
    },
  ],
};
