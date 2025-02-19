import { App, Card, Typography, Space } from "antd";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/auth.hook";
import {
  ResetPasswordForm,
  ResetPasswordFormData,
} from "@/features/auth/components/ResetPasswordForm";

const { Title, Text } = Typography;

export const ResetPasswordPage: React.FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const { confirmPasswordReset, requestPasswordReset, isLoading } = useAuth();
  
  // Get email from navigation state
  const email = location.state?.email;

  const handleResetPassword = async (values: ResetPasswordFormData) => {
    const result = await confirmPasswordReset(
      values.email || email,
      values.code,
      values.newPassword
    );

    if (result.success) {
      message.success("Password has been successfully reset!");
      navigate("/auth/login");
    } else {
      message.error(result.error || "Failed to reset password. Please try again.");
    }
  };

  const handleResendCode = async (email: string) => {
    const result = await requestPasswordReset(email);
    
    if (result.success) {
      message.success(
        "If an account exists with this email, you will receive a new reset code."
      );
    } else {
      message.error(result.error || "Failed to send reset code. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <Title level={2}>Reset Your Password</Title>
          <Text type="secondary">
            Enter the code sent to your email and your new password
          </Text>
        </div>

        <ResetPasswordForm 
          onSubmit={handleResetPassword} 
          onResendCode={handleResendCode}
          loading={isLoading}
          defaultEmail={email}
        />

        <div className="text-center mt-4">
          <Space direction="vertical" size="small">
            <Text>
              Remember your password? <Link to="/auth/login">Sign in</Link>
            </Text>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
