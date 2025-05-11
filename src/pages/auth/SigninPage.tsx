import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Space } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { apiService } from '@/services/apiService';
import { z } from 'zod';
import { setAuthTokens } from '@/features/auth/auth.store';
import { useMessage } from '@/utils/message';

const { Title, Text, Paragraph } = Typography;

/**
 * Schema for sign in form validation
 */
const signinSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type SigninFormValues = z.infer<typeof signinSchema>;

/**
 * SigninPage component handles user authentication
 */
const SigninPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const message = useMessage();

  // Get redirect path from location state or default to '/'
  const from = location.state?.from?.pathname || '/';

  // Create a validation rule from our Zod schema
  const rule = createSchemaFieldRule(signinSchema);

  const handleSignin = async (values: SigninFormValues) => {
    setLoading(true);

    try {
      // Call sign-in endpoint directly instead of through AuthService
      // as the AuthService doesn't handle token storage
      const response = await apiService.post('/api/v1/auth/signin', values);

      // Get tokens from response
      const { accessToken, refreshToken } = response.data;

      if (!accessToken) {
        throw new Error('No access token received from server');
      }

      // Store tokens
      setAuthTokens({
        accessToken,
        refreshToken: refreshToken || null,
      });

      // Show success message
      message.success('Signed in successfully');

      // Navigate to the dashboard or the protected route the user tried to access
      navigate(from === '/' ? '/dashboard' : from, { replace: true });
    } catch (error: unknown) {
      // Handle errors from the API
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        (error instanceof Error ? error.message : 'Unknown error') ||
        'Sign in failed. Please check your credentials and try again.';

      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-md">
        <div className="text-center mb-6">
          <Title level={2}>Sign In</Title>
          <Paragraph>Welcome back to Entix platform</Paragraph>
        </div>

        <Form form={form} layout="vertical" onFinish={handleSignin} requiredMark={false}>
          <Form.Item name="username" label="Username" rules={[rule]}>
            <Input size="large" placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[rule]}
            extra={
              <div className="text-right">
                <Link to="/auth/forgot-password">Forgot password?</Link>
              </div>
            }
          >
            <Input.Password size="large" placeholder="Enter your password" />
          </Form.Item>

          <Form.Item className="mb-2">
            <Button type="primary" htmlType="submit" loading={loading} size="large" block>
              Sign In
            </Button>
          </Form.Item>

          <div className="text-center mt-4">
            <Space direction="vertical" size="small">
              <Text>
                Don&apos;t have an account? <Link to="/auth/signup">Sign up</Link>
              </Text>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SigninPage;
