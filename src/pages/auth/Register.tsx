import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { App, Card, Typography, Space } from "antd";
import {
  RegisterForm,
  RegisterFormData,
} from "@/features/auth/components/RegisterForm";

const { Title, Text, Link } = Typography;

export const RegisterPage: React.FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values: RegisterFormData) => {
    try {
      setLoading(true);
      console.log(values);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success(
        "Registration successful! Please check your email to verify your account."
      );
      navigate("/login");
    } catch (error) {
      message.error("Registration failed. Please try again.");
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
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

        <RegisterForm onSubmit={handleRegister} loading={loading} />

        <Space className="w-full justify-center mt-4">
          <Text>Already have an account?</Text>
          <Link href="/auth/login">Sign in</Link>
        </Space>
      </Card>
    </div>
  );
};

export default RegisterPage;
