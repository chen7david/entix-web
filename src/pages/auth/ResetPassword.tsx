import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { App, Button, Card, Form, Input, Space, Typography } from "antd";
import { LockOutlined, NumberOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

type ResetPasswordFormData = {
  otp: string;
  newPassword: string;
  confirmPassword: string;
};

export const ResetPasswordPage: React.FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleResetPassword = async (values: ResetPasswordFormData) => {
    try {
      setLoading(true);
      console.log(values);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success("Password has been successfully reset!");
      navigate("/login");
    } catch (error) {
      message.error("Failed to reset password. Please try again.");
      console.error("Reset password error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <Title level={2}>Reset Your Password</Title>
          <Typography.Paragraph type="secondary">
            Enter the OTP sent to your email and your new password
          </Typography.Paragraph>
        </div>

        <Form
          form={form}
          name="resetPassword"
          onFinish={handleResetPassword}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="otp"
            rules={[
              { required: true, message: "Please input the OTP!" },
              { len: 6, message: "OTP must be exactly 6 digits!" },
              { pattern: /^\d+$/, message: "OTP must contain only numbers!" },
            ]}
          >
            <Input
              prefix={<NumberOutlined />}
              placeholder="Enter 6-digit OTP"
              size="large"
              maxLength={6}
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new password!" },
              { min: 8, message: "Password must be at least 8 characters!" },
              {
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="New Password"
              size="large"
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm New Password"
              size="large"
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
            >
              Reset Password
            </Button>
          </Form.Item>

          <div className="text-center">
            <Space direction="vertical" size="small">
              <Text>
                Didn't receive OTP?{" "}
                <Link to="/forgot-password">Request again</Link>
              </Text>
              <Text>
                Remember your password? <Link to="/login">Sign in</Link>
              </Text>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};
