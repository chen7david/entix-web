import { App, Card, Typography, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/auth.hook";
import { LoginForm, LoginFormData } from "@/features/auth/components/LoginForm";

const { Title, Text } = Typography;

export const LoginPage: React.FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const handleLogin = async (values: LoginFormData) => {
    const result = await login(values.email, values.password);

    if (result.success) {
      message.success("Login successful!");
      navigate("/dashboard");
    } else {
      message.error(result.error || "Login failed. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-md">
      <div className="text-center mb-8">
        <Title level={2}>Welcome Back</Title>
        <Text type="secondary">Please sign in to continue</Text>
      </div>

      <LoginForm onSubmit={handleLogin} loading={isLoading} />

      <Space className="w-full justify-center mt-4">
        <Link to="/auth/forgot-password">Forgot password?</Link>
        <Text type="secondary">|</Text>
        <Link to="/auth/register">Create an account</Link>
      </Space>
    </Card>
  );
};

export default LoginPage;
