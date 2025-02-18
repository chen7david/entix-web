import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { App, Card, Typography, Space } from "antd";
import { LoginForm, LoginFormData } from "@/features/auth/components/LoginForm";

const { Title, Text } = Typography;

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

        <LoginForm onSubmit={handleLogin} loading={loading} />

        <Space className="w-full justify-center mt-4">
          <Link to="/auth/forgot-password">Forgot password?</Link>
          <Text type="secondary">|</Text>
          <Link to="/auth/register">Create an account</Link>
        </Space>
      </Card>
    </div>
  );
};

export default LoginPage;
