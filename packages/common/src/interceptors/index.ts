import { notification } from 'antd'

declare type RequestConfig = {
  headers?: Record<string, string>;
  [other: string]: any;
}
declare type ResponseType = {
  code?: 200 | 404 | 500 | 302;
  data?: any;
  message?: string;
}
export const handleResponseData = (response: ResponseType = {}) => {
  const { code, msg } = response.data
  if (code === 200) {
    return response.data;
  }
  if (code === 424) { // token过期判断
    history.pushState('', '', '/user/login');
    return
  }

  const message = msg || '请求失败'

  notification.error({
    message,
  });

  throw new Error(message)
};

export default {
  request: {
    onConfig: (config: RequestConfig = {}) => {
      // 发送请求前：可以对 RequestConfig 做一些统一处理
      const accessToken = localStorage.getItem('token');
      if (accessToken) {
        config.headers = { Authorization: `Bearer ${accessToken}` }
      }
      return config;
    },
    onError: (error: Error) => {
      return Promise.reject(error);
    },
  },
  response: {
    onConfig: (response: ResponseType) => {
      console.log('===response', response);
      // 请求成功：可以做全局的 toast 展示，或者对 response 做一些格式化
      return handleResponseData(response);
    },
    onError: (error: Error) => {
      // 请求出错：服务端返回错误状态码
      console.error(error);
      return Promise.reject(error);
    },
  },
};
