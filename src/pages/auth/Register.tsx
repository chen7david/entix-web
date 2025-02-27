import { App, Card, Typography, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/auth.hook";
import {
  RegisterForm,
  RegisterFormData,
} from "@/features/auth/components/RegisterForm";
import { AuthRoutes } from "@/router/routes.constants";

const { Title, Text } = Typography;

export const RegisterPage: React.FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  const handleRegister = async (values: RegisterFormData) => {
    const result = await register({
      email: values.email,
      password: values.password,
      username: values.username,
    });

    if (result.success) {
      message.success(
        "Registration successful! Please check your email to verify your account."
      );
      navigate(AuthRoutes.VERIFY_EMAIL);
    } else {
      message.error(result.error || "Registration failed. Please try again.");
    }
  };

  return (
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
        <Link to={AuthRoutes.LOGIN}>Sign in</Link>
      </Space>
    </Card>
  );
};

export default RegisterPage;
