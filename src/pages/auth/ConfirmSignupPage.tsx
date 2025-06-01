import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Space } from 'antd';
import { createSchemaFieldRule } from 'antd-zod';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { confirmSignupRequestSchema } from '@/features/auth/auth.schemas';
import { AuthService } from '@/features/auth/auth.service';
import { useMessage } from '@/utils/message';

const { Title, Text, Paragraph } = Typography;

/**
 * ConfirmSignupPage allows users to confirm their account
 * after registration by entering the verification code
 * they received via email.
 */
const ConfirmSignupPage: React.FC = () => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const message = useMessage();

  // Prefill username from URL params if available
  const usernameFromUrl = searchParams.get('username') || '';

  useEffect(() => {
    if (usernameFromUrl) {
      form.setFieldsValue({ username: usernameFromUrl });
    }
  }, [usernameFromUrl, form]);

  // Create a validation rule using the Zod schema
  const rule = createSchemaFieldRule(confirmSignupRequestSchema);

  const handleConfirmSignup = async (values: { username: string; confirmationCode: string }) => {
    setConfirmLoading(true);

    try {
      await AuthService.confirmSignup(values);

      // Show success message
      message.success('Account successfully confirmed! You can now sign in.');

      // Navigate to sign-in page
      navigate('/auth/signin');
    } catch (error: unknown) {
      // Handle errors from the API
      const apiError = error as { response?: { data?: { message?: string } } };
      const errorMessage =
        apiError.response?.data?.message ||
        (error instanceof Error ? error.message : 'Unknown error') ||
        'Failed to confirm account. Please try again.';

      message.error(errorMessage);
    } finally {
      setConfirmLoading(false);
    }
  };

  // Function to handle resending the confirmation code
  const handleResendCode = async () => {
    const username = form.getFieldValue('username');

    if (!username) {
      message.error('Please enter your username first');
      return;
    }

    setResendLoading(true);

    try {
      await AuthService.resendConfirmationCode({ username });
      message.success('A new confirmation code has been sent to your email');
    } catch (error: unknown) {
      const apiError = error as { response?: { data?: { message?: string } } };
      const errorMessage =
        apiError.response?.data?.message ||
        (error instanceof Error ? error.message : 'Unknown error') ||
        'Failed to resend code. Please try again.';

      message.error(errorMessage);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-md">
        <div className="text-center mb-6">
          <Title level={2}>Confirm Your Account</Title>
          <Paragraph>
            Enter the confirmation code sent to your email to activate your account
          </Paragraph>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleConfirmSignup}
          requiredMark={false}
          initialValues={{ username: usernameFromUrl }}
        >
          <Form.Item name="username" label="Username" rules={[rule]}>
            <Input size="large" placeholder="Enter your username" disabled={!!usernameFromUrl} />
          </Form.Item>

          <Form.Item
            name="confirmationCode"
            label="Confirmation Code"
            rules={[rule]}
            extra="Check your email for the 6-digit confirmation code"
          >
            <Input size="large" placeholder="Enter confirmation code" />
          </Form.Item>

          <Form.Item className="mb-2">
            <Button type="primary" htmlType="submit" loading={confirmLoading} size="large" block>
              Confirm Account
            </Button>
          </Form.Item>

          <div className="text-center mt-4">
            <Space direction="vertical" size="middle">
              <Button type="link" onClick={handleResendCode} loading={resendLoading}>
                Didn&apos;t receive a code? Resend
              </Button>
              <Text>
                Already confirmed? <Link to="/auth/signin">Sign in</Link>
              </Text>
              <Text>
                Need to create an account? <Link to="/auth/signup">Sign up</Link>
              </Text>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ConfirmSignupPage;
