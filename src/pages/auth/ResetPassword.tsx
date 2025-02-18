import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { App, Card, Typography, Space } from "antd";
import {
  ResetPasswordForm,
  ResetPasswordFormData,
} from "@/features/auth/components/ResetPasswordForm";

const { Title, Text } = Typography;

export const ResetPasswordPage: React.FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (values: ResetPasswordFormData) => {
    try {
      setLoading(true);
      console.log(values);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success("Password has been successfully reset!");
      navigate("/auth/login");
    } catch (error) {
      message.error("Failed to reset password. Please try again.");
      console.error("Reset password error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <Title level={2}>Reset Your Password</Title>
          <Text type="secondary">
            Enter the OTP sent to your email and your new password
          </Text>
        </div>

        <ResetPasswordForm onSubmit={handleResetPassword} loading={loading} />

        <div className="text-center mt-4">
          <Space direction="vertical" size="small">
            <Text>
              Didn't receive OTP?{" "}
              <Link to="/auth/forgot-password">Request again</Link>
            </Text>
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
