import { App, Card, Typography, Space } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/auth.hook";
import {
  RegisterForm,
  RegisterFormData,
} from "@/features/auth/components/RegisterForm";

const { Title, Text } = Typography;

export const RegisterPage: React.FC = () => {
  const { message } = App.useApp();
  const { register, isLoading, authError } = useAuth();

  const handleRegister = async (values: RegisterFormData) => {
    try {
      await register({
        email: values.email,
        password: values.password,
        username: values.username,
      });

      message.success(
        "Registration successful! Please check your email to verify your account."
      );
    } catch (err) {
      message.error(
        authError?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <Title level={2}>Create Account</Title>
          <Text type="secondary">
            Please fill in your information to create an account
          </Text>
        </div>

        <RegisterForm onSubmit={handleRegister} loading={isLoading} />

        <Space className="w-full justify-center mt-4">
          <Text>Already have an account?</Text>
          <Link to="/auth/login">Sign in</Link>
        </Space>
      </Card>
    </div>
  );
};

export default RegisterPage;
