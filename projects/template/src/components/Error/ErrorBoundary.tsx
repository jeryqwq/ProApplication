import { Alert } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import React from 'react';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; FallBack?: React.ReactNode },
  {
    hasError: boolean;
    error: {
      code: string;
      message: string;
    };
  }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: { code: '', message: '' } };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
  }

  render() {
    if (this.state.hasError) {
      const normalError = (
        <Alert
          message="渲染期间发生了异常"
          description={
            <Paragraph
              copyable
            >{`${this.state.error.code}：${this.state.error.message}`}</Paragraph>
          }
          type="error"
          showIcon
        />
      );
      if (this.state.error.code === 'MODULE_NOT_FOUND') {
        // module no found 优先选择组件穿参降级， 兜底方案使用Alert提示
        return this.props.FallBack || normalError;
      } else {
        return normalError;
      }
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
