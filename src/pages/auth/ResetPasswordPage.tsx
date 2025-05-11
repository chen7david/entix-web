import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Space } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { z } from 'zod';
import { AuthService } from '@/features/auth/auth.service';
import { useMessage } from '@/utils/message';
import type { ConfirmForgotPasswordRequest } from '@/features/auth/auth.schemas';

const { Title, Text, Paragraph } = Typography;

/**
 * Schema for reset password form validation
 */
const resetPasswordSchema = z
  .object({
    username: z.string().min(1, 'Username is required'),
    code: z.string().min(1, 'Verification code is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

/**
 * ResetPasswordPage component allows users to reset their password with a verification code
 * @returns {JSX.Element} Reset password form
 */
const ResetPasswordPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const message = useMessage();

  // Get username from query params
  const usernameFromParams = searchParams.get('username') || '';

  // Set initial form values if username is provided in URL
  useEffect(() => {
    if (usernameFromParams) {
      form.setFieldsValue({ username: usernameFromParams });
    }
  }, [form, usernameFromParams]);

  // Create a validation rule from our Zod schema
  const rule = createSchemaFieldRule(resetPasswordSchema);

  const handleResetPassword = async (values: ResetPasswordFormValues) => {
    setLoading(true);

    try {
      const requestData: ConfirmForgotPasswordRequest = {
        username: values.username,
        code: values.code,
        newPassword: values.newPassword,
      };

      await AuthService.confirmForgotPassword(requestData);

      // Show success message
      message.success('Your password has been reset successfully');

      // Navigate to sign in page
      navigate('/auth/signin');
    } catch (error: unknown) {
      // Handle errors from the API
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        (error instanceof Error ? error.message : 'Unknown error') ||
        'Failed to reset password. Please check your code and try again.';

      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-md">
        <div className="text-center mb-6">
          <Title level={2}>Create New Password</Title>
          <Paragraph>
            Enter the verification code sent to your email and create a new password
          </Paragraph>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleResetPassword}
          requiredMark={false}
          initialValues={{ username: usernameFromParams }}
        >
          <Form.Item name="username" label="Username" rules={[rule]}>
            <Input size="large" placeholder="Enter your username" />
          </Form.Item>

          <Form.Item name="code" label="Verification Code" rules={[rule]}>
            <Input size="large" placeholder="Enter the code from your email" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[rule]}
            extra="Must be at least 8 characters with uppercase, lowercase, number, and special character"
          >
            <Input.Password size="large" placeholder="Create a new password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            rules={[rule]}
            dependencies={['newPassword']}
          >
            <Input.Password size="large" placeholder="Confirm your new password" />
          </Form.Item>

          <Form.Item className="mb-2">
            <Button type="primary" htmlType="submit" loading={loading} size="large" block>
              Reset Password
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

export default ResetPasswordPage;
