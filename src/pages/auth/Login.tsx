import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { App, Button, Card, Form, Input, Typography, Space } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Text, Link } = Typography;

type LoginFormData = {
  email: string;
  password: string;
};

export const LoginPage: React.FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: LoginFormData) => {
    try {
      setLoading(true);
      console.log(values);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success(
        "Login successful! Replace this with actual API integration"
      );
      navigate("/dashboard");
    } catch (error) {
      message.error("Login failed. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <Title level={2}>Welcome Back</Title>
          <Text type="secondary">Please sign in to continue</Text>
        </div>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
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
              prefix={<UserOutlined />}
              placeholder="Email"
              size="large"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
            extra={
              <Link
                onClick={() => navigate("/forgot-password")}
                className="float-right"
              >
                Forgot password?
              </Link>
            }
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
              autoComplete="current-password"
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
              Sign in
            </Button>
          </Form.Item>

          <div className="text-center">
            <Space direction="vertical" size="small">
              <Text>
                Don't have an account?{" "}
                <Link onClick={() => navigate("/register")}>Sign up</Link>
              </Text>
              <Text>
                Email not verified?{" "}
                <Link onClick={() => navigate("/request-verification")}>
                  Verify now
                </Link>
              </Text>
            </Space>
          </div>
        </Form>
      </Card>
    </div>
  );
};
