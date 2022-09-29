import uniRequest from '@/utils/request';
import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  FormInstance,
  LoginForm,
  ProFormText,
} from '@ant-design/pro-components';
import { rsa } from '@vis/utils';
import { message } from 'antd';
import { useRef } from 'react';
import { useHistory } from 'react-router';


export default () => {
  const formRef = useRef<FormInstance>()
  const history = useHistory()
  return (
    <div style={{ backgroundColor: 'white' }}>
      <LoginForm<{
        username: string;
        passwd: string;
      }>
        logo=""
        formRef={formRef}
        title="态势感知平台"
        subTitle=" "
        submitter={{
          async onSubmit() {
            const values = await formRef.current?.getFieldsValue()
            uniRequest({
              url: '/maintain/auth/_login',
              data: { ...values, passwd: rsa.encryptByPwdkey(values.passwd) },
              method: 'post',
            });
            message.success('登录成功！')
            history.push('/unitMonitor')
          },
        }
        }
      >
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
          }}
          placeholder={'请输入用户名'}
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <ProFormText.Password
          name="passwd"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          placeholder={'请输入密码'}
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
      </LoginForm>
    </div>
  );
};
