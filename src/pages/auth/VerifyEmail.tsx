import { App, Card, Typography, Space } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/auth.hook";
import {
  VerifyEmailForm,
  VerifyEmailFormData,
} from "@/features/auth/components/VerifyEmailForm";

const { Title, Text } = Typography;

export const VerifyEmailPage: React.FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { verifyEmail, resendVerificationCode, isLoading } = useAuth();

  const handleVerifyEmail = async (values: VerifyEmailFormData) => {
    const result = await verifyEmail(values.email, values.code);
    
    if (result.success) {
      message.success("Email has been successfully verified!");
      navigate("/auth/login");
    } else {
      message.error(result.error || "Failed to verify email. Please try again.");
    }
  };

  const handleResendCode = async (email: string) => {
    const result = await resendVerificationCode(email);
    
    if (result.success) {
      message.success("Verification code has been resent to your email.");
    } else {
      message.error(result.error || "Failed to resend code. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <Title level={2}>Verify Your Email</Title>
          <Text type="secondary">
            Enter the verification OTP sent to your email
          </Text>
        </div>

        <VerifyEmailForm 
          onSubmit={handleVerifyEmail} 
          onResendCode={handleResendCode}
          loading={isLoading} 
        />

        <div className="text-center mt-4">
          <Space direction="vertical" size="small">
            <Text>
              Back to <Link to="/auth/login">Sign in</Link>
            </Text>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
