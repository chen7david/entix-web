import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Space } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { signupRequestSchema } from '@/features/auth/auth.schemas';
import { AuthService } from '@/features/auth/auth.service';
import { Link, useNavigate } from 'react-router-dom';
import { useMessage } from '@/utils/message';
import { z } from 'zod';

const { Title, Text, Paragraph } = Typography;

type SignupFormValues = z.infer<typeof signupRequestSchema>;

/**
 * SignupPage component to display and handle user registration
 */
const SignupPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const message = useMessage();

  // Create a validation rule using the Zod schema
  const rule = createSchemaFieldRule(signupRequestSchema);

  const handleSignup = async (values: SignupFormValues) => {
    setLoading(true);

    try {
      await AuthService.signup({
        username: values.username,
        email: values.email,
        password: values.password,
      });

      // Show success message
      message.success(
        'Account created successfully! Please check your email for verification code.'
      );

      // Navigate to confirmation page with username in URL
      navigate(`/auth/confirm-signup?username=${encodeURIComponent(values.username)}`);
    } catch (error: unknown) {
      // Handle errors from the API
      const apiError = error as { response?: { data?: { message?: string } } };
      const errorMessage =
        apiError.response?.data?.message ||
        (error instanceof Error ? error.message : 'Unknown error') ||
        'Failed to create account. Please try again.';

      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-md">
        <div className="text-center mb-6">
          <Title level={2}>Create an Account</Title>
          <Paragraph>Join the Entix platform</Paragraph>
        </div>

        <Form form={form} layout="vertical" onFinish={handleSignup} requiredMark={false}>
          <Form.Item name="username" label="Username" rules={[rule]}>
            <Input size="large" placeholder="Choose a username" />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[rule]}>
            <Input type="email" size="large" placeholder="Your email address" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[rule]}
            extra="Must be at least 8 characters with uppercase, lowercase, number, and special character"
          >
            <Input.Password size="large" placeholder="Create a password" />
          </Form.Item>

          <Form.Item className="mb-2">
            <Button type="primary" htmlType="submit" loading={loading} size="large" block>
              Sign Up
            </Button>
          </Form.Item>

          <div className="text-center mt-4">
            <Space direction="vertical" size="small">
              <Text>
                Already have an account? <Link to="/auth/signin">Sign in</Link>
              </Text>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignupPage;
