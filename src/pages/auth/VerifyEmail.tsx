import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { App, Button, Card, Form, Input, Space, Typography } from "antd";
import { NumberOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

type VerifyEmailFormData = {
  otp: string;
};

export const VerifyEmailPage: React.FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleVerifyEmail = async (values: VerifyEmailFormData) => {
    try {
      setLoading(true);
      console.log(values);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success("Email has been successfully verified!");
      navigate("/login");
    } catch (error) {
      message.error("Failed to verify email. Please try again.");
      console.error("Email verification error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <Title level={2}>Verify Your Email</Title>
          <Typography.Paragraph type="secondary">
            Enter the verification OTP sent to your email
          </Typography.Paragraph>
        </div>

        <Form
          name="verifyEmail"
          onFinish={handleVerifyEmail}
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

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
            >
              Verify Email
            </Button>
          </Form.Item>

          <div className="text-center">
            <Space direction="vertical" size="small">
              <Text>
                Didn't receive OTP?{" "}
                <Link to="/auth/request-verification">Request again</Link>
              </Text>
              <Text>
                Back to <Link to="/auth/login">Sign in</Link>
              </Text>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};
