import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { App, Card, Typography, Space } from "antd";
import {
  RequestEmailVerificationForm,
  EmailVerificationFormData,
} from "@/features/auth/components/RequestEmailVerificationForm";

const { Title, Text } = Typography;

export const RequestEmailVerificationPage: React.FC = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRequestVerification = async (
    values: EmailVerificationFormData
  ) => {
    try {
      setLoading(true);
      console.log(values);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success("Verification OTP has been sent to your email address.");
      navigate("/auth/verify-email");
    } catch (error) {
      message.error("Failed to send verification email. Please try again.");
      console.error("Email verification request error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <div className="text-center mb-8">
        <Title level={2}>Verify Your Email</Title>
        <Text type="secondary">
          Enter your email address to receive a verification OTP
        </Text>
      </div>

      <RequestEmailVerificationForm
        onSubmit={handleRequestVerification}
        loading={loading}
      />

      <div className="text-center mt-4">
        <Space direction="vertical" size="small">
          <Text>
            Already have an OTP?{" "}
            <Link to="/auth/verify-email">Verify email</Link>
          </Text>
          <Text>
            Back to <Link to="/auth/login">Sign in</Link>
          </Text>
        </Space>
      </div>
    </Card>
  );
};

export default RequestEmailVerificationPage;
