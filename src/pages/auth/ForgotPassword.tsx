import { App, Card, Typography, Space } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/auth.hook";
import {
  ForgotPasswordForm,
  ForgotPasswordFormData,
} from "@/features/auth/components/ForgotPasswordForm";

const { Title, Text } = Typography;

export const ForgotPasswordPage: React.FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { requestPasswordReset, isLoading } = useAuth();

  const handleForgotPassword = async (values: ForgotPasswordFormData) => {
    const result = await requestPasswordReset(values.email);

    if (result.success) {
      message.success(
        "If an account exists with this email, you will receive a password reset code."
      );
      // Pass email to reset password page to maintain context
      navigate("/auth/reset-password", {
        state: { email: values.email },
      });
    } else {
      message.error(
        result.error || "Failed to send reset code. Please try again."
      );
    }
  };

  return (
    <Card className="w-full max-w-md">
      <div className="text-center mb-8">
        <Title level={2}>Reset Password</Title>
        <Text type="secondary">
          Enter your email address and we'll send you a code to reset your
          password
        </Text>
      </div>

      <ForgotPasswordForm onSubmit={handleForgotPassword} loading={isLoading} />

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
  );
};

export default ForgotPasswordPage;
