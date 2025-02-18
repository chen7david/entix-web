import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { App, Card, Typography, Space } from "antd";
import {
  ForgotPasswordForm,
  ForgotPasswordFormData,
} from "@/features/auth/components/ForgotPasswordForm";

const { Title, Text } = Typography;

export const ForgotPasswordPage: React.FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (values: ForgotPasswordFormData) => {
    try {
      setLoading(true);
      console.log(values);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success(
        "If an account exists with this email, you will receive a password reset OTP."
      );
      navigate("/auth/reset-password");
    } catch (error) {
      message.error("Failed to send reset email. Please try again.");
      console.error("Forgot password error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <Title level={2}>Reset Password</Title>
          <Text type="secondary">
            Enter your email address and we'll send you an OTP to reset your
            password
          </Text>
        </div>

        <ForgotPasswordForm onSubmit={handleForgotPassword} loading={loading} />

        <div className="text-center mt-4">
          <Space direction="vertical" size="small">
            <Text>
              Remember your password? <Link to="/auth/login">Sign in</Link>
            </Text>
            <Text>
              Don't have an account? <Link to="/auth/register">Sign up</Link>
            </Text>
            <Text>
              Need to verify your email?{" "}
              <Link to="/auth/request-verification">Verify now</Link>
            </Text>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;
