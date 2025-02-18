import { App, Card, Typography, Space } from "antd";
import { Link } from "react-router-dom";
import {
  RegisterForm,
  RegisterFormData,
} from "@/features/auth/components/RegisterForm";
import { useAuth } from "@/features/auth/hooks/auth.hook";

const { Title, Text } = Typography;

export const RegisterPage: React.FC = () => {
  const { message } = App.useApp();
  const { register, isLoading, error } = useAuth();

  const handleRegister = async (values: RegisterFormData) => {
    try {
      // Validate password match
      if (values.password !== values.confirmPassword) {
        message.error("Passwords do not match!");
        return;
      }

      await register({
        email: values.email,
        username: values.username,
        password: values.password,
      });

      message.success(
        "Registration successful! Please check your email to verify your account."
      );
    } catch (err) {
      // Error is already handled by the useAuth hook
      // We just need to show a user-friendly message
      message.error(error || "Registration failed. Please try again.");
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
