import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Space } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { AuthService } from '@/features/auth/auth.service';
import { useMessage } from '@/utils/message';
import type { ForgotPasswordRequest } from '@/features/auth/auth.schemas';

const { Title, Text, Paragraph } = Typography;

/**
 * Schema for forgot password form validation
 */
const forgotPasswordSchema = z.object({
  username: z.string().min(1, 'Username is required'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

/**
 * ForgotPasswordPage component allows users to request a password reset
 * @returns {JSX.Element} Forgot password form
 */
const ForgotPasswordPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [username, setUsername] = useState('');
  const [form] = Form.useForm();
  const message = useMessage();

  // Create a validation rule from our Zod schema
  const rule = createSchemaFieldRule(forgotPasswordSchema);

  const handleForgotPassword = async (values: ForgotPasswordFormValues) => {
    setLoading(true);

    try {
      const requestData: ForgotPasswordRequest = {
        username: values.username,
      };

      const response = await AuthService.forgotPassword(requestData);

      // Save username for the confirm step
      setUsername(values.username);
      setSubmitted(true);

      // Show success message with detail about where code was sent
      message.success(
        `Recovery code sent to ${response.codeDeliveryDetails.destination} via ${response.codeDeliveryDetails.deliveryMedium.toLowerCase()}`
      );
    } catch (error: unknown) {
      // Handle errors from the API
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        (error instanceof Error ? error.message : 'Unknown error') ||
        'Failed to request password reset. Please try again.';

      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // If form was submitted, show confirmation success
  if (submitted) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
        <Card className="w-full max-w-md shadow-md">
          <div className="text-center mb-6">
            <Title level={2}>Check Your Email</Title>
            <Paragraph>
              We&apos;ve sent a password recovery code to your email. Please check your inbox.
            </Paragraph>
          </div>

          <Space direction="vertical" size="middle" className="w-full">
            <Button type="primary" size="large" block>
              <Link to={`/auth/reset-password?username=${encodeURIComponent(username)}`}>
                Enter Recovery Code
              </Link>
            </Button>
            <Button block>
              <Link to="/auth/signin">Back to Sign In</Link>
            </Button>
          </Space>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-md">
        <div className="text-center mb-6">
          <Title level={2}>Reset Password</Title>
          <Paragraph>
            Enter your username and we&apos;ll send you instructions to reset your password
          </Paragraph>
        </div>

        <Form form={form} layout="vertical" onFinish={handleForgotPassword} requiredMark={false}>
          <Form.Item name="username" label="Username" rules={[rule]}>
            <Input size="large" placeholder="Enter your username" />
          </Form.Item>

          <Form.Item className="mb-2">
            <Button type="primary" htmlType="submit" loading={loading} size="large" block>
              Send Recovery Code
            </Button>
          </Form.Item>

          <div className="text-center mt-4">
            <Space direction="vertical" size="small">
              <Text>
                Remember your password? <Link to="/auth/signin">Sign in</Link>
              </Text>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
