import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Card, Typography, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const { Title } = Typography;

/**
 * Type for login form values.
 */
type LoginFormValues = {
  username?: string;
  password?: string;
  remember?: boolean;
};

/**
 * Login page component with an Ant Design form.
 * @returns {JSX.Element} The rendered Login page.
 */
const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  /**
   * Handles form submission.
   * @param {LoginFormValues} values - The form values.
   */
  const onFinish = (values: LoginFormValues) => {
    console.log('Received values of form: ', values);
    // Here you would typically handle authentication
    // For demo purposes, navigate to home on successful login
    alert('Login Successful (mock)! Redirecting to home.');
    navigate('/');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 200px)' /* Adjust based on header/footer */,
      }}
    >
      <Card style={{ width: 400, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <Space direction="vertical" size="large" style={{ width: '100%', textAlign: 'center' }}>
          <Title level={2}>Login</Title>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a className="login-form-forgot" href="" style={{ float: 'right' }}>
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" block>
                Log in
              </Button>
              Or <Link to="/register">register now!</Link>{' '}
              {/* Assuming a register page might exist */}
            </Form.Item>
          </Form>
          <Link to="/">Go back to Home</Link>
        </Space>
      </Card>
    </div>
  );
};

export default LoginPage;
