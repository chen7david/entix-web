import { App, Card, Typography, Space } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/auth.hook";
import {
  VerifyEmailForm,
  VerifyEmailFormData,
} from "@/features/auth/components/VerifyEmailForm";
import { AuthRoutes } from "@/router/routes.constants";

const { Title, Text } = Typography;

export const VerifyEmailPage: React.FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { verifyEmail, resendVerificationCode, isLoading } = useAuth();

  const handleVerifyEmail = async (values: VerifyEmailFormData) => {
    const result = await verifyEmail(values.email, values.code);

    if (result.success) {
      message.success("Email has been successfully verified!");
      navigate(AuthRoutes.LOGIN);
    } else {
      message.error(
        result.error || "Failed to verify email. Please try again."
      );
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
            Back to <Link to={AuthRoutes.LOGIN}>Sign in</Link>
          </Text>
        </Space>
      </div>
    </Card>
  );
};

export default VerifyEmailPage;
