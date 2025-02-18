import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { App, Button, Card, Form, Input, Space, Typography } from "antd";
import { MailOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

type EmailVerificationFormData = {
  email: string;
};

export const RequestEmailVerificationPage: React.FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRequestVerification = async (
    values: EmailVerificationFormData
  ) => {
    try {
      setLoading(true);
      console.log(values);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success("Verification OTP has been sent to your email address.");
      navigate("/verify-email");
    } catch (error) {
      message.error("Failed to send verification email. Please try again.");
      console.error("Email verification request error:", error);
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
            Enter your email address to receive a verification OTP
          </Typography.Paragraph>
        </div>

        <Form
          name="requestEmailVerification"
          onFinish={handleRequestVerification}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              size="large"
              autoComplete="email"
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
              Send Verification OTP
            </Button>
          </Form.Item>

          <div className="text-center">
            <Space direction="vertical" size="small">
              <Text>
                Already have an OTP?{" "}
                <Link to="/verify-email">Verify email</Link>
              </Text>
              <Text>
                Back to <Link to="/login">Sign in</Link>
              </Text>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};
